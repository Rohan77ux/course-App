import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import IconBtn from '../../comman/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue]);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white dark:bg-richblack-800 text-richblack-900 dark:text-white w-[90%] max-w-[500px] rounded-lg p-6 shadow-xl transition-all">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-richblack-200 dark:border-richblack-600 pb-2 mb-4">
          <p className="text-lg font-semibold">Add Review</p>
          <button
            onClick={() => setReviewModal(false)}
            className="text-xl font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div>
          {/* User Info */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user?.image}
              alt="user"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-sm text-richblack-300">Posting publicly</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={30}
              activeColor="#ffd700"
            />

            <div>
              <label
                htmlFor="courseExperience"
                className="font-medium block mb-1"
              >
                Add Your Experience<span className="text-red-500">*</span>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Write your experience here..."
                {...register("courseExperience", { required: true })}
                className="form-style w-full min-h-[130px] rounded-md border border-richblack-200 dark:border-richblack-600 bg-transparent p-3 text-sm"
              />
              {errors.courseExperience && (
                <span className="text-sm text-yellow-300">
                  Please add your experience
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="px-4 py-2 bg-richblack-100 dark:bg-richblack-700 text-richblack-900 dark:text-white rounded hover:bg-richblack-200 dark:hover:bg-richblack-600 transition"
              >
                Cancel
              </button>
              <IconBtn text="Save" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
