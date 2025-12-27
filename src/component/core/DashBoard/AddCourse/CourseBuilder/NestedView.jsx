import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiDownArrow } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import SubSectionModal from './SubSectionModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../Slices/courseSlice'
import ConfirmationModal from '../../../../comman/ConfirmationModal'

const NestedView = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null)

    const handleDeleteSection = async (sectionId) => {

        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token
        })
        if (result) {
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId, token })
        if (result) {
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }

            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null)
    }

    return (
        <div>
            <div className='rounded-lg bg-richblack-700 p-6 px-8'>
                {course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        <summary className='flex items-center justify-between gap-x-3 border-b-2 border-richblack-600 pb-2'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu className="text-richblack-200" />
                                <p className="text-richblack-5">{section.sectionName}</p>
                            </div>
                            <div className='flex items-center gap-x-3'>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleChangeEditSectionName(section._id, section.sectionName)
                                    }}
                                    className="text-richblack-300 hover:text-yellow-50 transition-all"
                                >
                                    <MdEdit />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })
                                    }}
                                    className="text-richblack-300 hover:text-pink-500 transition-all"
                                >
                                    <RiDeleteBin6Line />
                                </button>
                                <span className="text-richblack-300">|</span>
                                <BiDownArrow className={`text-xl text-richblack-300`} />
                            </div>
                        </summary>

                        <div className="ml-6 mt-4">
                            {section?.subSection?.map((data) => (
                                <div
                                    key={data?._id}
                                    className="flex items-center justify-between gap-x-3 py-2 border-b border-richblack-600"
                                >
                                    <div
                                        className="flex items-center gap-x-3 cursor-pointer"
                                        onClick={() => setViewSubSection(data)}
                                    >
                                        <RxDropdownMenu className="text-richblack-200" />
                                        <p className="text-richblack-50">{data.title}</p>
                                    </div>

                                    <div className="flex items-center gap-x-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setEditSubSection({ ...data, sectionId: section._id })
                                            }}
                                            className="text-richblack-300 hover:text-yellow-50 transition-all"
                                        >
                                            <MdEdit />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setConfirmationModal({
                                                    text1: "Delete this Lecture",
                                                    text2: "Selected lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })
                                            }}
                                            className="text-richblack-300 hover:text-pink-500 transition-all"
                                        >
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className="mt-4 flex items-center gap-x-2 text-yellow-50 hover:text-yellow-100 transition-all"
                            >
                                <AiOutlinePlus />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>

            {/* Modals */}
            {addSubSection && (
                <SubSectionModal
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true}
                />
            )}
            {viewSubSection && (
                <SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />
            )}
            {editSubSection && (
                <SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />
            )}
            {confirmationModal && (
                <ConfirmationModal modalData={confirmationModal} />
            )}
        </div>
    )
}

export default NestedView