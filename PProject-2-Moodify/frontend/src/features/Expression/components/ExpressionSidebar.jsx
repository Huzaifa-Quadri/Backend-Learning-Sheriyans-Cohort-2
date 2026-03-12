import React from "react";
import "../style/FaceExpressionDetector.scss";

export function ExpressionSidebar({ result, landmarkCoords }) {
  const { finalExpression, allExpressions = [], rawScores = {} } = result;

  return (
    <div className="sidebar">
      {/* ── Expression Scores Chart ── */}
      <div className="card">
        <h3 className="cardTitle">
          <span style={{ fontSize: "16px" }}>📊</span> Expression Confidence
        </h3>
        {allExpressions.map((e) => {
          const isWinner = e.name === finalExpression;
          return (
            <div key={e.name} className="barRow">
              <span
                className="barLabel"
                style={{ color: isWinner ? "#fff" : undefined }}
              >
                {e.name}
              </span>
              <div className="barTrack">
                <div
                  className="barFill"
                  style={{
                    width: `${(e.score * 100).toFixed(0)}%`,
                    background: isWinner
                      ? "linear-gradient(90deg, #00f2fe, #4facfe)"
                      : "linear-gradient(90deg, rgba(79, 172, 254, 0.4), rgba(0, 242, 254, 0.4))",
                    boxShadow: isWinner
                      ? "0 0 10px rgba(0, 242, 254, 0.5)"
                      : "none",
                  }}
                />
              </div>
              <span
                className="barValue"
                style={{ color: isWinner ? "#00f2fe" : undefined }}
              >
                {(e.score * 100).toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Raw Blendshapes ── */}
      <div className="card">
        <h3 className="cardTitle">
          <span style={{ fontSize: "16px" }}>🔬</span> Blendshape Analysis
        </h3>
        <div className="scrollBox">
          {Object.entries(rawScores)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 25)
            .map(([k, v]) => (
              <div key={k} className="dataRow">
                <span className="dataName">{k}</span>
                <span className="dataValue">{v.toFixed(3)}</span>
              </div>
            ))}
        </div>
      </div>

      {/* ── Landmark Coordinates ── */}
      <div className="card">
        <h3 className="cardTitle">
          <span style={{ fontSize: "16px" }}>📍</span> Sparse Topology (Top 15)
        </h3>
        <div className="scrollBox">
          {landmarkCoords.map((p) => (
            <div key={p.idx} className="dataRow">
              <span className="dataLabel">#{p.idx}</span>
              <span className="dataText">
                X:{p.x} &nbsp; Y:{p.y} &nbsp; Z:{p.z}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
