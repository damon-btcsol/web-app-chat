import { useState } from "react"
import toast from "react-hot-toast"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

// Files
import upload from "../utils/upload"
import { auth, db } from "../utils/firebase"
import { useAuth } from "../context/authContext"

const useRegister = () => {
    const [loading, setLoading] = useState(false)
    const { getUser } = useAuth()

    const register = async (avatar, fullName, email, password) => {
        setLoading(true)
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const imgUrl = await upload(avatar)

            await setDoc(doc(db, "users", res.user.uid), {
                fullName,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            })

            await getUser(res.user.uid)

            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            })

            toast.success("Account created Successfully.")
        } catch (e) {
            console.log(e)
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, register }
}

export default useRegister
