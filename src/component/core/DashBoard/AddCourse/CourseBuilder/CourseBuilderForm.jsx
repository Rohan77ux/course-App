


import React, { useState } from 'react'
import IconBtn from '../../../../comman/IconBtn';
import { useForm } from 'react-hook-form';
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineNavigateNext } from "react-icons/md";
import { setCourse, setStep } from '../../../../../Slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null); // Changed initial state to null
  const { course } = useSelector((state) => state.course) || {}; // Added fallback empty object
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth) || {};
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName, // Fixed typo: sectinId → sectionId
          courseId: course?._id, // Added optional chaining
        },
        token
      );
    } else {
      
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course?._id, // Added optional chaining
        },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const cancelEdit = () =>{
    setEditSectionName(null);
    setValue("sectionName","");
  }
  const goToBack = () =>{
    dispatch(setStep(1));
    dispatch(setEditSectionName(true));
  }
  const goToNext = () =>{
    if(course.courseContent.length===0){
      toast.error("Please add atleast one Section");
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId,sectionName) =>{
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }

  return (
    <div className="text-white">
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col space-y-2'>
          <label htmlFor='sectionName' className='text-sm text-richblack-5'>Section name <sup className="text-pink-200">*</sup></label>
          <input 
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName",{required:true})}
            className='form-style w-full bg-richblack-700 text-richblack-5 p-3 rounded-md border-b border-richblack-500 focus:outline-none focus:ring-1 focus:ring-richblack-200'
            />
            {errors.sectionName && (
              <span>Section Name is required.</span>
            )}
        </div>
        <div className='flex gap-2'>
          <IconBtn type="Submit" active="true" text={editSectionName ?"Edit Section Name" : "Create Section"} children={<IoMdAddCircleOutline/>}/>
          {editSectionName && (
            <button 
              type = 'button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline flex items-end'
            >
              Cancel Edit
            </button>
          )}
        </div>
        </div>
      </form>
          
      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3">
        <button onClick={goToBack} className='rounded-md cursor-pointer flex items-center'>
          Back
        </button>
        <IconBtn text="Next" onClick={goToNext}>
          <MdOutlineNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;