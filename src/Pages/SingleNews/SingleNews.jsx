import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout';
import { Tweet } from 'react-tweet';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { database } from '../../Firebase/Config-file';
import { Context } from '../../Context/Context';
import parse from "html-react-parser";
import { useNavigate } from 'react-router-dom';

const SingleNews = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : false;
    const { newsId } = useParams();
    const { setLoading, approveNews, deleteNews } = useContext(Context);
    const [news, setNews] = useState(null);
    useEffect(() => {
        setLoading(true);
        (async () => {
            const collectionRef = doc(database, "posts", newsId);
            const data = await getDoc(collectionRef);
            console.log(data.data())
            setNews(data.data());
        })()
        setLoading(false);
    }, [newsId])
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    });
    return (
        <Layout>
            {news && <div className='single-news px-10'>
                {parse(news.content)}
                <div className='flex justify-center items-center flex-wrap'>
                    {!news.approved && role && <button onClick={() => approveNews(newsId)} className='mx-auto block bg-green-500 p-3 rounded font-normal text-xl'>Approved</button>}
                    {role && <button onClick={() => navigate(`/writeforus?update=${newsId}`)} className='mx-auto block my-2 bg-yellow-500 p-3 rounded font-normal text-xl'>Update</button>}
                    {role && <button onClick={() => { deleteNews(newsId) }} className='mx-auto block bg-red-500 p-3 rounded font-normal text-xl'>Delete</button>}
                </div>

            </div>}
        </Layout>
    )
}

export default SingleNews






