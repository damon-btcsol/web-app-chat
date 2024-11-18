import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Files
import SearchSvg from "../../svgs/SearchSvg"
import PlushSvg from "../../svgs/PlushSvg"
import { useChatContext } from "../../context/chatContext"

const Search = () => {
  const [search, setSearch] = useState("")
  const { conversations, setFilteredConversations } = useChatContext()

  const filteredConversations = conversations.filter((c) =>
    c.user.fullName.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    setFilteredConversations(filteredConversations)
  }, [search])

  return (
    <div className="relative py-3 mx-2 flex items-center gap-3">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <SearchSvg />
      </div>
      <input
        type="text"
        name="Search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input !pl-8 !rounded-full w-full"
      />
      <Link
        to="addchat"
        title="Add new Friend"
      >
        <PlushSvg />
      </Link>
    </div>
  )
}

export default Search
