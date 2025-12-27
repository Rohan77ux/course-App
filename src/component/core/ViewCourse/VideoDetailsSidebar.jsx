import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../comman/IconBtn'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { AiOutlineStar } from 'react-icons/ai'
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { BsCheck2Circle } from 'react-icons/bs'

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const [expandedSections, setExpandedSections] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return
      
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )
      
      const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id
      
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
      setVideoBarActive(activeSubSectionId)
      
      if (currentSectionIndex !== -1) {
        setExpandedSections(prev => ({
          ...prev,
          [courseSectionData[currentSectionIndex]._id]: true
        }))
      }
    }
    setActiveFlags()
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId])

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="flex h-full w-[320px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
      {/* Header Section */}
      <div className="border-b-[1px] border-b-richblack-700 p-6">
        {/* Buttons */}
        <div className="flex justify-between items-center mb-6">
          <IconBtn 
            text="Back"
            active={true}
            onClick={() => navigate("/dashboard/enrolled-courses")}
            customClasses="flex items-center gap-x-2 bg-richblack-600 hover:bg-richblack-500"
          >
            <RiArrowGoBackLine className="text-lg" />
          </IconBtn>
          
          <IconBtn 
            text="Add Review"
            onClick={() => setReviewModal(true)}
            customClasses="flex items-center gap-x-2 bg-yellow-50 text-richblack-900 hover:bg-yellow-25"
          >
            <AiOutlineStar className="text-lg" />
          </IconBtn>
        </div>
        
        {/* Course Title and Progress */}
        <div>
          <h1 className="text-xl font-bold text-richblack-5 line-clamp-2">
            {courseEntireData?.courseName}
          </h1>
          <div className="mt-2 flex items-center gap-x-2">
            <span className="text-sm font-medium text-yellow-50">
              {completedLectures?.length} / {totalNoOfLectures}
            </span>
            <span className="text-xs text-richblack-400">lectures completed</span>
          </div>
          <div className="mt-2 h-1 w-full bg-richblack-600 rounded-full">
            <div 
              className="h-1 bg-yellow-50 rounded-full" 
              style={{ 
                width: `${(completedLectures?.length / totalNoOfLectures) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="h-[calc(100vh-10rem)] overflow-y-auto">
        {courseSectionData.map((course, index) => (
          <div 
            key={course._id} 
            className={`border-b border-richblack-700 last:border-b-0`}
          >
            {/* Section Header */}
            <div 
              className={`flex justify-between items-center p-4 cursor-pointer transition-all duration-200 ${
                activeStatus === course._id ? "bg-richblack-600" : "hover:bg-richblack-700"
              }`}
              onClick={() => {
                setActiveStatus(course._id)
                toggleSection(course._id)
              }}
            >
              <div className="flex items-center gap-x-3">
                <MdOutlineOndemandVideo className="text-lg text-richblack-300" />
                <h2 className="font-medium text-richblack-5">
                  {course.sectionName}
                </h2>
              </div>
              <div className="text-richblack-300">
                {expandedSections[course._id] ? (
                  <FiChevronUp className="text-lg" />
                ) : (
                  <FiChevronDown className="text-lg" />
                )}
              </div>
            </div>

            {/* SubSections */}
            <div className={`transition-all duration-300 overflow-hidden ${
              expandedSections[course._id] ? "max-h-[1000px]" : "max-h-0"
            }`}>
              {course.subSection.map((topic, i) => (
                <div
                  className={`flex items-start gap-3 p-3 pl-10 pr-4 cursor-pointer transition-all ${
                    videoBarActive === topic._id
                      ? "bg-yellow-50 text-richblack-900"
                      : "hover:bg-richblack-600"
                  }`}
                  key={topic._id}
                  onClick={() => {
                    navigate(
                      `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                    )
                    setVideoBarActive(topic._id)
                  }}
                >
                  <div className="mt-1">
                    {completedLectures.includes(topic._id) ? (
                      <BsCheck2Circle className="text-green-400 text-lg" />
                    ) : (
                      <div className="h-3 w-3 rounded-full border-2 border-richblack-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      videoBarActive === topic._id ? "font-semibold" : "text-richblack-5"
                    }`}>
                      {topic.title}
                    </p>
                    <div className="flex items-center gap-x-2 mt-1">
                      <span className="text-xs text-richblack-400">
                        {topic.timeDuration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoDetailsSidebar