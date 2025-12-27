import React from 'react'

function PlateFormInfoBox({heading,para,active}) {
  return (
    <div className={`p-[32px] flex flex-col gap-8 hover:scale-[115%] duration-200 `}>
      <p className={`text-[18px] font-semibold leading-[26px] text-[#F1F2FF] ${active==="true" ? "w-[120px]" : "w-full"}`}>{heading}</p>
      <p className='text-[14px] font-normal leading-[22px] text-[#AFB2BF]'>{para}</p>
    </div>
  )
}

export default PlateFormInfoBox
