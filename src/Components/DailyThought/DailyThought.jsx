import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { database } from '../../Firebase/Config-file';
import { Link } from 'react-router-dom';

const DailyThought = () => {
    useEffect(() => {
        (async () => {
            const collectionRef = collection(database, "thought");
            const q = query(collectionRef, orderBy("time", "desc"), limit(1));
            const data = await getDocs(q);
            const thought = data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            })
            setState(thought[0]);
        })()
        const id = setInterval(() => {
            const box = document.querySelector("#rotate");
            box.innerHTML = box.innerHTML.slice(1, box.innerHTML.length) + box.innerHTML[0];
        }, 500);
        return () => {
            clearInterval(id);
        }


    }, [])
    const [state, setState] = useState(null);
    const isAdmin = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : false;
    return (
        <div className='font-medium bg-yellow-500 font-serif p-2 flex justify-between '>
            <span className='one' id='rotate' >  {state && state.name}</span>
            <div className='md:me-20 md:text-sm text-[10px] one '>
                {isAdmin && 
                    <Link to={'/adminonly'}>
                        Admin Only
                    </Link>
                }
                <Link to={'/'} className='mx-2 one' >
                    Home
                </Link>
                <Link to={'/writeforus'} className='mx-2 one'>
                    Write For Us
                </Link>
                <Link to={'/support-us'} className='mx-2 one'>
                    Support Us
                </Link>
                <Link to={'/get-in-touch'} className='mx-2 one'>
                    Get In Touch
                </Link>


            </div>
        </div>
    )
}

export default DailyThought
