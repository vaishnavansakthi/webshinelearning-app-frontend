import { useContext, useEffect, useState } from "react"
import { getAllAttendance } from "../../services/attendance.services"
import Table from "../../components/moleclues/Table/Table"
import withProtectedRoute from "../../hoc/ProductedRoute"
import { loaderContext } from "../../context/LoaderProvider"

const UserAttendance = () => {
  const [attendanceData, setAttendanceData] = useState<any>([])
  const columns = [
    {label: "username", field: "user"},
    { label: "Title", field: "title" },
    { label: "Comment", field: "desc" },
    { label: "Status", field: "status" },
    { label: "Date", field: "createdAt" },
  ]
  const { setIsLoading } = useContext(loaderContext)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const data = await getAllAttendance()
        console.log("attendanceData", data)
        setAttendanceData(data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Table columns={columns} data={attendanceData} />
    </>
  )
}

export default withProtectedRoute(UserAttendance)
