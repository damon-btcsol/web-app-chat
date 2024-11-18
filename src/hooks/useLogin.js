import { useState } from "react"
import toast from "react-hot-toast"
import { signInWithEmailAndPassword } from "firebase/auth"

// Files
import { auth } from "../utils/firebase"

const useLogin = () => {
    const [loading, setLoading] = useState(false)

    const login = async (email, password) => {
        setLoading(true)
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
        } catch (e) {
            console.log(e)
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}

export default useLogin
