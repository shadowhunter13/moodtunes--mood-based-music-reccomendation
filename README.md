# MoodTunes - Mood Based Music Recommendation

A modern web application that recommends music based on your mood. Built with React, Vite, Express, and SQLite.

## Features

- **Mood-Based Recommendations** — Get personalized music suggestions based on your current mood
- **User Authentication** — Register and login securely with JWT tokens
- **Multi-Language Support** — Browse music in different languages
- **Music Language Selection** — Filter music recommendations by language preference
- **Responsive Design** — Works seamlessly on desktop and mobile devices
- **SQLite Database** — Persistent user data storage

## Demo Credentials

For testing purposes, you can login with:
- **Email:** `admin@gmail.com`
- **Password:** `admin123`

## Tech Stack

- **Frontend:** React 18, Vite, React Router
- **Backend:** Node.js, Express
- **Database:** SQLite3
- **Authentication:** JWT, bcryptjs
- **Styling:** CSS3 with gradients and animations

## Prerequisites

- Node.js v20.10.0 or later
- npm (included with Node.js)

## Installation

1. Navigate to the project directory:
```bash
cd music-reccomendation
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Option 1: Run both frontend and backend together
```bash
npm run dev:all
```
This starts both the Vite dev server (port 5173) and Express backend (port 5000).

### Option 2: Run them separately

Frontend only:
```bash
npm run dev
```
Runs on `http://localhost:5173`

Backend only:
```bash
npm run server
```
Runs on `http://localhost:5000`

## Project Structure

```
music-reccomendation/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── MoodSelector.jsx
│   │   ├── MusicRecommendations.jsx
│   │   └── Auth.css
│   ├── config/
│   │   └── api.js
│   ├── data/
│   │   ├── languages.js
│   │   ├── musicData.js
│   │   └── musicDataByLanguage.js
│   └── App.jsx
├── server.js          # Express backend
├── package.json
├── vite.config.js
└── index.html
```

## API Endpoints

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login with email and password
- `POST /api/auth/verify` — Verify JWT token

## Database

The app uses SQLite with the following schema:

**users table:**
- `id` — Primary key
- `username` — Unique username
- `email` — Unique email address
- `password` — BCrypt hashed password
- `createdAt` — Account creation timestamp

## Environment Variables

Create a `.env` file in the project root:
```
PORT=5000
JWT_SECRET=your_secret_key_change_in_production
```

## Available Scripts

- `npm run dev` — Start Vite dev server (frontend)
- `npm run build` — Build for production
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build
- `npm run server` — Start Express backend
- `npm run dev:all` — Start both server and frontend concurrently

## Contributing

Feel free to submit issues and enhancement requests.

## License

MIT License
