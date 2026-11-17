/** 英語の読み上げ（ブラウザの音声合成）と ON/OFF 設定 */

const STORAGE_KEY = "english-speech-enabled";

/**
 * ネイティブの女性らしい声として優先する話者名（上にあるほど優先）。
 * すべてアメリカ英語の女性音声。端末・ブラウザごとに使える音声が違うため主要な環境のものを並べている。
 */
const FEMALE_VOICE_NAMES = [
  "Ava",
  "Emma",
  "Aria",
  "Jenny",
  "Michelle",
  "Zoe",
  "Allison",
  "Samantha",
  "Joelle",
  "Noelle",
  "Susan",
  "Nicky",
  "Zira",
];

/**
 * 音質の段階。人間らしさは話者名よりも合成方式でほぼ決まるので、こちらを最優先する。
 * 例: macOS 標準の Samantha（軽量版）より、Chrome の Google US English の方がずっと自然に聞こえる。
 */
const QUALITY = {
  /** Edge のニューラル音声（最も人間に近い） */
  neural: 5000,
  /** macOS / iOS の「プレミアム」 */
  premium: 4000,
  /** macOS / iOS の「拡張」 */
  enhanced: 3000,
  /** Chrome の Google US English（女性・オンライン合成） */
  google: 2000,
  /** OS 標準の軽量版（機械っぽさが残る） */
  compact: 1000,
} as const;

function scoreVoice(voice: SpeechSynthesisVoice): number {
  const lang = voice.lang.replace("_", "-").toLowerCase();
  if (!lang.startsWith("en")) return -1;

  // アメリカ英語以外は、同じ音質段階の中でだけ後回しにする
  let score = lang === "en-us" ? 500 : 0;

  if (/^Google US English/i.test(voice.name)) return score + QUALITY.google;

  // "Microsoft Ava Online (Natural) - ..." / "Ava (Premium)" / "Samantha" → 先頭の話者名を取り出す
  const speaker = voice.name
    .replace(/^Microsoft\s+/i, "")
    .split(/[\s(（]/)[0]
    .toLowerCase();
  const index = FEMALE_VOICE_NAMES.findIndex((name) =>
    speaker.startsWith(name.toLowerCase()),
  );
  // 女性音声と分からないものは最後の手段（男性や効果音風の声を避ける）
  if (index === -1) return score;

  score -= index * 10;
  if (/online|natural/i.test(voice.name)) return score + QUALITY.neural;
  if (/premium|プレミアム/i.test(voice.name)) return score + QUALITY.premium;
  if (/enhanced|拡張/i.test(voice.name)) return score + QUALITY.enhanced;
  return score + QUALITY.compact;
}

class SpeechManager {
  private enabled: boolean | null = null;
  private listeners = new Set<() => void>();
  private voice: SpeechSynthesisVoice | null = null;
  private watchingVoices = false;

  /** 使える中で最もネイティブの女性らしく聞こえる英語音声を選ぶ（音声一覧は遅れて届くことがある） */
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
    // Chrome は音声一覧を非同期で読み込むので、最初の読み上げに間に合うよう先に要求しておく
    if (this.supported) this.pickVoice();
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
    // ピッチを加工すると合成音っぽさが出るので、音声本来の高さのまま話させる
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  cancel() {
    if (this.supported) window.speechSynthesis.cancel();
  }
}

export const speech = new SpeechManager();
