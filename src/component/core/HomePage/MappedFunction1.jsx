import React from 'react'
import {Link} from "react-router-dom"
function mappedFunction1({resources}) {
    
  return (
    <div className='flex flex-col gap-[8px]'>
      {
        resources.map((item,idx)=>{
            return (
                <div key={idx}  className='text-[14px] leading-[22px] font-normal text-[#6E727F] cursor-pointer hover:text-[#AFB2BF]'>
                    <Link to={item.split(" ").join("-").toLocaleLowerCase()}>{item}</Link>
                </div>
            )
        })
      }





    </div>
  )
}

export default mappedFunction1



