import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import RatingStars from "../../comman/RatingStars"
import GetAvgRating from "../../../utils/avgRating"

function Course_Card({ course, Height }) {


  // console.log("course cart", course)
  let avgReviewCount = GetAvgRating(course.ratingAndReviews);



  return (
    <div className="text-richblack-5 hover:scale-95 transition-all duration-200">
      <Link to={`/courses/${course._id}`} className="group">
        <div className="flex flex-col gap-3 rounded-lg overflow-hidden bg-richblack-800 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.6)] transition-shadow duration-200">

          {/* Thumbnail */}
          <div className="relative">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full object-cover rounded-t-lg`}
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-richblack-800 to-transparent" />
          </div>

          {/* Course Details */}
          <div className="p-4 flex flex-col gap-3">

            {/* Title */}
            <h3 className="font-medium text-lg line-clamp-2">
              {course?.courseName}
            </h3>

            {/* Instructor */}
            <p className="text-sm text-richblack-300">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-50 font-semibold">
                {avgReviewCount?.toFixed(1) || "0.0"}
              </span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={16} />
              <span className="text-richblack-300 text-sm">
                ({course?.ratingAndReviews?.length || 0} ratings)
              </span>
            </div>
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-yellow-50">
                ₹{course?.price}
              </span>
              {course?.originalPrice && (
                <span className="text-richblack-400 line-through text-sm">
                  ₹{course.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_Card
