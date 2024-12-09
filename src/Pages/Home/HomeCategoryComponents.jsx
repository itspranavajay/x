import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { database } from '../../Firebase/Config-file';
import { Context } from "../../Context/Context"
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const HomeCategoryComponents = ({ category }) => {
  const navigate = useNavigate();
  const { setLoading } = useContext(Context);
  const [lastDoc, setLastDoc] = useState(null);
  const [post, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const q = query(collection(database, "posts"), where("category", "==", category), limit(6), orderBy("time", "desc"));
        const data = await getDocs(q);
        setLastDoc(data.docs[data.docs.length - 1]);
        const posts = data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
        setPosts(posts);
      } catch (error) {
        console.log(error)
        toast.error("Something Went Wrong");
      }
      setLoading(false);
    })()
  }, [])
  async function getMore() {
    setLoading(true);
    try {
      const collectionRef = collection(database, category);
      const q = query(collectionRef, where("category", "==", category), startAfter(lastDoc), limit(6), orderBy("time", "desc"));
      const data = await getDocs(q);
      setLastDoc(data.docs[data.docs.length - 1]);
      const p = data.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })
      setPosts({ ...post, ...p });

    } catch (error) {
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  }
  return (
    <div className='min-h-[500px] border md:px-5 px-2 py-2 '>
      <p className='text-center lg:text-2xl md:text-xl text-xs my-2 font-bold '>{category[0].toUpperCase() + category.slice(1, category.length)}</p>
      <div className='grid place-items-center grid-cols-1  md:grid-cols-2'>
        {post && post.slice(0, 2).map((item) => {
          console.log(item);
          return (
            <Link to={`/news/${item.id}`} className='border lg:p-3 md:p-2 p-1 '>
              <img className='md:max-w-sm mx-auto' src={item.thumbnail} alt="" />
              <h2 className='font-semibold  my-2 text-sm md:text-xl'>{item.title.slice(0.100)}...</h2>
              <p>{item.description.slice(0, 100)}...</p>
            </Link>
          )
        })}
      </div>
      <div className='grid md:grid-cols-6'>
        {post && post.slice(2, post.length).map((item) => {
          return (
            <Link to={`/news/${item.id}`} className='col-span-3  p-2 grid grid-cols-5  min-h-36 border '>
              <img src={item.thumbnail} alt="" className='w-52 object-cover col-span-1  h-full' />
              <p className='col-span-4 px-1'>
                <p className='font-bold md:text-xl text-sm'>{item.title.slice(0, 100)}...</p>
                <p className='font-normal  text-sm '>{item.description.slice(0, 200)}...</p>
              </p>
            </Link>
          )
        })}



      </div>
      <button onClick={() => navigate(`/category/${category}`)} className='mx-auto block my-2 bg-red-400 md:p-2 p-1 one text-white'>Explore {category}</button>
    </div>
  )
}

export default HomeCategoryComponents
