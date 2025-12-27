import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../Slices/courseSlice';
import RenderSteps from '../AddCourse/RenderSteps';

function EditCourse() {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetails();
    }, [courseId, token, dispatch]);

    if (loading) {
        return (
            <div className="grid h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className="text-richblack-5 w-full">
            {/* Header Section */}
            <div className="mx-auto w-full max-w-[1200px] px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-medium text-richblack-5">Edit Course</h1>
                    <p className="text-richblack-200 mt-2">
                        Edit and update your course details, sections, and lessons
                    </p>
                </div>

                {/* Course Content */}
                <div className="rounded-lg bg-richblack-800 p-6 shadow-[0px_2px_10px] shadow-richblack-600">
                    {course ? (
                        <RenderSteps />
                    ) : (
                        <div className="grid h-[400px] place-items-center">
                            <p className="text-xl font-medium text-richblack-100">
                                Course Not Found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditCourse