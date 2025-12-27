import React from 'react'
import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";
import CTAButton from './CTAButton';
import { BiRightArrowAlt } from "react-icons/bi";
// import bgHome from '../../../assets/Images/bghome.svg'

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];


function TagSection() {

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };


  return (
    <div className='flex items-center flex-col  w-full '>
      <div className='lg:px-[50px] max-sm:px-[20px] max-430:px-0 xl:px-[120px] lg:pt-[90px] flex flex-col gap-[98px] w-full'>
        <div className=' relative flex-col gap-[98px]  max-500:h-[1230px] max-sm:h-[1240px] sm:h-[916px] md:h-[880px] lg:h-[540px]  items-center justify-center'>
          <div className='pt-[20px] max-500:w-[350px] max-430:text-start w-full mx-auto h-auto'>
            <div className='min-430:text-4xl text-[24px] leading-[38px] font-semibold text-center max-430:text-start my-6'>Unlock the<HighlightText text={" Power of Code"} /></div>
            <p className="min-430:text-center text-left text-richblack-300 min-430:text-lg text-[16px] leading-[24px] min-500:font-medium mt-1">Learn to Build Anything You Can Imagine</p>
          </div>
          <div className='w-full flex justify-center'>
            <div className='max-500:overflow-x-scroll '>
              <div className='max-500:w-[720px] bg-richblack-800  min-500:flex-wrap w-[435px]   md:w-[720px] flex rounded-3xl md:rounded-full mt-[50px] justify-center md:justify-between py-[5px]'>

                 {tabsName.map((ele, index) => {
                return (
                  <div
                    className={` text-[16px] flex flex-row items-center gap-2 ${currentTab === ele ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} px-7 py-[12px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                    key={index}
                    onClick={() => setMyCards(ele)}>
                    {ele}
                  </div>
                );
              })}
              </div>
             
            </div>
          </div>
          <div className='flex flex-wrap lg:flex-nowrap gap-[40px] sm:gap-[20px] md:gap-[40px] absolute w-full translate-y-10 px-[10px] md:px-0 min-850:px-20 lg:px-0 justify-center pt-10'>
            {
              courses.map((ele, index) => {
                return (
                  <CourseCard
                    key={index}
                    cardData={ele}
                    currentCard={currentCard}
                    setCurrentCard={setCurrentCard}
                  />
                );
              })
            }
          </div>
        </div>

      </div>



      <div className=" bg-[#F9F9F9] w-full h-[250px] min-500:h-[280px] md:h-[320px] flex flex-col">
        <div className='bg_home flex justify-center items-center w-full h-[320px]'>
          <div className='gap-2 min-430:gap-4 flex pt-20'>
            <CTAButton active={true} linkto="/login">
              <div className='flex items-center gap-[8px]'>
                <p>Explore Full Catalog</p>
                <BiRightArrowAlt />
              </div>
            </CTAButton>


            <CTAButton active={false} linkto="/signup" >Learn More</CTAButton>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TagSection
