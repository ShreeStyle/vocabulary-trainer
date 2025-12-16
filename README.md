# English Listening Game

An interactive web-based application designed to improve English vocabulary and listening comprehension through audio-based challenges. Built with vanilla HTML, CSS, and JavaScript featuring a retro 90s Mac OS interface.

## Features

### Core Gameplay
- Word Mode: Listen and type single vocabulary words
- Sentence Mode: Listen and type complete sentences
- Text-to-speech audio playback using Web Speech API
- Real-time feedback with detailed word-by-word comparison
- Timer with visual countdown and warnings
- Wrong words tracking with correction list

### Difficulty Levels
- Beginner: Advanced vocabulary words, slower speed (0.75x), 30-second limit
- Intermediate: Complex academic terms, normal speed (1.0x), 30-second limit
- Advanced: Sophisticated and rare vocabulary, faster speed (1.25x), 30-second limit
- Very Hard: Extremely rare and challenging words, fastest speed (1.5x), 30-second limit

### Scoring System
- Base points for correct answers
- Bonus points for fast responses
- Streak counter tracking consecutive correct answers
- Progress bar indicating level advancement
- High score persistence using localStorage

### Achievements
- Hot Streak: 5 correct answers in a row
- Fire Master: 10 correct answers in a row
- Legend: 20 correct answers in a row
- Daily Champion: Complete 10 levels in one session

### Language Support
- American English (en-US)
- British English (en-GB)
- Indian English (en-IN)

### Customization
- Adjustable audio playback speed: 0.75x, 1.0x, 1.25x
- Persistent settings across sessions
- Progress tracking and saving
- Correction list to review mistakes during gameplay

## Project Structure

```
learn-english/
├── index.html          # Main HTML structure and UI
├── styles.css          # Complete styling with 90s Mac OS theme
├── data.js            # Vocabulary data organized by difficulty
├── audio.js           # Audio manager using Web Speech API
├── game.js            # Game logic and state management
├── app.js             # UI controller and event handlers
├── custom-dropdown.js # Custom dropdown menu implementation
└── README.md          # Documentation
```

## Architecture

### Component Overview

1. Welcome Screen
   - Difficulty level selector
   - Game mode selector
   - Accent preference selector
   - Playback speed control
   - Start game button

2. Game Screen
   - Score, streak, level, and timer display
   - Achievement badges container
   - Progress indicator
   - Audio control buttons (Play Audio / Replay)
   - Answer input textarea
   - Submit button
   - Feedback panel with detailed results
   - Quit and Correction List buttons
   - Current settings display

3. Data Layer (data.js)
   - Vocabulary pools organized by difficulty
   - Achievement badge definitions
   - Helper functions for data access

4. Audio Manager (audio.js)
   - Web Speech API integration
   - Voice selection based on accent
   - Playback rate control
   - Audio state management

5. Game Logic (game.js)
   - Complete state management
   - Score calculation algorithms
   - Answer validation and comparison
   - Achievement checking
   - Timer control
   - localStorage persistence

6. UI Controller (app.js)
   - Screen navigation
   - Event listener management
   - Dynamic feedback rendering
   - Display synchronization
   - Modal windows for corrections

## User Interface Design

The application features a retro 90s Macintosh operating system aesthetic:
- Classic window borders and buttons
- Outset and inset 3D effects
- Monospace Courier New font
- Traditional Mac OS color palette
- Custom dropdown menus
- Arrow cursor styling

## State Management
```javascript
// Game State Structure
{
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'veryhard',
    mode: 'word' | 'sentence',
    accent: 'en-US' | 'en-GB' | 'en-IN',
    speed: number,
    score: number,
    streak: number,
    level: number,
    levelsCompleted: number,
    earnedBadges: string[],
    currentChallenge: string,
    timeRemaining: number,
    wrongAnswers: array
}
```

## How to Use

1. Open index.html in a modern web browser
2. Select your preferred difficulty level
3. Choose game mode (Word or Sentence)
4. Select accent preference
5. Adjust audio playback speed if needed
6. Click Start Game
7. Listen to the audio (automatically plays)
8. Type what you hear in the text area
9. Submit your answer
10. Review feedback and continue to next level
11. Access Correction List anytime to review mistakes

## Browser Compatibility

- Chrome/Edge: Full support with all voices
- Safari: Full support with system voices
- Firefox: Full support with limited voice selection

Note: Web Speech API requires internet connection for some voices.

## Game Flow

```
User Configuration → Game Initialization → Level Start
    ↓
Audio Playback → Timer Start → User Input
    ↓
Answer Submission → Validation → Score Update
    ↓
Achievement Check → Feedback Display → Next Level
```

## Key Functions

### Starting a New Level
- Selects unused vocabulary from pool
- Resets timer based on difficulty
- Shows Play Audio button
- Clears previous input and feedback

### Audio Playback
- First play shows "Play Audio" button
- After playing, switches to "Replay" button
- Starts countdown timer on first play
- Disables buttons during playback

### Answer Validation
- Normalizes user input (lowercase, trim, punctuation removal)
- Compares with correct answer
- Calculates points and bonuses
- Updates streak counter
- Tracks wrong answers for correction list
- Checks for new achievement badges

### Correction List
- Displays all incorrect answers during session
- Shows correct word and user's attempt
- Accessible anytime during gameplay
- Modal popup with clean formatting

## Vocabulary Difficulty Progression

### Beginner Level
Words like: eloquent, resilient, pragmatic, paradigm, catalyst, methodology

### Intermediate Level
Words like: ameliorate, juxtaposition, ubiquitous, verisimilitude, iconoclast

### Advanced Level
Words like: abnegation, perspicacious, indefatigable, pusillanimous, recondite

### Very Hard Level
Words like: absquatulate, floccinaucinihilipilification, pneumonoultramicroscopicsilicovolcanoconiosis

## Extending the Application

### Adding New Vocabulary
Edit data.js and add words to the appropriate difficulty level array.

### Creating New Achievements
Define new badge objects in data.js with unique IDs and requirements.

### Customizing Appearance
Modify styles.css to change colors, fonts, spacing, and visual effects.

### Adding Features
- User authentication system
- Online leaderboards
- Additional language support
- Voice recording comparison
- Progress analytics dashboard
- Social sharing capabilities

## Technical Implementation

### Audio Management
Uses Web Speech API's SpeechSynthesisUtterance for text-to-speech with configurable:
- Voice selection by language/accent
- Playback rate/speed control
- Event handling for start/end callbacks

### Data Persistence
LocalStorage stores:
- High scores
- Levels completed
- User preferences
- Game settings

### Answer Comparison
Algorithm normalizes both correct answer and user input:
- Convert to lowercase
- Remove extra whitespace
- Strip punctuation
- Word-by-word comparison for detailed feedback

## Development Guidelines

- Pure vanilla JavaScript (no frameworks)
- Modular code organization
- Separation of concerns
- Event-driven architecture
- Responsive design principles
- Cross-browser compatibility

## License

Free to use for educational purposes.

---

Improve your English vocabulary through interactive listening practice.
