// Main Application - UI Controller and Event Handlers

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const gameScreen = document.getElementById('gameScreen');

// Welcome screen elements
const difficultySelect = document.getElementById('difficultySelect');
const modeSelect = document.getElementById('modeSelect');
const sentenceOption = document.getElementById('sentenceOption');
const accentSelect = document.getElementById('accentSelect');
const speedSelect = document.getElementById('speedSelect');
const startGameBtn = document.getElementById('startGameBtn');

// Game screen elements
const scoreDisplay = document.getElementById('scoreDisplay');
const streakDisplay = document.getElementById('streakDisplay');
const levelDisplay = document.getElementById('levelDisplay');
const badgesContainer = document.getElementById('badgesContainer');
const progressFill = document.getElementById('progressFill');
const timerDisplay = document.getElementById('timerDisplay');
const playAudioBtn = document.getElementById('playAudioBtn');
const replayAudioBtn = document.getElementById('replayAudioBtn');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const feedbackPanel = document.getElementById('feedbackPanel');
const feedbackContent = document.getElementById('feedbackContent');
const quitBtn = document.getElementById('quitBtn');
const correctionListBtn = document.getElementById('correctionListBtn');
const currentDifficulty = document.getElementById('currentDifficulty');
const currentMode = document.getElementById('currentMode');
const currentAccent = document.getElementById('currentAccent');
const currentSpeed = document.getElementById('currentSpeed');

// Initialize app
function init() {
    // Check if sentence mode should be unlocked
    if (game.isSentenceModeUnlocked()) {
        sentenceOption.disabled = false;
        sentenceOption.textContent = 'Sentence Mode - Type full sentences (UNLOCKED!)';
        
        // Also update custom dropdown
        const sentenceCustomOption = document.getElementById('sentenceOptionCustom');
        if (sentenceCustomOption) {
            sentenceCustomOption.classList.remove('disabled');
            sentenceCustomOption.textContent = 'Sentence Mode - Type full sentences (UNLOCKED!)';
        }
    }
    
    // Set default speed based on difficulty
    updateSpeedForDifficulty();
    
    // Display high score if exists
    const highScore = game.getHighScore();
    const welcomeSubtitle = document.getElementById('welcomeSubtitle');
    if (highScore > 0 && welcomeSubtitle) {
        welcomeSubtitle.textContent = `=> Improve your vocabulary | High Score: ${highScore}`;
    }
    
    // Add event listeners
    attachEventListeners();
}

// Attach all event listeners
function attachEventListeners() {
    // Welcome screen
    startGameBtn.addEventListener('click', startGame);
    difficultySelect.addEventListener('change', updateSpeedForDifficulty);
    
    // Game screen
    // Game screen
    playAudioBtn.addEventListener('click', playAudio);
    replayAudioBtn.addEventListener('click', playAudio);
    submitBtn.addEventListener('click', submitAnswer);
    quitBtn.addEventListener('click', quitGame);
    correctionListBtn.addEventListener('click', showCorrectionList);
    // Enter key to submit
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitAnswer();
        }
    });
}

// Update speed select based on difficulty
function updateSpeedForDifficulty() {
    const difficulty = difficultySelect.value;
    const defaultSpeed = getDefaultSpeed(difficulty);
    speedSelect.value = defaultSpeed.toString();
}

// Start game
function startGame() {
    // Get settings
    const difficulty = difficultySelect.value;
    const mode = modeSelect.value;
    const accent = accentSelect.value;
    const speed = speedSelect.value;
    
    // Initialize game
    game.initSettings(difficulty, mode, accent, speed);
    
    // Switch screens
    welcomeScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // Update settings display
    updateSettingsDisplay();
    
    // Start first level
    nextLevel();
}

// Update settings display
function updateSettingsDisplay() {
    const state = game.getState();
    currentDifficulty.textContent = `Difficulty: ${state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1)}`;
    currentMode.textContent = `Mode: ${state.mode.charAt(0).toUpperCase() + state.mode.slice(1)}`;
    currentAccent.textContent = `Accent: ${state.accent}`;
    currentSpeed.textContent = `Speed: ${state.speed}x`;
}

