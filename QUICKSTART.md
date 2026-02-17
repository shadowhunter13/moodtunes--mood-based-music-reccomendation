# Quick Start - Open 2 Terminals

## Terminal 1: Start Backend Server
```bash
export PATH=$HOME/.local/bin:$PATH
cd "/home/priyanshu/Documents/mood based music reccomendation/music-reccomendation"
npm run server
```

You should see:
```
Connected to SQLite database
Server running on http://localhost:5000
```

## Terminal 2: Start Frontend Dev Server
```bash
export PATH=$HOME/.local/bin:$PATH
cd "/home/priyanshu/Documents/mood based music reccomendation/music-reccomendation"
npm run dev
```

You should see:
```
VITE v5.4.19  ready in 177 ms
➜  Local:   http://localhost:5173/
```

## Then Open in Browser
Go to: `http://localhost:5173/`

You'll be taken to the Login page. Register a new account and start creating playlists!

---

## Process:
1. Register → Creates new user in SQLite database
2. Login → Authenticates user and generates JWT token
3. Access main app → Create/view playlists
4. Logout → Clears session and returns to login

🎵 Enjoy MoodTunes!
