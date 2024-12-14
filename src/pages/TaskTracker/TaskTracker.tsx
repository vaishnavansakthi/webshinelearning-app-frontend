import { useContext, useEffect, useState } from "react"
import Table from "../../components/moleclues/Table/Table"
import {
  createTaskTracker,
  getUserTaskTracker,
  deleteTaskTracker,
  updateTaskTracker,
  getAllTaskTracker,
} from "../../services/taskTracker.services"
import { decryptData } from "../../utils/security"
import { Field, Formik, ErrorMessage, Form } from "formik"
import { Modal } from "../../components/moleclues"
import { taskTrackerFormSchema } from "../../schema/taskTrackerFormSchema"
import withProtectedRoute from "../../hoc/ProductedRoute"
import { FaEdit, FaTrash } from "react-icons/fa"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { loaderContext } from "../../context/LoaderProvider"

const TaskTracker = () => {
  const [taskTrackerData, setTaskTrackerkData] = useState<any>([])
  const [allTrackerData, setAllTrackerData] = useState<any>([])
  const [isModal, setisModal] = useState<boolean>(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [initialFormValues, setInitialFormValues] = useState<any>({
    title: "",
    storyPoints: "",
    status: "",
    comments: "",
  })

  const columns = [
    { label: "Username", field: "user" },
    { label: "Title", field: "title" },
    { label: "Story Points", field: "storyPoints" },
    { label: "Status", field: "status" },
    { label: "Comments", field: "comments" },
  ]

  const { setIsLoading } = useContext(loaderContext)

  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [taskIdToDelete, settaskIdToDelete] = useState("")

  const myToken = JSON.parse(decryptData("userData", null))

  useEffect(() => {
    const res = getUserTaskTracker(myToken.user.id)
    res
      .then((taskTrackerData: any) => {
        setTaskTrackerkData(taskTrackerData)
      })
      .catch((err) => {
        console.log(err)
      })

    getAllTrackerData()
  }, [])

  const handleModal = () => {
    setisModal(true)
  }

  const getAllTrackerData = () => {
    setIsLoading(true)
    const trackerData = getAllTaskTracker()
    trackerData
      .then((taskTrackerData: any) => {
        setAllTrackerData(taskTrackerData)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = (values: any) => {
    // console.log(values)
    // const res = createTaskTracker(myToken.user.id, values)
    // res
    //   .then((data) => {
    //     setTaskTrackerkData([...taskTrackerData, data])
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    if (editingTaskId) {
      const updatedTaskData = taskTrackerData.map((task: any) => {
        if (task.id === editingTaskId) {
          return { ...task, ...values }
        }
        return task
      })
      setTaskTrackerkData(updatedTaskData)
      const res = updateTaskTracker(editingTaskId, values)
      res.then(() => {
        setisModal(false)
        getAllTrackerData()
      })
    } else {
      const res = createTaskTracker(myToken.user.id, values)
      res
        .then((data) => {
          setTaskTrackerkData([...taskTrackerData, data])
          getAllTrackerData()
        })
        .catch((err) => {
          console.log(err)
        })
    }

    handleCloseModal()
  }

  const handleCloseModal = () => {
    setisModal(false)
    setInitialFormValues({
      title: "",
      githubUrl: "",
      deployedUrl: "",
    })
    setEditingTaskId(null)
  }
  const handleClosePopModal = () => {
    setisModal(false)
    setIsDeleteModal(false)
  }

  const handleDelete = (id: string) => {
    setIsDeleteModal(true)
    settaskIdToDelete(id)
  }

  const handleEdit = (id: string) => {
    const taskToEdit = taskTrackerData.find((task: any) => task.id === id)

    if (taskToEdit) {
      setisModal(true)

      setEditingTaskId(id)

      setInitialFormValues({
        title: taskToEdit.title,
        storyPoints: taskToEdit.storyPoints,
        status: taskToEdit.status,
        comments: taskToEdit.comments,
      })
    }
  }

  const handleConfirmDelete = (id: string) => {
    setIsDeleteModal(true)
    const res = deleteTaskTracker(id)
    res
      .then(() => {
        setTaskTrackerkData(taskTrackerData.filter((item: any) => item.id !== id))
        getAllTrackerData()
        setIsDeleteModal(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
        <section className="relative container overflow-x-auto m-auto flex items-center justify-center">
          <div className="flex items-center justify-between flex-wrap max-sm:justify-center p-6">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">Task Tracker</h2>

                {/* <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                  {taskData.length}
                </span> */}
              </div>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Every task completion will be rewarded</p>
            </div>

            <div className="flex items-center mt-4 gap-x-3 px-7 py-1">
              <button
                disabled={taskTrackerData.length}
                onClick={handleModal}
                className="flex disabled:bg-gray-300 items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
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

                <span>Add Tracker</span>
              </button>
            </div>
          </div>
        </section>
      {taskTrackerData.length > 0 ? (
        taskTrackerData.slice(0, 1).map((tracker: any) => {
          return (
            <div className="flex justify-center">
              <div className="bg-white dark:bg-[#404040] shadow-md rounded-lg overflow-hidden w-[400px] max-sm:w-[350px] relative">
                <div className="px-6 py-4 dark:text-white">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{tracker.storyPoints}</h1>
                  </div>
                  <h2 className="text-xl mt-2 capitalize">{tracker.title}</h2>
                  <p className="text-gray-700 mt-2 dark:text-gray-200">{tracker.comments}</p>
                </div>
                <span className="absolute bottom-2 right-2 text-gray-600 capitalize bg-gray-200 dark:bg-[#565656] dark:text-white px-3 py-1 rounded-md my-3 mx-2">
                  {tracker.status}
                </span>
                <div className="absolute top-2 right-2 flex space-x-2 my-1 mx-2">
                  <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                    <FaEdit onClick={() => handleEdit(tracker.id)} className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 focus:outline-none">
                    <FaTrash onClick={() => handleDelete(tracker.id)} className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <>
          {taskTrackerData.length <= 0 && (
            <>
              <div className="flex justify-center items-center h-full">
                <div className="rounded-lg p-8 flex flex-col items-center">
                  <button
                    onClick={handleModal}
                    className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <AiOutlinePlusCircle className="w-20 h-20 mr-2 mb-4" />
                  </button>
                  <div className="flex items-center mb-4">
                    <p className="text-lg text-gray-700 dark:text-gray-300">Oops! No tracker found</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      <Table columns={columns} data={allTrackerData}>
        <div className="mt-10"></div>
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
                  Are you sure you want to delete this task entry?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={() => handleConfirmDelete(taskIdToDelete)}
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={handleClosePopModal}
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
        <Modal title={editingTaskId ? "Update Task" : "Add task"}>
          <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
            {() => (
              <Form className="mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {taskTrackerFormSchema.map((form: any, index) => (
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
                    {editingTaskId ? "Update" : "Add"}
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

export default withProtectedRoute(TaskTracker)
