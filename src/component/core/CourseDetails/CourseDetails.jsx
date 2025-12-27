import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { courseEndpoints } from '../../../services/api'
import { apiConnector } from '../../../services/apiconnector'
import { fetchCourseDetails } from '../../../services/operations/courseDetailsAPI'
import CourseHero from './CourseHero'
import CourseContent from './CourseContent'
import CourseSidebar from './CourseSidebar'





function CourseDetails() {
    const { courseId } = useParams()
    const [newCourseId, setNewCourseId] = useState("")
    const [courseData, setCourseData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [ConfirmationModal,setConfirmationModal] = useState(null);
    const getCourseDetails = async () => {
        setLoading(true)
        try {
            const res = await fetchCourseDetails(newCourseId)
            setCourseData(res)
        } catch (error) {
            console.log(error)
            
        } finally {
            setLoading(false)
        }
    }

    const getAllCourse = async () => {
        try {
            const res = await apiConnector("GET", courseEndpoints.GET_ALL_COURSE_API)
            const course_id = res?.data?.data?.find(ct => ct._id === courseId)?._id
            if (!course_id) {
                console.error("Course not found with ID:", courseId)
                return
            }
            setNewCourseId(course_id)
        } catch (error) {
            console.error("Failed to fetch courses:", error)
           
        }
    }

    useEffect(() => {
        getAllCourse()
    }, [courseId])

    useEffect(() => {
        if (newCourseId) {
            getCourseDetails()
        }
    }, [newCourseId])

    if (loading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    if (!courseData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <p className="text-2xl font-semibold text-richblack-100">
                    Course not found
                </p>
            </div>
        )
    }

    return (
        <div className='bg-richblack-900 text-richblack-5 min-h-screen relative mt-20'>
            <CourseHero courseData={courseData} />
            
            <div className='mx-auto w-11/12 max-w-maxContent py-8 flex flex-col lg:flex-row gap-10'>
                
                
                <div className='xl:w-1/4 md:absolute top-4 2xl:right-[10%] md:right-[5%]'>
                    <CourseSidebar courseData={courseData} ConfirmationModal={ConfirmationModal} setConfirmationModal={setConfirmationModal}/>
                </div>
                <div className='xl:w-2/3 space-y-6 md:w-2/4'>
                    <CourseContent courseData={courseData} />
                </div>
            </div>
        </div>
    )
}

export default CourseDetails












