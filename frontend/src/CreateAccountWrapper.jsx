import { useState } from "react"
import CreateAccount from "./CreateAccount.jsx"
import "./CreateAccountWrapper.css"

function CreateAccountWrapper() {
  const [createAccountSuccessfully, setCreateAccountSuccessfully] =
    useState(false)

  const handleAccountCreationSuccess = () => {
    setCreateAccountSuccessfully(true)
  }

  return (
    <>
      {createAccountSuccessfully ? (
        <div className="success-container">
          <h1 className="success-content">
            {" "}
            Account Creation Succeeded!!!!!!!!!!{" "}
          </h1>
        </div>
      ) : (
        <CreateAccount onAccountCreation={handleAccountCreationSuccess} />
      )}
    </>
  )
}

export default CreateAccountWrapper
