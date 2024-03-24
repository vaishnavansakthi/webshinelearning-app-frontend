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

  const handleMarkAttendance = () => {
    // Logic to handle marking attendance
    console.log("Mark Attendance clicked")
  }

  return (
    <>
      <div className="flex justify-end mb-3 w-full max-w-[1200px] max-sm:max-w-xl">
        <button
          onClick={handleMarkAttendance}
          className="px-4 py-2 bg-blue-400 max-sm:text-[14px] max-sm:px-1 max-sm:py-1 mr-2 text-white rounded-md"
        >
          <div className="flex items-center justify-center">
            <div>
              <FaPlus className="mr-2" />
            </div>
            <div> Mark Attendance</div>
          </div>
        </button>
      </div>
      <Table columns={columns} data={attendanceData} />
    </>
  )
}

export default Attendance
