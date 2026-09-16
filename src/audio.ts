let audioCtx: AudioContext | null = null;
let activeInterval: ReturnType<typeof setInterval> | null = null;

export function playOrderChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const now = audioCtx.currentTime;
    
    // Modern gentle notification sound
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    
    // Smooth triangle wave for a mellow tone
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // Slide to E5
    
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.15, now + 0.05); // Quick fade in
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5); // Smooth tail
    
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);
    
    // Second subtle high-note highlight
    const delay = 0.12;
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1046.50, now + delay); // C6
    
    gain2.gain.setValueAtTime(0, now + delay);
    gain2.gain.linearRampToValueAtTime(0.08, now + delay + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.3);
    
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + delay);
    osc2.stop(now + delay + 0.3);
    
  } catch (err) {
    console.warn("Audio Context play blocked by browser gesture constraints or not supported:", err);
  }
}

export function startAlertLoop() {
  if (activeInterval) return;
  playOrderChime();
  activeInterval = setInterval(() => {
    playOrderChime();
  }, 3000);
}

export function stopAlertLoop() {
  if (activeInterval) {
    clearInterval(activeInterval);
    activeInterval = null;
  }
}
export function hasActiveAlert(): boolean {
  return activeInterval !== null;
}
