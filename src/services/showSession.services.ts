import axiosInstance from "../utils/apiFetch";

async function getSessions(){
    try {
        const response = await axiosInstance.get("/session")
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

export {
    getSessions
}