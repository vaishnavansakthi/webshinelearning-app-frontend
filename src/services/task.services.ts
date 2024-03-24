import axiosInstance from "../utils/apiFetch";

async function createTask(id: string, data: any) {   
    try {
        const response = await axiosInstance.post(`/tasks/${id}`, data)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function getUserTaks(id: string) {   
    try {
        const response = await axiosInstance.get(`/tasks/${id}`)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function deleteUserTask(id: string) {   
    try {
        const response = await axiosInstance.delete(`/tasks/${id}`)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function updateUserTask(id: string, data: any) {
    try {
        const response = await axiosInstance.put(`/tasks/${id}`, data)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}


export {
    getUserTaks,
    createTask,
    deleteUserTask,
    updateUserTask
}