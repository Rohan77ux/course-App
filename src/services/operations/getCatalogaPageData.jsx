import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import { catalogData } from '../api'

async function getCatalogaPageData(categoryId) {
  const toastId = toast.loading("Loading.....")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId }
    )

    if (!response?.data?.success) {
      throw new Error("Could not Fetch Category page data")
    }

    // 🔥 MAIN FIX
    result = response.data.data
  } catch (error) {
    console.log("CATALOG page DATA API ERROR:", error)
    result = null
  }

  toast.dismiss(toastId)
  return result
}

export default getCatalogaPageData

