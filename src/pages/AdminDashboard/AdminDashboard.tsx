/* eslint-disable react-refresh/only-export-components */
import withProtectedRoute from "../../hoc/ProductedRoute"
import { useEffect, useState } from "react"
import Table from '../../components/moleclues/Table/Table'
import { activateUser, getAllUserData } from "../../services/adminDashboard.services"

const AdminDashboard = () => {
  const [userData, setUserData] = useState<any>([])
  const columns = [
    { label: 'Username', field: 'username' },
    { label: 'Email', field: 'email' },
    { label: 'Mobile Number', field: 'mobileNumber' },
    { label: 'Role', field: 'role' },
    { label: 'Status', field: 'isActivate', trueValue: 'Member', falseValue: 'Activate' },
  ];

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
    const selectedUser = userData.find((user: any) => user.id === id)

    console.log(selectedUser)
    const data = {
      isEnable: !selectedUser.isActivate
    }
    const res = activateUser(selectedUser.id, data)
    fetchUserData()
    res.then(() => {
      console.log(userData)
     console.log("status updated")
    })
  }

  return (
      <Table columns={columns} data={userData} handleStatus={handleStatus} handleDelete={() => {}} handleEdit={() => {}} />
  )
}

export default withProtectedRoute(AdminDashboard)
