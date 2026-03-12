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
      return smile * 0.8 + cheek * 0.2 - (s.jawOpen ?? 0) * 0.3; // penalize if mouth is very open (should be laughing instead)
    },
  },
  {
    name: "Laughing 😆",
    calc: (s) => {
      const smile = avg(s.mouthSmileLeft, s.mouthSmileRight);
      const jaw = s.jawOpen ?? 0;
      const cheek = avg(s.cheekSquintLeft, s.cheekSquintRight);
      // Requires BOTH smile and open mouth
      if (smile < 0.2 || jaw < 0.15) return 0;
      return smile * 0.5 + jaw * 0.3 + cheek * 0.2;
    },
  },
  {
    name: "Mouth Open 😮",
    calc: (s) => {
      const jaw = s.jawOpen ?? 0;
      const smile = avg(s.mouthSmileLeft, s.mouthSmileRight);
      // High jaw open, but NOT smiling and NOT surprised
      return jaw * 0.9 - smile * 0.6 - (s.browInnerUp ?? 0) * 0.5;
    },
  },
  {
    name: "Sad 😢",
    calc: (s) => {
      const frown = avg(s.mouthFrownLeft, s.mouthFrownRight);
      const browUp = s.browInnerUp ?? 0;
      const mouthDown = avg(s.mouthLowerDownLeft, s.mouthLowerDownRight);
      return frown * 0.6 + browUp * 0.3 + (mouthDown ?? 0) * 0.1;
    },
  },
  {
    name: "Angry 😠",
    calc: (s) => {
      const browDown = avg(s.browDownLeft, s.browDownRight);
      const frown = avg(s.mouthFrownLeft, s.mouthFrownRight);
      const sneer = avg(s.noseSneerLeft, s.noseSneerRight);
      const press = avg(s.mouthPressLeft, s.mouthPressRight);
      return browDown * 0.4 + frown * 0.2 + sneer * 0.2 + press * 0.2;
    },
  },
  {
    name: "Surprised 😲",
    calc: (s) => {
      const eyeWide = avg(s.eyeWideLeft, s.eyeWideRight);
      const browUp = s.browInnerUp ?? 0;
      const browOuter = avg(s.browOuterUpLeft, s.browOuterUpRight);
      const jaw = s.jawOpen ?? 0;
      if (browUp < 0.2 && eyeWide < 0.2) return 0; // Requires eyes wide or brows up
      return eyeWide * 0.3 + browUp * 0.3 + browOuter * 0.1 + jaw * 0.3;
    },
  },
  {
    name: "Fearful 😨",
    calc: (s) => {
      const eyeWide = avg(s.eyeWideLeft, s.eyeWideRight);
      const stretch = avg(s.mouthStretchLeft, s.mouthStretchRight);
      const browInner = s.browInnerUp ?? 0;
      return eyeWide * 0.4 + browInner * 0.3 + stretch * 0.3;
    },
  },
  {
    name: "Disgusted 🤢",
    calc: (s) => {
      const sneer = avg(s.noseSneerLeft, s.noseSneerRight);
      const frown = avg(s.mouthFrownLeft, s.mouthFrownRight);
      const upperLip = avg(s.mouthUpperUpLeft, s.mouthUpperUpRight);
      return sneer * 0.5 + frown * 0.2 + upperLip * 0.3;
    },
  },
  {
    name: "Smirk 😏",
    calc: (s) => {
      const left = s.mouthSmileLeft ?? 0;
      const right = s.mouthSmileRight ?? 0;
      const asymmetry = Math.abs(left - right);
      const peak = Math.max(left, right);
      return peak > 0.2 ? asymmetry * 0.7 + peak * 0.3 : 0;
    },
  },
  {
    name: "Cheek Puff 😗",
    calc: (s) => {
      // boost sensitivity
      return (s.cheekPuff ?? 0) * 1.5;
    },
  },
  {
    name: "Tongue Out 😛",
    calc: (s) => {
      // Tongue detect is notoriously weak in mediapipe, boost its score heavily
      return (s.tongueOut ?? 0) * 2.5;
    },
  },
  {
    name: "Wink 😉",
    calc: (s) => {
      const left = s.eyeBlinkLeft ?? 0;
      const right = s.eyeBlinkRight ?? 0;
      const diff = Math.abs(left - right);
      const maxBlink = Math.max(left, right);
      return maxBlink > 0.4 ? diff * 0.8 + maxBlink * 0.2 : 0;
    },
  },
  {
    name: "Thinking 🤔",
    calc: (s) => {
      const browAsym = Math.abs((s.browDownLeft ?? 0) - (s.browDownRight ?? 0));
      const browOuter = Math.abs(
        (s.browOuterUpLeft ?? 0) - (s.browOuterUpRight ?? 0),
      );
      const press = avg(s.mouthPressLeft, s.mouthPressRight);
      const shrugUpper = s.mouthShrugUpper ?? 0;
      return browAsym * 0.4 + browOuter * 0.2 + press * 0.2 + shrugUpper * 0.2;
    },
  },
  {
    name: "Neutral 😐",
    // Base fallback threshold. Raised slightly so noise doesn't trigger random expressions.
    calc: () => 0.15,
  },
];

// ── helpers ──────────────────────────────────────────────────────────────────
function avg(a, b) {
  return ((a ?? 0) + (b ?? 0)) / 2;
}

// ── main classifier ─────────────────────────────────────────────────────────
/**
 * Classify an array of MediaPipe blendshape categories into expressions.
 *
 * @param {Array<{categoryName: string, score: number}>} blendshapes
 * @returns {{
 *   finalExpression: string,
 *   confidence: number,
 *   allExpressions: Array<{name: string, score: number}>,
 *   rawScores: Record<string, number>
 * }}
 */
export function classifyExpressions(blendshapes) {
  // 1. Build a lookup of raw blendshape scores
  const rawScores = {};
  blendshapes.forEach((b) => {
    rawScores[b.categoryName] = b.score;
  });

  // 2. Score every expression rule
  const allExpressions = EXPRESSION_RULES.map((rule) => ({
    name: rule.name,
    score: clamp(rule.calc(rawScores)),
  })).sort((a, b) => b.score - a.score);

  // 3. Pick the winner
  const best = allExpressions[0];

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
