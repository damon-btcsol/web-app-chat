import React, { useEffect, useState } from "react"

// Files
import { useChatContext } from "../context/chatContext"
import useAddFriend from "../hooks/useAddFriend"
import Loading from "./Loading"
import { useAuth } from "../context/authContext"

const AddFriendTile = ({ user }) => {
  const [isFriend, setIsFriend] = useState(false)

  const { conversations } = useChatContext()
  const { userInfo } = useAuth()
  const { loading, addFriend } = useAddFriend()

  useEffect(() => {
    conversations.forEach((item) => {
      if (item.receiverId === user.id) {
        setIsFriend(true)
      }
    })
  }, [user])
  return (
    <div className={`flex gap-2 border-b border-primary-2 items-center p-2`}>
      <div className="relative">
        <div className="aspect-square size-12 rounded-full flex-center overflow-hidden">
          <img
            src={user?.avatar}
            alt="User Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-1">
        <p className="font-bold line-clamp-1">{user?.fullName}</p>
      </div>
      <div>
        <button
          className="btn"
          onClick={() => addFriend(user)}
          disabled={isFriend || user.id === userInfo.id}
        >
          {loading ? (
            <Loading />
          ) : isFriend ? (
            "Already Friends"
          ) : (
            "Add to Friend"
          )}
        </button>
      </div>
    </div>
  )
}

export default AddFriendTile
