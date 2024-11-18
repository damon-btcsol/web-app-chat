import React from "react"
import { Navigate, Outlet } from "react-router"

// Files
import { useAuth } from "../context/authContext"

const ProtectRoute = () => {
  const { userInfo } = useAuth()

  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  )
}

export default ProtectRoute
