import { toast } from "react-hot-toast"
import { setUserauth } from "../../Slices/authSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../api"
import { logout } from "./authAPI"
import { setUserprofile } from "../../Slices/profileSlice"
// import {  Navigate} from "react-router-dom"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints


export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
     // console.log( "UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUserauth(response.data.data))
      dispatch(setUserprofile(response.data.data))
    } catch (error) {
     // console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function updateProfile(token, formData,navigate) {
  //// console.log(formData)

  return async (dispatch) => {
    
    const toastId = toast.loading("Loading...");
    try {
      
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      //// console.log(formData)
     // console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const updatedUserDetails = response.data.profile;
     // console.log("updatedUserDetails:---", updatedUserDetails);
      if (!updatedUserDetails) {
        throw new Error("Updated user details are not available.");
      }

      const userImage = updatedUserDetails.image
        ? updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${updatedUserDetails.firstName}%20${updatedUserDetails.lastName}`;
      dispatch(
        setUserauth({ ...updatedUserDetails, image: userImage })
      );
      toast.success("Profile Updated Successfully");
      dispatch(logout(navigate));
      navigate("/login");
    } catch (error) {
     // console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}


export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...");
   // console.log("data",formData);
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
   // console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Changed Successfully");
  } catch (error) {
   // console.log("CHANGE_PASSWORD_API API ERROR............",error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
     // console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
     // console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}