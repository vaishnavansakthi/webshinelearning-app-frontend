import axiosInstance from "../utils/apiFetch";


async function loginUsers(data: any){
    try {
        const response = await axiosInstance.post("/auth/login", data)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

export {
    loginUsers
}