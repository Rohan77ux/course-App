import React from 'react'
import CTAButton from './CTAButton'
import banner from '../../../assets/Images/banner.mp4'
import { Link } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';
import  HighlightText from './HighlightText'


function BannerSection() {
  return (
    <div className='flex items-center flex-col py-[12px] w-11/12 overflow-x-hidden'>
            <div className=" lg:w-[913px] md:h-[300px] lg:h-[276px] flex flex-col  sm:items-center min-550:items-left gap-[24px]  sm:gap-[38px]">
                <div className='w-fit rounded-full'>
                    <Link to="/signup">
                        <div className='text-center text-[16px] leading-[24px] px-[24px] py-[12px] gap-[8px] rounded-full bold bg-[#161D29] font-medium shadow-inner-custom hover:scale-95 transition-all duration-200 flex items-center text-[#999DAA]'>
                            Become an Instructor
                            <BiRightArrowAlt/>
                        </div>
                    </Link>
                </div>
                <div className='lg:w-[913px] md:h-[140px] h-auto lg:h-[108px] flex justify-between flex-col '>
                  <div className='max-430:text-[24px]  text-[30px] max-sm:h-[90px] md:h-[44px] md:text-[36px] leading-[44px] min-550:font-semibold md:text-center sm:text-left text-[#F1F2FF]'>Empower Your Future with <HighlightText text="Coding Skills"/></div>
                  <div className='md:w-full lg:h-[48px] md:text-[16px] md:leading-[24px] md:px-[30px] md:font-medium text-[#838894] md:text-center'>
                  With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                  </div>
                </div>
                <div className='max-500:w-[358] max-500:gap-[24px] justify-center w-[308px] h-[48px] min-550:justify-between max-550:gap-[24px] flex' >
                  <CTAButton active={true} linkto="/login">Learn More</CTAButton>
                  <CTAButton active={false} linkto="/signup">Book a Demo</CTAButton>
                </div>
            </div>
            
            <div className='pt-[40px] md:w-[85%] lg:w-[75%] xl:max-w-[65%]'>
              <div className=' relative pr-[10px]'>
                <video src={banner} loop muted autoPlay  alt="" className='md:shadow-drop-custom shadow-drop-custom1 z-10 sticky' />  
                <div className='blur-[68px] rounded-[70%] left-[55px] w-9/12 lg:w-10/12 h-[30%] sm:h-[295px] bg-gradient-to-br to-[#9CECFB,#65C7F7] from-[#0052D4] absolute top-6 z-[0]'></div>
              </div>
              
              
            </div>

        </div>
  )
}

export default BannerSection
