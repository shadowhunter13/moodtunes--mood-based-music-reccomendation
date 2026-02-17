# MoodTunes - Setup Guide

## Installation Steps

### 1. Install Frontend Dependencies
```bash
export PATH=$HOME/.local/bin:$PATH
cd "/home/priyanshu/Documents/mood based music reccomendation/music-reccomendation"
npm install
```

### 2. Install Backend Dependencies
The backend requires additional Node.js packages. Run:
```bash
npm install express sqlite3 bcryptjs jsonwebtoken cors dotenv concurrently
```

### 3. Running the Application

#### Option A: Run Frontend and Backend Separately
**Terminal 1 - Start Backend Server:**
```bash
export PATH=$HOME/.local/bin:$PATH
cd "/home/priyanshu/Documents/mood based music reccomendation/music-reccomendation"
npm run server
```

**Terminal 2 - Start Frontend Dev Server:**
```bash
export PATH=$HOME/.local/bin:$PATH
cd "/home/priyanshu/Documents/mood based music reccomendation/music-reccomendation"
npm run dev
```

#### Option B: Run Both Together
```bash
export PATH=$HOME/.local/bin:$PATH
cd "/home/priyanshu/Documents/mood based music reccomendation/music-reccomendation"
npm run dev:all
```

### 4. Access the Application
- Frontend: `http://localhost:5173/`
- Backend API: `http://localhost:5000/`

## Features Implemented

### Authentication
- **Register** - Create a new account with username, email, and password
- **Login** - Sign in with your email and password
- **JWT Tokens** - Secure token-based authentication
- **User Session** - Sessions persist using localStorage

### Database
- **SQLite Database** - Local database (users.db) stores user credentials
- **Password Hashing** - Bcrypt for secure password storage
- **User Information** - Stores username, email, and creation timestamp

### Frontend Features
- Login Page - Beautiful authentication interface
- Register Page - User registration with validation
- Protected Routes - Only logged-in users can access main app
- User Menu - Display username and logout option
- Playlist Management - Create, view, and delete playlists

## File Structure

```
music-reccomendation/
├── server.js                    # Backend Express server
├── .env                        # Environment variables
├── users.db                    # SQLite database (created on first run)
├── package.json                # Dependencies
├── src/
│   ├── components/
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Register page
│   │   ├── Auth.css            # Authentication styles
│   │   ├── PlaylistBuilder.jsx
│   │   └── ...
│   ├── App.jsx                 # Main app with auth routes
│   └── ...
```

## Environment Variables (.env)
```
JWT_SECRET=your_secret_key_change_in_production_12345
PORT=5000
```

## API Endpoints

### Register User
- **POST** `/api/auth/register`
- Body: `{ username, email, password, confirmPassword }`
- Returns: `{ token, user }`

### Login User
- **POST** `/api/auth/login`
- Body: `{ email, password }`
- Returns: `{ token, user }`

### Verify Token
- **POST** `/api/auth/verify`
- Headers: `Authorization: Bearer <token>`
- Returns: `{ valid, user }`

## Default User (Optional - for testing)
You can create test users by registering through the UI.

## Troubleshooting

### "Cannot find module 'express'"
Run: `npm install express sqlite3 bcryptjs jsonwebtoken cors dotenv concurrently`

### "Database is locked"
Delete the `users.db` file and restart the server.

### "Port 5000 already in use"
Change PORT in `.env` file or kill the process using that port.

### "CORS errors"
Make sure the backend is running on `http://localhost:5000`

## Security Notes
⚠️ **IMPORTANT**: 
- Change `JWT_SECRET` in `.env` file for production
- Keep `.env` file secure and never commit it to version control
- Use HTTPS in production
- Never share your JWT tokens
