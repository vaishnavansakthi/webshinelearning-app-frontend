import axiosInstance from "../utils/apiFetch"

async function getAllIframeVideos() {
  try {
    const response = await axiosInstance.get(`/iframeVideos`)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export { getAllIframeVideos }
