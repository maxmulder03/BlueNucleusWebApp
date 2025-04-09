import "./Directory.css"
import ProfileCard from "./ProfileCard.jsx"

import { useEffect, useState } from "react"

function Directory() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO: Implment filter and sort
  const [filterCriteria, setFilterCriteria] = useState({})
  const [sortCriteria, setSortCriteria] = useState({
    field: null,
    order: "asc",
  })
  const [filteredUsers, setFilteredUsers] = useState(users)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/getUsers")
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filterUsers = () => {}

  return (
    <>
      <h1>Directory</h1>

      <div className="directory-grid">
        {users.map((user) => (
          <ProfileCard key={user.firebaseId} userProps={user} />
        ))}
      </div>
    </>
  )
}

export default Directory
