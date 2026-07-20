import React from 'react'

const SearchBar = () => {
  return (
    <div className='pt-5 h-[20%] flex flex-col gap-5 items-center justify pb-3'>
      <h2 className='self-start  text-white text-4xl  font-extrabold'>💬 Chat<span className="text-indigo-500">Box</span></h2>
      <div className="relative size-89">
          <input
              className="w-full rounded-xl bg-panel border border-border px-4 py-3 outline-none"
              placeholder="Search..."
          />
      </div>    
    </div>
  )
}

export default SearchBar
