## Firebase Push Notification Setup

### 1. Get Firebase Admin SDK Credentials

- Visit [Firebase Console](https://console.firebase.google.com).
- Select your project.
- Go to **Project Settings > Service Accounts**.
- Click **Generate New Private Key**.
- Download the JSON file and save it securely.

### 2. Add Firebase Environment Variables

Add the following variables to your `./backend/.env.local` file:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key
```

**Note:**

- Copy these values from the downloaded JSON file:
  - `project_id` → `FIREBASE_PROJECT_ID`
  - `client_email` → `FIREBASE_CLIENT_EMAIL`
  - `private_key` → `FIREBASE_PRIVATE_KEY` (include the quotes)

---

### 3. Import Notification Module

Add the `NotificationModule` to `app.module.ts`:

```typescript
import { NotificationModule } from "./v1/notification/notification.module";

@Module({
  imports: [
    // ... other imports
    NotificationModule,
  ],
})
export class AppModule {}
```

---

### 4. Test Push Notifications

#### a. Obtain a Device Token

Retrieve the device token from your client app (Sample client app can be found at test/firebase-push-notication). For details on setting up Client, refer to [FIREBASE.md](./test/firebase-push-notification/README.md).

#### b. Send a Test Notification

Send a POST request to test push notifications:

```bash
curl -X POST http://localhost:3000/v1/notifications/healthcheck \
  -H "Content-Type: application/json" \
  -d '{"deviceToken": "your-device-token"}'
```

---

### 5. Use in Other Services

Inject and use the `NotificationService` in other modules:

```typescript
constructor(private notificationService: NotificationService) {}

async someMethod() {
  await this.notificationService.sendNotification({
    push: {
      deviceToken: "device-token",
      title: "Notification Title",
      message: "Notification Message",
      image: "optional-image-url"
    },
    email: {
      from: "sender@example.com",
      to: "recipient@example.com",
      subject: "Email Subject",
      text: "Email Content"
    }
  });
}
```

**Note:** The `NotificationService` supports both email and push notifications. You can include either or both, as needed.

