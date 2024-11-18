import { useState } from "react"
import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc, } from "firebase/firestore"

// Files
import { db } from "../utils/firebase"
import { useAuth } from "../context/authContext"

const useAddFriend = () => {
    const [loading, setLoading] = useState(false)

    const { userInfo } = useAuth()

    const addFriend = async (user) => {
        setLoading(true)
        try {
            const chatRef = collection(db, "chats")
            const userChatRef = collection(db, "userchats")

            const newChatRef = doc(chatRef)

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            })

            await updateDoc(doc(userChatRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: userInfo.id,
                    updatedAt: Date.now(),
                }),
            })

            await updateDoc(doc(userChatRef, userInfo.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            })
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return { loading, addFriend }
}

export default useAddFriend
