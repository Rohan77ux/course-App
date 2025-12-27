import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import Course_Card from './Course_Card';

// Import required Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

function CourseSlider({ Courses }) {
  return (
    // ye pura code deepseek se style krwaya hai
    <div className="relative">
      {Courses?.length ? (
        <Swiper
          loop={true}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-custom-bullet',
            bulletActiveClass: 'swiper-custom-bullet-active',
          }}
          modules={[Pagination, Autoplay, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="pb-16" // Increased padding for pagination
        
          breakpoints={
            {
              1200:{slidesPerView:3},
              700:{slidesPerView:2},
              
            }
          }
          
        
        
        >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
          
          {/* Custom pagination container */}
          <div className="swiper-pagination !relative !mt-8 !bottom-0"></div>
          
          {/* Navigation buttons */}
          <div className="swiper-button-next !text-richblack-900 after:!text-xl"></div>
          <div className="swiper-button-prev !text-richblack-900 after:!text-xl"></div>
        </Swiper>
      ) : (
        <p className="text-center text-richblack-5">No Course Found</p>
      )}

      {/* Add these styles to your CSS file (App.css) */}
      <style jsx global>{`
        .swiper-custom-bullet {
          background: #9CA3AF; /* Inactive bullet color */
          opacity: 1;
          width: 10px;
          height: 10px;
          margin: 0 8px !important;
          transition: all 0.3s ease;
        }
        
        .swiper-custom-bullet-active {
          background: #F59E0B; /* Active bullet color */
          width: 12px;
          height: 12px;
          position: relative;
          top: 1px;
        }
        
        .swiper-button-next, 
        .swiper-button-prev {
          background-color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .swiper-button-next:hover, 
        .swiper-button-prev:hover {
          background-color: #F59E0B;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default CourseSlider;