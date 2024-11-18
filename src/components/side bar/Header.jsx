import React from "react"
import { Link } from "react-router-dom"

// Files
import { useAuth } from "../../context/authContext"

const Header = () => {
  const { userInfo } = useAuth()
  return (
    <div className="w-full flex justify-between py-3 px-2">
      <h3 className="text-3xl font-bold tracking-wide text-primary-6">Chats</h3>
      <div className="flex gap-4 items-center">
        <Link
          to="profile"
          title="Profile"
          className="size-10 flex-center overflow-hidden rounded-full"
        >
          <img
            src={userInfo.avatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </div>
  )
}

export default Header
