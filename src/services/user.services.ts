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

export { getUserById }
