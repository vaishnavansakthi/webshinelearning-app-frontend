import axiosInstance from "../utils/apiFetch";


async function getUserAttendance(id: string) {   
    try {
        const response = await axiosInstance.get(`/attendance/${id}`)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

export {
    getUserAttendance
}