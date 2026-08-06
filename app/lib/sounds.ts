/**
 * 効果音マネージャー（Web Audio APIで合成、外部ファイル不要）
 * ON/OFF設定はlocalStorageに永続化。useSyncExternalStoreで購読できる。
 */

const STORAGE_KEY = "typing-game-sound-enabled";

type Listener = () => void;

class SoundManager {
  private ctx: AudioContext | null = null;
  private cachedEnabled: boolean | null = null;
  private listeners = new Set<Listener>();

  get enabled(): boolean {
    if (this.cachedEnabled === null) {
      if (typeof window === "undefined") return true;
      this.cachedEnabled = localStorage.getItem(STORAGE_KEY) !== "off";
    }
    return this.cachedEnabled;
  }

  setEnabled(value: boolean) {
    this.cachedEnabled = value;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
    }
    this.listeners.forEach((listener) => listener());
  }

  toggle() {
    this.setEnabled(!this.enabled);
  }

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => this.enabled;

  // SSR用（サーバーでは常にデフォルトのON）
  getServerSnapshot = () => true;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private beep(
    frequency: number,
    durationSec: number,
    type: OscillatorType,
    volume: number,
    delaySec = 0,
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const startAt = ctx.currentTime + delaySec;

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, startAt);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + durationSec);

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + durationSec);
  }

  /** タイプ音: 短い高音のクリック */
  playType() {
    if (!this.enabled) return;
    this.beep(880, 0.05, "square", 0.02);
  }

  /** ミス音: 低いブザー */
  playMiss() {
    if (!this.enabled) return;
    this.beep(150, 0.15, "sawtooth", 0.05);
  }

  /** クリア音: 上昇アルペジオ */
  playClear() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      this.beep(freq, 0.2, "triangle", 0.06, i * 0.12);
    });
  }
}

export const sounds = new SoundManager();
