import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { database } from '../../Firebase/Config-file';

const Admin = () => {
    const pathName = useLocation().pathname;
    console.log(pathName);
    useEffect(() => {
        (async () => {
            const userId = JSON.parse(localStorage.getItem("user")).userId;
            const collectionRef = collection(database, "users");
            const q = query(collectionRef, where("userId", "==", userId));
            const data = await getDocs(q);
            const role = data.docs[0].data().role;
            setAdmin(role);
        })()

    }, [])
    const [isAdmin, setAdmin] = useState(false);
    return (
        (isAdmin && localStorage.getItem("user")) ?
            <Layout>
                <div className="admin">
                    <div className="flex border md:flex-row flex-col   justify-around md:h-10 items-center">
                        <Link className={`font-bold ${pathName=="/adminonly/createcategory"?"text-violet-700":"text-slate-500"} text-slate-500`} to={'createcategory'}>Create Catogary</Link>
                        <Link className={`font-bold ${pathName=="/adminonly/deletenews"?"text-violet-700":"text-slate-500"} text-slate-500`} to={'addthought'}>Add Thought</Link>
                        <Link className={`font-bold ${pathName=="/adminonly/unapproved"?"text-violet-700":"text-slate-500"} text-slate-500`} to={'unapproved'}>See All Unapproved News</Link>
                        <Link className={`font-bold ${pathName=="/adminonly/updatenews"?"text-violet-700":"text-slate-500"} text-slate-500`} to={'updatenews'}>Update News</Link>
                    </div>
                </div>
                <Outlet />
            </Layout> : <div>Loading</div>

    )
}

export default Admin
