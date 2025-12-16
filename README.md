# English Listening Game 🎧

A complete web-based English listening comprehension game built with vanilla HTML, CSS, and JavaScript. Help users improve their listening skills through audio-based challenges!

## Features

### 🎮 Core Gameplay
- **Word Mode**: Hear and type single words
- **Sentence Mode**: Hear and type complete sentences (unlocked after 10 levels)
- Audio playback with Web Speech API (Text-to-Speech)
- Real-time feedback with word-by-word comparison
- Countdown timer with visual warnings

### 📊 Difficulty Levels
- **Beginner**: Short words, slower speed (0.75x), 20-second time limit
- **Intermediate**: Medium phrases, normal speed (1x), 15-second time limit
- **Advanced**: Full sentences, faster speed (1.25x), 10-second time limit

### 🎯 Scoring System
- +10 points for correct answers
- +5 bonus points for answers within first 5 seconds
- Streak counter with fire emoji 🔥
- Progress bar showing level advancement
- High score tracking (saved in localStorage)

### 🏆 Badges & Achievements
- **🔥 Hot Streak** - 5 correct answers in a row
- **🔥🔥 Fire Master** - 10 correct answers in a row
- **🔥🔥🔥 Legend** - 20 correct answers in a row
- **⭐ Daily Champion** - Complete 10 levels in one session

### 🌍 Accent Support
- 🇺🇸 American English (en-US)
- 🇬🇧 British English (en-GB)
- 🇮🇳 Indian English (en-IN)

### ⚙️ Customization
- Adjustable audio speed: 0.75x (slow), 1x (normal), 1.25x (fast)
- Persistent settings across game sessions
- Progress saved in localStorage

## Project Structure

```
learn-english/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with animations
├── data.js            # Word/sentence data by difficulty
├── audio.js           # Audio playback manager (Web Speech API)
├── game.js            # Game logic and state management
├── app.js             # UI controller and event handlers
└── README.md          # This file
```

## Architecture

### Component Breakdown

1. **Welcome Screen** (`index.html`)
   - Difficulty selector
   - Mode selector (Word/Sentence)
   - Accent selector
   - Speed control
   - Start button

2. **Game Screen** (`index.html`)
   - Score/Streak/Level display
   - Badge container
   - Progress bar
   - Timer countdown
   - Audio controls (Play/Replay)
   - Answer input area
   - Feedback panel
   - Current settings display

3. **Data Layer** (`data.js`)
   - Word/sentence pools by difficulty
   - Badge definitions
   - Helper functions for data retrieval

4. **Audio Manager** (`audio.js`)
   - Web Speech API integration
   - Voice selection by accent
   - Speed/rate control
   - Playback state management

5. **Game Logic** (`game.js`)
   - State management
   - Score calculation
   - Answer validation
   - Badge checking
   - Timer management
   - localStorage persistence

6. **UI Controller** (`app.js`)
   - Screen transitions
   - Event handling
   - Feedback rendering
   - Display updates

### State Flow

```
User selects settings → Game initialized → Level starts
    ↓
Audio plays → Timer starts → User types answer
    ↓
Submit → Answer checked → Score updated → Badges checked
    ↓
Feedback shown → Next level or Quit
```

### Data Structures

```javascript
// Game State
{
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    mode: 'word' | 'sentence',
    accent: 'en-US' | 'en-GB' | 'en-IN',
    speed: 0.75 | 1.0 | 1.25,
    score: number,
    streak: number,
    level: number,
    levelsCompleted: number,
    earnedBadges: string[],
    currentChallenge: string,
    timeRemaining: number
}

// Result Object
{
    isCorrect: boolean,
    points: number,
    bonusPoints: number,
    correctAnswer: string,
    userAnswer: string,
    newBadges: Badge[],
    streak: number,
    score: number
}
```

## How to Use

1. **Open the game**: Simply open `index.html` in a modern web browser
2. **Select settings**: Choose difficulty, mode, accent, and speed
3. **Start playing**: Click "Start Game"
4. **Listen**: Audio plays automatically, or click replay
5. **Type**: Enter what you hear in the text area
6. **Submit**: Press Enter or click Submit
7. **Continue**: Click "Next Challenge" to proceed

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Safari: ✅ Full support
- Firefox: ✅ Full support (limited voice selection)

**Note**: The Web Speech API requires an internet connection for some voices.

## Core Logic Pseudocode

### Game Flow
```
FUNCTION startGame():
    Load settings from UI
    Initialize game state
    Show game screen
    Start first level

FUNCTION startNewLevel():
    Increment level counter
    Generate random challenge based on difficulty and mode
    Reset timer to difficulty's time limit
    Reset input field
    Auto-play audio

FUNCTION playAudio():
    Get current challenge text
    Select voice based on accent
    Set playback rate to speed
    Speak text using Web Speech API
    Start timer on first play

FUNCTION submitAnswer():
    Stop timer
    Normalize user answer (lowercase, trim, remove punctuation)
    Compare with correct answer
    Calculate points (base + bonus)
    Update score and streak
    Check for new badges
    Show feedback with word comparison
    Save progress to localStorage

FUNCTION checkAnswer(userAnswer):
    Normalize both answers
    Compare strings
    IF correct:
        Award 10 points
        IF answered within 5 seconds: Award 5 bonus points
        Increment streak
    ELSE:
        Reset streak to 0
    Check for badge achievements
    RETURN result object

FUNCTION checkBadges():
    IF streak == 5: Award "Hot Streak" badge
    IF streak == 10: Award "Fire Master" badge
    IF streak == 20: Award "Legend" badge
    IF level >= 10: Award "Daily Champion" badge
    RETURN new badges array
```

## Extending the Game

### Add New Difficulty Level
```javascript
// In data.js
extreme: {
    words: [...],
    sentences: [...],
    timeLimit: 7,
    defaultSpeed: 1.5
}
```

### Add More Badges
```javascript
// In data.js
perfectRound: {
    id: "perfectRound",
    name: "💯 Perfect Round",
    description: "10 levels with no mistakes!",
    requirement: 10
}
```

### Add Leaderboard
- Store scores with timestamps in localStorage
- Create leaderboard UI component
- Sort and display top scores

### Add User Accounts
- Integrate with backend API
- Store progress in database
- Sync across devices

## Development Notes

- **No dependencies**: Pure vanilla JavaScript
- **Responsive design**: Works on desktop and mobile
- **Persistent state**: Uses localStorage for progress
- **Modular code**: Separated concerns across files
- **Extensible**: Easy to add new features

## License

Free to use for educational purposes.

---

**Enjoy improving your English listening skills! 🎯🔥**
