/**
 * Face Expression Classifier
 *
 * Uses MediaPipe FaceLandmarker blendshapes to detect 14 distinct expressions.
 * Exports a single `finalExpression` (the dominant one) plus detailed analysis.
 */

// ── expression rule definitions ───────────────────────────────────────────────
// Each rule computes a confidence score (0–1) from relevant blendshapes.
const EXPRESSION_RULES = [
  {
    name: "Happy 😀",
    calc: (s) => {
      const smile = avg(s.mouthSmileLeft, s.mouthSmileRight);
      const cheek = avg(s.cheekSquintLeft, s.cheekSquintRight);
      if (smile < 0.15) return 0; // Much lower threshold to trigger happiness
      return smile * 2.0 + cheek * 1.0 - (s.jawOpen ?? 0) * 0.5;
    },
  },
  {
    name: "Laughing 😆",
    calc: (s) => {
      const smile = avg(s.mouthSmileLeft, s.mouthSmileRight);
      const jaw = s.jawOpen ?? 0;
      const cheek = avg(s.cheekSquintLeft, s.cheekSquintRight);
      if (smile < 0.3 || jaw < 0.2) return 0;
      return smile * 1.5 + jaw * 1.5 + cheek * 0.8;
    },
  },
  {
    name: "Sad 😢",
    calc: (s) => {
      const frown = avg(s.mouthFrownLeft, s.mouthFrownRight);
      const browUp = s.browInnerUp ?? 0;
      const pucker = s.mouthPucker ?? 0;
      const shrugLower = s.mouthShrugLower ?? 0;
      
      const jaw = s.jawOpen ?? 0;
      const eyeWide = avg(s.eyeWideLeft, s.eyeWideRight);
      
      // CRITICAL: Prevent Surprised from triggering Sad.
      // If the mouth is open or eyes are very wide, you aren't sad.
      if (jaw > 0.15 || eyeWide > 0.3) return 0;
      
      const poutScore = Math.max(pucker, shrugLower);
      
      if (frown < 0.05 && poutScore < 0.05 && browUp < 0.05) return 0;
      return (frown * 3.5) + (poutScore * 3.0) + (browUp * 2.0);
    },
  },
  {
    name: "Angry 😠",
    calc: (s) => {
      const browDown = avg(s.browDownLeft, s.browDownRight);
      const press = avg(s.mouthPressLeft, s.mouthPressRight);
      const sneer = avg(s.noseSneerLeft, s.noseSneerRight);
      
      if (browDown < 0.45) return 0;
      return (browDown * 1.5) + (press * 1.0) + (sneer * 1.5);
    },
  },
  {
    name: "Surprised 😲",
    calc: (s) => {
      const eyeWide = avg(s.eyeWideLeft, s.eyeWideRight);
      const browUp = s.browInnerUp ?? 0;
      const jaw = s.jawOpen ?? 0;
      
      if (eyeWide < 0.2 && jaw < 0.2) return 0;
      return jaw * 2.0 + eyeWide * 2.0 + browUp * 1.0;
    },
  },
  {
    name: "Smirk 😏",
    calc: (s) => {
      const left = s.mouthSmileLeft ?? 0;
      const right = s.mouthSmileRight ?? 0;
      const asymmetry = Math.abs(left - right);
      const peak = Math.max(left, right);
      
      if (asymmetry < 0.15 || peak < 0.2) return 0;
      return asymmetry * 3.0 + peak * 1.0;
    },
  },
  {
    name: "Wink 😉",
    calc: (s) => {
      const left = s.eyeBlinkLeft ?? 0;
      const right = s.eyeBlinkRight ?? 0;
      
      // Simplify Wink drastically.
      // All we care about is that one eye is blinking significantly more than the other.
      const diff = Math.abs(left - right);
      const maxBlink = Math.max(left, right);
      
      // If the difference between the two eyes is obvious (>0.25) AND the closed eye is actually closing (>0.4).
      if (diff < 0.25 || maxBlink < 0.4) return 0;
      
      // Give it an absurd multiplier so that if a wink happens, it immediately dominates the scoring entirely.
      return (diff * 5.0) + (maxBlink * 2.0);
    },
  },
  {
    name: "Thinking 🤔",
    calc: (s) => {
      const browAsym = Math.abs((s.browDownLeft ?? 0) - (s.browDownRight ?? 0));
      const press = avg(s.mouthPressLeft, s.mouthPressRight);
      const smile = avg(s.mouthSmileLeft, s.mouthSmileRight);
      
      if (browAsym < 0.1 || press < 0.1 || smile > 0.1) return 0;
      return browAsym * 2.5 + press * 1.5;
    },
  },
  {
    name: "Neutral 😐",
    // Set a very strong baseline. Angry or Sad MUST cross 0.5 points to overpower this.
    calc: () => 0.5, 
  },
];

// ── helpers ──────────────────────────────────────────────────────────────────
function avg(a, b) {
  return ((a ?? 0) + (b ?? 0)) / 2;
}

// ── main classifier ─────────────────────────────────────────────────────────
/**
 * Classify a dictionary of MediaPipe blendshape categories into expressions.
 *
 * @param {Record<string, number>} rawScores
 * @returns {{
 *   finalExpression: string,
 *   confidence: number,
 *   allExpressions: Array<{name: string, score: number}>,
 *   rawScores: Record<string, number>
 * }}
 */
export function classifyExpressions(rawScores) {
  // Score every expression rule using the raw dictionary
  const allExpressions = EXPRESSION_RULES.map((rule) => ({
    name: rule.name,
    score: clamp(rule.calc(rawScores) || 0),
  })).sort((a, b) => b.score - a.score);

  // Pick the winner
  const best = allExpressions[0] || { name: "Unknown", score: 0 };

  return {
    finalExpression: best.name,
    confidence: best.score,
    allExpressions,
    rawScores,
  };
}

function clamp(v) {
  return Math.max(0, Math.min(1, v));
}
