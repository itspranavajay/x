import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout';
import { Context } from '../../Context/Context';
import { Card } from 'flowbite-react';
import { Carousel } from "flowbite-react";
import { Link } from 'react-router-dom';
import parse from "html-react-parser";
import { Tweet } from "react-tweet"
import NewsCardComponents from '../../Components/NewsCardComponents/NewsCardComponents';
import HomeCategoryComponents from './HomeCategoryComponents';


const Home = () => {

  const { getAllPosts, carsoleNews, searchNews, infocusNews } = useContext(Context);
  return (
    <Layout>
      <div className='home p-5 md:p-10 font-semibold '>
        <div class="inline-flex items-center justify-center w-full">
          <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <span class="absolute px-3 font-medium text-xl text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">Trending News</span>
        </div>
        <div className='flex  flex-col md:flex-row lg:px-20 mg:px-10   flex-wrap'>
          <div className='basis-4/12 p-5 order-2 md:order-1 '>
            <p className="text-center font-normal text-xl border-l-8 border-l-red-600">
              Latest News
            </p>
            {carsoleNews && carsoleNews.map((item) => {
              return <Link to={`/news/${item?.id}`} className='my-2'>
                <p>{item.title}</p>
                <hr className='h-px my-2 bg-gray-200 border-0 dark:bg-gray-700' />
              </Link>
            })}
          </div>
          {infocusNews && infocusNews.length > 2 && <div className='basis-6/12  md:order-2 lg:grid lg:grid-cols-2 lg:grid-rows-3'>
            <Link to={`/news/${infocusNews[0]?.id}`} className='lg:col-span-2 md:row-span-2 l p-2'>
              <img src={`${infocusNews[0]?.thumbnail}`} className=' w-full' alt="" />
              <h4 className='text-xl'>{infocusNews[0]?.title.slice(0, 120)}...</h4>
              <p className='text-sm font-normal'>{infocusNews[0]?.description}...</p>
            </Link>
            <Link to={`/news/${infocusNews[1]?.id}`} className='flex-1 l p-2'>
              <img src={`${infocusNews[1].thumbnail}`} className='w-full h-40 md:h-32' alt="" />
              <h4 className='text-sm font-bold'>{infocusNews[1].title.slice(0, 100)}...</h4>
              <p className='text-sm font-normal'>{infocusNews[1].description.slice(0, 150)}</p>
            </Link>
            <Link to={`/news/${infocusNews[2]?.id}`} className='flex-1 l p-2'>
              <img src={`${infocusNews[2]?.thumbnail}`} className='w-full h-40 md:h-32' alt="" />
              <h4 className='text-sm font-bold'>{infocusNews[2].title.slice(0, 100)}...</h4>
              <p className='text-sm font-normal'>{infocusNews[2].description.slice(0, 150)}</p>
            </Link>
          </div>}

        </div>
      </div>
      <HomeCategoryComponents category={"Economics"} />
      <HomeCategoryComponents category={"Politics"} />
      <HomeCategoryComponents category={"why"} />
    </Layout>
  )
}

export default Home
