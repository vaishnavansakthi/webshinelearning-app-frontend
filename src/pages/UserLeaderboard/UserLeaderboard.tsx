import { useEffect, useState } from "react"
import Table from "../../components/moleclues/Table/Table"
import withProtectedRoute from "../../hoc/ProductedRoute"
import { userLeaderboardFormSchema } from "../../schema/userLeaderboardFormSchema"
import { Field, Formik, ErrorMessage, Form } from "formik"
import { getAllUsers } from "../../services/user.services"
import { Modal } from "../../components/moleclues"
import {
  createUserLeaderboard,
  getAllLeaerboardData,
  updateLeaderboard,
  deleteLeaderboard,
} from "../../services/userLeaderboard.services"

const UserLeaderboard = () => {
  const [userData, setUserData] = useState([])
  const [userId, setUserId] = useState("")
  const [leaderboardData, setLeaderboardData] = useState<any>([])
  const [isModal, setisModal] = useState<boolean>(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [initialFormValues, setInitialFormValues] = useState<any>({
    suggestion: "",
    points: null,
  })

  const columns = [
    { label: "Username", field: "username" },
    { label: "Email", field: "email" },
    { label: "Actions", field: "actions", enable: "add" },
  ]

  const leaderboardColumns = [
    { label: "Username", field: "user" },
    { label: "Suggestion", field: "suggestion" },
    { label: "Points", field: "points" },
    { label: "Actions", field: "actions", enable: "" },
  ]

  useEffect(() => {
    const res = getAllUsers()
    res
      .then((res: any) => {
        const filterData = res.filter((user: any) => user.isActive || user.role !== "admin");
        setUserData(filterData)
      })
      .catch((err) => {
        console.log(err)
      })

    getAllLeaerboardData()
      .then((res: any) => {
        console.log(res)
        setLeaderboardData(res)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])

  const handleFormModal = (id: string) => {
    setisModal(true)
    console.log(id)
    setUserId(id)
  }

  const handleSubmit = (values: any) => {
    console.log(values)
    handleCloseModal()

    if (editingTaskId) {
      updateLeaderboard(editingTaskId, values)
        .then((res: any) => {
          console.log(res)
          getAllLeaerboardData()
            .then((updatedData: any) => {
              setLeaderboardData(updatedData)
            })
            .catch((err: any) => {
              console.log(err)
            })
        })
        .catch((err: any) => {
          console.log(err)
        })
    } else {
      createUserLeaderboard(userId, values)
        .then((res: any) => {
          console.log(res)
          getAllLeaerboardData()
            .then((updatedData: any) => {
              setLeaderboardData(updatedData)
            })
            .catch((err: any) => {
              console.log(err)
            })
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }

  const handleCloseModal = () => {
    setisModal(false)
    setInitialFormValues({
      suggestion: "",
      points: null,
    })
    setEditingTaskId(null)
  }

  const handleEdit = (id: string) => {
    console.log(id)
    const leaderboardToEdit = leaderboardData.find((leaderboard: any) => leaderboard.id === id)

    if (leaderboardToEdit) {
      setisModal(true)

      setEditingTaskId(id)

      setInitialFormValues({
        suggestion: leaderboardToEdit.suggestion,
        points: leaderboardToEdit.points,
      })
    }
  }

  const handleDelete = (id: string) => {
    deleteLeaderboard(id)
      .then(() => {
        const leaderboardToDelete = leaderboardData.filter((leaderboard: any) => leaderboard.id !== id)
        setLeaderboardData(leaderboardToDelete)
      })
      .catch((err) => [console.log(err)])
  }

  return (
    <>
      <Table columns={columns} data={userData} handleModal={handleFormModal}>
        <section className="relative container overflow-x-auto m-auto flex items-center justify-around">
          <div className="flex items-start justify-start flex-wrap max-sm:justify-center p-6">
            <div>
              <div className="flex items-start gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">Leaderboard</h2>

                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                {leaderboardData.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Leaderboard to tark the students points</p>
            </div>
          </div>
        </section>
      </Table>
      {isModal && (
        <Modal title={editingTaskId ? "Update Points" : "Add Points"}>
          <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
            {() => (
              <Form className="mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {userLeaderboardFormSchema.map((form, index) => (
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
      <div className="mt-10">
        <Table
          columns={leaderboardColumns}
          data={leaderboardData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </>
  )
}

export default withProtectedRoute(UserLeaderboard)
