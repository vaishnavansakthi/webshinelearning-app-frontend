import { Modal } from "../../components/moleclues"
import { Field, Formik, ErrorMessage, Form } from "formik"
import { useEffect, useState } from "react"
import { bookingFormSchema, bookingValidationSchema } from "../../schema/bookingFormSchema"
import { getAllBookings, updateBooking } from "../../services/booking.services"
import { Helmet } from "react-helmet"

function Booking() {
  const [isModel, setIsModel] = useState(false)
  const [initialFormValues, setInitialFormValues] = useState<any>({
    username: "",
    email: "",
    phone: "",
  })
  const [bookingData, setBookingData] = useState([])
  const [editingTaskId, setEditingTaskId] = useState<any>(null)
  const [countdown, setCountdown] = useState(0)
  const targetDate: any = new Date("2024-05-28")
  const [courseTimeout, setCourseTimeout] = useState(false)

  useEffect(() => {
    const res = getAllBookings()
    res.then((bookings: any) => {
      setBookingData(bookings)
    })
    const calculateCountdown = () => {
      const now: any = new Date()
      const differenceInSeconds = Math.floor((targetDate - now) / 1000)
      setCountdown(differenceInSeconds)
      if (differenceInSeconds <= 0) {
        setCourseTimeout(true)
      }
    }

    calculateCountdown()

    const timerId = setInterval(calculateCountdown, 1000)

    return () => clearInterval(timerId)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      setCountdown(0)
    }
  }, [countdown])

  const handleCloseModal = () => {
    setIsModel(false)
    setInitialFormValues({
      username: "",
      email: "",
      phone: "",
    })
  }

  const handleFormModal = (id: any) => {
    setIsModel(true)
    setEditingTaskId(id)
  }

  const handleSubmit = (values: any) => {
    const data = {
      username: values.username,
      email: values.email,
      phone: values.phone,
      isCourseBooked: true,
    }

    updateBooking(editingTaskId, data)
      .then(() => {
        setBookingData((prevData: any) => {
          const updatedData = prevData.map((booking: any) => {
            if (booking.id === editingTaskId) {
              return { ...booking, ...data }
            }
            return booking
          })
          return updatedData
        })

        handleCloseModal()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const formatTime = (timeInSeconds: number) => {
    if (timeInSeconds <= 0) {
      return `0 days 0 hours 0 minutes 0 seconds`
    }

    const days = Math.floor(timeInSeconds / (3600 * 24))
    const hours = Math.floor((timeInSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60

    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
  }

  return (
    <div>
      <Helmet>
        <title>Webshine talents - Booking</title>
      </Helmet>
      <div>
        <h5 className="text-center text-xl mb-10 dark:text-white">
          Book your course to enjoy your incredible full stack journey
        </h5>
        <p className="text-center text-red-500">
          <span className="dark:text-gray-200 text-black mr-1 max-sm:hidden">Time left to book the course:</span>{" "}
          {formatTime(countdown)}
        </p>
      </div>
      <div>
        <div className="flex justify-evenly flex-wrap p-5 w-[500px] max-sm:w-[280px] m-auto">
          {/* Render seats dynamically */}
          {courseTimeout ? (
            <span className="text-red-500 font-bold text-lg animate-pulse w-[320px] h-[320px] text-center mt-10">Booking closed, Please try again once booking opens</span>
          ) : (
            <>
              {bookingData.length > 0 &&
                bookingData.map((booking: any) => (
                  <button
                    className="w-[45px] h-[45px] border border-1 border-white mb-5 p-3 m-3 dark:border-gray-500 dark:text-white dark:disabled:bg-gray-700 text-[14px] shadow-md"
                    key={booking.id}
                    onClick={() => handleFormModal(booking?.id)}
                    disabled={booking.isCourseBooked}
                    style={
                      booking.isCourseBooked ? { backgroundColor: "#dddddd", color: "black" } : { backgroundColor: "" }
                    }
                  >
                    {booking.order}
                  </button>
                ))}
            </>
          )}
        </div>
        {!courseTimeout && <div className="flex justify-center dark:text-white">
          <div className="w-5 h-5 border border-black bg-gray-400  mr-4 "></div> Booked
          <div className="w-5 h-5 border border-black bg-white dark:bg-black mr-4 ml-5"></div> Available
        </div>}
      </div>
      {isModel && (
        <Modal title="Book your course">
          <Formik initialValues={initialFormValues} validationSchema={bookingValidationSchema} onSubmit={handleSubmit}>
            {() => (
              <Form className="mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bookingFormSchema.map((form: any, index) => (
                    <div key={index}>
                      <label
                        htmlFor={form.name}
                        className="block text-sm max-[600px]:text-left font-medium text-gray-700 dark:text-white"
                      >
                        {form.label}
                      </label>
                      {form.type === "select" ? (
                        <div style={{ position: "relative" }}>
                          <Field
                            className="appearance-none mt-1 max-[650px]:mt-2 block w-[220px] max-[650px]:w-[300px] px-3 py-2 border border-gray-300 dark:border-black dark:bg-[#282828] dark:text-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            as={form.type}
                            name={form.name}
                          >
                            {form.type === "select" && (
                              <>
                                <option value="" disabled>
                                  {form.placeholder}
                                </option>
                                {form?.options?.map((option: any) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </>
                            )}
                          </Field>
                        </div>
                      ) : (
                        <Field
                          as={form.type === "textArea" ? "textArea" : ""}
                          name={form.name}
                          type={form.type}
                          placeholder={form.placeholder}
                          className="appearance-none mt-1 max-[650px]:mt-2 block w-[220px] max-[650px]:w-[300px] px-3 py-2 border border-gray-300 dark:border-black dark:bg-[#282828] dark:text-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      )}

                      <ErrorMessage name={form.name} component="div" className="text-red-500 text-sm" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end items-end mt-5">
                  <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 px-5 py-2 rounded-md">
                    Book
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="ml-2 bg-gray-300 text-gray-700 hover:bg-gray-400  px-5 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  )
}

export default Booking
