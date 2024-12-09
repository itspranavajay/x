import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { collection, getDocs, limit, query, startAfter, where } from 'firebase/firestore';
import { database } from '../../Firebase/Config-file';
import { toast } from 'react-toastify';
import { Context } from '../../Context/Context';

function CategoryNews() {
    const {setLoading} = useContext(Context);
    const { category } = useParams();
    const [lastDoc, setDoc] = useState(null);
    const [post, setPost] = useState(null);
    const requestPerPage = 2;
    async function getMore() {
        setLoading(true);
        try {
            const collectionRef = collection(database, "posts");
            const q = query(collectionRef, where("category", "==", category), startAfter(lastDoc), limit(requestPerPage));
            const data = await getDocs(q);
            setDoc(data.docs[data.docs.length - 1]);
            const p = data.docs.map((item) => ({ ...item.data(), id: item.id }));
            const filteredPost = p.filter((item) => item.approved);
            setPost([...post, ...filteredPost]);

        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
        setLoading(false);
    }
    useEffect(() => {
        console.log(category);
        setLoading(true);
        (async () => {
            try {
                const collectionRef = collection(database, "posts");
                const q = query(collectionRef, where("category", "==", category), limit(requestPerPage));
                const data = await getDocs(q);
                setDoc(data.docs[data.docs.length - 1]);
                const p = data.docs.map((item) => ({ ...item.data(), id: item.id }));
                const filteredPost = p.filter((item) => item.approved);
                setPost(filteredPost);
            } catch (error) {

                console.log(error);
            }
        })();
        setLoading(false);
    }, [category]);
    return (
        <Layout>
            <div class="inline-flex items-center justify-center w-full">
                <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span class="absolute px-3 font-medium text-xl text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">{category}</span>
            </div>
            <div className=' md:px-20 px-10 grid lg:grid-cols-4 gap-2 grid-cols-1 md:grid-cols-2 place-items-center'>
                {post && post.map((item) => {
                    return (<Link to={`/news/${item.id}`} class="md:max-w-sm max-w-xs bg-white border mx-auto border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className='w-full m-w-full h-[200px] object-fill' src={`${item.thumbnail}`} alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title.slice(0,100)}...</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description.slice(0,200)}...</p>
                            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:text-red-600 rounded-lg text-red-400     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </Link>)
                })}
            </div>

            {lastDoc && <button className='border my-6 mx-auto block p-2 rounded-xl bg-red-400 text-white' onClick={() => getMore()}>Load More</button>}
        </Layout>
    )
}

export default CategoryNews
