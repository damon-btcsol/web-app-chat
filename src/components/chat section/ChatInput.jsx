import React, { useRef, useState } from "react"

// Files
import SendSvg from "../../svgs/SendSvg"
import { useChatContext } from "../../context/chatContext"
import useSendMessage from "../../hooks/useSendMessage"
import Loading from "../Loading"

const ChatInput = () => {
  const inputRef = useRef()
  const [message, setMessage] = useState("")

  const { isCurrentUserBlocked, isReceiverBlocked } = useChatContext()

  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message) return

    // Sending message using Custom Hook and clearing message input
    await Promise.all([sendMessage(message), setMessage("")])

    inputRef.current.focus()
  }

  return (
    <form
      className="py-2 flex gap-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="message"
        placeholder={
          isCurrentUserBlocked || isReceiverBlocked
            ? "You Cannot send a message."
            : "Type a Message..."
        }
        value={message}
        ref={inputRef}
        onChange={(e) => setMessage(e.target.value)}
        className="input !rounded-full w-full flex-1 border-none"
        disabled={isCurrentUserBlocked || isReceiverBlocked || loading}
      />
      <button
        className="btn !rounded-full aspect-square h-full flex-center"
        disabled={isCurrentUserBlocked || isReceiverBlocked || loading}
      >
        {loading ? <Loading /> : <SendSvg />}
      </button>
    </form>
  )
}

export default ChatInput
