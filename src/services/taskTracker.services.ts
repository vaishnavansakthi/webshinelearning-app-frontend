import axiosInstance from "../utils/apiFetch"

async function createTaskTracker(taskId: string, taskData: any) {
  try {
    const response = await axiosInstance.post(`/task-tracker/${taskId}`, taskData)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

async function getTaskTracker(taskId: string) {
  try {
    const response = await axiosInstance.get(`/task-tracker/${taskId}`)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

async function getAllTaskTracker() {
  try {
    const response = await axiosInstance.get(`/task-tracker`)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

async function getUserTaskTracker(userId: string) {
    try {
        const response = await axiosInstance.get(`/task-tracker/user/${userId}`)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function updateTaskTracker(taskId: string, taskData: any) {
  try {
    const response = await axiosInstance.put(`/task-tracker/${taskId}`, taskData)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

async function deleteTaskTracker(taskId: string) {
  try {
    const response = await axiosInstance.delete(`/task-tracker/${taskId}`)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export {
    createTaskTracker,
    getTaskTracker,
    updateTaskTracker,
    deleteTaskTracker,
    getUserTaskTracker,
    getAllTaskTracker
}