// Start next level
function nextLevel() {
    // Start new level
    game.startNewLevel();
    const state = game.getState();
    
    // Update UI
    updateGameDisplay();
    
    // Reset input
    answerInput.value = '';
    answerInput.disabled = false;
    submitBtn.disabled = false;
    
    // Hide feedback panel
    feedbackPanel.classList.add('hidden');
    
    // Reset audio buttons - show Play Audio, hide Replay
    playAudioBtn.classList.remove('hidden');
    replayAudioBtn.classList.add('hidden');
    
    // Enable audio buttons
    playAudioBtn.disabled = false;
    replayAudioBtn.disabled = false;
    
    // Focus on input
    answerInput.focus();
    
    // Auto-play audio
    setTimeout(() => {
        playAudio();
    }, 500);
}

// Update game display
function updateGameDisplay() {
    const state = game.getState();
    
    // Update stats
    // Update stats
    scoreDisplay.textContent = state.score;
    streakDisplay.textContent = state.streak;
    levelDisplay.textContent = state.level;
    // Update timer
    timerDisplay.textContent = state.timeRemaining;
    timerDisplay.classList.remove('warning');
    
    // Update progress bar (based on level progress, arbitrary max of 20)
    const progress = Math.min((state.level / 20) * 100, 100);
    progressFill.style.width = `${progress}%`;
    
    // Display badges
    displayBadges();
}

// Display earned badges
// Display earned badges
function displayBadges() {
    const state = game.getState();
    badgesContainer.innerHTML = '';
    
    state.earnedBadges.forEach(badgeId => {
        const badge = badges[badgeId];
        if (badge) {
            const badgeEl = document.createElement('div');
            badgeEl.className = 'badge';
            // Remove emojis from badge names
            badgeEl.textContent = badge.name.replace(/[^\w\s]/g, '').trim();
            badgeEl.title = badge.description;
            badgesContainer.appendChild(badgeEl);
        }
    });
}
// Play audio
function playAudio() {
    const state = game.getState();
    
    if (!state.currentChallenge) {
        console.error('No challenge to play');
        return;
    }
    
    // Disable buttons during playback
    playAudioBtn.disabled = true;
    replayAudioBtn.disabled = true;
    
    // Play audio
    audioManager.speak(
        state.currentChallenge,
        state.accent,
        state.speed,
        () => {
            // On end
            playAudioBtn.disabled = false;
            replayAudioBtn.disabled = false;
            
            // After first play, hide Play Audio and show Replay
            playAudioBtn.classList.add('hidden');
            replayAudioBtn.classList.remove('hidden');
            
            // Start timer on first play
            if (!game.getState().isPlaying) {
                game.updateState({ isPlaying: true });
                startGameTimer();
            }
        },
        () => {
            // On start
            console.log('Audio started');
        }
    );
}

// Start game timer
function startGameTimer() {
    game.startTimer(
        (timeRemaining) => {
            // On tick
            timerDisplay.textContent = timeRemaining;
            
            // Warning when time is low
            if (timeRemaining <= 5) {
                timerDisplay.classList.add('warning');
            }
        },
        () => {
            // On timeout
            handleTimeout();
        }
    );
}

// Handle timeout
function handleTimeout() {
    // Disable input
    answerInput.disabled = true;
    submitBtn.disabled = true;
    
    // Show timeout feedback
    showFeedback({
        isCorrect: false,
        points: 0,
        bonusPoints: 0,
        correctAnswer: game.getState().currentChallenge,
        userAnswer: answerInput.value.trim() || '(No answer)',
        newBadges: [],
        streak: game.getState().streak,
        score: game.getState().score,
        timeout: true
    });
}

// Submit answer
function submitAnswer() {
    const userAnswer = answerInput.value.trim();
    
    if (!userAnswer) {
        alert('Please type your answer!');
        return;
    }
    
    // Stop timer
    game.stopTimer();
    
    // Check answer
    const result = game.checkAnswer(userAnswer);
    
    // Disable input
    answerInput.disabled = true;
    submitBtn.disabled = true;
    playAudioBtn.disabled = true;
    replayAudioBtn.disabled = true;
    
    // Show feedback
    showFeedback(result);
    
    // Save progress
    game.saveProgress();
}

