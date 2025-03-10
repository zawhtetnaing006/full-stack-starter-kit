# NestJS API Starter

This setup can be used to kickstart developing an API for your NestJS application.

## How to Run

1. Start the application with Docker:
   ```bash
   docker compose up
   ```

2. Services:
   - API Documentation: [http://localhost:3000/doc](http://localhost:3000/doc)
   - Email Web UI: [http://localhost:8025](http://localhost:8025)

---

## Features

This setup includes configurations for:

1. **Push Notifications** (via Firebase)
2. **Email Services**

You can remove these if you don't need. To remove these features:

1. Remove the relevant modules from `app.module.ts`.
2. Remove validations from `config-validationSchema.ts`.

For details on setting up Push Notifications, refer to [FIREBASE.md](./FIREBASE.md).
