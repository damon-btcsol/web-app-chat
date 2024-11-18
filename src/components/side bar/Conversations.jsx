import React, { useEffect } from "react"

// Files
import Loading from "../Loading"
import Conversation from "./Conversation"
import useSelectChat from "../../hooks/useSelectChat"
import { useChatContext } from "../../context/chatContext"
import useGetConversations from "../../hooks/useGetConversations"

const Conversations = () => {
  const { conversations, filteredConversations } = useChatContext()

  const { loading, getConversations } = useGetConversations()
  const { selectChat } = useSelectChat()

  useEffect(() => {
    return () => {
      // Getting all Chats
      getConversations()
    }
  }, [])

  return (
    <div className="w-full overflow-y-auto px-2 flex flex-col gap-2">
      {loading ? (
        <div className="h-full w-full overflow-hidden">
          <Loading />
        </div>
      ) : conversations <= 0 ? (
        <p className="text-center text-w-3/40 mt-4">Don't have Friend yet!</p>
      ) : filteredConversations.length <= 0 ? (
        conversations.map((item) => (
          <div
            key={item.chatId}
            // Selecting Chat using Custom hook
            onClick={() => selectChat(item)}
          >
            <Conversation chat={item} />
          </div>
        ))
      ) : (
        filteredConversations.map((item) => (
          <div
            key={item.chatId}
            // Selecting Chat using Custom hook
            onClick={() => selectChat(item)}
          >
            <Conversation chat={item} />
          </div>
        ))
      )}
    </div>
  )
}

export default Conversations
