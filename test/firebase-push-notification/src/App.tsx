import { useEffect, useState } from 'react';
import { requestNotificationPermission, onMessageListener } from './firebase';
import './App.css';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState({ title: '', body: '' });

  useEffect(() => {
    // Request permission and get token
    const getToken = async () => {
      const fcmToken = await requestNotificationPermission();
      if (fcmToken) {
        setToken(fcmToken);
      }
    };

    getToken();

    // Listen for foreground messages
    const messageListener = async () => {
      try {
        const payload = await onMessageListener();
        setNotification({
          title: payload?.notification?.title || '',
          body: payload?.notification?.body || ''
        });
      } catch (error) {
        console.error('Error listening for messages:', error);
      }
    };

    messageListener();
  }, []);

  return (
    <div className="App">
      <h1>Firebase Push Notification Test</h1>
      
      <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h2>Device Token</h2>
        <p style={{ wordBreak: 'break-all' }}>
          {token || 'Waiting for token...'}
        </p>
      </div>

      {notification.title && (
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
          <h2>Last Notification</h2>
          <h3>{notification.title}</h3>
          <p>{notification.body}</p>
        </div>
      )}

      <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h2>Testing Instructions</h2>
        <ol style={{ textAlign: 'left' }}>
          <li>Create a Firebase project at <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
          <li>Enable Cloud Messaging in the Firebase Console</li>
          <li>Create a .env file with your Firebase config:
            <pre style={{ background: '#f5f5f5', padding: '10px' }}>
              {`VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key`}
            </pre>
          </li>
          <li>Copy the device token shown above</li>
          <li>Use Firebase Console or REST API to send a test notification</li>
        </ol>
      </div>
    </div>
  );
}

export default App;
