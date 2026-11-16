/** 英語の読み上げ（ブラウザの音声合成）と ON/OFF 設定 */

const STORAGE_KEY = "english-speech-enabled";

/**
 * 女性アナウンサー風の声として優先する音声名（上にあるほど優先）。
 * 端末・ブラウザごとに使える音声が違うため、主要な環境の落ち着いた女性音声を並べている。
 */
const PREFERRED_VOICE_NAMES = [
  // Edge（ニューラル音声）
  "Microsoft Aria Online",
  "Microsoft Jenny Online",
  "Microsoft Ava Online",
  "Microsoft Emma Online",
  "Microsoft Michelle Online",
  // macOS / iOS
  "Ava",
  "Allison",
  "Samantha",
  "Susan",
  "Zoe",
  // Chrome
  "Google US English",
  // Windows 標準
  "Microsoft Zira",
];

/** 高音質版（macOS の「拡張」「プレミアム」や Edge のニューラル音声）を示す語 */
const HIGH_QUALITY_PATTERN = /premium|enhanced|natural|プレミアム|拡張/i;

function scoreVoice(voice: SpeechSynthesisVoice): number {
  const lang = voice.lang.replace("_", "-").toLowerCase();
  if (!lang.startsWith("en")) return -1;

  let score = lang === "en-us" ? 100 : 0;
  const name = voice.name.toLowerCase();
  const index = PREFERRED_VOICE_NAMES.findIndex((preferred) =>
    name.startsWith(preferred.toLowerCase()),
  );
  if (index !== -1) score += 1000 - index * 10;
  if (HIGH_QUALITY_PATTERN.test(voice.name)) score += 5;
  return score;
}

class SpeechManager {
  private enabled: boolean | null = null;
  private listeners = new Set<() => void>();
  private voice: SpeechSynthesisVoice | null = null;
  private watchingVoices = false;

  /** 使える中で最も女性アナウンサーらしい英語音声を選ぶ（音声一覧は遅れて届くことがある） */
  private pickVoice(): SpeechSynthesisVoice | null {
    const synth = window.speechSynthesis;
    if (!this.watchingVoices) {
      this.watchingVoices = true;
      synth.addEventListener?.("voiceschanged", () => {
        this.voice = null;
      });
    }
    if (this.voice) return this.voice;

    let best: SpeechSynthesisVoice | null = null;
    let bestScore = -1;
    for (const candidate of synth.getVoices()) {
      const score = scoreVoice(candidate);
      if (score > bestScore) {
        best = candidate;
        bestScore = score;
      }
    }
    this.voice = best;
    return best;
  }

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
    const voice = this.pickVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang.replace("_", "-");
    }
    utterance.rate = options.rate ?? 0.95;
    // わずかに高めにして、明るくはっきりしたアナウンサー寄りの声にする
    utterance.pitch = 1.05;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  cancel() {
    if (this.supported) window.speechSynthesis.cancel();
  }
}

export const speech = new SpeechManager();
