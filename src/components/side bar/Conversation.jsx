import React from "react"

// Files
import { useChatContext } from "../../context/chatContext"
import { useAuth } from "../../context/authContext"

const Conversation = ({ chat }) => {
  const { selectedChat } = useChatContext()
  const { userInfo } = useAuth()

  return (
    <div
      className={`flex relative gap-2 items-center hover:bg-primary-2 hover:text-primary ${
        selectedChat === chat.chatId ? "bg-primary-2" : ""
      }  rounded p-2 cursor-pointer`}
    >
      <div className="relative">
        <div className="aspect-square size-12 rounded-full flex-center overflow-hidden">
          <img
            src={
              chat.user.blocked.includes(userInfo.id)
                ? "/avatar.jpg"
                : chat.user.avatar
            }
            alt="User Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <p className="font-bold line-clamp-1">
          {chat.user.blocked.includes(userInfo.id)
            ? "User"
            : chat.user.fullName}
        </p>
        <p className="text-sm line-clamp-1">{chat.lastMessage}</p>
      </div>
      {chat.isSeen ? (
        ""
      ) : (
        <div className="size-3 rounded-full bg-secondary border-[2px] border-b-2 absolute top-2 right-2" />
      )}
    </div>
  )
}

export default Conversation
