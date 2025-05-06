import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./FirebaseApp";
import { AUTH_ERROR_MESSAGES } from "./utils/auth";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      const firebaseError = error as { code?: string; message: string };
      console.log(firebaseError);
      setErrorMessage(
        AUTH_ERROR_MESSAGES[firebaseError.code ?? ""] ??
          "Something went wrong. Please try again.",
      );
      console.error("Error signing in: ", error.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-full translate-y-[-10%]">
      <div box-="round contain:!top" className="pr-10 pb-10 pb-4">
        <h1 is-="badge" variant-="background0">
          {" "}
          sign-in
        </h1>
        <div className="pl-6 pt-3">
          <form onSubmit={handleSubmit} className="FormContainer">
            <div className="pt-3 pb-2 text-end">
              <label htmlFor="email">email: </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
