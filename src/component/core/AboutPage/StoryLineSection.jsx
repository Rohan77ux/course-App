import React from 'react'
import InfoPra from './InfoPra';
import foundingStory from "../../../assets/Images/FoundingStory.png";
import Counting from './Counting';
function StoryLineSection() {
  return (
    <div>
        <div className='flex flex-col gap-[36px]'>
          <div className='w-full flex sm:flex-row justify-center items-center gap-[36px] flex-col sm:gap-[98px] min-h-[300px] px-4 sm:px-16 lg:px-0'>
            <div className='xl:w-[486px] lg:w-[900px] '>
              <InfoPra heading="Our Founding Story" para1={`Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.`}
                para2=" As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential."
                color="bg-gradient-to-br from-[#833AB4,#FD1D1D] to-[#FCB045]"></InfoPra>
            </div>
            <div className=' flex xl:flex justify-center items-center sm:hidden '>
              <img src={foundingStory} alt="" />
            </div>
          </div>
          <div className='lg:w-11/12  mx-auto xl:w-full  flex sm:flex-row justify-center items-center gap-[px] flex-col sm:gap-[98px] min-h-[300px] px-4 md:px-16 lg:px-0'>
            <div className='xl:w-[486px] lg:w-1/2 '>
              <InfoPra heading="Our Vision" para1="With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience." color="bg-gradient-to-br from-[#E65C00] to-[#F9D423]"
              ></InfoPra>
            </div>
            <div className='xl:w-[486px] lg:w-1/2'>
              <InfoPra heading="Our Mission"
                para1="our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities."
                color="bg-gradient-to-br from-[#1FA2FF,#12D8FA] to-[#A6FFCB]"></InfoPra>
            </div>
          </div>
          <div className='flex items-center justify-center min-h-[254px] flex-wrap bg-[#161D29] border-b-[1px] border-[#2C333F] max-sm:gap-10 max-sm:py-10'>
            <div className='flex justify-evenly flex-wrap gap-10'>
              <div className='flex justify-center'>
                  <Counting heading="5K" para="Active Students"></Counting>
              </div>
              <div>
              <Counting heading="10+" para="Mentors"></Counting>
              </div>
            </div>
            <div className='flex  justify-evenly  flex-wrap gap-10'>
              <div>
              <Counting heading="200+" para="Courses"></Counting>
              </div>
              <div>
              <Counting heading="50+" para="Awards"></Counting>
              </div>
            </div>

          </div>
        </div>

      </div>

  )
}

export default StoryLineSection
