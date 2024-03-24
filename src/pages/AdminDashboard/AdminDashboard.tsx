/* eslint-disable react-refresh/only-export-components */
import withProtectedRoute from "../../hoc/ProductedRoute"
import { useEffect, useState } from "react"
import Table from '../../components/moleclues/Table/Table'
import { getAllUserData } from "../../services/adminDashboard.services"

const AdminDashboard = () => {
  const [userData, setUserData] = useState<any>([])
  const columns = [
    { label: 'Username', field: 'username' },
    { label: 'Email', field: 'email' },
    { label: 'Mobile Number', field: 'mobileNumber' },
    { label: 'Role', field: 'role' },
    { label: 'Status', field: 'isActivate', trueValue: 'Member', falseValue: 'Activate' },
    { label: 'Action', field: 'actions' },
  ];

  useEffect(() => {
    try {
      const res = getAllUserData()
      res.then((data) => {
        setUserData(data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="h-full flex flex-col items-center justify-center py-4 sm:py-10 gap-12">
      {/* Dashboard card */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="border border-gray-300 dark:text-white w-[300px] h-[150px] rounded-md shadow-md">
          <div>
            <h1 className="text-center text-[20px] p-3">Registered</h1>
          </div>
          <div className="text-center">
            <span className="text-[50px]">12</span>
          </div>
        </div>
        <div className="border border-gray-300 dark:text-white w-[300px] h-[150px] rounded-md shadow-md">
          <div>
            <h1 className="text-center text-[20px] p-3">Users</h1>
          </div>
          <div className="text-center">
            <span className="text-[50px]">8</span>
          </div>
        </div>
        <div className="border border-gray-300 dark:text-white w-[300px] h-[150px] rounded-md shadow-md">
          <div>
            <h1 className="text-center text-[20px] p-3">Admin</h1>
          </div>
          <div className="text-center">
            <span className="text-[50px]">2</span>
          </div>
        </div>
      </div>
      {/* Dashboard card */}
      {/* Users need to activate */}
      <Table columns={columns} data={userData} handleDelete={() => {}} handleEdit={() => {}} />
     
    </div>
  )
}

export default withProtectedRoute(AdminDashboard)
