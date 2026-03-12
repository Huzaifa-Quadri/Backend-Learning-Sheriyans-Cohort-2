import React, { useState } from "react";
import { useFaceExpression } from "../hooks/useFaceExpression";
import { ExpressionSidebar } from "./ExpressionSidebar";
import "../style/FaceExpressionDetector.scss";

export default function FaceExpressionDetector() {
  const { isReady, videoRef, canvasRef, result, landmarkCoords } =
    useFaceExpression();

  const [capturedData, setCapturedData] = useState(null);

  const handleCaptureClick = () => {
    if (result && isReady) {
      setCapturedData({
        result,
        landmarkCoords,
      });
    }
  };

  return (
    <div className="page">
      {/* ── Header Navbar ── */}
      <header className="header">
        <h1 className="title">Moodify</h1>
        <span className="badge">Live Detector</span>
      </header>

      {/* ── Main Dashboard Layout ── */}
      <div className="mainLayout">
        {/* Left Side: Camera Area */}
        <section className="cameraSection">
          <div className="cameraContainer">
            <div className="cameraWrapper">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="video"
              />
              <canvas ref={canvasRef} className="canvas" />

              {!isReady && (
                <div className="loadingOverlay">
                  <div className="spinner" />
                  Initializing Models…
                </div>
              )}

              {isReady && capturedData && (
                <div className="resultOverlay">
                  <div>
                    <h2 className="finalExpression">
                      {capturedData.result.finalExpression}
                    </h2>
                  </div>
                  <div className="confidenceBadge">
                    {(capturedData.result.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              )}
            </div>

            {isReady && (
              <button className="detectButton" onClick={handleCaptureClick}>
                📸 Detect Expression
              </button>
            )}
          </div>
        </section>

        {/* Right Side: Analytics Sidebar */}
        {capturedData ? (
          <ExpressionSidebar
            result={capturedData.result}
            landmarkCoords={capturedData.landmarkCoords}
          />
        ) : (
          <div className="sidebar emptyState">
            <div className="icon">📷</div>
            <h3>Awaiting Capture</h3>
            <p>
              Look directly at the camera and click <b>Detect Expression</b> to
              analyze your current mood.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
