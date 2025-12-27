import React from 'react'
import { ImUsers ,ImTree } from "react-icons/im";
function Boxes({boxBorder,active,heading,subheading,tagleft,tagright}) {
  return (
    <div className={`h-[276px] lg:h-[300px] w-[341.33px] ${active ?' bg-white shadow-drop-custom-2': 'bg-[#161D29]'} `}>
        <div className="w-full h-[220px] lg:h-[244px] pt-[32px] pb-[52px] px-[24px] flex flex-col gap-[12px]">
            <div className={`${active?'text-[#161D29] ' : 'text-[#DBDDEA]'} text-[20px] font-semibold leading-[28px]`}>{heading}</div>
            <div className={`${active? "text-[#585D69] " : "text-[#6E727F]" } text-[16px] font-normal leading-[24px]`}>{subheading}</div>
        </div>
        <div className="w-full h-[56px] border-t-[1px] border-dashed border-[#C5C7D486] flex justify-between px-3">
            <div className={`${active?"text-[#0A5A72] ":"text-[#838894]"} font-medium leading-[24px] text-[16px] flex items-center gap-2`}><ImUsers />{tagleft}</div>
            <div className={`${active?"text-[#0A5A72] ":"text-[#838894]"} font-medium leading-[24px] text-[16px] flex items-center gap-2`}>{tagright}<ImTree/></div>
        </div>
    </div>
  )
}

export default Boxes;


