import axiosInstance from "../utils/apiFetch"

async function getUserById(id: string) {
  try {
    const response = await axiosInstance.get(`/user/${id}`)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

async function getAllUsers() {
  try {
    const response = await axiosInstance.get(`/user`)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export { getUserById, getAllUsers }
