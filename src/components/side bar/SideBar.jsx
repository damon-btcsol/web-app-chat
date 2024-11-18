import React from "react"

// Files
import Search from "./Search"
import Header from "./Header"
import Conversations from "./Conversations"

const SideBar = () => {
  return (
    <div className="w-[25%] bg-b-2 flex flex-col overflow-hidden">
      <Header />
      <Search />
      <Conversations />
    </div>
  )
}

export default SideBar
