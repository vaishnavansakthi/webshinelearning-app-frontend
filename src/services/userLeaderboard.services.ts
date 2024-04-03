import axiosInstance from "../utils/apiFetch"

async function createUserLeaderboard(userId: string, values: any){
    try {
        const response = await axiosInstance.post(`/leaderboard/${userId}`, values)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function getAllLeaerboardData() {
    try {
        const response = await axiosInstance.get(`/leaderboard`)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function updateLeaderboard(leaderboardId: string, values: any) {
    try {
        const response = await axiosInstance.put(`/leaderboard/${leaderboardId}`, values)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function deleteLeaderboard(leaderboardId: string) {
    try {
        const response = await axiosInstance.delete(`/leaderboard/${leaderboardId}`)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

export {
    createUserLeaderboard,
    getAllLeaerboardData,
    updateLeaderboard,
    deleteLeaderboard
}