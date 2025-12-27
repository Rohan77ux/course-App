import React from 'react'
import HighlightText from '../HomePage/HighlightText'
function HighlightPoint() {
  return (
    <div>
        <div className='w-full max-430:mt-6 px-4 min-h-[256px] border-b-[1px] flex justify-center items-center  border-[#2C333F]'>
          <header className="mx-auto md:text-center text-start  w-[1200px] h-[120px] font-bold text-xl sm:text-3xl lg:text-4xl flex justify-center items-center leading-[26px]">
            <div className=' text-[#AFB2BF] '>
              <i>"</i> We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text='combines technology' />,<HighlightText text=' expertise' color='text-[#FF512F]' /> , and community to create an <HighlightText text="unparalleled educational experience." color="text-[#F9D423]" /><i>"</i>
            </div>
          </header>
        </div>
      </div>

  )
}

export default HighlightPoint
