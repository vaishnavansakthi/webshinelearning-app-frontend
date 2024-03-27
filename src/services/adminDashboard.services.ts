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

async function getUserData(id: string) {
  try {
    const response = await axiosInstance.get(`/user/${id}`)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

async function activateUser(id: string, data: any) {
  try {
    const response = await axiosInstance.put(`/auth/activate/${id}`, data)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}


export {
    getAllUserData,
    getUserData,
    activateUser
}