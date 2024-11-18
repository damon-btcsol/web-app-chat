import React, { createContext, useContext, useState } from "react"

// Files
import { useAuth } from "./authContext"

const ChatContext = createContext()

export const useChatContext = () => useContext(ChatContext)

export const ChatContextProvider = ({ children }) => {
  const { userInfo } = useAuth()

  const [selectedChat, setSelectedChat] = useState(null)
  const [user, setUser] = useState(null)
  const [isCurrentUserBlocked, setIsCurrentUserBlocked] = useState(false)
  const [isReceiverBlocked, setIsReceiverBlocked] = useState(false)
  const [conversations, setConversations] = useState([])
  const [filteredConversations, setFilteredConversations] = useState([])

  // Changing add adding Chats
  const changeChat = (chatId, user) => {
    if (user.blocked.includes(userInfo.id)) {
      setSelectedChat(chatId)
      setUser(null)
      setIsCurrentUserBlocked(true)
      setIsReceiverBlocked(false)
    } else if (userInfo.blocked.includes(user.id)) {
      setSelectedChat(chatId)
      setUser(user)
      setIsCurrentUserBlocked(false)
      setIsReceiverBlocked(true)
    } else {
      setUser(user)
      setSelectedChat(chatId)
      setIsCurrentUserBlocked(false)
      setIsReceiverBlocked(false)
    }
  }

  const emptyChat = () => {
    setSelectedChat(null)
    setUser(null)
    setIsCurrentUserBlocked(false)
    setIsReceiverBlocked(false)
  }

  // Block user Updating
  const changeBlock = () => {
    setIsReceiverBlocked(!isReceiverBlocked)
  }

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        emptyChat,
        user,
        isReceiverBlocked,
        setIsReceiverBlocked,
        isCurrentUserBlocked,
        setIsCurrentUserBlocked,
        filteredConversations,
        setFilteredConversations,
        conversations,
        setConversations,
        changeChat,
        changeBlock,
        setSelectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
