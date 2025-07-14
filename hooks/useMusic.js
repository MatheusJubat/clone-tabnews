// hooks/useMusic.js
import { useState, useEffect, useRef } from "react";

export const musicLibrary = {
  home: {
    name: "Peaceful Love Lo-Fi",
    url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&loop=1&playlist=jfKfPfyJRdk",
    description: "Uma melodia suave para começar a jornada do amor",
  },
  joguinho: {
    name: "Romantic Beats Lo-Fi",
    url: "https://www.youtube.com/embed/5yx6BWlEVcY?autoplay=1&loop=1&playlist=5yx6BWlEVcY",
    description: "Batidas românticas para decisões do coração",
  },
  galeria: {
    name: "Nostalgic Memories Lo-Fi",
    url: "https://www.youtube.com/embed/DWcJFNfaw9c?autoplay=1&loop=1&playlist=DWcJFNfaw9c",
    description: "Melodias nostálgicas para relembrar momentos especiais",
  },
  fase1: {
    name: "Mystical Grimoire Lo-Fi",
    url: "https://www.youtube.com/embed/lTRiuFIWV54?autoplay=1&loop=1&playlist=lTRiuFIWV54",
    description: "Sons místicos do grimório encantado",
  },
  fase2: {
    name: "Alchemy Lab Lo-Fi",
    url: "https://www.youtube.com/embed/8bu2LsYEs8k?autoplay=1&loop=1&playlist=8bu2LsYEs8k",
    description: "Melodias alquímicas de Maomao",
  },
  pesca: {
    name: "Tranquil Waters Lo-Fi",
    url: "https://www.youtube.com/embed/k-1HUJBhLQ8?autoplay=1&loop=1&playlist=k-1HUJBhLQ8",
    description: "Sons relaxantes do lago encantado",
  },
  fase3: {
    name: "Royal Castle Lo-Fi",
    url: "https://www.youtube.com/embed/3jWRrafhO7M?autoplay=1&loop=1&playlist=3jWRrafhO7M",
    description: "Melodias majestosas do castelo real",
  },
  fase4: {
    name: "Galactic Force Lo-Fi",
    url: "https://www.youtube.com/embed/7NOSDKb0HlU?autoplay=1&loop=1&playlist=7NOSDKb0HlU",
    description: "Sons cósmicos da galáxia Jedi",
  },
  fase5: {
    name: "Kawaii Café Lo-Fi",
    url: "https://www.youtube.com/embed/wrWzBg475Q8?autoplay=1&loop=1&playlist=wrWzBg475Q8",
    description: "Batidas kawaii do anime café",
  },
  fase6: {
    name: "Crystal Gems Lo-Fi",
    url: "https://www.youtube.com/embed/jjFBNyduESE?autoplay=1&loop=1&playlist=jjFBNyduESE",
    description: "Harmonias cristalinas do Steven Universe",
  },
  fase7: {
    name: "8-Bit Love Lo-Fi",
    url: "https://www.youtube.com/embed/1KHBf9qFIGk?autoplay=1&loop=1&playlist=1KHBf9qFIGk",
    description: "Chiptunes românticas do arcade",
  },
  fase8: {
    name: "Pub Stories Lo-Fi",
    url: "https://www.youtube.com/embed/PYL7jj3YW1Q?autoplay=1&loop=1&playlist=PYL7jj3YW1Q",
    description: "Melodias aconchegantes do MacLaren's",
  },
  "fase-final": {
    name: "Epic Revelation Lo-Fi",
    url: "https://www.youtube.com/embed/aJFCgJ5Ai_Y?autoplay=1&loop=1&playlist=aJFCgJ5Ai_Y",
    description: "Música épica para a grande revelação",
  },
  pedido: {
    name: "Wedding Proposal Lo-Fi",
    url: "https://www.youtube.com/embed/4b30SUKKfJU?autoplay=1&loop=1&playlist=4b30SUKKfJU",
    description: "A melodia mais especial de todas - para o pedido",
  },
};

