import axiosInstance from "../utils/apiFetch"

async function addIframeVideos(id: string, videosData: any) {
  try {
    const response = await axiosInstance.post(`/iframeVideos/${id}/add`, videosData)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}
async function getAllIframeVideos() {
  try {
    const response = await axiosInstance.get(`/iframeVideos`)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

async function deleteIframeVideos(id: string) {
  try {
    const response = await axiosInstance.delete(`/iframeVideos/${id}`)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export { getAllIframeVideos, addIframeVideos, deleteIframeVideos }
