# PhishVerse - Social Media Clone Pages

A Next.js application for creating and sharing phishing clone pages of social media platforms. Users can create clones, share them via links, and capture credentials from other devices.

## Features

- Create clone pages for Facebook, Twitter, LinkedIn, and Instagram
- Share clone links across devices
- Capture and view credentials in dashboard
- User authentication with Firebase
- Real-time data with Firestore

## Setup

1. **Firebase Setup:**
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication with Email/Password provider
   - Enable Firestore Database
   - Get your Firebase config from Project Settings

2. **Environment Variables:**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Firebase configuration values

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run the Application:**
   ```bash
   npm run dev
   ```

## Usage

- Sign up/Login to access the dashboard
- Create new clone pages from the dashboard
- Copy the public URL to share the clone page
- View captured credentials in the dashboard

## Architecture

- **Frontend:** Next.js with TypeScript
- **Authentication:** Firebase Auth
- **Database:** Firestore
- **Styling:** Tailwind CSS with shadcn/ui components

The clone pages are stored in Firestore and can be accessed via public URLs, allowing them to work on any device without requiring the creator to be logged in.
