import { useState } from "react";
import { auth } from "./FirebaseApp";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

function CreateAccount({ onAccountCreation }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [githubUsername, setGithubAccount] = useState("");
  const [password, setPassword] = useState("");
  const [keyCode, setKeyCode] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

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
        fullName,
        githubUsername: githubUsername,
        activeStatus: true,
        isAdmin: true,
      };

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
        onAccountCreation();
        setTimeout(() => {
          navigate("/sign-in");
        }, 300000);
      } else {
        const error = await response.json();
        console.error("Failed to create account in backend: ", error);
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setPassword("");
    }
  };

  return (
    <>
      <h1 className="MyTitle">Create An Account</h1>
      <div className="flex flex-col justify-center items-center h-full translate-y-[-10%]">
        <div box-="round contain:!top" className="pr-10 pb-10 pb-4">
          <h1 is-="badge" variant-="background0">
            {" "}
            create-account
          </h1>
          <div className="pl-6 pt-3">
            <form onSubmit={handleSubmit} className="FormContainer">
              <div className="pt-3 pb-2 text-end">
                <label htmlFor="fullName">full-name: </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="pt-3 pb-2 text-end">
                <label htmlFor="email">email: </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="pt-3 pb-2 text-end">
                <label htmlFor="githubUsername">github-username: </label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubAccount(e.target.value)}
                  required
                />
              </div>
              <div className="pt-2 pb-2 text-end">
                <label htmlFor="keyCode">key-code: </label>
                <input
                  type="text"
                  value={keyCode}
                  onChange={(e) => setKeyCode(e.target.value)}
                  required
                />
              </div>
              <div className="pt-2 pb-6 text-end">
                <label htmlFor="password">password: </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div
                className={`${errorMessage !== "" ? "" : "hidden"} text-red-900 pb-3`}
              >
                {errorMessage}
              </div>
              <div className="text-center">
                <button
                  box-="round"
                  className="hover:text-[var(--teal)]"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      );
    </>
  );
}

export default CreateAccount;
