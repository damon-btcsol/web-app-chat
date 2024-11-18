import React from "react"

// Files
import { useChatContext } from "../../context/chatContext"
import useBlock from "../../hooks/useBlock"
import Loading from "../Loading"

const HeaderForChat = () => {
  const { user, isCurrentUserBlocked, isReceiverBlocked } = useChatContext()
  const { loading, block } = useBlock()

  const handelBlock = async () => {
    if (!user) return

    // Blocking and unblocking user
    await block()
  }
  return (
    <div className="py-2 border-b border-w-2 px-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="aspect-square size-16 rounded-full flex-center overflow-hidden">
          <img
            src={user?.avatar || "/avatar.jpg"}
            alt="User Image"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold">{user?.fullName || "User"}</h3>
      </div>
      <button
        className="btn"
        onClick={handelBlock}
        disabled={isCurrentUserBlocked}
      >
        {loading ? (
          <Loading />
        ) : isCurrentUserBlocked ? (
          "You are Blocked!"
        ) : isReceiverBlocked ? (
          "Unblock"
        ) : (
          "Block User"
        )}
      </button>
    </div>
  )
}

export default HeaderForChat
