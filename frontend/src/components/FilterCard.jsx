import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData= [
    {
        filterType:"location",
        array:["Delhi NCR","Bangalore","Hyderabad","Pune","Mumbai"]
    },
    {
        filterType:"Industry",
        array:["FrontEnd Developer","BackEnd Developer","Full Stack Developer","Graphic Designer","Data Science"]
    },
    {
        filterType:"Salary",
        array:["0-40k","40k-1lakh","1lakh to 5lakh"]
    },
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup>
            {
                filterData.map((data,index)=>(
                    <div>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item,index)=>{
                                return(
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item}/>
                                        <Label>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCard