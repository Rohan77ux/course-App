import React from 'react'

function InfoPra(props) {
  return (
   
      <div className='flex flex-col gap-4'>
        <div className="text-2xl min-550:text-4xl font-extrabold">
          <span className={`bg-clip-text text-transparent ${props.color}`}>
            {props.heading}
          </span>
        </div>
        <div className='text-[#838894] text-4 leading-6 font-medium '>
          {props?.para1} <br /><br /> {props?.para2}
        </div>
      </div>
    

  )
}

export default InfoPra
