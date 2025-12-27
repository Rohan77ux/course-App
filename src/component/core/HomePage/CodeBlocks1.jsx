

import React from 'react'
import CTAButton from './CTAButton'
// import HighlightText from './HighlightText'
import { BiRightArrowAlt } from "react-icons/bi";
// import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks1 = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) => {
    return (
        

        
        <div className={` w-full flex flex-col ${position} xl:justify-between 2xl:justify-center max-lg:items-center 2xl:gap-[60px] justify-between` } >

            <div className='w-[486px] h-[284px] max-550:w-[358px] max-550:h-[326px] flex flex-col gap-[12px] max-xl:mb-[32px] 2xl:mb-[32px]  '>
                <div className='sm:text-[36px] text-[30px] max-430:text-[24px] leading-[44px] font-semibold sm:text-left text-center'>
                    {heading}
                </div>
                <div className='text-[#838894] text-[16px] leading-[24px] font-medium pr-10 sm:text-left text-center'>
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
            <div className={`w-[460px]  2xl:w-[534px] h-[342px] max-550:w-[358px] max-550:h-[318px] flex lg:items-start items-center justify-start relative`} >
                <div className='absolute z-0 w-[470px] h-[278px] py-5 px-5'>
                    <div className={`w-[300px] h-[205px] ${backgroundGradient} blur-[68px] rounded-[100%]`}></div>
                </div>
                
                <div className='absolute lg:w-[403px] p-[6px] flex bg-[#3d3d3d50] border-[1px] border-[#ffffff38]'>
                    <div className='w-[3%] text-center flex flex-col text-richblack-400 font-inter font-bold leading-[25px]'>
                                        <p>1</p>
                                        <p>2</p>
                                        <p>3</p>
                                        <p>4</p>
                                        <p>5</p>
                                        <p>6</p>
                                        <p>7</p>
                                        <p>8</p>
                                        <p>9</p>
                                        <p>10</p>
                                        <p>11</p>
                                        
                    </div>  
                    <div className={`w-[87%] flex flex-col gap-2 font-bold font-mono ${codeColor} px-2 leading-[25px]`}>
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

        export default CodeBlocks1
        
        
        
