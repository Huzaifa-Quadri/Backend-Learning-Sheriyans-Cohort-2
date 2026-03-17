import React from "react";
import { useSong } from "../hooks/useSong";
import "../style/FaceExpressionDetector.scss";

export function ExpressionSidebar({ result }) {
  const { finalExpression, allExpressions = [] } = result;
  const { song } = useSong({});

  return (
    <div className="sidebar">
      {/* ── Mood Playlist Section (Commented out per user request) ──
      <div className="card playlistCard">
        <h3 className="cardTitle">
          <span style={{ fontSize: "16px" }}>🎵</span> Mood Playlist
        </h3>
        <div className="playlistItems">
          {song ? (
            <div className="playlistItem active">
              <img src={song.posterUrl} alt={song.title} className="miniPoster" />
              <div className="songInfo">
                <span className="songTitle">{song.title}</span>
                <span className="songMood">{song.mood} • Now Playing</span>
              </div>
              <div className="playingWave">
                <span></span><span></span><span></span>
              </div>
            </div>
          ) : (
            <p className="noSongs">No songs loaded yet...</p>
          )}
          <div className="playlistItem placeholder">
            <div className="miniPoster ghost" />
            <div className="songInfo">
              <span className="songTitle ghost-text">More songs coming...</span>
            </div>
          </div>
        </div>
      </div>
      */}

      {/* ── Mood Playlist Section by Me*/}
      <div className="playlist">
        <h3 className="card-title">Mood Playlist</h3>
        <div className="playlist-items">
          {song ? (
            <div className="song-item">
              <img
                src={song.posterUrl}
                alt={song.title}
                className="mini-poster"
              />
              <div className="song-info">
                <span className="song-title">{song.title}</span>

                <span className="song-mood">{song.mood}</span>
              </div>
              <div className="playing-wave">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : (
            <p className="no-songs">No songs loaded yet...</p>
          )}
        </div>
      </div>

      {/* ── Expression Confidence Chart (Bottom) ── */}
      <div className="card">
        <h3 className="cardTitle">
          <span style={{ fontSize: "16px" }}>📊</span> Expression Confidence
        </h3>
        {allExpressions.map((e) => {
          const isWinner = e.name === finalExpression;
          return (
            <div key={e.name} className={`barRow ${isWinner ? "winner" : ""}`}>
              <span className="barLabel">
                {e.name}
              </span>
              <div className="barTrack">
                <div
                  className="barFill"
                  style={{
                    width: `${(e.score * 100).toFixed(0)}%`,
                  }}
                />
              </div>
              <span className="barValue">
                {(e.score * 100).toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
