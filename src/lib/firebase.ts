import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;
let storage: FirebaseStorage | undefined;

if (projectId) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  app = (getApps().length ? getApp() : initializeApp(firebaseConfig));
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
}

export { app, db, auth, storage };
export default app;