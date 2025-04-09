import "./Directory.css";
import ProfileCard from "./ProfileCard.jsx";

import { useEffect, useState } from "react";

function Directory() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/getUsers",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Directory</h1>
      <div className="directory-grid">
        {users.map((user) => (
          <ProfileCard key={user.firebaseId} userProps={user} />
        ))}
      </div>
    </>
  );
}

export default Directory;
