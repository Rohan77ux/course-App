import React, { useState } from 'react'

const CourseContent = ({ courseData }) => {
    const [activeSection, setActiveSection] = useState(0)

    return (
        <>
            {/* What You'll Learn Section */}
            <div className='bg-richblack-800 p-6 rounded-lg'>
                <h2 className='text-2xl font-bold text-richblack-5 mb-4'>What you'll learn</h2>
                <div className='space-y-3'>
                    {courseData?.data?.courseDetails?.whatYouWillLearn
                        ?.split(/\r?\n/)
                        .filter(line => line.trim() !== '')
                        .map((line, index) => (
                            <div key={index} className='flex items-start gap-2'>
                                <span className='text-yellow-50 mt-1'>✓</span>
                                <p className='text-richblack-100'>{line}</p>
                            </div>
                        ))}
                </div>
            </div>

            {/* Course Content Section */}
            <div className='bg-richblack-800 p-6 rounded-lg'>
                <h2 className='text-2xl font-bold text-richblack-5 mb-4'>Course Content</h2>
                <div className='space-y-4'>
                    {courseData?.data?.courseDetails?.courseContent?.map((section, sectionIndex) => (
                        <div key={section._id} className='border border-richblack-600 rounded-lg overflow-hidden'>
                            <button
                                className={`w-full p-4 text-left flex justify-between items-center ${activeSection === sectionIndex ? 'bg-richblack-700' : 'bg-richblack-800'}`}
                                onClick={() => setActiveSection(activeSection === sectionIndex ? -1 : sectionIndex)}
                            >
                                <div className='flex items-center gap-3'>
                                    <span className='text-richblack-25 font-medium'>
                                        Section {sectionIndex + 1}: {section.sectionName}
                                    </span>
                                    <span className='text-xs text-richblack-300 bg-richblack-600 px-2 py-1 rounded-full'>
                                        {section.subSection.length} lectures
                                    </span>
                                </div>
                                <svg
                                    className={`h-5 w-5 text-richblack-300 transform transition-transform ${activeSection === sectionIndex ? 'rotate-180' : ''}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {activeSection === sectionIndex && (
                                <div className='bg-richblack-900 p-4 space-y-3'>
                                    {section.subSection.map((lecture, lectureIndex) => (
                                        <div key={lecture._id} className='flex items-center gap-4 p-3 hover:bg-richblack-700 rounded-lg transition-colors'>
                                            <div className='flex items-center justify-center w-8 h-8 rounded-full bg-richblack-700 text-richblack-50 text-sm font-medium'>
                                                {lectureIndex + 1}
                                            </div>
                                            <div className='flex-1'>
                                                <h3 className='text-richblack-50 font-medium'>{lecture.title}</h3>
                                                <p className='text-richblack-300 text-sm'>{lecture.timeDuration}</p>
                                            </div>
                                            <button className='text-yellow-50 hover:text-yellow-100'>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Course Details */}
            <div className='bg-richblack-800 p-6 rounded-lg'>
                <h2 className='text-2xl font-bold text-richblack-5 mb-4'>Course Details</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <h3 className='text-lg font-semibold text-richblack-50 mb-2'>Category</h3>
                        <p className='text-richblack-100'>{courseData?.data?.courseDetails?.category?.name}</p>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold text-richblack-50 mb-2'>Price</h3>
                        <p className='text-richblack-100'>₹{courseData?.data?.courseDetails?.price}</p>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold text-richblack-50 mb-2'>Status</h3>
                        <p className='text-richblack-100 capitalize'>{courseData?.data?.courseDetails?.status?.toLowerCase()}</p>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold text-richblack-50 mb-2'>Tags</h3>
                        <div className='flex flex-wrap gap-2'>
                            {/* {console.log(courseData?.data?.courseDetails)} */}
                            {courseData?.data?.courseDetails?.tags?.map((tag, index) => (
                                <span key={index} className='bg-richblack-700 text-richblack-100 px-3 py-1 rounded-full text-sm'>
                                    {tag.replace(/[\[\]"]+/g, '')}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            {courseData?.data?.courseDetails?.instructions?.length > 0 && (
                <div className='bg-richblack-800 p-6 rounded-lg'>
                    <h2 className='text-2xl font-bold text-richblack-5 mb-4'>Instructions</h2>
                    <div className='space-y-3 text-richblack-100'>
                        {courseData?.data?.courseDetails?.instructions
                            .join('\n')
                            .replace(/[\[\]"]+/g, '')
                            .replace(/\\/g, '')
                            .split(/,/)
                            .filter(line => line.trim() !== '')
                            .map((line, index) => (
                                <div key={index} className='flex items-start gap-2'>
                                    <span className='text-yellow-50 mt-1'>•</span>
                                    <span>{line}</span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default CourseContent