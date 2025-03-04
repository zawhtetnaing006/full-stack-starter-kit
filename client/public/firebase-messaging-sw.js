importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDq22aKLgDOg8VnWgtTb5ax9OPzOuav1pA",
  authDomain: "test-app-98cf7.firebaseapp.com",
  projectId: "test-app-98cf7",
  storageBucket: "test-app-98cf7.firebasestorage.app",
  messagingSenderId: "461102927793",
  appId: "1:461102927793:web:818a92bd0bb132fe643790",
  measurementId: "G-54C53JM0JS",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
