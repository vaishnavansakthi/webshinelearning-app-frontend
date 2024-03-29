import { useContext, useEffect, useState } from "react"

import Table from "../../components/moleclues/Table/Table"
import { deleteUserAttendance, getUserAttendance, markAttendance } from "../../services/attendance.services"
import { decryptData } from "../../utils/security"
import { attendanceFormSchema } from "../../schema/attendanceFormSchema"
import { Field, Formik, ErrorMessage, Form } from "formik"
import { Modal } from "../../components/moleclues"
import { loaderContext } from "../../context/LoaderProvider"

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState<any>([])
  const { setIsLoading } = useContext(loaderContext)
  const [isModal, setisModal] = useState(false)
  const [isAttendanceModal, setisAttendanceModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [attendanceIdToDelete, setAttendanceIdToDelete] = useState("")
  const columns = [
    { label: "Title", field: "title" },
    { label: "Comment", field: "desc" },
    { label: "Status", field: "status" },
    { label: "Date", field: "createdAt" },
    { label: "Actions", field: "actions", enable: "delete" },
  ]
  const myToken = JSON.parse(decryptData("userData", null))

  console.log(attendanceData, "attendanceData")

  useEffect(() => {
    setIsLoading(true)
    const res = getUserAttendance(myToken.user.id)
    console.log(myToken.user.id)
    res
      .then((data: any) => {
        setAttendanceData(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleModal = () => {
    setisModal(true)
  }

  const handleSubmit = (values: any) => {
    setisModal(false)
    const isAlreadyMarked = attendanceData.some((attendance: any) => {
      const currentDate = new Date().toISOString().split("T")[0]
      const attendanceDate = new Date(attendance.createdAt).toISOString().split("T")[0]
      return attendanceDate === currentDate
    })

    if (isAlreadyMarked) {
      setisAttendanceModal(true)
      return
    }
    setisAttendanceModal(false)
    const res = markAttendance(myToken.user.id, values)
    res
      .then((data) => {
        setAttendanceData([...attendanceData, data])
        handleCloseModal()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCloseModal = () => {
    setisModal(false)
    setisAttendanceModal(false)
    setIsDeleteModal(false)
  }

  const handleDelete = (id: string) => {
    setIsDeleteModal(true)
    setAttendanceIdToDelete(id)
  }

  const handleConfirmDelete = (id: string) => {
    setIsDeleteModal(true)
    const res = deleteUserAttendance(id)
    res
      .then(() => {
        setAttendanceData(attendanceData.filter((item: any) => item.id !== id))
        setIsDeleteModal(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Table columns={columns} data={attendanceData ?? []} handleDelete={handleDelete}>
        <section className="relative container overflow-x-auto m-auto flex items-center justify-around">
          <div className="flex items-center justify-around flex-wrap max-sm:justify-center p-6">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">Attendance</h2>

                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                  {(attendanceData.length / 8) * 100} %
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Please atten session on regular basis</p>
            </div>

            <div className="flex items-center mt-4 gap-x-3 px-7 py-1">
              <button
                onClick={handleModal}
                className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span>Mark Attendance</span>
              </button>
            </div>
          </div>
        </section>
      </Table>
      {isDeleteModal && (
        <Modal title="">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg border-none dark:bg-[#404040] border border-[#404040]">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this attendance entry?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={() => handleConfirmDelete(attendanceIdToDelete)}
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={handleCloseModal}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {isAttendanceModal && (
        <Modal title="">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg border-none dark:bg-[#404040] border border-[#404040]">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  You have already marked attendance for today.
                </h3>
                {/* <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button> */}
                <button
                  onClick={handleCloseModal}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {isModal && (
        <Modal title="Mark Attendance">
          <Formik
            initialValues={{
              title: "",
              desc: "",
              status: "",
              date: null,
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {attendanceFormSchema.map((form, index) => (
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
                                {form?.options?.map((option) => (
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
                    Mark
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
    </>
  )
}

export default Attendance
