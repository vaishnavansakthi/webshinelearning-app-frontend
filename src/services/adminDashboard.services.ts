import axiosInstance from "../utils/apiFetch"

async function getAllUserData() {
  try {
    const response = await axiosInstance.get("/user")
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}


export {
    getAllUserData
}