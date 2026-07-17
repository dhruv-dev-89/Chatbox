import React from 'react'

const SearchBar = () => {
  return (
    <div className='mt-5 h-[15%] flex flex-col gap-5 items-center'>
        <h2 className='self-start ml-17 text-white text-4xl font-extrabold'>Chat App</h2>
        <input className='w-[70%] rounded-xl py-1 border-2 border-gray-400 text-gray-100 px-2' type="text"  placeholder='Search...'/>
    </div>
  )
}

export default SearchBar
