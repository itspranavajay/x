import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Layout from '../../Components/Layout/Layout';
import { Navigate, useActionData, useParams, useSearchParams } from 'react-router-dom';
import { Context } from '../../Context/Context';
import { Tweet } from "react-tweet"
import { collection, doc, getDoc, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import { database } from '../../Firebase/Config-file';

const WriteForUs = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const id = searchParams.get("update");
  const { allcategory, addPost, handleUpdateNews } = useContext(Context);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [category, setcategory] = useState('');
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState('');
  const editor = useRef(null);
  function handlePost() {
    if (content && tags && category && description && title && thumbnail) {
      const post = { content, tags: tags.split(' '), category, description, title, thumbnail };
      post.email = JSON.parse(localStorage.getItem("user")).email;
      post.name = JSON.parse(localStorage.getItem("user")).name;
      post.approved = JSON.parse(localStorage.getItem("user")).role;
      post.time = serverTimestamp();
      addPost(post);
    }
    else {
      toast.error("All Details Required");
    }
  }
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [content]);
  useEffect(() => {
    if (id) {
      (async () => {
        const collectionRef = doc(database, "posts", id);
        const data = await getDoc(collectionRef);
        const item = data.data();
        setTitle(item.title);
        setTags(item.tags.join(" "));
        setThumbnail(item.thumbnail);
        setDescription(item.description);
        setContent(item.content);
        setcategory(item.category);
      })()
    }
  }, [])
  const handleUpdate = () => {
    const data = { content, tags: tags.split(' '), category, description, title, thumbnail };
    data.email = JSON.parse(localStorage.getItem("user")).email;
    data.name = JSON.parse(localStorage.getItem("user")).name;
    handleUpdateNews({ data, newsId: id });

  }
  return (
    <Layout>
      {!localStorage.getItem("user") && <Navigate to='/auth' />}
      <div className='p-3'>
        <div class="my-3 p-3">
          <input value={title} onChange={((e) => setTitle(e.target.value))} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required />
        </div>
        <div class="my-3 p-3">
          <input value={thumbnail} onChange={((e) => setThumbnail(e.target.value))} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="news thumbnail" required />
        </div>
        <div className='my-2'>
          <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="small description"></textarea>
        </div>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={newContent => {
            setContent(newContent);
          }}
        />
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select onChange={(e) => setcategory(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {id && <option selected value={category}>{category}</option>}
          {allcategory && allcategory.map((item) => {
            return (<option value={item.name}>{item.name}</option>)
          })}
        </select>
      </div>
      <div class="my-3 p-3">
        <input value={tags} onChange={(e) => setTags(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="include Tags" required />
      </div>
      {!id && <button onClick={handlePost} type="button" class="text-white bg-violet-400 mx-auto block hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  mb-2 dark:focus:ring-yellow-900">POST</button>
      }{id && <button onClick={handleUpdate} type="button" class="text-white bg-violet-400 mx-auto block hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  mb-2 dark:focus:ring-yellow-900">Update</button>
      }    </Layout>
  )
}

export default WriteForUs

