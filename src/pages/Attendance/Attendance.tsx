import { useContext, useEffect, useState } from "react"

import Table from "../../components/moleclues/Table/Table"
import { deleteUserAttendance, getUserAttendance, markAttendance } from "../../services/attendance.services"
import { decryptData } from "../../utils/security"
import { attendanceFormSchema } from "../../schema/attendanceFormSchema"
import { Field, Formik, ErrorMessage, Form } from "formik"
import { FaPlusCircle } from "react-icons/fa"
import { Modal } from "../../components/moleclues"
import { loaderContext } from "../../context/LoaderProvider"

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState<any>([])
  const { setIsLoading } = useContext(loaderContext)
  const [isModal, setisModal] = useState(false)
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
    const isAlreadyMarked = attendanceData.some((attendance: any) => {
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      const attendanceDate = new Date(attendance.createdAt).toISOString().split('T')[0]; // Get attendance date in YYYY-MM-DD format
      return attendanceDate === currentDate;
    });
  
    // If attendance for the current date already exists, return without marking attendance
    if (isAlreadyMarked) {
      alert("You have already marked attendance for today.");
      return;
    }
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
  }

  const handleDelete = (id: string) => {
    const res = deleteUserAttendance(id)
    res.then(() => {
      setAttendanceData(attendanceData.filter((item: any) => item.id !== id))
    })
  }

  return (
    <>
      <Table columns={columns} data={attendanceData} handleDelete={handleDelete}>
        <div className="flex items-end justify-end flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4">
          <div>
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={handleModal}
            >
              <span className="sr-only">Mark Attendance</span>
              <FaPlusCircle className="mr-2" />
              Mark Attendance
            </button>
          </div>
        </div>
      </Table>
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
                        className="block text-sm max-[600px]:text-left font-medium text-gray-700"
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
