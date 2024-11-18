import { useState } from "react"
import toast from "react-hot-toast"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

// Files
import { useAuth } from "../context/authContext"
import { useChatContext } from "../context/chatContext"
import { db } from "../utils/firebase"

const useBlock = () => {
    const [loading, setLoading] = useState(false)

    const { user, isReceiverBlocked, changeBlock } = useChatContext()
    const { userInfo } = useAuth()

    const block = async () => {
        setLoading(true)
        const userDocRef = doc(db, "users", userInfo.id)

        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            })
            changeBlock()
        } catch (e) {
            console.log(e)
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, block }
}

export default useBlock
