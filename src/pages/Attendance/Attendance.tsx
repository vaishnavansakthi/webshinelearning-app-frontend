import { useEffect, useState } from "react"

import Table from "../../components/moleclues/Table/Table"
import { FaPlus } from "react-icons/fa"
import { getUserAttendance } from "../../services/attendance.services"
import { decryptData } from "../../utils/security"

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState<any>([])
  const columns = [
    { label: "Title", field: "title" },
    { label: "Comment", field: "desc" },
    { label: "Status", field: "status" },
    { label: "Date", field: "date" },
  ]

  useEffect(() => {
    const myToken = JSON.parse(decryptData("userData", null))

    const res = getUserAttendance(myToken.user.id)
    console.log(myToken.user.id)
    res
      .then((data: any) => {
        setAttendanceData(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Table columns={columns} data={attendanceData} create={true} />
    </>
  )
}

export default Attendance
