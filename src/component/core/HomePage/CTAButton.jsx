import React from 'react'
import { Link } from 'react-router-dom';

const CTAButton=({children,active,linkto})=>{
    return (
        <Link to={linkto}>
            <div className={`text-center text-[16px] leading-[24px] px-[12px] min-430:px-[24px] py-[12px] gap-[8px] rounded-[8px] bold ${active ? "bg-[#FFD60A] text-black font-medium": "bg-richblack-800 font-medium "} shadow-inner-custom hover:scale-95 transition-all duration-200`}>
                {children}
            </div>
        </Link>
    )
}

export default CTAButton;
