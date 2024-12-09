import { collection, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { database } from '../../Firebase/Config-file';
import { TextInput } from "flowbite-react"
import { Context } from '../../Context/Context';

const AdminCreateCatogary = () => {
    const [text, setText] = useState("");
    const { addCategory, allcategory,deleteCategory} = useContext(Context);
    console.log(allcategory);
    function add() {
        if (text) {
            addCategory(text);
            setText("");
        }
    }
    return (
        <div className='flex flex-col'>
            <div className='px-10'>
                <div className='mt-2'>
                    <label htmlFor="first_name" class="block text-center text-2xl mb-2  font-medium text-gray-900 dark:text-white">Create Category</label>
                    <input onChange={(e) => setText(e.target.value)} value={text} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
            </div>
            <button onClick={add} className='bg-violet-500  mx-auto h-10 w-20 rounded-xl text-white mt-2 '>Add</button>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        All Category Listed Here
                    </caption>
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Category Name
                            </th>


                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {allcategory && allcategory.map((item) => {

                            return (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </th>
                                    <td onClick={()=>deleteCategory(item.id)} class="px-6 py-4  me-auto rounded-2xl  font-bold w-20 text-red-600">
                                        Delete
                                    </td>
                                    
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AdminCreateCatogary
