import React from "react"
import { Outlet } from "react-router"

// Files
import SideBar from "../components/side bar/SideBar"

const Home = () => {
  return (
    <div className="w-full h-full flex">
      <SideBar />
      <div className="w-[75%]">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
