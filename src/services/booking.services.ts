import axiosInstance from "../utils/apiFetch";

async function createBooking(userSeats: number) {
    try {
        const response = await axiosInstance.post("/bookings", userSeats)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function getAllBookings() {
    try {
        const response = await axiosInstance.get(`/bookings`)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function updateBooking(bookingId: number, updateBookingData: any) {
    try {
        const response = await axiosInstance.put(`/bookings/${bookingId}/book`, updateBookingData)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

async function deleteAllBookings(){
    try {
        const response = await axiosInstance.delete(`/bookings`)
        return response
      } catch (error) {
        console.error("Error fetching data:", error)
        throw error
      }
}

export {
    createBooking,
    getAllBookings,
    updateBooking,
    deleteAllBookings
}