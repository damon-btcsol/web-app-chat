# Web Chat App

This is a simple chat application built with React and Firebase. The app includes features like adding friends, blocking users, unblocking users, authentication, and chatting with friends in real-time.

## Features

- **Real-time Chat:** Chat with your friends in real-time.
- **Add Friend:** Send and accept friend requests.
- **Block User:** Block users to prevent them from sending you messages.
- **Unblock User:** Unblock users to allow them to send you messages.
- **Authentication:** Secure authentication with Firebase Authentication.

## Installation

Follow these steps to get the application up and running on your local machine.

### Prerequisites

- Node.js installed on your machine.
- A Firebase project set up. You will need the Firebase configuration details.

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/damon1205/web-chat-app.git
   cd web-chat-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Firebase:**

   Go to the Firebase console and create a new project.
   Enable Authentication and Firestore in the Firebase console.
   Obtain your Firebase configuration details from the project settings.
   Create a .env file:

   Create a .env file in the root of the project and add your Firebase configuration details:

   ```bash
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the application:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## Usage

1. **Sign Up / Log In:**

   - Create a new account or log in with an existing account.

2. **Add Friends:**

   - Search for users and send friend requests.

3. **Chat with Friends:**

   - Start a chat with any of your friends.

4. **Block / Unblock Users:**

   - Block users to prevent them from sending you messages.

   - Unblock users to allow them to send you messages again.
