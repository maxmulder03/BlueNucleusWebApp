import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./FirebaseApp";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("uid", user.uid);
          navigate("/");
          console.log(user);
        },
      );
    } catch (error) {
      // TODO: Implement Error Handling
      console.error("Error signing in: ", error.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h1 className="MyTitle">Create An Account</h1>
      <form onSubmit={handleSubmit} className="FormContainer">
        <div className="InputContainer">
          <label htmlFor="email">Email</label>
          <input
            className="create-account-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="InputContainer">
          <label htmlFor="password">Password</label>
          <input
            className="create-account-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Sign In
        </button>
      </form>
    </>
  );
}

export default SignIn;
