


import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/api'
import { FaStar } from 'react-icons/fa'

function ReviewSlider() {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;       


    useEffect(() => {
        const fetchAllReviews = async () => {
            const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
           // console.log("LOgging response in rating", data?.data?.highRatingReviews);

            if (data?.success) {
                setReviews(data?.data?.highRatingReviews);
            }

           // console.log("Printing Reviews", reviews);

        }
        fetchAllReviews();
    }, []);


    return (
        <div className='text-center w-9/12 mb-32 flex items-center justify-center flex-col '>
            <p className='sm:text-3xl  w-fit text-center p-4 shadow-richblack-400 shadow-xl'>Reviews from other learners</p>
            <div className='text-white mt-20 flex items-center justify-center'>

                <div className='h-[190px] max-w-maxContent'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={24}
                        loop={true}
                        freeMode={true}
                        autoplay={{
                            delay: 2500,
                        }}
                        modules={[FreeMode, Pagination, Autoplay]}
                        className='w-full '
                    >

                        {
                            reviews.map((review, index) => (
                                <SwiperSlide key={index} className='shadow-richblack-400 shadow-xl  p-3 rounded-xl  flex-wrap max-w-[370px] min-430:max-w-[410px] min-w-[270px]'>

                                    <div className='max-430:flex items-center justify-between gap-4 w-full'>
                                        <p className='p-2 max-430:text-[10px]'><b>{review?.user?.firstName} {review?.user?.lastName}</b></p>
                                        <img
                                            src={review?.user?.image
                                                ? review?.user?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                            alt='Profile Pic'
                                            className='h-12 w-12 object-cover rounded-full'
                                        />
                                        
                                    </div>
                                     <div className='flex items-center px-3'>
                                        <p>
                                            {review?.rating.toFixed(1)}
                                        </p>
                                        <div>
                                            <ReactStars
                                                count={5}
                                                value={review.rating}
                                                size={20}
                                                edit={false}
                                                activeColor="#ffd700"
                                                emptyIcon={<FaStar />}
                                                fullIcon={<FaStar />}
                                            />
                                        </div>
                                    </div>

                                    <p className='px-3 text-left text-xl'><b>{review?.course?.courseName}</b></p>
                                    <p className='px-3 text-left text-richblack-200'>
                                        {review?.review}
                                    </p>
                                   
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </div>
            </div>

        </div>
    )
}

export default ReviewSlider
