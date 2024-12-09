import { collection, getDoc, getDocs, limit, limitToLast, orderBy, query, startAfter, where } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { database } from '../../Firebase/Config-file';
import { toast } from 'react-toastify';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

const AdminUnapprovedNews = () => {
  const newsPerPage = 8;
  const [posts, setPosts] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  useEffect(() => {
    (async () => {
      const collectionRef = collection(database, "posts");
      const q = query(collectionRef, where("approved", "==", false), orderBy("time", "desc"), limit(newsPerPage));
      const data = await getDocs(q);
      const last = data.docs[data.docs.length - 1];
      console.log(last);
      setLastDoc(last);
      const posts = data.docs.map((item) => {
        return { post: item.data(), id: item.id };
      })
      setPosts(posts);
      console.log(posts);
    })()
  }, [])
  const getMore = useCallback(async function () {
    try {
      const collectionRef = collection(database, "posts");
      const q = query(collectionRef, where("approved", "==", false), orderBy("time", "desc"), startAfter(lastDoc), limit(newsPerPage));
      const data = await getDocs(q);
      setLastDoc(data.docs[data.docs.length - 1]);
      const post = data.docs.map((item) => {
        return { post: item.data(), id: item.id };
      })
      setPosts([...posts, ...post]);

    } catch (error) {
      console.log(error);
      toast.error("Error Occured");
    }
  }, [lastDoc])
  return (
    <div className='w-screen'>
      <div className="text-center font-bold md:text-2xl my-2">All Unapproved News</div>
      <div className='px-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center  '>
        {
          posts && posts.map((p) => {
            const item = p.post;
            return (
              <Link to={`/news/${p.id}`} class="max-w-sm m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img class="rounded-t-lg" src={item.thumbnail} alt="" />
                </a>
                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title.slice(0, 100)}...</h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description.slice(0, 100)}...</p>
                  <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    See Full News
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </a>
                </div>
              </Link>

            )
          })
        }
      </div>
      {lastDoc && <button onClick={getMore} className='p-2 bg-red-500 font-normal rounded-xl mx-auto block'>Load More</button>
      }
    </div>
  )
}

export default AdminUnapprovedNews
