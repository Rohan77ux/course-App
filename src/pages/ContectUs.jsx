import React from 'react'
import ContectUsFile from '../component/core/AboutPage/ContectUsFile'
import { IoMdChatbubbles } from "react-icons/io";
import { IoMdGlobe } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import Footer from '../component/comman/footer';
import ReviewSlider from '../component/comman/ReviewSlider';


function ContectUs() {


  const data = [
    {
      icon: <IoMdChatbubbles />,
      heading: "Chat on us",
      para1: "Our friendly team is here to help.",
      para2: "abcd@gmail.com",
    },
    {
      icon: <IoMdGlobe />,
      heading: "Visit us",
      para1: "Come and say hello at our office HQ.",
      para2: "Here is the location/ address"
    },

    {
      icon: <MdLocalPhone />,
      heading: "Call us",
      para1: "Mon - Fri From 8am to 5pm",
      para2: "+123 456 7890",
    }
  ]


  return (
    <div className='text-white mt-20'>
      <div className='text-[#F1F2FF]  mx-5 my-10 flex max-lg:flex-col items-center max-lg:items-center justify-center gap-6'>
        <div className=' min-500:w-[450px] h-[390px] bg-[#161D29] flex flex-col gap-[24px]'>
          {
            data.map((element, index) => (

              <div key={index} className='min-430:w-[400px] h-[98px] p-[12px] flex justify-start gap-1 '>
                <div className=' p-1'>{element.icon}</div>
                <div >
                  <p >{element.heading}</p>
                  <p>{element.para1}</p>
                  <p >{element.para2}</p>
                </div>
              </div>
            )

            )


          }


        </div>
        <div >
          <ContectUsFile />
        </div>

      </div>
      <div className='flex w-full items-center justify-center'>
        <ReviewSlider></ReviewSlider>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default ContectUs
