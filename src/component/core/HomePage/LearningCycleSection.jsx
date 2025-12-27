import React from 'react'
import HighlightText from './HighlightText'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compair_with_other from '../../../assets/Images/Compare_with_others.png'
import CTAButton from './CTAButton'

function LearningCycleSection() {
    return (
        <div className='w-full flex flex-col gap-[52px] max-xl:pt-[90px] items-center bg-[#F9F9F9]'>
            <div className="h-[230px] max-550:w-11/12 w-11/12 md:h-[120px] md:w-10/12  text-[#000814] flex  flex-col items-center justify-evenly md:justify-between">
                <div className=' max-550:w-full w-[540px] max-550:text-start md:w-[750px] max-430:text-[24px] text-[30px] h-[44px] sm:text-[36px] leading-[38px]  min-550:leading-[44px] text-center font-semibold'>Your swiss knife for <HighlightText text=" learning any language"></HighlightText></div>
                <div className=' max-550:text-start md:w-[710px] min-550:h-[48px] text-[16px] leading-[24px] font-medium text-[#2C333F] text-center'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>
            </div>
            <div className=" relative lg:w-[1102.49px] h-[468.97px] max-md:h-[900px] w-11/12 flex max-md:flex-col md:justify-evenly lg:justify-center items-center">
            <div className='w-[341px] h-[340px] lg:absolute max-md:absolute max-md:top-0   lg:right-24 '>
                    <img src={Know_your_progress} alt="" />
               </div>
               <div className='w-[341px] h-[408px] max-md:top-[270px] max-md:absolute lg:absolute'>
                    <img src={Compair_with_other} alt="" />
               </div>
               <div className='w-[341px] max-md:block hidden max-md:top-[550px] lg:block h-[346px] max-md:absolute lg:absolute lg:left-32'>
                    <img src={Plan_your_lessons} alt="" />
               </div>
               
            </div>
            <div className="w-10/12 xl:w-[1200px] flex justify-center items-start h-[84px]">
                <div className='w-fit'> 
                <CTAButton active={true} linkto="/login">Learn More</CTAButton>
                </div>
            </div>
        </div>
    )
}

export default LearningCycleSection;
