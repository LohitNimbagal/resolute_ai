import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../appwrite/useAuth';
import authService from '../appwrite/auth';

export default function Header() {

  const { logout } = useAuth()

  function handleClick() {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      //add class=dark in html element
      document.documentElement.classList.add("dark");
    } else {
      //remove class=dark in html element
      document.documentElement.classList.remove("dark");
    }

    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
  }

  const handleLogout = () => {
    authService.logout().then(() => logout())
  }

  return (
    <div className='w-full h-20 bg-white border-b border-gray-200 dark:border-[#151518] dark:bg-black py-2 px-4 flex items-center justify-between'>
      <Link to={"/"}><h2 className='font-bold text-2xl'>Video Player</h2></Link>

      <div className='flex items-center gap-5'>
        <button onClick={handleClick} key={"dark"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={'20px'} height={"20px"}><path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"></path></svg>
        </button>

        <button className='py-1 px-2 border rounded' onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  )
}
