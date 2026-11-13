/** 英語の読み上げ（ブラウザの音声合成）と ON/OFF 設定 */

const STORAGE_KEY = "english-speech-enabled";

class SpeechManager {
  private enabled: boolean | null = null;
  private listeners = new Set<() => void>();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): boolean => {
    if (this.enabled === null) {
      try {
        this.enabled = window.localStorage.getItem(STORAGE_KEY) !== "off";
      } catch {
        this.enabled = true;
      }
    }
    return this.enabled;
  };

  getServerSnapshot = (): boolean => true;

  toggle() {
    this.enabled = !this.getSnapshot();
    try {
      window.localStorage.setItem(STORAGE_KEY, this.enabled ? "on" : "off");
    } catch {
      // 保存できなくても今回の表示中は切り替わる
    }
    if (!this.enabled) this.cancel();
    this.listeners.forEach((listener) => listener());
  }

  get supported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  /**
   * 英語を読み上げる。
   * force: 読み上げ設定が OFF でも鳴らす（音声が出題そのものである「聞いて打つ」モード用）
   */
  speak(text: string, options: { force?: boolean; rate?: number } = {}) {
    if (!this.supported) return;
    if (!options.force && !this.getSnapshot()) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = options.rate ?? 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  cancel() {
    if (this.supported) window.speechSynthesis.cancel();
  }
}

export const speech = new SpeechManager();
