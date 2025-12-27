import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import IconBtn from '../../comman/IconBtn'
import { IoMdAdd } from "react-icons/io"
import CoursesTable from './InstructorCourses/CoursesTable'

function MyCourses() {

  const { token, user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    // ⛔ token ya role ready nahi hai
    if (!token) return
    if (user?.accountType !== "Instructor") return

    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }

    fetchCourses()
  }, [token, user])   // 🔥 IMPORTANT

  return (
    <div className='w-full space-y-8'>
      <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <h1 className="text-2xl md:text-3xl font-bold text-richblack-5">
          My Courses
        </h1>
        <IconBtn
          text="Add Course"
          onClick={() => { navigate("/dashboard/add-course") }}
          active={true}
          customClasses="w-full md:w-fit"
        >
          <IoMdAdd className="text-lg" />
        </IconBtn>
      </div>

      {courses ? (
        <CoursesTable courses={courses} setCourses={setCourses} />
      ) : (
        <div className="grid place-items-center h-[calc(100vh-200px)]">
          <div className="h-12 w-12 border-4 border-richblack-200 border-t-richblack-50 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

export default MyCourses

