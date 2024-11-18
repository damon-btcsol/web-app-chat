import { useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"

// Files
import { db } from "../utils/firebase"

const useSearchUser = () => {
    const [loading, setLoading] = useState(false)

    const searchUser = async (name) => {
        setLoading(true)
        try {
            const userRef = collection(db, "users")

            const q = query(userRef, where("fullName", "==", name))

            const querySnapShot = await getDocs(q)

            if (!querySnapShot.empty) {
                return querySnapShot.docs
            } else {
                return []
            }
        } catch (e) {
            console.log(e)
            return []
        } finally {
            setLoading(false)
        }
    }

    return { loading, searchUser }
}

export default useSearchUser
