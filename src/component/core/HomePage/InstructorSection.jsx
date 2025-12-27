import React from 'react'
// import instructorImg from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { BiRightArrowAlt } from "react-icons/bi";
function InstructorSection() {
    return (
        <div className='py-[90px] w-full flex justify-center max-430:px-[12px] items-center'>

            <div className='xl:w-full lg:w-11/12 flex lg:flex-row flex-col-reverse max-lg:gap-[68px] gap-[24px] xl:gap-[98px] xl:py-[90px] xl:px-[120px]  justify-between xl:justify-center items-center'>

                <div className='block lg:hidden w-fit'>
                    <CTAButton active={true} linkto='/signup'>
                        <div className='flex items-center   '>
                            <p>Start Teaching Today</p>
                            <BiRightArrowAlt></BiRightArrowAlt>
                        </div>

                    </CTAButton>
                </div>

                <div className='sm:w-[616px] h-[545px] min-500:w-[478px] w-[350px] instructorImg sm:shadow-drop-custom-3 '>

                </div>

                <div className='min-550:w-[486px] text-center sm:text-left max-550:max-w-[358px] flex flex-col gap-3 my-auto h-[230px]    max-lg:h-[120px]'>
                    <div className='sm:text-[36px] text-[30px] max-430:text-[24px] min-550:leading-[44px] leading-[38px] lg:w-[200px] max-550:w-[200px] font-semibold'>
                        Become an <HighlightText text=" instructor" />
                    </div>
                    <div className='text-[16px] max-430:px-2 leading-[24px] font-medium text-[#838894] '>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </div>
                    <div className='lg:block hidden w-fit pt-[52px]'>
                        <CTAButton active={true} linkto='/signup'>
                            <div className='flex items-center   '>
                                <p>Start Teaching Today</p>
                                <BiRightArrowAlt></BiRightArrowAlt>
                            </div>



                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InstructorSection
