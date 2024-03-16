/* eslint-disable react-refresh/only-export-components */
import axios from "axios"
import withProtectedRoute from "../../hoc/ProductedRoute"
import { useEffect, useState } from "react"
import { Button } from "../../components/atoms"
import { decryptData } from "../../utils/security"

const AdminDashboard = () => {
  const [userData, setUserData] = useState([])

  const myToken: any = decryptData('userData', 'object')
  const token = myToken.access_token
  console.log(myToken)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          "x-api-key": `${import.meta.env.VITE_X_API_Key}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: any) => {
        setUserData(res.data)
      })
  }, [])

  return (
    <div className="flex justify-between p-5 flex-wrap max-[600px]:flex-col">
      {Array.isArray(userData) &&
        userData.length > 0 &&
        userData.map((user: any) => {
          return (
            <div className="border border-gray-400 p-5 m-3" key={user.id}>
              <h1>{user?.username}</h1>
              <h2>{user.email}</h2>
              <h3>{user.mobileNumber}</h3>
              <h4>{user.role}</h4>
              <Button text={user.isActivate ? 'Member': "Activate"} color="primary" />
            </div>
          )
        })}
    </div>
  )
}

export default withProtectedRoute(AdminDashboard)
