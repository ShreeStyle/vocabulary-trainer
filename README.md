# Level Up Your Vocabulary

Interactive web application for improving English vocabulary and listening comprehension through audio-based challenges. Features a retro 90s Mac OS interface.

## Features

- Word and Sentence modes with text-to-speech playback
- Four difficulty levels with varying speeds
- Real-time feedback and scoring system
- Achievement badges for streaks
- Multiple accent support (US, UK, Indian English)
- Wrong words correction list
- Progress tracking with localStorage

## Files

```
index.html          # Main UI structure
styles.css          # 90s Mac OS themed styling
data.js            # Vocabulary data by difficulty
audio.js           # Web Speech API manager
game.js            # Game logic and state
app.js             # UI controller
custom-dropdown.js # Custom dropdown component
```

## How to Use

1. Open index.html in a web browser
2. Select difficulty level and game mode
3. Choose accent and playback speed
4. Click Start Game
5. Listen and type what you hear
6. Submit answer and progress through levels

## Difficulty Levels

- Beginner: Advanced words, 0.75x speed, 30 seconds
- Intermediate: Academic terms, 1.0x speed, 30 seconds
- Advanced: Rare vocabulary, 1.25x speed, 30 seconds
- Very Hard: Extremely rare words, 1.5x speed, 30 seconds

## Technical Details

Built with vanilla JavaScript, HTML, and CSS. Uses Web Speech API for audio playback. Data persisted via localStorage.

## Browser Support

Chrome, Edge, Safari, and Firefox. Internet connection required for some voices.
