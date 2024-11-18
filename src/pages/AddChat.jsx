import React, { useEffect, useState } from "react"

// Files
import toast from "react-hot-toast"
import SearchSvg from "../svgs/SearchSvg"
import Loading from "../components/Loading"
import useSearchUser from "../hooks/useSearchUser"
import AddFriendTile from "../components/AddFriendTile"
import { useChatContext } from "../context/chatContext"

const AddChat = () => {
  const [users, setUsers] = useState([])
  const { loading, searchUser } = useSearchUser()
  const { emptyChat } = useChatContext()

  const handleSearch = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get("name")

    if (!name) return

    const data = await searchUser(name)

    if (data.length <= 0) {
      return toast.error("User not Found.")
    }

    // Searching Users in Database using Custom hook
    setUsers(data)
  }

  useEffect(() => {
    emptyChat()
  }, [])

  return (
    <div className="w-full h-screen flex flex-col px-2 gap-8">
      <form
        className="py-2 flex gap-4"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="name"
          placeholder="Search name..."
          className="input w-full flex-1 border-none"
        />
        <button className="btn aspect-square h-full flex-center">
          <SearchSvg />
        </button>
      </form>
      <div className="w-full flex flex-col gap-2">
        {loading ? (
          <Loading />
        ) : (
          users.map((user, idx) => (
            <div key={idx}>
              <AddFriendTile user={user.data()} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AddChat