export const useMusic = (phaseName) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    const track = musicLibrary[phaseName];
    if (track) {
      setCurrentTrack(track);
      // Auto-start music após um delay para evitar bloqueios de autoplay
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [phaseName]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
  };

  const nextTrack = () => {
    const phases = Object.keys(musicLibrary);
    const currentIndex = phases.indexOf(phaseName);
    const nextIndex = (currentIndex + 1) % phases.length;
    const nextPhase = phases[nextIndex];
    setCurrentTrack(musicLibrary[nextPhase]);
  };

  return {
    currentTrack,
    isPlaying,
    volume,
    toggleMusic,
    changeVolume,
    nextTrack,
    iframeRef,
  };
};

// Componente de Player de Música
export const MusicPlayer = ({
  phaseName,
  position = "bottom-right",
  showControls = true,
}) => {
  const { currentTrack, isPlaying, volume, toggleMusic, changeVolume } =
    useMusic(phaseName);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const positionStyles = {
    "bottom-right": { bottom: "20px", right: "20px" },
    "top-right": { top: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "top-left": { top: "20px", left: "20px" },
  };

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  if (!currentTrack || !showPlayer) return null;

  return (
    <>
      {/* YouTube Player (invisível) */}
      <div style={{ display: "none" }}>
        <iframe
          width="0"
          height="0"
          src={
            isPlaying
              ? currentTrack.url + `&volume=${Math.round(volume * 100)}`
              : ""
          }
          title={currentTrack.name}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Controles de Música */}
      {showControls && (
        <div
          style={{
            ...musicPlayerStyle,
            ...positionStyles[position],
            width: isMinimized ? "60px" : "280px",
            height: isMinimized ? "60px" : "auto",
          }}
        >
          {/* Botão minimizar/expandir */}
          <div
            style={minimizeButtonStyle}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? "🎵" : "➖"}
          </div>

          {!isMinimized && (
            <div style={playerContentStyle}>
              {/* Info da música */}
              <div style={trackInfoStyle}>
                <div style={trackNameStyle}>{currentTrack.name}</div>
                <div style={trackDescStyle}>{currentTrack.description}</div>
              </div>

              {/* Controles */}
              <div style={controlsStyle}>
                <button style={controlButtonStyle} onClick={toggleMusic}>
                  {isPlaying ? "⏸️" : "▶️"}
                </button>

                <div style={volumeContainerStyle}>
                  <span style={volumeLabelStyle}>🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => changeVolume(parseFloat(e.target.value))}
                    style={volumeSliderStyle}
                  />
                </div>
              </div>

              {/* Visualizador de áudio */}
              <div style={visualizerStyle}>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      ...visualizerBarStyle,
                      animationDelay: `${i * 0.1}s`,
                      opacity: isPlaying ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

// Estilos do player
const musicPlayerStyle = {
  position: "fixed",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: "15px",
  border: "2px solid #ff69b4",
  color: "white",
  zIndex: 1000,
  transition: "all 0.3s ease",
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
};

const minimizeButtonStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "1.5rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const playerContentStyle = {
  padding: "15px",
  paddingTop: "35px",
};

const trackInfoStyle = {
  marginBottom: "15px",
  textAlign: "center",
};

const trackNameStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "5px",
  color: "#ff69b4",
};

const trackDescStyle = {
  fontSize: "11px",
  opacity: 0.8,
  fontStyle: "italic",
};

const controlsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "15px",
};

const controlButtonStyle = {
  background: "linear-gradient(45deg, #ff69b4, #9370db)",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const volumeContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flex: 1,
};

const volumeLabelStyle = {
  fontSize: "14px",
};

const volumeSliderStyle = {
  flex: 1,
  height: "5px",
  borderRadius: "5px",
  background: "rgba(255, 255, 255, 0.3)",
  outline: "none",
  cursor: "pointer",
};

const visualizerStyle = {
  display: "flex",
  alignItems: "end",
  justifyContent: "center",
  gap: "3px",
  height: "30px",
};

const visualizerBarStyle = {
  width: "4px",
  background: "linear-gradient(to top, #ff69b4, #9370db)",
  borderRadius: "2px",
  animation: "musicPulse 1s ease-in-out infinite alternate",
};

// CSS global para o visualizador
export const musicPlayerCSS = `
  @keyframes musicPulse {
    0% { height: 5px; }
    100% { height: 25px; }
  }
  
  @keyframes musicPlayerSlide {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
