import React, { useEffect, useRef, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"

// Files
import Chat from "./Chat"
import { db } from "../../utils/firebase"
import { useAuth } from "../../context/authContext"
import { useChatContext } from "../../context/chatContext"
import Loading from "../Loading"

const Chats = () => {
  const [chat, setChat] = useState([])
  const lastChatRef = useRef()
  const [loading, setLoading] = useState(false)

  const { userInfo } = useAuth()
  const { selectedChat } = useChatContext()

  // Constantly caking for update
  useEffect(() => {
    setLoading(true)
    const unSub = onSnapshot(doc(db, "chats", selectedChat), async (res) => {
      setChat(res.data())
      setLoading(false)
    })

    return () => {
      unSub()
    }
  }, [selectedChat])

  // Scrolling to last message
  useEffect(() => {
    setTimeout(() => {
      lastChatRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [chat])
  return loading ? (
    <Loading />
  ) : (
    <div className="w-full overflow-y-auto flex-1">
      {chat.messages?.length <= 0 ? (
        <p className="text-center text-w-3/40 mt-4">
          Send message to start Chatting.
        </p>
      ) : (
        chat.messages?.map((msg) => (
          <div
            key={msg?.createdAt}
            ref={lastChatRef}
          >
            <Chat
              message={msg}
              start={msg.senderId === userInfo.id}
            />
          </div>
        ))
      )}
    </div>
  )
}

export default Chats
