import React, { useEffect } from "react"

// Files
import { auth } from "../utils/firebase"
import { useAuth } from "../context/authContext"
import { useChatContext } from "../context/chatContext"

const Profile = () => {
  const { setUserInfo, userInfo } = useAuth()
  const { emptyChat } = useChatContext()

  // Logging out using firebase auth
  const logout = () => {
    auth.signOut()

    setUserInfo(null)
  }

  useEffect(() => {
    emptyChat()
  }, [])

  return (
    <div className="w-full h-full flex-center flex-col gap-6">
      <div className="aspect-square size-32 rounded-full flex-center overflow-hidden">
        <img
          src={userInfo.avatar}
          alt="User Image"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-4xl font-semibold">{userInfo.fullName}</h2>
      <button
        to="/logout"
        className="btn"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}

export default Profile
