// Game Logic and State Management

class Game {
    constructor() {
        // Game state
        this.state = {
            difficulty: 'beginner',
            mode: 'word',
            accent: 'en-US',
            speed: 1.0,
            score: 0,
            streak: 0,
            level: 0,
            levelsCompleted: 0,
            earnedBadges: [],
            currentChallenge: null,
            currentAnswer: null,
            timeRemaining: 30,
            timerInterval: null,
            isPlaying: false,
            usedChallenges: [],
            wrongAnswers: []
        };

        // Load saved progress from localStorage
        this.loadProgress();
    }

    // Initialize game settings
    initSettings(difficulty, mode, accent, speed) {
        this.state.difficulty = difficulty;
        this.state.mode = mode;
        this.state.accent = accent;
        this.state.speed = parseFloat(speed);
        
        // Update default speed based on difficulty if not manually set
        if (!this.state.speedManuallySet) {
            this.state.speed = getDefaultSpeed(difficulty);
        }
    }

    // Start new level
    startNewLevel() {
        this.state.level++;
        
        // Get available challenges (excluding used ones)
        const data = gameData[this.state.difficulty];
        const pool = this.state.mode === 'word' ? data.words : data.sentences;
        const availableChallenges = pool.filter(c => !this.state.usedChallenges.includes(c));
        
        // Reset used challenges if we've used them all
        if (availableChallenges.length === 0) {
            this.state.usedChallenges = [];
            this.state.currentChallenge = getRandomChallenge(this.state.difficulty, this.state.mode);
        } else {
            // Pick random from available
            const randomIndex = Math.floor(Math.random() * availableChallenges.length);
            this.state.currentChallenge = availableChallenges[randomIndex];
        }
        
        // Add to used list
        this.state.usedChallenges.push(this.state.currentChallenge);
        
        this.state.currentAnswer = null;
        this.state.timeRemaining = getTimeLimit(this.state.difficulty);
        this.state.isPlaying = false;
        this.state.completionTime = null;
        
        console.log(`Level ${this.state.level}: ${this.state.currentChallenge}`);
    }

    // Start timer
    startTimer(onTick, onTimeout) {
        this.stopTimer();
        
        this.state.timerInterval = setInterval(() => {
            this.state.timeRemaining--;
            
            if (onTick) {
                onTick(this.state.timeRemaining);
            }
            
            if (this.state.timeRemaining <= 0) {
                this.stopTimer();
                if (onTimeout) {
                    onTimeout();
                }
            }
        }, 1000);
    }

    // Stop timer
    stopTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    }

    // Check answer
    checkAnswer(userAnswer) {
        const correctAnswer = this.state.currentChallenge;
        const normalizedUserAnswer = this.normalizeAnswer(userAnswer);
        const normalizedCorrectAnswer = this.normalizeAnswer(correctAnswer);
        
        const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
        
        // Calculate completion time
        const timeLimit = getTimeLimit(this.state.difficulty);
        const timeTaken = timeLimit - this.state.timeRemaining;
        this.state.completionTime = timeTaken;
        
        // Calculate score
        let points = 0;
        let bonusPoints = 0;
        
        if (isCorrect) {
            points = 10;
            
            // Bonus for quick answer (within first 5 seconds)
            if (this.state.timeRemaining > timeLimit - 5) {
                bonusPoints = 5;
                points += bonusPoints;
            }
            
            this.state.score += points;
            this.state.streak++;
        } else {
            this.state.streak = 0;
            
            // Track wrong answer
            this.state.wrongAnswers.push({
                word: correctAnswer,
                yourAnswer: userAnswer,
                difficulty: this.state.difficulty,
                mode: this.state.mode
            });
        }
        
        // Check for new badges
        const newBadges = this.checkBadges();
        
        return {
            isCorrect,
            points,
            bonusPoints,
            correctAnswer,
            userAnswer,
            newBadges,
            streak: this.state.streak,
            score: this.state.score
        };
    }

    // Normalize answer for comparison
    normalizeAnswer(answer) {
        return answer
            .toLowerCase()
            .trim()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Remove punctuation
            .replace(/\s+/g, ' '); // Normalize spaces
    }

    // Compare words for feedback highlighting
    compareWords(userAnswer, correctAnswer) {
        const userWords = userAnswer.toLowerCase().trim().split(/\s+/);
        const correctWords = correctAnswer.toLowerCase().trim().split(/\s+/);
        
        const result = [];
        const maxLength = Math.max(userWords.length, correctWords.length);
        
        for (let i = 0; i < maxLength; i++) {
            const userWord = userWords[i] || '';
            const correctWord = correctWords[i] || '';
            
            result.push({
                word: userWord || correctWord,
                isCorrect: userWord === correctWord,
                isMissing: !userWord && correctWord,
                isExtra: userWord && !correctWord
            });
        }
        
        return result;
    }

    // Check for earned badges
    checkBadges() {
        const newBadges = [];
        
        // Check streak badges
        if (this.state.streak === 5 && !this.state.earnedBadges.includes('streak5')) {
            newBadges.push(badges.streak5);
            this.state.earnedBadges.push('streak5');
        }
        
        if (this.state.streak === 10 && !this.state.earnedBadges.includes('streak10')) {
            newBadges.push(badges.streak10);
            this.state.earnedBadges.push('streak10');
        }
        
        if (this.state.streak === 20 && !this.state.earnedBadges.includes('streak20')) {
            newBadges.push(badges.streak20);
            this.state.earnedBadges.push('streak20');
        }
        
        // Check daily challenge badge (10 levels completed)
        if (this.state.level >= 10 && !this.state.earnedBadges.includes('dailyChallenge')) {
            newBadges.push(badges.dailyChallenge);
            this.state.earnedBadges.push('dailyChallenge');
        }
        
        return newBadges;
    }

    // Get current state
    getState() {
        return { ...this.state };
    }

    // Update state
    updateState(updates) {
        this.state = { ...this.state, ...updates };
    }

    // Reset game
    reset() {
        this.stopTimer();
        this.state = {
            difficulty: this.state.difficulty,
            mode: this.state.mode,
            accent: this.state.accent,
            speed: this.state.speed,
            score: 0,
            streak: 0,
            level: 0,
            levelsCompleted: this.state.levelsCompleted,
            earnedBadges: this.state.earnedBadges,
            currentChallenge: null,
            currentAnswer: null,
            timeRemaining: 30,
            timerInterval: null,
            isPlaying: false,
            usedChallenges: [],
            wrongAnswers: []
        };
    }

    // Save progress to localStorage
    saveProgress() {
        const progress = {
            levelsCompleted: this.state.levelsCompleted + this.state.level,
            earnedBadges: this.state.earnedBadges,
            highScore: Math.max(this.state.score, parseInt(localStorage.getItem('highScore') || '0'))
        };
        
        localStorage.setItem('gameProgress', JSON.stringify(progress));
        localStorage.setItem('highScore', progress.highScore.toString());
        
        console.log('Progress saved:', progress);
    }

    // Load progress from localStorage
    loadProgress() {
        const savedProgress = localStorage.getItem('gameProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            this.state.levelsCompleted = progress.levelsCompleted || 0;
            this.state.earnedBadges = progress.earnedBadges || [];
            
            console.log('Progress loaded:', progress);
        }
    }

    // Check if sentence mode is unlocked
    isSentenceModeUnlocked() {
        return true;
    }

    // Get high score
    getHighScore() {
        return parseInt(localStorage.getItem('highScore') || '0');
    }
}

// Create global game instance
const game = new Game();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Game;
}
