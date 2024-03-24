import axiosInstance from "../utils/apiFetch";

async function markAttendance(id: string, data: any) {   
  try {
      const response = await axiosInstance.post(`/attendance/${id}/mark`, data)
      return response
    } catch (error) {
      console.error("Error fetching data:", error)
      throw error
    }
}

async function getUserAttendance(id: string) {   
    try {
        const response = await axiosInstance.get(`/attendance/${id}`)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function deleteUserAttendance(id: string) {   
  try {
      const response = await axiosInstance.delete(`/attendance/${id}`)
      return response
    } catch (error) {
      console.error("Error fetching data:", error)
      throw error
    }
}


export {
    getUserAttendance,
    markAttendance,
    deleteUserAttendance
}