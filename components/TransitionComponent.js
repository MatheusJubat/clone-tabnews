// components/TransitionComponent.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TRANSITION_MESSAGES = {
  fase1: {
    fase2: "🧪 Saindo do mundo mágico... Entrando no laboratório da Maomao!",
    default: "✨ Continuando a aventura mágica...",
  },
  fase2: {
    pesca: "🎣 Deixando o laboratório... Hora da pescaria dos momentos!",
    default: "🌊 Navegando para águas tranquilas...",
  },
  pesca: {
    fase3: "🏰 Saindo do lago... Entrando no Castelo do Calcifer!",
    default: "🔥 Seguindo em direção ao fogo mágico...",
  },
  fase3: {
    "fase-flores": "🌸 Deixando o castelo... Chegando ao Jardim das Flores!",
    default: "🌺 Caminhando pelo jardim encantado...",
  },
  "fase-flores": {
    "fase-games": "🎮 Saindo do jardim... Hora de convencer o Matheus a jogar!",
    default: "👾 Entrando no mundo dos games...",
  },
  "fase-games": {
    fase4: "⚡ Missão cumprida... Partindo para a galáxia Jedi!",
    default: "🌌 Viajando pelo espaço...",
  },
  fase4: {
    fase5: "🎬 Deixando a galáxia... Chegando ao cinema!",
    default: "🍿 Preparando-se para o show...",
  },
  fase5: {
    fase6: "💎 Saindo do cinema... Entrando no mundo das Crystal Gems!",
    default: "✨ Fusionando com a magia...",
  },
  fase6: {
    fase7: "🎮 Deixando Beach City... Chegando ao Arcade 8-bit!",
    default: "👾 Carregando o próximo level...",
  },
  fase7: {
    fase8: "🍺 Game Over... Bem-vindos ao MacLaren's Pub!",
    default: "🎭 A história está quase no fim...",
  },
  fase8: {
    faseFinal: "💫 Última chamada... Preparando a grande revelação!",
    default: "🎆 O momento final se aproxima...",
  },
  faseFinal: {
    pedido: "💍 Chegou a hora... A pergunta mais importante!",
    default: "💖 O coração está acelerado...",
  },
};

export function useTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionData, setTransitionData] = useState(null);
  const router = useRouter();

  const startTransition = async (
    fromPhase,
    toPhase,
    customMessage = null,
    duration = 2000,
  ) => {
    const message = customMessage || getTransitionMessage(fromPhase, toPhase);

    setTransitionData({
      fromPhase,
      toPhase,
      message,
      onComplete: () => {
        router.push(`/aventura/${toPhase}`);
      },
    });

    setIsTransitioning(true);

    // Aguardar duração da transição
    await new Promise((resolve) => setTimeout(resolve, duration));

    setIsTransitioning(false);
    setTransitionData(null);
  };

  return {
    isTransitioning,
    transitionData,
    startTransition,
  };
}

export function getTransitionMessage(fromPhase, toPhase) {
  const phaseMessages = TRANSITION_MESSAGES[fromPhase];
  if (phaseMessages) {
    return phaseMessages[toPhase] || phaseMessages.default;
  }
  return "✨ Continuando a jornada mágica...";
}

