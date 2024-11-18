import React from "react"

// Files
import HeaderForChat from "./HeaderForChat"
import Chats from "./Chats"
import ChatInput from "./ChatInput"
import PlaceholderSvg from "../../svgs/PlaceholderSvg"
import { useChatContext } from "../../context/chatContext"

const ChatSection = () => {
  const { selectedChat } = useChatContext()

  return selectedChat ? (
    <div className="w-full h-screen flex flex-col px-2">
      <HeaderForChat />
      <Chats />
      <ChatInput />
    </div>
  ) : (
    <div className="w-full h-screen flex-center">
      <PlaceholderSvg />
    </div>
  )
}

export default ChatSection
