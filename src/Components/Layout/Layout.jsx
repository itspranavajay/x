import React, { useContext } from 'react'
import Nav from '../Navbar/Nav'
import Footer from '../Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../Context/Context';
import { Spinner } from 'flowbite-react';
import NewsLetter from '../../Components/Newsletter/NewsLetter';
import DailyThought from '../DailyThought/DailyThought';

const Layout = ({ children }) => {
    const { loading } = useContext(Context);
    return (
        <div className={"home"}>
            <DailyThought/>
            {loading && <Spinner color={'warning'} className='fixed z-50 top-[50%] left-[50%]' />
            }
            {loading && <div className='fixed   inset-0 bg-white z-40'  style={{ opacity: "0.9" }}></div>}
            <Nav />
            {children}
            <NewsLetter/>
            <Footer/>
            <ToastContainer position='top-center' />
        </div>

    )
}

export default Layout
