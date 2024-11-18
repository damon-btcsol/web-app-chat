import React, { createContext, useContext, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import toast from "react-hot-toast"

// Files
import { db } from "../utils/firebase"

const authContext = createContext()

export const useAuth = () => useContext(authContext)

export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Getting user From Database
  const getUser = async (userId) => {
    if (!userId) return setIsLoading(false)
    try {
      const docRef = doc(db, "users", userId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setUserInfo(docSnap.data())
        setIsLoading(false)
      }
    } catch (e) {
      setIsLoading(false)
      setUserInfo(null)
      console.log(e)
      toast.error(e.message)
    }
  }

  return (
    <authContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isLoading,
        getUser,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider
