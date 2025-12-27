import React from 'react'
import CTAButton from './CTAButton'
// import HighlightText from './HighlightText'
import { BiRightArrowAlt } from "react-icons/bi";
// import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) => {
    return (
        

        
        <div className={` w-full flex flex-col ${position} xl:justify-between 2xl:justify-center max-lg:items-center 2xl:gap-[60px] justify-between` } >

            <div className='w-[486px] h-[284px] max-430:px-2 max-550:w-[358px] max-550:h-[326px] flex flex-col gap-[12px] max-xl:mb-[32px] 2xl:mb-[32px]  '>
                <div className='max-430:text-[24px] text-[30px] sm:text-[36px] leading-[44px] font-semibold'>
                    {heading}
                </div>
                <div className='text-[#838894] text-[16px] leading-[24px] font-medium pr-10'>
                    {subheading}
                </div>
                <div className='flex justify-center gap-[24px] pt-[18px] sm:pt-[32px]'>

                    <CTAButton linkto={ctabtn1.linkto} active={ctabtn1.active}>
                        <div className='flex items-center gap-[8px]'>
                            {ctabtn1.btnText}
                            <BiRightArrowAlt />
                        </div>
                    </CTAButton>
                    <CTAButton linkto={ctabtn2.linkto} active={ctabtn2.active}>{ctabtn2.btnText}</CTAButton>
                </div>
            </div>
            <div className={`w-[460px] 2xl:w-[534px] h-[342px] max-550:w-[358px] max-550:h-[318px] flex lg:items-start items-center ${position==="lg:flex-row-reverse" ? "justufy-left":"justify-center "}relative`} >
                <div className='absolute z-0 w-[470px] h-[278px] py-5 px-5'>
                    <div className={`w-[300px] h-[205px] ${backgroundGradient} blur-[68px] rounded-[100%]`}></div>
                </div>
                
                <div className='absolute z-10 lg:w-[380px] pr-[8px] flex bg-[#3d3d3d50] border-[1px] border-[#ffffff38]'>
                    
                    <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} px-2 leading-[25px]`}>
                        <TypeAnimation
                            sequence={[codeblock, 5000, ""]}
                            repeat={Infinity}
                            omitDeletionAnimation="true"
                            cursor={true}
                            style={
                                {
                                    whiteSpace: "pre-line",
                                    display: "block"
                                }
                            }

                        />
                    </div>
                </div>

            </div>


        </div>
    )
}

export default CodeBlocks

