import React, { useEffect, useState } from 'react'
import { FaFileCircleCheck } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../../../services/operations/studentFeaturesAPI';
import { ACCOUNT_TYPE } from '../../../utils/constants'
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import { addToCart } from '../../../Slices/cartSlice';
import ConfirmationModal from '../../comman/ConfirmationModal';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
const CourseSidebar = ({ courseData }) => {
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState(null)
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { courseId } = useParams();


    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "you are not logged in",
            text2: "Please login to add to cart",
            btn1Text: "login",
            btn2Text: "cancel",
            btn1Handler: () => navigate('/login'),
            btn2Handler: () => setConfirmationModal(null),
        })
    }


    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("you are an Instructor, you cant buy a course");
            return;
        }
        if (token) {
            // console.log("courseData:-", courseData?.data?.courseDetails);
            dispatch(addToCart(courseData?.data));
            return;
        }
        setConfirmationModal({
            text1: "you are not logged in",
            text2: "Please login to add to cart",
            btn1Text: "login",
            btn2Text: "cancel",
            btn1Handler: () => navigate('/login'),
            btn2Handler: () => setConfirmationModal(null),
        })
    }
    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }

    // Calculate total duration
   const calculateTotalDuration = () => {
    if (!courseData?.data?.courseDetails?.courseContent) return "0 seconds"
    console.log("courseData?.data?.courseDetails?.courseContent :- ",courseData?.data?.courseDetails?.courseContent);
    let totalSeconds = 0

    courseData.data.courseDetails.courseContent.forEach(section => {
        section.subSection.forEach(sub => {
            const [minutes, seconds] = sub.timeDuration.split(":").map(Number)
            totalSeconds += (minutes * 60) + seconds
        })
    })

    console.log("ts:-",totalSeconds)

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const hourPart = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''
    const minutePart = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : ''
    const secondPart = seconds > 0 ? `${seconds} second${seconds > 1 ? 's' : ''}` : ''

    const formatted = [hourPart, minutePart, secondPart].filter(Boolean).join(' ')

    return formatted || '0 seconds'
}







    const getEnrolledCourses = async () => {
        if (token) {
            try {
                const res = await getUserEnrolledCourses(token);
                setEnrolledCourses(res);
            } catch (error) {
                console.log("Could not fetch enrolled courses.")
            }
        }
        
    }
    useEffect(() => {
        getEnrolledCourses();
    }, [])

    // console.log("eccc:-", enrolledCourses);
    // console.log("CDccc:-", courseData);

    const isCourseAlreadyEnrolled = () => {
        if (!enrolledCourses || !courseData?.data?.courseDetails?._id) return false;
        if (enrolledCourses.some(course => course._id === courseData?.data?.courseDetails?._id)) return true;
        else return false;
    };


    return (
        <div className='bg-richblack-800 p-6 rounded-lg sticky top-4 '>
            {/* Course Thumbnail */}
            <img
                src={courseData?.data?.courseDetails?.thumbnail}
                alt={courseData?.data?.courseDetails?.courseName}
                className='w-full h-48 object-cover rounded-lg mb-4'
            />

            {/* Price */}
            <div className='text-3xl font-bold mb-4'>
                ₹ {courseData?.data?.courseDetails?.price}
            </div>

            {/* Buttons */}
            {!isCourseAlreadyEnrolled() && (
                <div className='space-y-3 mb-6'>
                    <button onClick={() => handleBuyCourse()} className='w-full bg-yellow-50 text-richblack-900  py-2 rounded-lg font-semibold hover:bg-yellow-25 transition-all duration-200'>
                        Buy now
                    </button>
                    <button onClick={handleAddToCart} className='w-full bg-richblack-700 text-richblack-5 py-2 rounded-lg font-semibold hover:bg-richblack-600 transition-all duration-200'>
                        Add to Cart
                    </button>
                </div>

            )}
            {isCourseAlreadyEnrolled() && (
                <div className='space-y-3 mb-6'>
                    <button onClick={() => {
                        navigate(
                            `/view-course/${courseData?.data?.courseDetails?._id}/section/${courseData?.data?.courseDetails?.courseContent?.[0]?._id}/sub-section/${courseData?.data?.courseDetails?.courseContent?.[0]?.subSection?.[0]?._id}`
                        )
                    }} className='w-full bg-yellow-50 text-richblack-900 py-2 rounded-lg font-semibold hover:bg-yellow-25 transition-all duration-200'>
                        View Course
                    </button>

                </div>

            )}

            {/* Guarantee */}
            <div className='text-center text-richblack-200 mb-6'>
                30-Day Money-Back Guarantee
            </div>

            {/* Course Includes */}
            <div>
                <h3 className='font-semibold mb-3'>This course includes:</h3>
                <ul className='space-y-2'>
                    <li className='flex items-center gap-2'>
                        <span>✓</span>
                        <span>{calculateTotalDuration()} on-demand video</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <span><FaFileCircleCheck /></span>
                        <span>Certificate of completion</span>
                    </li>
                </ul>
            </div>

            {/* Share Button */}
            <button onClick={handleShare} className='w-full mt-6 text-yellow-50 font-semibold py-2 rounded-lg border border-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 transition-all duration-200'>
                Share
            </button>




            {confirmationModal && (<ConfirmationModal modalData={confirmationModal} />)}

        </div>


    )


}

export default CourseSidebar;