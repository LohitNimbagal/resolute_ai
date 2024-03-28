import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useAuth } from '../appwrite/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const { login, setUserData } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const loggedInUserData = await authService.login({ email: e.target.email.value, password: e.target.password.value })
      if (loggedInUserData) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          login()
          setUserData(userData)
          navigate("/")
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex justify-center ">
      <div className="flex w-1/2 justify-center items-center dark:bg-black bg-white">
        <form onSubmit={e => handleSubmit(e)}>
          <h1 className="text-black dark:text-white font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

          {/* <!-- Username Input --> */}

          <div className='mb-4'>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input
                placeholder="Email Address"
                type="email"
                id='email'
                name='email'
                className='bg-inherit px-2 py-1 outline-none'
              />
            </div>
            <span className='text-xs' onClick={() => { navigator.clipboard.writeText("test@test.com") }}>Test Email : <span className='hover:text-gray-600'>test@test.com</span> </span>
          </div>

          {/* <!-- Password input --> */}

          <div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input
                placeholder="Password"
                type="password"
                id='password'
                name='password'
                className='bg-inherit px-2 py-1 outline-none'
              />
            </div>
            <span className='text-xs' onClick={() => { navigator.clipboard.writeText("password123") }}>Test Password : <span className='hover:text-gray-600'>password123</span> </span>
          </div>


          {/* <!-- Login Button --> */}

          <button type="submit" className="block w-full bg-black text-white dark:bg-white dark:text-black mt-4 py-2 rounded-2xl  font-semibold mb-2">Login</button>
          <p className='text-sm'>Don't have an account?<span className="text-sm ml-2 hover:text-gray-600 cursor-pointer"><Link to={"/signup"}>Create your account</Link></span></p>

        </form>
      </div>
    </div>
  )
}
