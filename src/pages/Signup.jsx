import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import authService from '../appwrite/auth'
import { useAuth } from '../appwrite/useAuth'


export default function Signup() {

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            // console.log(e.target.username.value, e.target.email.value, e.target.password.value)
            const userData = await authService.createAccount({name:e.target.name.value, email:e.target.email.value, password:e.target.password.value})
            if (userData) {
                console.log(userData);
                const userData = await authService.getCurrentUser()
                if (userData) {
                    login()
                    navigate("/")
                }
            }
        } catch (error) {
            console.log(error);
            setError(error)
        }
    }

    return (
        <div className="h-screen flex justify-center ">

            <div className="flex md:w-1/2 justify-center py-10 items-center dark:bg-black bg-white">
                <form className='space-y-5' onSubmit={e => handleSubmit(e)}>
                    <h1 className="text-black dark:text-white font-bold text-2xl mb-1">Hello Welcome!</h1>

                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        <input
                            placeholder="Username"
                            type="text"
                            name='name'
                            className='bg-inherit px-2 py-1 outline-none'
                        />
                    </div>

                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input
                            placeholder="Email"
                            type="email"
                            name='email'
                            className='bg-inherit px-2 py-1 outline-none'

                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd" />
                        </svg>
                        <input
                            placeholder="Password"
                            type='password'
                            className='bg-inherit px-2 py-1 outline-none'
                            name='password'
                        />
                    </div>
                    <button type="submit" className="block w-full bg-black text-white dark:bg-white dark:text-black mt-4 py-2 rounded-2xl font-semibold mb-2">SignUp</button>
                    <p className='flex items-center justify-center text-sm'>Have an account?<span className="text-sm ml-2 hover:text-gray-600 cursor-pointer"><Link to={"/login"}>Login</Link></span></p>
                </form>
            </div>
        </div>
    )
}
