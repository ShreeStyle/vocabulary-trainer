// Audio Manager - Handles Text-to-Speech using Web Speech API

class AudioManager {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.voices = [];
        this.isReady = false;
        
        // Load voices
        this.loadVoices();
        
        // Voices may load asynchronously
        if (this.synthesis.onvoiceschanged !== undefined) {
            this.synthesis.onvoiceschanged = () => {
                this.loadVoices();
            };
        }
    }

    loadVoices() {
        this.voices = this.synthesis.getVoices();
        this.isReady = this.voices.length > 0;
        
        if (this.isReady) {
            console.log(`Loaded ${this.voices.length} voices`);
            // Log all available voices for debugging
            this.voices.forEach((voice, i) => {
                console.log(`${i}: ${voice.name} (${voice.lang})`);
            });
        }
    }

    getVoiceForAccent(accent) {
        // Wait for voices to load if not ready
        if (!this.isReady) {
            this.loadVoices();
        }

        // Prioritize high-quality Google and Apple voices
        const accentMap = {
            'en-US': [
                'Google US English',
                'Samantha',
                'Alex',
                'en-US',
                'Microsoft David',
                'English (United States)'
            ],
            'en-GB': [
                'Google UK English Female',
                'Google UK English Male', 
                'Daniel',
                'Kate',
                'en-GB',
                'Microsoft George',
                'English (United Kingdom)'
            ],
            'en-IN': [
                'Google हिन्दी',
                'Veena',
                'en-IN',
                'Microsoft Ravi',
                'English (India)'
            ]
        };

        const searchTerms = accentMap[accent] || accentMap['en-US'];

        // Try to find a matching voice (prioritize order)
        for (const term of searchTerms) {
            const voice = this.voices.find(v => 
                v.name.includes(term) ||
                v.lang.includes(term) || 
                v.voiceURI.includes(term)
            );
            if (voice) {
                console.log(`✓ Selected voice: ${voice.name} (${voice.lang}) for accent: ${accent}`);
                return voice;
            }
        }

        // Fallback: find any clear English voice
        const fallbackVoice = this.voices.find(v => 
            v.lang.startsWith('en') && !v.name.toLowerCase().includes('novelty')
        );
        if (fallbackVoice) {
            console.log(`⚠ Using fallback voice: ${fallbackVoice.name}`);
            return fallbackVoice;
        }

        // Last resort
        console.log('⚠ Using default voice');
        return this.voices[0];
    }

    speak(text, accent, speed, onEnd, onStart) {
        return new Promise((resolve, reject) => {
            // Cancel any ongoing speech
            this.stop();

            // Wait to ensure previous speech is fully cancelled
            setTimeout(() => {
                // Clean and normalize text
                const cleanText = text.trim().replace(/\s+/g, ' ');
                
                this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
                
                // Set voice based on accent
                const voice = this.getVoiceForAccent(accent);
                if (voice) {
                    this.currentUtterance.voice = voice;
                    this.currentUtterance.lang = voice.lang;
                } else {
                    this.currentUtterance.lang = accent;
                }

                // IMPROVED: Better speed control for clarity
                // Reduce speed range for better pronunciation
                let clampedSpeed = Math.max(0.7, Math.min(1.3, parseFloat(speed)));
                
                // For very long words, automatically slow down a bit
                if (cleanText.length > 15) {
                    clampedSpeed *= 0.9;
                }
                
                this.currentUtterance.rate = clampedSpeed;

                // IMPROVED: Optimize for clarity
                this.currentUtterance.pitch = 1.0; // Natural pitch
                this.currentUtterance.volume = 1.0; // Full volume

                // Event handlers
                this.currentUtterance.onstart = () => {
                    console.log(`🔊 Speaking: "${cleanText}"`);
                    if (onStart) onStart();
                };

                this.currentUtterance.onend = () => {
                    console.log('✓ Speech completed');
                    if (onEnd) onEnd();
                    resolve();
                };

                this.currentUtterance.onerror = (event) => {
                    console.error('❌ Speech error:', event.error);
                    if (onEnd) onEnd();
                    reject(event.error);
                };

                // Speak with retry on failure
                try {
                    this.synthesis.speak(this.currentUtterance);
                } catch (error) {
                    console.error('❌ Speak failed:', error);
                    if (onEnd) onEnd();
                    reject(error);
                }
            }, 200); // Slightly longer delay for stability
        });
    }

    stop() {
        if (this.synthesis.speaking || this.synthesis.pending) {
            this.synthesis.cancel();
        }
        this.currentUtterance = null;
    }

    pause() {
        if (this.synthesis.speaking) {
            this.synthesis.pause();
        }
    }

    resume() {
        if (this.synthesis.paused) {
            this.synthesis.resume();
        }
    }

    isSpeaking() {
        return this.synthesis.speaking;
    }
}

// Create global instance
const audioManager = new AudioManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
}
