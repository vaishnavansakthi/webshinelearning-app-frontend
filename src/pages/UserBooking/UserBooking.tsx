import { useEffect, useState } from "react"
import { getAllBookings, resetBooking } from "../../services/booking.services"

export default function UserBooking() {
  const [bookingData, setBookingData] = useState<any>([])

  useEffect(() => {
    const res = getAllBookings()
    res
      .then((booking) => {
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
          bookingData.sort((a: any, b: any) => a.order - b.order).map((bookingData: any) => {
            return (
              <div
                className={`w-[400px] h-auto border border-1 dark:bg-slate-500 border-white mb-5 p-3 max-[650px]:w-[320px] max-[650px]:h-auto shadow-md ${bookingData?.isCourseBooked ? "bg-[#d4d3d1]" : "bg-[#f2f2f2]"
                  }`}
              >
                <div className="text-center my-[100px] max-[650px]:my-[50px]">
                  <h1 className="text-lg">{bookingData.order}</h1>
                  <h1 className="text-xl">{bookingData.username}</h1>
                  <h1>{bookingData.phone}</h1>
                  <h1>{bookingData.email}</h1>
                  <h1>{bookingData.chooseYourCourse}</h1>
                  <p>{bookingData.desc}</p>
                  <h3 className="text-xl mt-8">
                    {bookingData?.isCourseBooked ? "Booked" : "Yet to book"}
                  </h3>
                  {bookingData?.isCourseBooked && <button
                    onClick={() => handleReset(bookingData.id)}
                    className="border border-1 border-gray-200 px-5 py-1 mt-8 shadow-md hover:bg-gray-700 text-white"
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
