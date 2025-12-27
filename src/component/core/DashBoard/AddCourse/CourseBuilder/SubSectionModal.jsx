import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../Slices/courseSlice';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { ImCross } from "react-icons/im";
import Upload from './Upload';

function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  edit = false,
  view = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course); // Corrected this line
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, [modalData, setValue, view, edit]);

  const isFormUpdated = () => {
    const currentValues = getValues()
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true
    }
    return false
  }

  const handleEditSubsection = async () => {
    const currentValues = getValues()
    const formData = new FormData()
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    formData.append("title", currentValues.lectureTitle)
    formData.append("description", currentValues.lectureDesc)
    formData.append("video", currentValues.lectureVideo)
    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    }

    // Validate required fields
    if (!data.lectureTitle || !data.lectureDesc || !data.lectureVideo) {
      toast.error("Please fill all required fields");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);

    if (data.lectureVideo instanceof File) {
      formData.append("videoFile", data.lectureVideo);
    } else {
      toast.error("Please select a valid video file");
      return;
    }

    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm overflow-scroll">
      <div className="w-full max-w-[500px] rounded-lg bg-richblack-800 p-6 shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-richblack-600 pb-4">
          <h2 className="text-xl font-semibold text-richblack-5">
            {add && "Adding"} {edit && "Editing"} {view && "Viewing "}Subsection
          </h2>
          <button
            onClick={() => (!loading ? setModalData(null) : {})}
            className="text-richblack-400 hover:text-richblack-50 transition-all"
            disabled={loading}
          >
            <ImCross className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            required={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-richblack-50">
              Lecture Title <sup className="text-pink-200">*</sup>
            </label>
            <input
              {...register("lectureTitle", { required: true })}
              placeholder="Enter Lecture Title"
              className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600"
              disabled={view}
            />
            {errors.lectureTitle && (
              <span className="text-xs text-pink-200">Title is required</span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-richblack-50">
              Description <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              {...register("lectureDesc", { required: true })}
              placeholder="Enter Description"
              className="w-full min-h-[120px] rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600"
              disabled={view}
            />
            {errors.lectureDesc && (
              <span className="text-xs text-pink-200">Description is required</span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setModalData(null)}
                className="px-4 py-2 rounded-md bg-richblack-700 text-richblack-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-yellow-50 text-richblack-900 font-medium"
                disabled={loading}
              >
                {loading ? (edit ? "Updating..." : "Creating...") : (edit ? "Update" : "Create")} Subsection
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SubSectionModal;