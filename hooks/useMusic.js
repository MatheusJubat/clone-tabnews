// hooks/useMusic.js
import { useState, useEffect, useRef } from "react";

const MUSIC_TRACKS = {
  home: {
    title: "Tema da Casa",
    url: "https://www.soundjay.com/misc/sounds/magic-chime-02.wav",
    loop: true,
  },
  galeria: {
    title: "Momentos Mágicos",
    url: "https://www.soundjay.com/misc/sounds/magic-chime-02.wav",
    loop: true,
  },
  fase1: {
    title: "Grimório Mágico",
    url: "https://www.soundjay.com/misc/sounds/magic-chime-02.wav",
    loop: true,
  },
  // Adicione mais conforme necessário
};

export function useMusic(phaseName, autoplay = false) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);

  useEffect(() => {
    const track = MUSIC_TRACKS[phaseName];
    if (track && audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.loop = track.loop;
      audioRef.current.volume = volume;

      if (autoplay) {
        playMusic();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [phaseName, autoplay, volume]);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Ignorar erro se não conseguir reproduzir
        console.log("Não foi possível reproduzir a música");
      });
      setIsPlaying(true);
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  return {
    isPlaying,
    volume,
    setVolume,
    playMusic,
    pauseMusic,
    toggleMusic,
    audioRef,
    currentTrack: MUSIC_TRACKS[phaseName],
  };
}

export function MusicPlayer({
  phaseName,
  position = "bottom-right",
  showControls = true,
}) {
  const { isPlaying, volume, setVolume, toggleMusic, audioRef, currentTrack } =
    useMusic(phaseName);

  if (!currentTrack) return null;

  const positionStyles = {
    "top-left": { top: "20px", left: "20px" },
    "top-right": { top: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "bottom-right": { bottom: "20px", right: "20px" },
  };

  return (
    <>
      <audio ref={audioRef} />
      {showControls && (
        <div
          className="music-player"
          style={{
            position: "fixed",
            ...positionStyles[position],
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderRadius: "15px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            minWidth: "150px",
          }}
        >
          <div
            style={{ color: "white", fontSize: "12px", textAlign: "center" }}
          >
            🎵 {currentTrack.title}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={toggleMusic}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {isPlaying ? "⏸️" : "▶️"}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ flex: 1 }}
            />

            <span style={{ color: "white", fontSize: "12px" }}>🔊</span>
          </div>
        </div>
      )}
    </>
  );
}

export const musicPlayerCSS = `
  .music-player input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    background: #333;
    border-radius: 2px;
    outline: none;
  }
  
  .music-player input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: #ff69b4;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .music-player input[type="range"]::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #ff69b4;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;
