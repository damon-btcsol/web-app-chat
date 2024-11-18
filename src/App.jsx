import React, { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

// Files
import { auth } from "./utils/firebase"
import { useAuth } from "./context/authContext"
import Loading from "./components/Loading"

const App = () => {
  const { isLoading, getUser } = useAuth()

  // Getting userInfo
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      getUser(user?.uid)
    })

    return () => {
      unSub()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-screen flex-center">
        <Loading />
      </div>
    )
  }
  return (
    <>
      {/* Toast Provider */}
      <Toaster />

      <div className="max-w-screen-2xl h-screen 2xl:mx-auto">
        <Outlet />
      </div>
    </>
  )
}

export default App
