import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { classifyExpressions } from "../utils/expressionclassifier";

export function useFaceExpression() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastStateUpdate = useRef(0);

  const [isReady, setIsReady] = useState(false);
  const [result, setResult] = useState({
    finalExpression: "Loading…",
    confidence: 0,
    allExpressions: [],
    rawScores: {},
  });
  const [landmarkCoords, setLandmarkCoords] = useState([]);

  // Exponential Moving Average for smoothing blendshape scores across frames
  const smoothRef = useRef({});
  function smoothScores(newRaw) {
    const alpha = 0.6;
    const prev = smoothRef.current;
    const smoothed = {};
    for (const key of Object.keys(newRaw)) {
      smoothed[key] =
        prev[key] !== undefined
          ? alpha * prev[key] + (1 - alpha) * newRaw[key]
          : newRaw[key];
    }
    smoothRef.current = smoothed;
    return smoothed;
  }

  // Draw landmarker dots on the canvas
  function drawLandmarks(landmarks) {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00e676"; // Neon green dot
    landmarks.forEach((p) => {
      const x = p.x * canvas.width;
      const y = p.y * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  // Camera initialization
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = videoRef.current;
      if (!video) return;

      video.srcObject = stream;

      video.onloadeddata = () => {
        video.play().catch(console.error);
        setIsReady(true);
        detect(); // Jumpstart the detection loop
      };
    } catch (err) {
      console.error("Camera error:", err);
      setResult((prev) => ({ ...prev, finalExpression: "Camera Error" }));
    }
  }

  // Core detection loop
  function detect() {
    const video = videoRef.current;
    const fl = landmarkerRef.current;

    if (
      !fl ||
      !video ||
      video.paused ||
      video.ended ||
      video.videoWidth === 0
    ) {
      animFrameRef.current = requestAnimationFrame(detect);
      return;
    }

    const results = fl.detectForVideo(video, performance.now());

    if (results.faceLandmarks && results.faceLandmarks.length > 0) {
      const landmarks = results.faceLandmarks[0];

      // Draw canvas 60fps immediately
      drawLandmarks(landmarks);

      const now = performance.now();
      // Throttle React state to ~15fps (every 66ms) to stop extreme DOM lag
      if (now - lastStateUpdate.current > 66) {
        lastStateUpdate.current = now;

        setLandmarkCoords(
          landmarks.slice(0, 15).map((p, i) => ({
            idx: i,
            x: p.x.toFixed(4),
            y: p.y.toFixed(4),
            z: (p.z ?? 0).toFixed(4),
          })),
        );

        const blend = results.faceBlendshapes[0].categories;
        const classification = classifyExpressions(blend);
        classification.rawScores = smoothScores(classification.rawScores);
        setResult(classification);
      }
    }

    animFrameRef.current = requestAnimationFrame(detect);
  }

  // Initialization sequence setup
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
      );

      const fl = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        },
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
        numFaces: 1,
      });

      if (!cancelled) {
        landmarkerRef.current = fl;
        startCamera();
      }
    }

    init();

    return () => {
      cancelled = true;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return {
    isReady,
    videoRef,
    canvasRef,
    result,
    landmarkCoords,
  };
}
