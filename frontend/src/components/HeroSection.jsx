import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#146414] font-medium'>Find Your Next Big Opportunity</span>
        <h1 className='text-5xl font-bold'>Discover. Apply.  <br /> Launch Your <span className='text-[#219166]'>Career. </span></h1>
        <p>From discovering top career opportunities to applying effortlessly — whether you're a fresher or an experienced pro.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input 
            type="text"
            placeholder='Find your dream jobs'
            className='outline-none border-none w-full' 
            />
            <Button className="rounded-r-full bg-[#147c2b]">
                <Search className="h-5 w-5" />
            </Button>
        </div>
        </div>
    </div>
  )
}

export default HeroSection