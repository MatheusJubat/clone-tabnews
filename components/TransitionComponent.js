import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TransitionComponent({
  fromPhase,
  toPhase,
  message = "Preparando próxima aventura...",
  onComplete,
}) {
  const [step, setStep] = useState(0);
  const [particles, setParticles] = useState([]);
  const [magicCircle, setMagicCircle] = useState(false);

  const phaseInfo = {
    joguinho: {
      emoji: "💖",
      name: "Joguinho do Amor",
      color: "#ff69b4",
    },
    galeria: {
      emoji: "📸",
      name: "Galeria Mágica",
      color: "#9370db",
    },
    fase1: {
      emoji: "📜",
      name: "Grimório Secreto",
      color: "#8b5fbf",
    },
    fase2: {
      emoji: "🧪",
      name: "Laboratório da Apotecária",
      color: "#8e6e53",
    },
    pesca: {
      emoji: "🎣",
      name: "Lago Encantado",
      color: "#1e90ff",
    },
    fase3: {
      emoji: "🏰",
      name: "Castelo dos Gatinhos",
      color: "#4b0082",
    },
    fase4: {
      emoji: "⚡",
      name: "Galáxia Jedi",
      color: "#ffe81f",
    },
    fase5: {
      emoji: "🌸",
      name: "Anime Café",
      color: "#ff69b4",
    },
    fase6: {
      emoji: "💎",
      name: "Templo das Gemas",
      color: "#667eea",
    },
    fase7: {
      emoji: "🎮",
      name: "Arcade 8-bit",
      color: "#ff1493",
    },
    fase8: {
      emoji: "🍺",
      name: "MacLaren's Pub",
      color: "#daa520",
    },
    "fase-final": {
      emoji: "💫",
      name: "Grande Revelação",
      color: "#ffd700",
    },
    pedido: {
      emoji: "💍",
      name: "Momento Especial",
      color: "#ff6b81",
    },
  };

  useEffect(() => {
    // Criar partículas mágicas
    const newParticles = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ["✨", "💫", "🌟", "⭐", "💖", "🐱"][
          Math.floor(Math.random() * 6)
        ],
        delay: Math.random() * 3,
        speed: 2 + Math.random() * 3,
      });
    }
    setParticles(newParticles);

    // Sequência de transição
    const sequence = [
      () => setStep(1), // Fade in
      () => setMagicCircle(true), // Círculo mágico
      () => setStep(2), // Mensagem aparece
      () => setStep(3), // Fase atual desaparece
      () => setStep(4), // Transição
      () => setStep(5), // Nova fase aparece
      () => {
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500);
      },
    ];

    sequence.forEach((fn, index) => {
      setTimeout(fn, index * 800);
    });
  }, [onComplete]);

  const currentPhase = phaseInfo[fromPhase];
  const nextPhase = phaseInfo[toPhase];

  return (
    <div style={containerStyle}>
      {/* Partículas mágicas */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            ...particleStyle,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.speed}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Fundo gradiente baseado nas fases */}
      <div
        style={{
          ...backgroundGradient,
          background: `linear-gradient(135deg, ${currentPhase?.color || "#667eea"} 0%, ${nextPhase?.color || "#764ba2"} 100%)`,
        }}
      />

      {/* Círculo mágico */}
      {magicCircle && (
        <div style={magicCircleContainer}>
          <div style={outerCircle}>
            <div style={middleCircle}>
              <div style={innerCircle}>
                <div style={centerGem}>💎</div>
              </div>
            </div>
          </div>

          {/* Runas ao redor */}
          <div style={runesContainer}>
            {["💖", "🐱", "✨", "🌟", "💫", "⭐"].map((rune, index) => (
              <div
                key={index}
                style={{
                  ...runeStyle,
                  transform: `rotate(${index * 60}deg) translateY(-80px)`,
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {rune}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo da transição */}
      <div style={contentContainer}>
        {/* Fase atual saindo */}
        {step >= 1 && step <= 3 && currentPhase && (
          <div
            style={{
              ...phaseCard,
              opacity: step <= 2 ? 1 : 0,
              transform:
                step <= 2
                  ? "scale(1) translateY(0)"
                  : "scale(0.8) translateY(-50px)",
            }}
          >
            <div style={phaseEmoji}>{currentPhase.emoji}</div>
            <h2 style={phaseName}>{currentPhase.name}</h2>
            <p style={phaseStatus}>Completado! ✨</p>
          </div>
        )}

        {/* Mensagem de transição */}
        {step >= 2 && step <= 4 && (
          <div
            style={{
              ...transitionMessage,
              opacity: step === 2 || step === 3 ? 1 : 0,
            }}
          >
            <div style={messageContainer}>
              <div style={loadingCats}>
                <span style={loadingCat1}>🐱</span>
                <span style={loadingCat2}>😸</span>
                <span style={loadingCat3}>😻</span>
              </div>

              <h3 style={messageTitle}>Portais Mágicos Ativados!</h3>
              <p style={messageText}>{message}</p>

              <div style={progressBar}>
                <div style={progressFill} />
              </div>
            </div>
          </div>
        )}

        {/* Nova fase entrando */}
        {step >= 5 && nextPhase && (
          <div
            style={{
              ...phaseCard,
              opacity: step >= 5 ? 1 : 0,
              transform:
                step >= 5
                  ? "scale(1) translateY(0)"
                  : "scale(0.8) translateY(50px)",
            }}
          >
            <div style={phaseEmoji}>{nextPhase.emoji}</div>
            <h2 style={phaseName}>{nextPhase.name}</h2>
            <p style={phaseStatus}>Iniciando... 🚀</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes magicFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-20px) rotate(180deg) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes circleRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes runeOrbit {
          from {
            transform: rotate(0deg) translateY(-80px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateY(-80px) rotate(-360deg);
          }
        }

        @keyframes catBounce {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }

        @keyframes progressGrow {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.6);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 105, 180, 1);
            transform: scale(1.05);
          }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: '"Inter", "Segoe UI", sans-serif',
  overflow: "hidden",
};

const backgroundGradient = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 0,
};

const particleStyle = {
  position: "absolute",
  fontSize: "16px",
  animation: "magicFloat infinite ease-in-out",
  pointerEvents: "none",
  zIndex: 1,
};

const magicCircleContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 2,
};

const outerCircle = {
  width: "200px",
  height: "200px",
  border: "3px solid rgba(255, 255, 255, 0.6)",
  borderRadius: "50%",
  animation: "circleRotate 10s linear infinite",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const middleCircle = {
  width: "140px",
  height: "140px",
  border: "2px solid rgba(255, 215, 0, 0.8)",
  borderRadius: "50%",
  animation: "circleRotate 8s linear infinite reverse",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const innerCircle = {
  width: "80px",
  height: "80px",
  border: "2px solid rgba(255, 105, 180, 0.9)",
  borderRadius: "50%",
  animation: "circleRotate 6s linear infinite",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
};

const centerGem = {
  fontSize: "2rem",
  animation: "pulseGlow 2s ease-in-out infinite",
};

const runesContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "200px",
  height: "200px",
};

const runeStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  fontSize: "1.5rem",
  animation: "runeOrbit 20s linear infinite",
  transformOrigin: "0 0",
};

const contentContainer = {
  position: "relative",
  zIndex: 3,
  textAlign: "center",
  color: "white",
};

const phaseCard = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "20px",
  padding: "30px",
  margin: "20px",
  border: "3px solid rgba(255, 215, 0, 0.8)",
  backdropFilter: "blur(10px)",
  transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
  animation: "fadeSlideUp 1s ease-out",
  color: "#333",
};

const phaseEmoji = {
  fontSize: "4rem",
  marginBottom: "15px",
  animation: "catBounce 2s ease-in-out infinite",
};

const phaseName = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "10px",
  background: "linear-gradient(45deg, #ff69b4, #9370db)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const phaseStatus = {
  fontSize: "1.1rem",
  color: "#666",
  fontStyle: "italic",
};

const transitionMessage = {
  transition: "opacity 1s ease-in-out",
};

const messageContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
  padding: "30px",
  border: "3px solid rgba(255, 105, 180, 0.8)",
  backdropFilter: "blur(10px)",
  color: "#333",
};

const loadingCats = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
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

const messageTitle = {
  fontSize: "1.5rem",
  color: "#ff1493",
  marginBottom: "10px",
  fontWeight: "bold",
};

const messageText = {
  fontSize: "1.1rem",
  color: "#666",
  marginBottom: "20px",
};

const progressBar = {
  width: "100%",
  height: "8px",
  backgroundColor: "rgba(255, 105, 180, 0.3)",
  borderRadius: "4px",
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  backgroundColor: "#ff69b4",
  borderRadius: "4px",
  animation: "progressGrow 3s ease-in-out",
};
