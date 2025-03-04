"use client"
import { useEffect, useState } from "react";
import { messaging, getToken } from "@/lib/firebaseConfig"

export default function Home() {
  const [deviceToken, setDeviceToken] = useState<null | string>(null)
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        console.log("Service worker registration successful with scope: ", registration.scope);
      }).catch((err) => {
        console.log("Service worker registration failed: ", err);
      });
    }
  }, [])

  async function subscribe() {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("You need to allow notifications to subscribe!");
      return;
    }
    const token = await getToken(messaging, { vapidKey: "" });
    setDeviceToken(token)
  }
  return (
    <>
      <div>
        <h1> Token: {deviceToken}</h1>
        <button onClick={subscribe}>Subscribe Noti</button>
      </div>
    </>
  );
}
