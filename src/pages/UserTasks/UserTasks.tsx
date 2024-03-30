import { useEffect, useState } from "react"
import Table from "../../components/moleclues/Table/Table"
import { getAllTasks } from "../../services/task.services"

const UserTasks = () => {
  const [tasksData, setTaksData] = useState<any>([])
  const columns = [
    {label: "username", field: "user"},
    { label: "Title", field: "title" },
    { label: "Github URL", field: "githubUrl" },
    { label: "Deployed URL", field: "deployedUrl" },
    { label: "Uploaded On", field: "createdAt" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTasks()
        setTaksData(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Table columns={columns} data={tasksData} />
    </>
  )
}

export default UserTasks
