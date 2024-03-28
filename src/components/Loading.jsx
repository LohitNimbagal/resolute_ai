import React from 'react'

export default function Loading() {
  return (
    <>
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full animate-pulse bg-black dark:bg-white"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-black dark:bg-white"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-black dark:bg-white"></div>
        </div>
      </div>
    </>
  )
}