import { useState } from "react"
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore"

// Files
import { useChatContext } from "../context/chatContext"
import { useAuth } from "../context/authContext"
import { db } from "../utils/firebase"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)

    const { userInfo } = useAuth()
    const { setConversations } = useChatContext()

    const getConversations = async () => {
        setLoading(true)

        return onSnapshot(doc(db, "userchats", userInfo.id), async (res) => {
            try {
                const items = res.data().chats
                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.receiverId)
                    const userDocSnap = await getDoc(userDocRef)

                    const userSnap = userDocSnap.data()

                    return { ...item, user: userSnap }
                })

                const chatData = await Promise.all(promises)
                setConversations(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        })
    }

    return { loading, getConversations }
}

export default useGetConversations
