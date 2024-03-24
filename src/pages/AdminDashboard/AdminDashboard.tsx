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
      <Table columns={columns} data={userData} handleDelete={() => {}} handleEdit={() => {}} />
  )
}

export default withProtectedRoute(AdminDashboard)
