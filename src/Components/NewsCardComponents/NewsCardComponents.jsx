import React from 'react';
import { Link } from 'react-router-dom';

const NewsCardComponents = (props) => {
    const {title,description,thumbnail,id} = props
    return (
        <Link to={`/news/${id}`} class="md:w-[400px] w-[150px] h-[220px] md:h-[400px] max-w-xs bg-white border mx-auto border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img src={thumbnail} className=' md:min-w-full h-100px w-100px  md:h-[200px]'  alt="" />
            </a>
            <div class="md:p-5 p-3 ">
                <a href="#">
                    <h5 class="mb-1 text-[10px] md:text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title.slice(0,50)}...</h5>
                </a>
                <p class="mb-3 md:text-xl text-[9px] font-normal text-gray-700 dark:text-gray-400">{description.slice(0,40)}...</p>
                <a href="#" class="inline-flex items-center md:text-xl  px-3 text-[10px] font-medium text-center hover:text-red-600 rounded-lg text-red-40">
                    Read more
                    {/* <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg> */}
                </a>
            </div>
        </Link>
        
    )
}

export default NewsCardComponents
