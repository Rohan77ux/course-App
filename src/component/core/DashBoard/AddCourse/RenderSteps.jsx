import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import PublishCourseForm from './PublishCourse/PublishCourseForm';

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <div className="w-full">
      {/* Stepper */}
      <div className="relative flex justify-between items-center mb-8">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center">
              {/* Step circle */}
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center 
                ${step > item.id ? "bg-yellow-50 border-yellow-50 text-richblack-900" : 
                  step === item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50" : 
                  "border-richblack-700 bg-richblack-800 text-richblack-300"} 
                transition-all duration-300`}>
                {step > item.id ? (
                  <FaCheck className="text-xs" />
                ) : (
                  item.id
                )}
              </div>
              {/* Step title */}
              <div className={`absolute mt-12 text-center w-32 
                ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}>
                {item.title}
              </div>
            </div>
            {/* Step connector (dashes) */}
            {index < steps.length - 1 && (
              <div className={`h-[2px] flex-1 mx-2 
                ${step > item.id ? "bg-yellow-50" : "bg-richblack-700"}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form sections */}
      <div className="mt-20">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourseForm />}
      </div>
    </div>
  );
};

export default RenderSteps;