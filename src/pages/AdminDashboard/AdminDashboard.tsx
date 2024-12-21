import React, { useState, useEffect } from "react"
import withProtectedRoute from "../../hoc/ProductedRoute" // Fixed typo in the import path
import { getAllUsers } from "../../services/user.services"
import { getAllTasks } from "../../services/task.services"
import { getAllTaskTracker } from "../../services/taskTracker.services"
import ReactGA from "react-ga4";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    totalTrackingTasks: 0,
  })

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/dashboard",
      title: "Admin Dashboard",
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, tasks, trackingTasks]: any = await Promise.all([
          getAllUsers(),
          getAllTasks(),
          getAllTaskTracker(),
        ])

        setStats({
          totalUsers: users.length,
          totalTasks: tasks.length,
          totalTrackingTasks: trackingTasks.length,
        })
      } catch (error) {
        console.error("Error fetching data", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="bg-gray-100 dark:bg-[#282828] min-h-screen flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl p-6">
        <div className="bg-white dark:bg-[#8f8e8e] shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold">{stats.totalUsers}</div>
          <div className="text-gray-500 dark:text-black">Users</div>
        </div>
        <div className="bg-white dark:bg-[#8c8b8b] shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold">{stats.totalTasks}</div>
          <div className="text-gray-500 dark:text-black">Tasks</div>
        </div>
        <div className="bg-white dark:bg-[#8e8d8d] shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold">{stats.totalTrackingTasks}</div>
          <div className="text-gray-500 dark:text-black">Tracking Tasks</div>
        </div>
      </div>
    </div>
  )
}

export default withProtectedRoute(AdminDashboard)
