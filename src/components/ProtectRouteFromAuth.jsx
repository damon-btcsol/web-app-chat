import React from "react"
import { Navigate, Outlet } from "react-router"

// Files
import { useAuth } from "../context/authContext"

const ProtectRouteFromAuth = () => {
  const { userInfo } = useAuth()

  return userInfo ? (
    <Navigate
      to="/"
      replace
    />
  ) : (
    <Outlet />
  )
}

export default ProtectRouteFromAuth
