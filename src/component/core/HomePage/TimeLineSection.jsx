import React from 'react'
import CTAButton from './CTAButton'
import HighlightText from './HighlightText'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'

const timelinedata = [
  {
    logo:logo1,
    heading:"Leadership",
    subHeading:"Fully committed to the success company",
  },
  {
    logo:logo2,
    heading:"Responsibility",
    subHeading:"Students will always be our top priority",
  },
  {
    logo:logo3,
    heading:"Flexibility",
    subHeading:"The ability to switch is an important skills",
  },
  {
    logo:logo4,
    heading:"Solve the problem",
    subHeading:"Code your way to a solution",
  },
];

const tl2 = [
  {
    num:10,
    text:"YEARS EXPERIENCES"
  },
  {
    num:250,
    text:"TYPES OF COURSES"
  }
]


function TimeLineSection() {
  return (
    <div className='w-full h-auto pb-10 bg-[#F9F9F9] pt-[32px] flex flex-col xl:gap-[52px] '>
      <div className='xl:h-[144px] lg:h-[220px] xl:w-[1200px] gap-[24px] mx-auto xl:flex-row flex flex-col justify-center lg:items-center xl:items-start xl:justify-between'>
        <div className='w-11/12 mx-auto xl:w-[594px]'>
          <div className='text-[30px] leading-[38px] min-500:text-[36px] min-500:leading-[44px] font-semibold text-[#000814]'>
          Get the skills you need for a <HighlightText text=" job that is in"></HighlightText>
          <i><HighlightText text=" demand."></HighlightText></i>
          </div>
        </div>
        <div className='xl:w-[594px] w-10/12 mx-auto md:h-[130px] xl:h-full flex flex-col justify-between gap-[24px] lg:gap-[12px] min-430:text-center  items-start'>
          <div className='font-medium text-[16px] leading-[24px] xl:text-start text-[#2C333F]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
          <div className='w-fit'>
            <CTAButton active={true} linkto='/login'>Learn More</CTAButton>
          </div>
        </div>
      </div>
      <div className='xl:w-[1200px] xl:h-[660px] gap-[76px] sm:w-9/12 w-11/12 mx-auto mt-[80px] flex xl:flex-row flex-col items-center xl:items-start overflow-x-hidden justify-center xl:justify-between'>
        <div className='xl:w-[410px] xl:h-[432px] w-full  flex xl:flex-col flex-wrap xl:flex-nowrap  xl:mt-[70px]  lg:justify-evenly gap-[24px] xl:justify-between  max-lg:justify-center'>
            {timelinedata.map((item,index)=>(
              <div key={index} className='w-[372px] h-[84px] px-[12px] py-[16px] flex gap-[24px]'>
                  <div className='w-[52px] h-[52px] flex justify-center items-center p-[4px] rounded-[200px] bg-[#FFFFFF]'>
                    <img src={item.logo} alt="" />
                  </div>
                   <div className='xl:w-[310px] w-[260px] h-[50px] flex flex-col gap-[2px]'>
                    <p className='text-[#161D29] text-[18px] leading-[26px] font-semibold'>{item.heading}</p>
                    <p className='text-[#2C333F] text-[14px] leading-[22px] font-normal'>{item.subHeading}</p>
                  </div>
              </div>
            ))}
        </div>
        <div className='w-[714px] h-[545px] timeline-bg flex justify-center items-end'>
        <div className='w-[511px] max-550:w-[240px] h-[128px] max-550:h-[200px] gap-[52px] p-[42px] absolute translate-y-[50%] min-550:translate-y-[50%] flex max-550:flex-col bg-[#014A32]'>
          {tl2.map((tag,idx)=>(
            <div key={idx} className='flex gap-[24px]'>
                <div className='h-[44px] font-bold text-[36px] leading-[44px] text-white'>{tag.num}</div>
                <div className='h-[44px] font-medium text-[14px] text-[#05A77B] leading-[22px]'>{tag.text}</div>
            </div>
          ))}
          <div className="absolute left-[41%] top-[50%] border-[1px] border-[#037957] max-550:w-[130px] w-[44px] h-[1px] max-550:rotate-0 rotate-90">

          </div>
        </div>
        </div>
      </div>
      
    </div>
  )
}

export default TimeLineSection
