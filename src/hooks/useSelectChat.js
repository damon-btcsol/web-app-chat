import { useState } from "react"
import { useNavigate } from "react-router"
import { doc, updateDoc } from "firebase/firestore"

// Files
import { useAuth } from "../context/authContext"
import { useChatContext } from "../context/chatContext"
import { db } from "../utils/firebase"
import toast from "react-hot-toast"

const useSelectChat = () => {
    const [loading, setLoading] = useState(false)

    const { userInfo } = useAuth()
    const navigate = useNavigate()
    const { changeChat, conversations } = useChatContext()

    const selectChat = async (chat) => {
        setLoading(true)
        const toastId = toast.loading("Loading...")

        try {
            const userChats = conversations.map((item) => {
                if (item.chatId === chat.chatId) {
                    return { ...item, isSeen: true };
                }
                return item;
            })

            const userChatsRef = doc(db, "userchats", userInfo.id)

            await updateDoc(userChatsRef, {
                chats: userChats,
            })

            changeChat(chat.chatId, chat.user)
            navigate("/")
        } catch (e) {
            console.error("Error updating chat:", e);
        } finally {
            setLoading(false)
            toast.dismiss(toastId)
        }
    }

    return { loading, selectChat }
}

export default useSelectChat
