import React, { useContext, useState } from 'react'
import { Context } from '../../Context/Context';

const NewsLetter = () => {
    const {subscribeToEmail}  = useContext(Context);
    const [state,setState] = useState(null);
    function handleSubmit(e)
    {
        e.preventDefault();
        subscribeToEmail(state);
    }

    return (
        <div id="newsletter-banner" tabindex="-1" class=" my-10 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div class="flex items-center flex-shrink-0 w-full mx-auto sm:w-auto">
                <form onSubmit={handleSubmit} class="flex flex-col items-center w-full md:flex-row">
                    <label for="email" class="flex-shrink-0 mb-2 mr-auto text-sm font-medium text-gray-500 md:mb-0 md:mr-4 dark:text-gray-400 md:m-0">Sign up for our newsletter</label>
                    <input value={state} onChange={(e)=>setState(e.target.value)} type="email" id="email" placeholder="Enter your email" class="bg-white border border-gray-300 text-gray-900 md:w-64 mb-2 md:mb-0 md:mr-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subscribe</button>
                </form>
            </div>
        </div>
    )
}

export default NewsLetter
