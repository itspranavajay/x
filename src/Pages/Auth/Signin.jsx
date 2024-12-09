import React, { useContext } from 'react'
import Layout from '../../Components/Layout/Layout'
import { toast } from 'react-toastify'
import { Context } from '../../Context/Context'

const Signin = () => {
    const {signInWithGoogle} = useContext(Context);

    return (
        <Layout>
            <div  class="flex items-center justify-center min-h-screen bg-white">
                <button onClick={signInWithGoogle} class="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <img className='h-8 me-1 w-15' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'} alt="" />
                    <span>Continue with Google</span>
                </button>
            </div>
        </Layout>

    )
}

export default Signin
