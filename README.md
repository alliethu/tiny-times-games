# 🎮 Tiny Times Games

All the puzzle fun of grown-up games, made for the way kids actually think. Fresh games every day, zero grown-up words.

Built for **Asher** (age 7).

## Games

| Game | Description |
|------|-------------|
| 🟩 **Kid Wordle** | Guess a 4-letter word in 6 tries |
| 🐝 **Spelling Bee** | Find words from 7 letters (honeycomb style) |
| ✏️ **Mini Crossword** | 5×5 crossword with kid-friendly clues |
| 💡 **Daily Trivia** | 10 multiple-choice questions across fun topics |

## Features

- 📅 **Daily puzzles** — new games every day, no internet needed
- 🔥 **Streaks** — track how many days in a row you play
- ⭐ **Stars & badges** — earn rewards for great performance
- 🎉 **Celebrations** — confetti, fireworks, and fun animations
- 👦 **Kid-friendly** — age-appropriate words, big buttons, bright colors

## Tech Stack

- [Expo](https://expo.dev) (React Native) with TypeScript
- [Expo Router](https://docs.expo.dev/router/introduction/) for navigation
- AsyncStorage for local persistence
- Reanimated for animations
- 100% offline — all data bundled in-app

## Getting Started

```bash
npm install
npm start
```

Then scan the QR code with Expo Go on your phone, or press `i` for iOS simulator / `a` for Android emulator.

## Project Structure

```
app/              # Screens (Expo Router file-based routing)
  (tabs)/         # Tab navigator (Home, Wordle, Bee, Crossword, Trivia)
  stats.tsx       # Stats modal
components/       # Shared UI components
constants/        # Theme, colors, typography
data/             # Word lists, puzzles, trivia questions
lib/              # Game logic, rewards engine, daily puzzle selector
```
