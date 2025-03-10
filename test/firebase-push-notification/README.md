# Firebase Push Notification Setup Guide

## Firebase Setup:

1. **Go to Firebase Console**  
   [Firebase Console](https://console.firebase.google.com)

2. **Create or Select a Project**

   - Create a new project or select an existing one.

3. **Add a Web App**
   - Navigate to **Project Settings > General**.
   - Add a web app to your project by clicking the web icon (`</>`).
   - Register the app and copy the Firebase configuration values.

---

## Enable Cloud Messaging:

1. **Access Cloud Messaging**

   - Go to **Build > Cloud Messaging** in the Firebase Console.

2. **Generate a VAPID Key**
   - Under the **Web Push certificates** section, generate a VAPID key.
   - Copy the generated VAPID key.

---

## Configure the Project:

1. **Copy the Example Environment File**

   - In the project root, run:
     ```bash
     cp .env.example .env
     ```

2. **Fill in the `.env` File**  
   Add the Firebase configuration values and VAPID key:
   ```env
   VITE_FIREBASE_API_KEY=Your Firebase API Key
   VITE_FIREBASE_AUTH_DOMAIN=Your Firebase Auth Domain
   VITE_FIREBASE_PROJECT_ID=Your Firebase Project ID
   VITE_FIREBASE_STORAGE_BUCKET=Your Firebase Storage Bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=Your Firebase Messaging Sender ID
   VITE_FIREBASE_APP_ID=Your Firebase App ID
   VITE_FIREBASE_VAPID_KEY=Your VAPID Key
   ```

---

## Run the Project:

1. **Navigate to the Project Directory**

   ```bash
   cd test/firebase-push-notification
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   **NOTE:** You will see device token on web ui

---

## Test Push Notifications:

### a. Using Firebase Console:

1. Go to **locahost:3000/doc**
2. Try /api/notifications/healthcheck api.
3. Paste your device token to api payload

---

## Notes:

- **Chrome** is recommended for testing.
