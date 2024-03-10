import React, { ComponentType } from "react"
import { Navigate } from "react-router-dom"

const withProtectedRoute = <P extends any>(Component: ComponentType): React.FC<P> => {
  const ProtectedRoute: React.FC<P> = () => {
    const myToken = localStorage.getItem("userData")
    const isAuthenticated = myToken && JSON.parse(myToken).access_token
    console.log(isAuthenticated, myToken)

    if (isAuthenticated) {
      const allowedRoutes = ["login", "signup", "forgot-password", "reset-password", "verfy-otp"]
      const currentRoute = window.location.pathname.split("/")[1]
      console.log(currentRoute)
      if (allowedRoutes.includes(currentRoute)) {
        return <Navigate to="/Admin-dashboard" />
      }
      return <Component />
    } else {
      return <Navigate to="/login" />
    }
  }

  return ProtectedRoute
}

export default withProtectedRoute
