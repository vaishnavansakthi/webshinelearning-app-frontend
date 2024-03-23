import axiosInstance from "../utils/apiFetch";


async function createProfile(data: any){
    try {
        const response = await axiosInstance.post("/profile", data)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function getProfile() {   
    try {
        const response = await axiosInstance.get("/profile")
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function getUserProfile(id: string) {
    try {
        const response = await axiosInstance.get(`/profile/${id}`)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function updateProfile(id: string, data: any){
    try {
        const response = await axiosInstance.put(`/profile/${id}`, data)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}


export {
    createProfile,
    getProfile,
    getUserProfile, 
    updateProfile
}