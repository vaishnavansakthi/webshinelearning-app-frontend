/* eslint-disable react-refresh/only-export-components */
import withProtectedRoute from "../../hoc/ProductedRoute"
import { useEffect, useState } from "react"
import Table from "../../components/moleclues/Table/Table"
import { activateUser, getAllUserData } from "../../services/adminDashboard.services"
import { Modal } from "../../components/moleclues"

const ManageUser = () => {
  const [userData, setUserData] = useState<any>([])
  const columns = [
    { label: "Username", field: "username" },
    { label: "Email", field: "email" },
    { label: "Mobile Number", field: "mobileNumber" },
    { label: "Role", field: "role" },
    { label: "Status", field: "isActivate", trueValue: "Deactivate", falseValue: "Activate" },
  ]
  const [isActivateModal, setisActivateModal] = useState(false)
  const [taskIdToActivate, settaskIdToActivate] = useState("")
  const [userActivate, setUserActivate] = useState<{ isActivate?: boolean }>({})

  useEffect(() => {
    try {
      fetchUserData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const fetchUserData = async () => {
    const data = await getAllUserData()
    setUserData(data)
  }

  const handleStatus = (id: string) => {
    setisActivateModal(true)
    settaskIdToActivate(id)
    const selectedUser = userData.find((user: any) => user.id === id)
    setUserActivate(selectedUser)
  }

  const handleClosePopModal = () => {
    setisActivateModal(false)
  }

  const handleConfirmActivate = (id: string) => {
    setisActivateModal(true)

    const selectedUser = userData.find((user: any) => user.id === id)
    setUserActivate(selectedUser)
    const data = {
      isEnable: !selectedUser.isActivate,
    }
    const res = activateUser(selectedUser.id, data)
    fetchUserData()
    res.then(() => {
      window.location.reload()
      console.log("status updated")
    })
    setisActivateModal(false)
  }

  return (
    <>
      <Table
        columns={columns}
        data={userData}
        handleStatus={handleStatus}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
      {isActivateModal && (
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
                  Are you sure you want to {!userActivate?.isActivate ? "Activate" : "Deactivate"} this user?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={() => handleConfirmActivate(taskIdToActivate)}
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
    </>
  )
}

export default withProtectedRoute(ManageUser)
