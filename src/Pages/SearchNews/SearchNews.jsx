import React, { useContext } from 'react'
import Layout from '../../Components/Layout/Layout'
import { Context } from '../../Context/Context';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { database } from '../../Firebase/Config-file';
import { toast } from 'react-toastify';

const SearchNews = () => {
    const [searchLast, setSearchLast] = useState(null);
    const [searchNews, setsearchNews] = useState(null);
    const { loading, setLoading } = useContext(Context);
    const newsPerPage = 8;
    const location = useLocation();
    const param = new URLSearchParams(location.search).get("data");
    useEffect(() => {
        (async () => {
            setSearchLast(null);
            const collectionRef = collection(database, "posts");
            const q = query(collectionRef, where("tags", "array-contains-any", param.split(" ")), orderBy("time", "desc"), limit(8));
            const data = await getDocs(q);
            setSearchLast(data.docs[data.docs.length - 1]);
            const posts = data.docs.map((item) => {
                return { ...item.data(), id: item.id };
            }).filter((item) => item.approved);
            setsearchNews(posts);
        })()
    }, [param]);
    async function handleMore() {
        setLoading(true);
        try {
            const collectionRef = collection(database, "posts");
            const q = query(collectionRef, where("tags", "array-contains-any", param.split(" ")), orderBy("time", "desc"), startAfter(searchLast), limit(8));
            const data = await getDocs(q);
            setSearchLast(data.docs[data.docs.length - 1]);
            const posts = data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }).filter((item) => item.approved);
            setsearchNews((pre) => {
                return [...pre, ...posts];
            })
        } catch (error) {
            console.log(error)
            toast.error("Error In More News");
        }
        setLoading(false);
    }
    return (
        <Layout>
            <div class="inline-flex items-center justify-center w-full">
                <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span class="absolute px-3 font-medium text-xl text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">Search Results</span>
            </div>
            <div className="grid lg:grid-cols-4 gap-2 md:p-5 place-items-center md:grid-cols-2 grid-cols-1">
                {searchNews && searchNews.map((item) => {
                    return (
                        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img class="rounded-t-lg" src={`${item.thumbnail}`} alt="" />
                            </a>
                            <div class="p-5">
                                <a href="#">
                                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title.slice(0, 100)}...</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description.slice(0, 100)}...</p>
                                <Link to={`/news/${item.id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-red-500   dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                    )
                })}
            </div>
            {searchLast && <button onClick={handleMore} className='p-2 bg-red-500 mx-auto block rounded-xl'>Load More</button>}
        </Layout>
    )
}

export default SearchNews
