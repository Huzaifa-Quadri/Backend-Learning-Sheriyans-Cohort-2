import React, { useContext, useRef, useState, useEffect } from "react";
import { SongContext } from "../song.context";
import "../style/MusicPlayer.scss";

const MusicPlayer = () => {
  const { song } = useContext(SongContext);
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5); // Default 50%

  // Effect to handle song change
  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.load();
      
      // Auto-play when a new song is loaded from expression detection
      setIsPlaying(true);
      audioRef.current.play().catch(e => console.log("Auto-play prevented", e));
    }
  }, [song]);

  // Effect to handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Event handlers for audio element
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Play/Pause toggle
  const togglePlayPause = () => {
    if (!song || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Play error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  // Skip/Prev handlers (placeholders for future playlist functionality)
  const handlePrev = () => {
    if (audioRef.current) {
        audioRef.current.currentTime = 0; // Just restart current song for now
    }
  };

  const handleNext = () => {
      // Placeholder for next song logic if a playlist is added later
      console.log("Next track clicked");
  };

  // Progress bar interactions
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Volume slider interactions
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  // Helper to format seconds to mm:ss
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!song) return null; // Don't render if no song is in context

  return (
    <div className="musicPlayerContainer">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        className="hiddenAudio"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Track Info */}
      <div className="trackInfo">
        {song.posterUrl ? (
             <img src={song.posterUrl} alt={song.title} className="poster" />
        ) : (
             <div className="poster fallbackPoster">🎵</div>
        )}
        <div className="details">
          <h4 className="title">{song.title || "Unknown Track"}</h4>
          <span className="mood">{song.mood || "Standard"}</span>
        </div>
      </div>

      {/* Controls & Progress */}
      <div className="playerControls">
        <div className="buttons">
          <button className="iconBtn" onClick={handlePrev} title="Previous / Restart">
            <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          
          <button 
             className={`playPauseBtn ${isPlaying ? 'playing' : ''}`} 
             onClick={togglePlayPause}
             title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button className="iconBtn" onClick={handleNext} title="Next">
             <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>
        </div>

        <div className="progressBarContainer">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleProgressChange}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="volumeControl">
        <svg viewBox="0 0 24 24">
            {volume === 0 ? (
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            ) : volume < 0.5 ? (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            )}
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
