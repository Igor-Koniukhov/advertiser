import { initializeApp } from "firebase/app"
import "firebase/firestore"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "event-addvertiser.firebaseapp.com",
  projectId: "event-addvertiser",
  storageBucket: "event-addvertiser.appspot.com",
  messagingSenderId: "495933495868",
  appId: "1:495933495868:web:9770049766d1ac36b0c139",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)