import { createContext, useContext } from "react"
import { auth, db } from "./FirebaseApp.js"

const FirebaseContext = createContext()

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, db }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider

export const useFirebase = () => {
  return useContext(FirebaseContext)
}
