// components/LoadingScreen.js
import { useState, useEffect } from "react";

export default function LoadingScreen({
  message = "Carregando magia...",
  onComplete,
  duration = 3000,
  showProgress = true,
}) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [hearts, setHearts] = useState([]);

  const loadingMessages = [
    "Acordando os gatinhos mágicos... 🐱",
    "Preparando poções do amor... 🧪",
    "Polvilhando estrelas encantadas... ✨",
    "Aquecendo o coração... 💖",
    message,
  ];

  useEffect(() => {
    // Criar corações flutuantes
    const heartElements = [];
    for (let i = 0; i < 12; i++) {
      heartElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        emoji: ["💖", "💕", "💓", "💗", "💘"][Math.floor(Math.random() * 5)],
      });
    }
    setHearts(heartElements);

    // Progresso e mensagens
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration / 100);

        // Atualizar mensagem baseada no progresso
        const messageIndex = Math.floor(
          (newProgress / 100) * (loadingMessages.length - 1),
        );
        setCurrentMessage(loadingMessages[messageIndex] || loadingMessages[0]);

        if (newProgress >= 100) {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 500);
          }
          return 100;
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, message, onComplete]);

  return (
    <div style={containerStyle}>
      {/* Corações flutuantes */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            ...heartStyle,
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Fundo gradiente animado */}
      <div style={backgroundGradient}></div>

      {/* Conteúdo principal */}
      <div style={contentContainer}>
        {/* Coração principal pulsando */}
        <div style={mainHeartContainer}>
          <div style={mainHeart}>💖</div>
          <div style={heartGlow}></div>
        </div>

        {/* Mensagem atual */}
        <div style={messageContainer}>
          <h2 style={messageText}>{currentMessage}</h2>
        </div>

        {/* Barra de progresso */}
        {showProgress && (
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
        )}

        {/* Gatinhos carregando */}
        <div style={loadingCats}>
          <div style={loadingCat1}>🐱</div>
          <div style={loadingCat2}>😸</div>
          <div style={loadingCat3}>😻</div>
        </div>

        {/* Dica fofa */}
        <div style={tipContainer}>
          <p style={tipText}>
            💡 Dica: Cada fase tem easter eggs escondidos! Clique em tudo!
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes heartPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes heartFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes catBounce {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.1);
          }
        }

        @keyframes progressGlow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(255, 105, 180, 0.6);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 105, 180, 1);
          }
        }

        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10000,
  fontFamily: '"Inter", "Segoe UI", sans-serif',
  overflow: "hidden",
};

const backgroundGradient = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(-45deg, #ff9a9e, #fecfef, #fecfef, #ff9a9e)",
  backgroundSize: "400% 400%",
  animation: "gradientShift 6s ease infinite",
};

const heartStyle = {
  position: "absolute",
  fontSize: "1.5rem",
  animation: "heartFloat 4s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
};

const contentContainer = {
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  color: "white",
  maxWidth: "400px",
  padding: "20px",
};

const mainHeartContainer = {
  position: "relative",
  display: "inline-block",
  marginBottom: "30px",
};

const mainHeart = {
  fontSize: "4rem",
  animation: "heartPulse 1.5s ease-in-out infinite",
  position: "relative",
  zIndex: 2,
};

const heartGlow = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100px",
  height: "100px",
  background:
    "radial-gradient(circle, rgba(255, 105, 180, 0.6) 0%, transparent 70%)",
  borderRadius: "50%",
  animation: "glowPulse 2s ease-in-out infinite",
};

const messageContainer = {
  marginBottom: "30px",
  minHeight: "60px",
};

const messageText = {
  fontSize: "1.3rem",
  fontWeight: "600",
  margin: 0,
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  animation: "messageSlide 0.8s ease-out",
};

const progressContainer = {
  marginBottom: "25px",
  width: "100%",
};

const progressBar = {
  width: "100%",
  height: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  borderRadius: "6px",
  overflow: "hidden",
  marginBottom: "10px",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
};

const progressFill = {
  height: "100%",
  background: "linear-gradient(45deg, #ff69b4, #ff1493, #9370db)",
  borderRadius: "6px",
  transition: "width 0.3s ease",
  animation: "progressGlow 2s ease-in-out infinite",
};

const progressText = {
  fontSize: "1rem",
  fontWeight: "bold",
  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
};

const loadingCats = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "20px",
};

const loadingCat1 = {
  fontSize: "2rem",
  animation: "catBounce 1.5s ease-in-out infinite",
};

const loadingCat2 = {
  fontSize: "2rem",
  animation: "catBounce 1.5s ease-in-out infinite 0.3s",
};

const loadingCat3 = {
  fontSize: "2rem",
  animation: "catBounce 1.5s ease-in-out infinite 0.6s",
};

const tipContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "15px",
  padding: "15px",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};

const tipText = {
  fontSize: "0.9rem",
  margin: 0,
  fontStyle: "italic",
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};

// Hook para usar o loading
export function useLoading(initialLoading = false) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [loadingMessage, setLoadingMessage] = useState("");

  const showLoading = (message = "Carregando...", duration = 3000) => {
    setLoadingMessage(message);
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve();
      }, duration);
    });
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    loadingMessage,
    showLoading,
    hideLoading,
  };
}
