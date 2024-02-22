import { initializeApp } from "firebase/app"
import "firebase/firestore"
import { connectFirestoreEmulator, getFirestore } from "@firebase/firestore"
import "firebase/auth"
import "firebase/storage"
import { connectAuthEmulator, getAuth } from "@firebase/auth"
import { connectStorageEmulator, getStorage } from "@firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "event-addvertiser.firebaseapp.com",
  projectId: "event-addvertiser",
  storageBucket: "event-addvertiser.appspot.com",
  messagingSenderId: "495933495868",
  appId: "1:495933495868:web:9770049766d1ac36b0c139",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

if (window.location.hostname === "localhost") {
  connectStorageEmulator(storage, "localhost", 9199)
  connectFirestoreEmulator(db, "localhost", 8080)
  connectAuthEmulator(auth, "http://localhost:9099")
}

export { storage, auth, db }
