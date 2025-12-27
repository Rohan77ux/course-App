import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CTAButton from '../../../HomePage/CTAButton'
import { resetCourseState, setStep } from '../../../../../Slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

function PublishCourseForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2));
  }

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    if ((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
      goToCourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }
    setLoading(false);
  }

  

  const onSubmit = () => {
    handleCoursePublish();
  }

  return (
    <div className='rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
      <h2 className='text-2xl font-semibold text-richblack-5 mb-6'>Publish Course</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='flex items-center gap-x-4'>
          <label htmlFor="public" className='flex items-center gap-2 cursor-pointer'>
            <input
              type="checkbox"
              id='public'
              {...register("public")}
              className='rounded h-5 w-5 border-richblack-300 bg-richblack-700 text-yellow-50 focus:ring-yellow-50 focus:ring-offset-richblack-800'
            />
            <span className='text-richblack-5 font-medium'>
              Make this course public
            </span>
          </label>
        </div>

        <div className='flex justify-end gap-4 pt-6 border-t border-richblack-700'>
          <button
            disabled={loading}
            onClick={goBack}
            className='flex items-center justify-center rounded-md bg-richblack-700 px-4 py-2 text-richblack-50 hover:bg-richblack-600 transition-all duration-200 disabled:opacity-50'
          >
            Back
          </button>
          
          <button
            type='submit'
            disabled={loading}
            className='flex items-center justify-center rounded-md bg-yellow-50 px-4 py-2 text-richblack-900 font-medium hover:bg-yellow-25 transition-all duration-200 disabled:opacity-50'
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PublishCourseForm