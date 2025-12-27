import {  useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import { updateUser } from "../../../../services/operations/UserAPI" // Correct import path
import IconBtn from "../../../comman/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    //// console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      //// console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      //// console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData))
        .then((response) => {
          setLoading(false)
          dispatch(updateUser(response.data.user)) // Update the user data in the Redux store
        })
        .catch((error) => {
         // console.log("ERROR MESSAGE - ", error.message)
          setLoading(false)
        })
    } catch (error) {
     // console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center w-full justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 mx-auto min-430:p-4  text-richblack-5">
        <div className="flex gap-x-4">
          <img
            src={previewSource || user.image} // Prioritize previewSource over user.image
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[108px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <IconBtn
                active="true"
                text={loading ? "Uploading..." : ""}
                onClick={handleFileUpload}
                
              >
                {!loading && (<div className="flex items-center justify-center gap-1"><p>{loading ? "Uploading..." : "Upload"}</p><FiUpload className="text-lg text-richblack-900" /></div>
                  
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}