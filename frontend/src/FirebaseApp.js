import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCMsrl_YUJXqxoLMFsCqRFnF7G-htHBMTA",
  authDomain: "bluenucleuswebapp.firebaseapp.com",
  projectId: "bluenucleuswebapp",
  storageBucket: "bluenucleuswebapp.firebasestorage.app",
  messagingSenderId: "198714237716",
  appId: "1:198714237716:web:89ad8f2132fb9875149801",
  measurementId: "G-BVB6HKX7V1",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
