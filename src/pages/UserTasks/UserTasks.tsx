import { useContext, useEffect, useState } from "react"
import ReactGA from "react-ga4";
import Table from "../../components/moleclues/Table/Table"
import { getAllTasks } from "../../services/task.services"
import withProtectedRoute from "../../hoc/ProductedRoute"
import { loaderContext } from "../../context/LoaderProvider"

const UserTasks = () => {
  const [tasksData, setTaksData] = useState<any>([])
  const { setIsLoading } = useContext(loaderContext)
  const columns = [
    {label: "username", field: "user"},
    { label: "Title", field: "title" },
    { label: "Github URL", field: "githubUrl" },
    { label: "Deployed URL", field: "deployedUrl" },
    { label: "Uploaded On", field: "createdAt" },
  ]

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/usertasks",
      title: "User Tasks",
    })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const data = await getAllTasks()
        setTaksData(data)
        setIsLoading(false)
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

export default withProtectedRoute(UserTasks)