// Show feedback
function showFeedback(result) {
    const { isCorrect, points, bonusPoints, correctAnswer, userAnswer, newBadges, timeout } = result;
    
    // Update display
    updateGameDisplay();
    
    // Build feedback HTML
    let feedbackHTML = '';
    
    if (timeout) {
        feedbackHTML = `
            <div class="feedback-title incorrect">Time's Up!</div>
            <div class="feedback-detail">
                <strong>Your answer:</strong>
                <div class="your-answer">${userAnswer}</div>
            </div>
            <div class="feedback-detail">
                <strong>Correct answer:</strong>
                <div class="correct-answer">${correctAnswer}</div>
            </div>
        `;
    } else if (isCorrect) {
        // Get completion time from game state
        const completionTime = game.getState().completionTime || 0;
        
        feedbackHTML = `
            <div class="feedback-title correct">=> Correct! Finished in ${completionTime} sec</div>
            <div class="feedback-detail">
                <strong>Points earned:</strong> +${points}
            </div>
        `;
        
        if (bonusPoints > 0) {
            feedbackHTML += `
                <div class="bonus-points">
                    Speed bonus: +${bonusPoints} points!
                </div>
            `;
        }
        
        if (newBadges.length > 0) {
            feedbackHTML += `<div class="feedback-detail"><strong>New badges:</strong></div>`;
            newBadges.forEach(badge => {
                feedbackHTML += `<div class="badge">${badge.name}</div>`;
            });
        }
    } else {
        // Show word-by-word comparison
        const comparison = game.compareWords(userAnswer, correctAnswer);
        let comparisonHTML = '';
        
        comparison.forEach(item => {
            if (item.isCorrect) {
                comparisonHTML += `<span class="word-correct">${item.word}</span> `;
            } else {
                comparisonHTML += `<span class="word-incorrect">${item.word}</span> `;
            }
        });
        
        feedbackHTML = `
            <div class="feedback-title incorrect">=> Incorrect</div>
            <div class="feedback-detail">
                <strong>Your answer:</strong>
                <div class="your-answer">${comparisonHTML}</div>
            </div>
            <div class="feedback-detail">
                <strong>Correct answer:</strong>
                <div class="correct-answer">${correctAnswer}</div>
            </div>
        `;
    }
    
    // Set feedback content
    feedbackContent.innerHTML = feedbackHTML;
    
    // Set panel class
    feedbackPanel.className = 'feedback-panel';
    if (isCorrect && !timeout) {
        feedbackPanel.classList.add('feedback-correct');
    } else {
        feedbackPanel.classList.add('feedback-incorrect');
    }
    
    // Show panel
    feedbackPanel.classList.remove('hidden');
    
    // Auto-advance to next level after 2 seconds
    setTimeout(() => {
        nextLevel();
    }, 2000);
}

// Quit game
function quitGame() {
    const confirmed = confirm('Are you sure you want to quit? Your progress will be saved.');
    
    if (confirmed) {
        // Save wrong answers before reset
        const wrongAnswers = [...game.getState().wrongAnswers];
        
        // Save progress
        game.saveProgress();
        
        // Reset game
        game.reset();
        
        // Switch screens
        gameScreen.classList.remove('active');
        welcomeScreen.classList.add('active');
        
        // Store wrong answers in results screen
        resultsScreen.wrongAnswers = wrongAnswers;
        
        // Show wrong answers summary after screen switch
        if (wrongAnswers.length > 0) {
            showWrongAnswersSummary(wrongAnswers);
        }
    }
}

// Show correction list during game
function showCorrectionList() {
    const wrongAnswers = game.getState().wrongAnswers;
    
    if (wrongAnswers.length === 0) {
        alert('No mistakes yet! Keep up the good work!');
        return;
    }
    
    showWrongAnswersSummary(wrongAnswers);
}

// Show wrong answers summary
function showWrongAnswersSummary(wrongAnswers) {
    const summaryDiv = document.getElementById('wrongAnswersSummary');
    const listDiv = document.getElementById('wrongAnswersList');
    const overlay = document.getElementById('modalOverlay');
    
    if (!wrongAnswers || wrongAnswers.length === 0) {
        summaryDiv.classList.add('hidden');
        overlay.classList.add('hidden');
        return;
    }
    
    // Build list of wrong answers
    let html = '<ul>';
    wrongAnswers.forEach((item, index) => {
        html += `<li><strong>Word:</strong> ${item.word}<br><strong>You wrote:</strong> ${item.yourAnswer}</li>`;
    });
    html += '</ul>';
    
    listDiv.innerHTML = html;
    summaryDiv.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
