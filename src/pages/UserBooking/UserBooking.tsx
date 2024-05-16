import { useEffect, useState } from "react"
import { getAllBookings, resetBooking } from "../../services/booking.services"

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

  const handleReset = (id: any) => {
    const data = {
      username: null,
      email: null,
      phone: null,
      chooseYourCourse: null,
      desc: null,
      isCourseBooked: false,
    }

    const res = resetBooking(id, data)
    res
      .then((data) => {
        setBookingData([...bookingData, data])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="flex justify-evenly align-middle flex-wrap">
        {bookingData.length > 0 &&
          bookingData.map((bookingData: any) => {
            return (
              <div
                style={bookingData?.isCourseBooked === true ? { background: "#FFFAE6" } : undefined}
                className="w-[400px] h-[400px] border border-1 border-white mb-5 p-3 max-[650px]:w-[320px] max-[650px]:h-[350px] shadow-md"
              >
                <div className="text-center my-[100px] max-[650px]:my-[50px]">
                  <h1 className="text-lg">{bookingData.order}</h1>
                  <h1 className="text-xl dark:text-white">{bookingData.username}</h1>
                  <h1>{bookingData.phone}</h1>
                  <h1>{bookingData.email}</h1>
                  <h3 className="text-xl dark:text-white mt-8">
                    {bookingData?.isCourseBooked ? "Booked" : "Yet to book"}
                  </h3>
                  {bookingData?.isCourseBooked &&  <button
                    onClick={() => handleReset(bookingData.id)}
                    className="border border-1 border-red-200 px-5 py-1 mt-8 shadow-md hover:bg-red-300 hover:text-white"
                  >
                    Reset Booking
                  </button>}
                 
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}
