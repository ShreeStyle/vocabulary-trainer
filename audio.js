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
        }
    }

    getVoiceForAccent(accent) {
        // Wait for voices to load if not ready
        if (!this.isReady) {
            this.loadVoices();
        }

        // Map accent codes to voice selection criteria
        const accentMap = {
            'en-US': ['en-US', 'en_US', 'English (United States)', 'Microsoft David', 'Google US English'],
            'en-GB': ['en-GB', 'en_GB', 'English (United Kingdom)', 'Microsoft George', 'Google UK English'],
            'en-IN': ['en-IN', 'en_IN', 'English (India)', 'Microsoft Ravi', 'Google हिन्दी']
        };

        const searchTerms = accentMap[accent] || accentMap['en-US'];

        // Try to find a matching voice
        for (const term of searchTerms) {
            const voice = this.voices.find(v => 
                v.lang.includes(term) || 
                v.name.includes(term) ||
                v.voiceURI.includes(term)
            );
            if (voice) {
                console.log(`Selected voice: ${voice.name} for accent: ${accent}`);
                return voice;
            }
        }

        // Fallback: find any English voice
        const fallbackVoice = this.voices.find(v => v.lang.startsWith('en'));
        if (fallbackVoice) {
            console.log(`Using fallback voice: ${fallbackVoice.name}`);
            return fallbackVoice;
        }

        // Last resort: use first available voice
        console.log('Using default voice');
        return this.voices[0];
    }

    speak(text, accent, speed, onEnd, onStart) {
        return new Promise((resolve, reject) => {
            // Cancel any ongoing speech
            this.stop();

            // Wait a bit to ensure previous speech is cancelled
            setTimeout(() => {
                // Clean the text - remove special characters that might cause issues
                const cleanText = text.trim();
                
                this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
                
                // Set voice based on accent
                const voice = this.getVoiceForAccent(accent);
                if (voice) {
                    this.currentUtterance.voice = voice;
                    this.currentUtterance.lang = voice.lang;
                } else {
                    this.currentUtterance.lang = accent;
                }

                // Set speed (rate) - clamp between 0.5 and 2.0
                const clampedSpeed = Math.max(0.5, Math.min(2.0, parseFloat(speed)));
                this.currentUtterance.rate = clampedSpeed;

                // Set other properties for better clarity
                this.currentUtterance.pitch = 1.0;
                this.currentUtterance.volume = 1.0;

                // Event handlers
                this.currentUtterance.onstart = () => {
                    console.log('Speech started');
                    if (onStart) onStart();
                };

                this.currentUtterance.onend = () => {
                    console.log('Speech ended');
                    if (onEnd) onEnd();
                    resolve();
                };

                this.currentUtterance.onerror = (event) => {
                    console.error('Speech error:', event.error);
                    // Try to call onEnd even on error
                    if (onEnd) onEnd();
                    reject(event.error);
                };

                // Speak
                this.synthesis.speak(this.currentUtterance);
                console.log(`Speaking: "${cleanText}" with accent: ${accent}, speed: ${clampedSpeed}`);
            }, 150);
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
