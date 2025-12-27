import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from '../Slices/viewCourseSlice'
import VideoDetailsSidebar from '../component/core/ViewCourse/VideoDetailsSidebar'
import CourseReviewModal from '../component/core/ViewCourse/CourseReviewModal'

function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false)
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    }

    setCourseSpecificDetails()
  }, [])

  return (
    <div className="relative mt-20 flex min-h-[calc(100vh-3.5rem)] bg-richblack-900">
      {/* Sidebar */}
      <div className="hidden md:block w-[320px] h-full flex-shrink-0 border-r border-r-richblack-700">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
      </div>

      {/* Mobile Sidebar Toggle (if needed) */}
      {/* You can add a mobile menu toggle button here */}

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-8">
          <Outlet />
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  )
}

export default ViewCourse