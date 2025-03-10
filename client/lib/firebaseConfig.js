import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

let messaging = null;
if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export { messaging, getToken };
