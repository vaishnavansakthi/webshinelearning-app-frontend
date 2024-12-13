import { Modal } from "../../components/moleclues"
import { Field, Formik, ErrorMessage, Form } from "formik"
import { ThreeDots } from "react-loader-spinner"
import { useEffect, useState } from "react"
import { bookingFormSchema, bookingValidationSchema } from "../../schema/bookingFormSchema"
import { getAllBookings, updateBooking } from "../../services/booking.services"
import { Helmet } from "react-helmet"
import whatsappGroup from "../../assets/whatsapp-community-group.webp"
import whatsappQR from "../../assets/Webshine Learning Group.png"

function Booking() {
  const [isModel, setIsModel] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [initialFormValues, setInitialFormValues] = useState<any>({
    username: "",
    email: "",
    phone: "",
    chooseYourCourse: "",
    desc: "",
  })
  const [bookingData, setBookingData] = useState([])
  const [editingTaskId, setEditingTaskId] = useState<any>(null)
  const [countdown, setCountdown] = useState(0)
  const targetDate: any = new Date("2025-03-05")
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
    setIsBooked(false)
  }

  const handleSubmit = (values: any) => {
    const data = {
      username: values.username,
      email: values.email,
      phone: values.phone,
      isCourseBooked: true,
      chooseYourCourse: values.chooseYourCourse,
      desc: values.desc,
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
        setIsBooked(true)
        handleCloseModal()
      })
      .catch((error) => {
        console.log(error)
        setIsBooked(false)
      })
    setIsBooked(false)
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
        <meta name="description" content="Full-Stack Mastery: Book Your Journey Now" />
        <meta name="keywords" content="learning, website, products, services" />
        <meta name="author" content="vaishnavan" />
        <link rel="canonical" href="https://webshinelearning.in/booking" />
        <meta property="og:title" content="Full-Stack Mastery: Book Your Journey Now" />
        <meta
          property="og:description"
          content="Experience the full-stack journey: from front-end finesse to back-end brilliance. Book your course now."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://webshinelearning.in/booking" />
        <meta property="og:image" content="https://rezdy.com//wp-content/uploads/2021/03/Blog-Photos-37_11zon.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://webshinelearning.in/" />
        <meta property="twitter:title" content="Full-Stack Mastery: Book Your Journey Now" />
        <meta
          property="twitter:description"
          content="Experience the full-stack journey: from front-end finesse to back-end brilliance. Book your course now."
        />
        <meta
          property="twitter:image"
          content="https://rezdy.com//wp-content/uploads/2021/03/Blog-Photos-37_11zon.jpg"
        />
      </Helmet>
      {isBooked && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white dark:bg-[#282828] p-8 rounded-md shadow-md max-md:w-[320px]">
            <p className="text-lg font-semibold mb-4 text-center dark:text-white">
              🚀 Join our exclusive WhatsApp group for exciting discussions and updates! 🚀
            </p>
            <div className="flex justify-center align-middle items-center gap-5 flex-wrap mt-5">
              <div>
                <a className="text-center" href="https://chat.whatsapp.com/ItbeoQVy0laDX9QIfUNdhF">
                  <img src={whatsappGroup} alt="whatsapp-group" className="object-contain w-[280px] mx-auto" />
                </a>
              </div>
              <div className="border-1 border border-black h-[100px] max-md:hidden dark:border-white"></div>
              <div>
                <img src={whatsappQR} className="object-contain w-[220px] mx-auto" alt="whatsapp-group" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-8 text-center">Scan the QR code or click the link above to join</p>
            <button
              onClick={() => setIsBooked(false)}
              className="bg-blue-500 text-white px-4 py-2 mt-5 rounded-md block mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
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
            <span className="text-red-500 font-bold text-lg animate-pulse w-[320px] h-[320px] text-center mt-10">
              Booking closed, Please try again once booking opens
            </span>
          ) : (
            <>
              {bookingData.length > 0 ? (
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
                ))
              ) : (
                <div className="font-bold text-lg animate-pulse text-center mt-10 dark:text-white h-[300px]">
                  <ThreeDots
                    visible={true}
                    height="55"
                    width="55"
                    color="lightblue"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              )}
            </>
          )}
        </div>
        {!courseTimeout && (
          <div className="flex justify-center dark:text-white">
            <div className="w-5 h-5 border border-black bg-gray-400  mr-4 "></div> Booked
            <div className="w-5 h-5 border border-black bg-white dark:bg-black mr-4 ml-5"></div> Available
          </div>
        )}
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
                          style={form.type === "textArea" ? { height: "140px", width: "100%" } : null}
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