export default function TransitionComponent({
  fromPhase,
  toPhase,
  message,
  onComplete,
}) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Animação de progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Animação dos pontos
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, [onComplete]);

  return (
    <div style={containerStyle}>
      {/* Background com estrelas */}
      <div style={starsBackground}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            style={{
              ...starStyle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Conteúdo da transição */}
      <div style={contentContainer}>
        <div style={logoContainer}>
          <div style={magicPortal}>
            <div style={portalRing1}></div>
            <div style={portalRing2}></div>
            <div style={portalRing3}></div>
            <div style={portalCenter}>🌟</div>
          </div>
        </div>

        <h2 style={titleStyle}>Transportando para nova dimensão{dots}</h2>

        <div style={messageContainer}>
          <p style={messageStyle}>{message}</p>
        </div>

        {/* Barra de progresso */}
        <div style={progressContainer}>
          <div style={progressBar}>
            <div
              style={{
                ...progressFill,
                width: `${progress}%`,
              }}
            />
          </div>
          <div style={progressText}>{Math.round(progress)}%</div>
        </div>

        {/* Gatinhos de loading */}
        <div style={loadingCats}>
          <div style={loadingCat1}>🐱</div>
          <div style={loadingCat2}>😸</div>
          <div style={loadingCat3}>😻</div>
        </div>

        <div style={flavorText}>
          {progress < 30 && "🔮 Carregando magia..."}
          {progress >= 30 && progress < 60 && "✨ Preparando surpresas..."}
          {progress >= 60 && progress < 90 && "🎭 Ajustando cenário..."}
          {progress >= 90 && "🎉 Quase lá!"}
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes portal {
          0% {
            transform: rotate(0deg) scale(1);
          }
          100% {
            transform: rotate(360deg) scale(1.1);
          }
        }

        @keyframes portalPulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes catJump {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

// Estilos
const containerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10000,
  fontFamily: '"Comic Sans MS", cursive',
};

const starsBackground = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};

const starStyle = {
  position: "absolute",
  fontSize: "12px",
  animation: "twinkle 2s ease-in-out infinite",
};

const contentContainer = {
  textAlign: "center",
  color: "white",
  zIndex: 2,
};

const logoContainer = {
  marginBottom: "30px",
};

const magicPortal = {
  position: "relative",
  display: "inline-block",
  width: "120px",
  height: "120px",
};

const portalRing1 = {
  position: "absolute",
  width: "120px",
  height: "120px",
  border: "3px solid rgba(255, 255, 255, 0.6)",
  borderRadius: "50%",
  animation: "portal 3s linear infinite",
};

const portalRing2 = {
  position: "absolute",
  width: "80px",
  height: "80px",
  top: "20px",
  left: "20px",
  border: "2px solid rgba(255, 105, 180, 0.8)",
  borderRadius: "50%",
  animation: "portal 2s linear infinite reverse",
};

const portalRing3 = {
  position: "absolute",
  width: "40px",
  height: "40px",
  top: "40px",
  left: "40px",
  border: "2px solid rgba(147, 112, 219, 0.9)",
  borderRadius: "50%",
  animation: "portalPulse 1.5s ease-in-out infinite",
};

const portalCenter = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "2rem",
  animation: "twinkle 2s ease-in-out infinite",
};

const titleStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "20px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
};

const messageContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "30px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(10px)",
};

const messageStyle = {
  fontSize: "1.2rem",
  fontStyle: "italic",
  margin: 0,
  lineHeight: "1.4",
};

const progressContainer = {
  marginBottom: "30px",
};

const progressBar = {
  width: "300px",
  height: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  borderRadius: "10px",
  overflow: "hidden",
  margin: "0 auto 10px",
  border: "2px solid rgba(255, 255, 255, 0.5)",
};

const progressFill = {
  height: "100%",
  background: "linear-gradient(90deg, #ff69b4, #9966cc, #ff1493)",
  borderRadius: "8px",
  transition: "width 0.1s ease-out",
};

const progressText = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#ffd700",
};

const loadingCats = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "20px",
};

const loadingCat1 = {
  fontSize: "2rem",
  animation: "catJump 1s ease-in-out infinite",
};

const loadingCat2 = {
  fontSize: "2rem",
  animation: "catJump 1s ease-in-out infinite 0.3s",
};

const loadingCat3 = {
  fontSize: "2rem",
  animation: "catJump 1s ease-in-out infinite 0.6s",
};

const flavorText = {
  fontSize: "1rem",
  opacity: 0.8,
  fontStyle: "italic",
};
