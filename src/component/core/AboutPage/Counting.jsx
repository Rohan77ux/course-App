import React from 'react'

function Counting({heading,para}){
  return (
    <div className='w-[293px] h-[74px] flex flex-col gap-[12px] items-center hover:scale-[115%] duration-200 '>
      <h1 className='text-[#F1F2FF] font-bold text-[30px] leading-9'>{heading}</h1>
      <p className='text-[#585D69] font-semibold text-4 leading-6 hover:border-b-[2px] border-[#585D69]' >{para}</p>
    </div>
  )
}

export default Counting;
