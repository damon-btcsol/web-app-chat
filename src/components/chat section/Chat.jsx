import React from "react"

// Files
import { useAuth } from "../../context/authContext"
import { useChatContext } from "../../context/chatContext"

const Chat = ({ message, start }) => {
  const { userInfo } = useAuth()
  const { user } = useChatContext()

  return !start ? (
    <div className="w-full py-1 flex items-center gap-3">
      <div className="aspect-square size-10 rounded-full flex-center overflow-hidden">
        <img
          src={user?.avatar || "/avatar.jpg"}
          alt="User Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="w-fit px-3 py-2 bg-primary-2/60 rounded-xl rounded-bl-sm">
          {message.text}
        </p>
      </div>
    </div>
  ) : (
    <div className="w-full py-1 flex items-center gap-3 justify-end">
      <div className="flex flex-col items-end">
        <p className="w-fit px-3 py-2 bg-primary rounded-xl rounded-br-sm">
          {message.text}
        </p>
      </div>
      <div className="aspect-square size-10 rounded-full flex-center overflow-hidden">
        <img
          src={userInfo.avatar}
          alt="User Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default Chat
