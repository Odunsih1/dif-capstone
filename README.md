# DIF Capstone Project: Instagram Clone

A simple Instagram-like social media app built as a part of the Digital Innovators Fellowship (DIF) Capstone Project.

## What it does

This is a web app where users can create accounts, post photos with captions, like posts, and view profiles. Built with React and Firebase.

## Features

- User signup and login
- Create posts with images and captions
- Like posts
- User profiles with profile pictures and bio
- Edit profile information
- Real-time updates

## Tech Stack

- React 19
- Firebase (Authentication & Firestore)
- Vite
- TailwindCSS
- React Router
- React Icons

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your Firebase config:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `/src/pages` - Main pages (Login, Signup, Profile, EditProfile)
- `/src/components` - Reusable components (Navbar, PostCard, ProfileMenu, etc.)
- `/src/firebase.js` - Firebase configuration

## Team

Built by *LogiCore* team members:
- [HENRY ODUNSI](https://github.com/Odunsih1)
- [Rofeeq Shittu](https://github.com/rofeeqshittu)
- [shadowzee123](https://github.com/shadowzee123)
- [Dominance]

## License

MIT License.
