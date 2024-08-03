import axiosInstance from "../utils/apiFetch"

async function getSessions() {
  try {
    const response = await axiosInstance.get("/session")
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

async function updateSession(id: string, session: any) {
  try {
    const response = await axiosInstance.put(`/session/${id}`, session)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export { getSessions, updateSession }
