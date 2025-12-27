import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { getInstructorData } from '../../../../services/operations/profileAPI'
import InstructorChart from './InstructorChart'
import { Link } from 'react-router-dom'

const Instructor = () => {
    const { token, user } = useSelector((state) => state.auth)

    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        // ⛔ token ya role ready nahi
        if (!token) return
        if (user?.accountType !== "Instructor") return

        const getCourseDataWithStats = async () => {
            setLoading(true)

            const instructorApiData = await getInstructorData(token)
            const result = await fetchInstructorCourses(token)

            if (instructorApiData?.length) {
                setInstructorData(instructorApiData)
            }
            if (result) {
                setCourses(result)
            }

            setLoading(false)
        }

        getCourseDataWithStats()
    }, [token, user])   // 🔥 IMPORTANT

    const totalAmount = instructorData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    )
    const totalStudents = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    )

    return (
        <div className="text-white sm:px-6 py-8 w-full space-y-10">
            <div className="space-y-1 text-left">
                <h1 className="text-3xl font-bold text-yellow-400">
                    Hi {user?.firstName} 👋
                </h1>
                <p className="text-gray-400 text-sm">
                    Let’s start something new today
                </p>
            </div>

            <div className="w-full flex flex-wrap items-center justify-center space-y-10">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="loader border-t-4 border-yellow-400 border-solid rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                ) : courses.length > 0 ? (
                    <div className="space-y-12 xl:w-9/12 w-full">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 w-[900px]">
                            <InstructorChart courses={instructorData} />
                            <div className="flex flex-col items-center">
                                <div className="sm:p-6 rounded-2xl shadow-lg max-w-[550px]">
                                    <h2 className="text-xl font-semibold mb-6">📊 Statistics</h2>
                                    <div className="space-y-4">
                                        <StatCard label="Total Courses" value={courses.length} />
                                        <StatCard label="Total Students" value={totalStudents} />
                                        <StatCard label="Total Income" value={`₹ ${totalAmount}`} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 bg-richblack-700 rounded-xl p-4">
                            <div className="flex justify-between items-center border-b-2 border-richblack-900">
                                <p className="text-xl font-semibold">Your Courses</p>
                                <Link
                                    to="/dashboard/my-courses"
                                    className="text-yellow-100 text-sm hover:underline"
                                >
                                    View all
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.slice(0, 3).map((course) => (
                                    <div
                                        key={course._id}
                                        className="bg-pure-greys-900 rounded-xl overflow-hidden shadow-md transition hover:scale-[1.01]"
                                    >
                                        <img
                                            src={course.thumbnail}
                                            alt={course.courseName}
                                            className="h-60 w-full"
                                        />
                                        <div className="p-4 space-y-2">
                                            <p className="text-lg font-semibold truncate">
                                                {course.courseName}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <p>{course.studentsEnrolled.length} students</p>
                                                <span>|</span>
                                                <p>₹ {course.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-800 p-6 rounded-2xl text-center">
                        <p className="mb-4 text-lg">
                            🚫 You haven’t created any courses yet.
                        </p>
                        <Link
                            to="/dashboard/add-course"
                            className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300"
                        >
                            Create a Course
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

const StatCard = ({ label, value }) => (
    <div className="bg-gray-900 p-4 rounded-lg flex justify-between min-w-[350px] items-center">
        <p className="text-gray-300">{label}</p>
        <p className="text-lg font-bold text-richblack-100">{value}</p>
    </div>
)

export default Instructor
