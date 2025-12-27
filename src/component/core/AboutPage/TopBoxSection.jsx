import React from 'react'
import HighlightText from "../HomePage/HighlightText";
import box1 from '../../../assets/Images/aboutus1.webp';
import box2 from '../../../assets/Images/aboutus2.webp';
import box3 from '../../../assets/Images/aboutus3.webp';


function TopBoxSection() {
  return (
    <section className="bg-[#161D29] flex flex-col  px-4 justify-center items-center ">
<div>
          <header className="mx-auto text-center  max-w-[900px] h-[120px] font-bold text-3xl sm:text-4xl flex justify-center max-550:items-center items-end mt-10 leading-tight">
            <div className='text-start sm:text-center'>
              Driving Innovation in Online Education for a{' '}
              <HighlightText text="Brighter Future" color="text-[#12D8FA]" />
            </div>
          </header>
          {/* Subtext */}
          <p className="flex items-center font-medium text-[15.5px] text-start min-550:text-center max-w-[850px] mx-auto text-[#838894] max-500:h-[120px] min-500:h-[100px] min-550:h-[80px] leading-[20px]">
            Studynotion is at the forefront of driving innovation in online education.
            We're passionate about creating a brighter future by offering cutting-edge
            courses, leveraging emerging technologies, and nurturing a vibrant learning
            community.
          </p>
        </div>

        <div className='flex translate-y-12 flex-wrap justify-center gap-[24px] xl:w-[1201px] w-11/12'>
          <div className='flex z-10 flex-wrap justify-center gap-[24px] xl:w-[1201px] w-11/12'>
            <img src={box1} alt="absolute1" className='hidden xl:block' /><img src={box2} alt='absolute2' /><img src={box3} alt="absolute3" className='hidden lg:block' />
          </div>
          <div className='left-0 hidden xl:block absolute z-0 bg-gradient-to-b to-[#E65C00] from-[#F9D423] h-[40px]  w-[300px] min-550:w-[368px] blur-[68px]'></div>
          <div className='absolute  z-0 bg-gradient-to-b to-[#E65C00] from-[#F9D423] h-[40px]  w-[300px] min-550:w-[368px] blur-[68px]'></div>
          <div className='absolute hidden xl:block xl:right-0 z-0 bg-gradient-to-b to-[#E65C00] from-[#F9D423] h-[40px] w-[300px] min-550:w-[368px] blur-[68px]'></div>

        </div>

    </section>
    
  )
}

export default TopBoxSection
