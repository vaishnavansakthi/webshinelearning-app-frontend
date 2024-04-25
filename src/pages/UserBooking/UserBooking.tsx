import { useEffect, useState } from "react"
import { getAllBookings } from "../../services/booking.services"

export default function UserBooking() {
  const [bookingData, setBookingData] = useState<any>([])

  useEffect(() => {
    const res = getAllBookings()
    res
      .then((booking) => {
        console.log(booking)
        setBookingData(booking)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <>
      <div className="flex justify-evenly align-middle flex-wrap">
        {bookingData.length > 0 &&
          bookingData.map((bookingData: any) => {
            return (
              <div className="w-[400px] h-[400px] border border-1 border-white mb-5">
                <h1 className="text-2xl dark:text-white">{bookingData.username}</h1>
                <h3 className="text-2xl dark:text-white">{bookingData?.isCourseBooked ? "Booked": "Yet to book"}</h3>
              </div>
            )
          })}
      </div>
    </>
  )
}
