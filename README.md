# 🎂 Retro Nostalgia OS — Birthday Gift for Sumit Sanghi

A full-screen, interactive Windows 95-style birthday experience built with Next.js 14.

---

## Before Deploying — Personalization Checklist

### 1. Edit `config.ts`
Fill in all the personal details:
- `recipientName`, `recipientFirstName`, `recipientAge`
- `gifterName`
- `personalMessage`
- `playlist` — add real song names (no audio files needed)
- `insideJokes` — add 5-10 inside jokes for the terminal
- `terminalFacts` — add 5 fun facts about the birthday person
- `stories` — the DadTales app stories (already filled with sample content)

### 2. Add Photos (Optional)
Place photos in `/public/photos/` organized by folder:
```
public/photos/
├── early-years/
│   ├── 1.jpg
│   └── 2.jpg
├── adventures/
│   └── 1.jpg
└── ...
```
Then update `config.ts` → `photos` to point to those paths.

### 3. Add Audio (Optional)
Place a birthday song at `/public/audio/birthday.mp3`.
The app works without it — sounds are generated via Web Audio API.

---

## Deploy to Vercel (Free)

```bash
# 1. Initialize git
git init
git add .
git commit -m "🎂 Birthday OS for Sumit"

# 2. Push to GitHub
# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/retro-nostalgia-os.git
git push -u origin main

# 3. Deploy
# Go to vercel.com → New Project → Import from GitHub
# Framework: Next.js (auto-detected)
# No environment variables needed
# Click Deploy → Get shareable URL

# 4. Send URL to birthday person! 🎉
```

---

## To Update After Deploy

```bash
git add .
git commit -m "Update: added more stories"
git push
# Vercel auto-redeploys in ~30 seconds
```

---

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## Features

| App | Description |
|-----|-------------|
| 🎂 Birthday Card | Auto-opens on boot with pixel art cake |
| 📁 My Memories | Photo album explorer with placeholders |
| 📝 DadTales.exe | Story reader with personal stories |
| 🎵 WinBlast 2000 | Winamp-style player with animated EQ |
| 💻 cmd.exe | Terminal with 12 commands + text adventure |
| 💣 Minesweeper | Fully playable (3 difficulty levels) |
| ℹ️ About This PC | OS info window |

---

Built with love by Rhythm Sanghi 💙
