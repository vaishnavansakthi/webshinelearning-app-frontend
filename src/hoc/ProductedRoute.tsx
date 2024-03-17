import React, { ComponentType } from "react"
import { Navigate } from "react-router-dom"
import { decryptData } from "../utils/security"

const withProtectedRoute = <P extends any>(Component: ComponentType): React.FC<P> => {
  const ProtectedRoute: React.FC<P> = () => {
    const myToken = decryptData('userData', 'object')
    const isAuthenticated = myToken && myToken.access_token

    if (isAuthenticated) {
      const allowedRoutes = ["login", "signup", "forgot-password", "reset-password", "verfy-otp"]
      const currentRoute = window.location.pathname.split("/")[1]
      if (allowedRoutes.includes(currentRoute)) {
        return <Navigate to="/admin-dashboard" />
      }
      return <Component />
    } else {
      return <Navigate to="/" />
    }
  }

  return ProtectedRoute
}

export default withProtectedRoute
