import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const initializeFirebase = () => {
  if (app && db && storage) {
    return { app, db, storage, analytics };
  }

  try {
    app = getApp();
  } catch (error) {
    app = initializeApp(firebaseConfig);
  }

  // Initialize services
  if (!db) db = getFirestore(app);
  if (!storage) storage = getStorage(app);

  // Initialize Analytics only in browser environment
  if (typeof window !== "undefined") {
    try {
      if (!analytics) analytics = getAnalytics(app);
    } catch (error) {
      console.warn("Analytics initialization failed:", error);
    }
  }

  return { app, db, storage, analytics };
};

export const getFirebaseApp = (): FirebaseApp => {
  if (!app) {
    initializeFirebase();
  }
  return app!;
};

export const getFirebaseDb = (): Firestore => {
  if (!db) {
    initializeFirebase();
  }
  return db!;
};

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storage) {
    initializeFirebase();
  }
  return storage!;
};

// Initialize Firebase on module load (client-side only)
if (typeof window !== "undefined") {
  initializeFirebase();
}
