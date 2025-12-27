import React from 'react'
import PlateFormInfoBox from '../component/core/AboutPage/PlateFormInfoBox'
import HighlightText from '../component/core/HomePage/HighlightText'
import CTAButton from '../component/core/HomePage/CTAButton'
function PlateFormInfo() {




    return (
        <div className='flex items-center xl:py-[90px] py-[50px] justify-center min-h-[254px] flex-wrap  max-sm:py-10 mt-20'>
            <div className='xl:w-[1200px]  flex-wrap max-sm:gap-10 sm:px-[50px] xl:px-0 h-full flex justify-between items-center'>

                <div className='flex sm:w-[600px] px-4 max-430:pb-10  justify-evenly flex-wrap'>
                    <div className=' flex flex-col h-[268px] justify-start gap-3'>
                        <div className='text-4xl font-semibold'>
                            World-Class Learning for <HighlightText text="Anyone, Anywhere"></HighlightText>
                        </div>
                        <p className='text-[16px] leading-[24px] font-medium text-[#838894]' >
                            Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.
                        </p>
                        <div className='w-fit mt-6'>
                            <CTAButton active='true' linkto='/'>Learn More</CTAButton>

                        </div>

                    </div> 
                </div>



                <div className='flex justify-center sm:w-[600px] z-20   max-sm:mx-[20px] flex-wrap'>
                    <div className='w-[300px] bg-[#2C333F] h-[268px] hover:border-l-[2px] hover:border-t-[2px] border-[#ff00f0] sm:hover:border-b-[2px] xl:hover:border-b-0 max-sm:hover:border-r-[2px]' >
                        <PlateFormInfoBox heading="Curriculum Based on Industry Needs" active='false' para="Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."></PlateFormInfoBox>
                    </div>
                    <div className='w-[300px] bg-[#161D29] h-[268px] hover:border-r-[2px] max-sm:hover:border-l-[2px] sm:hover:border-t-[2px] border-[#ff00f0]' >
                        <PlateFormInfoBox heading="Our Learning Methods" active="true" para="The learning process uses the namely online and offline."></PlateFormInfoBox>
                    </div>
                </div>

            </div>
            <div className='flex justify-end w-[1200px]'>
                <div className='  flex justify-center items-center  flex-wrap'>

                    <div className='flex z-10 justify-end sm:w-[600px] max-sm:mx-[20px] -translate-y-[2px] flex-wrap'>
                        <div className='w-[300px]  hidden'>

                        </div>
                        <div className='w-[300px] bg-[#2C333F] lg:translate-x-[2px] h-[268px] xl:hover:border-b-[2px] hover:hover:border-l-[2px] border-[#ff00f0] max-xl:hover:border-r-[2px] hover:border-t-[2px]' >
                            <PlateFormInfoBox heading="Certification" active="false" para="You will get a certificate that can be used as a certification during job hunting."></PlateFormInfoBox>
                        </div>
                    </div>
                    <div className='flex justify-center sm:w-[600px] z-0 max-sm:mx-[20px]  -translate-y-[2px] flex-wrap'>
                        <div className='w-[300px] bg-[#161D29] h-[268px] sm:hover:border-b-[2px] max-xl:hover:border-t-[2px] max-sm:hover:border-t-0 max-xl:hover:border-l-[2px] max-sm:hover:border-r-[2px] border-[#ff00f0]' >
                            <PlateFormInfoBox heading={`Rating "Auto-grading"`} active='true' para="You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."></PlateFormInfoBox>
                        </div>
                        <div className='w-[300px] bg-[#2C333F] h-[268px] hover:border-r-[2px] max-sm:hover:border-l-[2px] hover:border-b-[2px] border-[#ff00f0]' >
                            <PlateFormInfoBox heading="Ready to Work" active="false" para="Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."></PlateFormInfoBox>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default PlateFormInfo
