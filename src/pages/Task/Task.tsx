import { useContext, useEffect, useState } from "react"

import Table from "../../components/moleclues/Table/Table"
import { createTask, deleteUserTask, getUserTaks, updateUserTask } from "../../services/task.services"
import { decryptData } from "../../utils/security"
import { taskFormSchema } from "../../schema/taskFormSchema"
import { Field, Formik, ErrorMessage, Form } from "formik"
import { FaPlusCircle } from "react-icons/fa"
import { Modal } from "../../components/moleclues"
import { loaderContext } from "../../context/LoaderProvider"
import { taskValidationSchema } from "../../schema/taskFormSchema"

const Task = () => {
  const [taskData, setTaskData] = useState<any>([])
  const [isModal, setisModal] = useState<boolean>(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [initialFormValues, setInitialFormValues] = useState<any>({
    title: "",
    githubUrl: "",
    deployedUrl: "",
  })

  const { setIsLoading } = useContext(loaderContext)

  const columns = [
    { label: "Title", field: "title" },
    { label: "Github URL", field: "githubUrl" },
    { label: "Deployed URL", field: "deployedUrl" },
    { label: "Uploaded On", field: "createdAt" },
    { label: "Actions", field: "actions", enable: "" },
  ]

  const myToken = JSON.parse(decryptData("userData", null))

  useEffect(() => {
    setIsLoading(true)
    const res = getUserTaks(myToken.user.id)
    console.log(myToken.user.id)
    res
      .then((data: any) => {
        setTaskData(data)
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
    if (editingTaskId) {
      const updatedTaskData = taskData.map((task: any) => {
        if (task.id === editingTaskId) {
          return { ...task, ...values }
        }
        return task
      })
      setTaskData(updatedTaskData)
      const res = updateUserTask(editingTaskId, values)
      res.then(() => {
        setisModal(false)
      })
    } else {
      const res = createTask(myToken.user.id, values)
      res
        .then((data) => {
          setTaskData([...taskData, data])
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

  const handleDelete = (id: string) => {
    const res = deleteUserTask(id)
    res.then(() => {
      setTaskData(taskData.filter((item: any) => item.id !== id))
    })
  }

  const handleEdit = (id: string) => {
    console.log(id)
    const taskToEdit = taskData.find((task: any) => task.id === id)

    if (taskToEdit) {
      setisModal(true)

      setEditingTaskId(id)

      setInitialFormValues({
        title: taskToEdit.title,
        githubUrl: taskToEdit.githubUrl,
        deployedUrl: taskToEdit.deployedUrl,
      })
    }
  }

  return (
    <>
      <Table columns={columns} data={taskData} handleDelete={handleDelete} handleEdit={handleEdit}>
        <div className="flex items-end justify-end flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4">
          <div>
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={handleModal}
            >
              <span className="sr-only">Add taks</span>
              <FaPlusCircle className="mr-2" />
              Add Tasks
            </button>
          </div>
        </div>
      </Table>
      {isModal && (
        <Modal title={editingTaskId ? "Update Task" : "Add task"}>
          <Formik initialValues={initialFormValues} validationSchema={taskValidationSchema} onSubmit={handleSubmit}>
            {() => (
              <Form className="mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {taskFormSchema.map((form: any, index) => (
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

export default Task
