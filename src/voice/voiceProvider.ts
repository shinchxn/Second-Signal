export interface VoiceProvider {
  speak(text: string, language?: string): Promise<void>;
  stop(): void;
  isSpeaking(): boolean;
}

export class BrowserSpeechProvider implements VoiceProvider {
  private utterance: SpeechSynthesisUtterance | null = null;

  async speak(text: string, language: string = 'en-US'): Promise<void> {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser environment');
      return;
    }

    // Stop any existing speech
    this.stop();

    return new Promise((resolve) => {
      const cleanText = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = language;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Select natural voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.name.includes('Alex') ||
            v.name.includes('Enhanced'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        this.utterance = null;
        resolve();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        this.utterance = null;
        resolve();
      };

      this.utterance = utterance;
      window.speechSynthesis.speak(utterance);
    });
  }

  stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.utterance = null;
    }
  }

  isSpeaking(): boolean {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis.speaking;
    }
    return false;
  }
}

export const defaultVoiceProvider = new BrowserSpeechProvider();
