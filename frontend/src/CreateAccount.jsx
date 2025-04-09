import { useState } from "react";
import { auth } from "./FirebaseApp";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

function CreateAccount({ onAccountCreation }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [githubUsername, setGithubAccount] = useState("");
  const [hours, setHours] = useState(""); // TODO: Make hours work correctly
  const [password, setPassword] = useState("");
  const [accessKey, setAccessKey] = useState("");

  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      const userPayload = {
        firebaseId: user.uid,
        username: user.email,
        email,
        firstName,
        lastName,
        githubUsername: githubUsername,
        activeStatus: true,
        isAdmin: true,
      };

      console.log("User Payload: ", JSON.stringify(userPayload));

      const response = await fetch("http://localhost:8080/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
        credentials: "include",
      });

      if (response.ok) {
        const createdUser = await response.json();
        console.log("Created User: ", createdUser);
        console.log("onAccountCreation prop: ", onAccountCreation);
        onAccountCreation();
        setTimeout(() => {
          navigate("/sign-in");
        }, 300000);
      } else {
        const error = await response.json();
        console.error("Failed to create account in backend: ", error);
        setErrors(error.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setErrors("Error creating account");
    } finally {
      setPassword("");
    }
  };

  return (
    <>
      <h1 className="MyTitle">Create An Account</h1>
      <form onSubmit={handleSubmit} className="FormContainer">
        <div className="InputContainer">
          <label>First Name</label>
          <input
            className="create-account-input"
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Last Name</label>
          <input
            className="create-account-input"
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Email</label>
          <input
            className="create-account-input"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Github Account</label>
          <input
            className="create-account-input"
            id="githubUsername"
            type="text"
            value={githubUsername}
            onChange={(e) => setGithubAccount(e.target.value)}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Password</label>
          <input
            className="create-account-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="submit-button" type="submit">
          Create Account
        </button>
      </form>
    </>
  );
}

export default CreateAccount;
