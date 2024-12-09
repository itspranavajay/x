import React, { useContext, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { toast } from 'react-toastify';
import { Context } from '../../Context/Context';

const AdminDailyThought = () => {
    const {addDailyThought} = useContext(Context)
    const [para,setPara] = useState(null);
    function handleClick()
    {
        if(para)
        {
            addDailyThought(para);
        }
        else
        {
            toast.error("Invalid");
        }
    }
    return (
        <div className=''>
            <div className='px-10'>
                <div className='mt-2'>
                    <label htmlFor="first_name" class="block text-center text-2xl mb-2  font-medium text-gray-900 dark:text-white">Add Daily Thought</label>
                    <input value={para} onChange={(e)=>setPara(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
                <button onClick={handleClick} className='text-center w-full my-2 bg-green-400 rounded-xl'>Add </button>
            </div>
            
        </div>
    )
}

export default AdminDailyThought
