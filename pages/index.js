// pages/index.js - Versão Melhorada
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// ✅ IMPORTS ADICIONADOS:
import { MusicPlayer, musicPlayerCSS } from "../hooks/useMusic";
import {
  useEasterEggs,
  EasterEggButton,
  EasterEggMessage,
  SpecialEffects,
  EasterEggCounter,
  easterEggCSS,
} from "../hooks/useEasterEggs";

export default function HomeMelhorada() {
  const router = useRouter();
  const [mostrarBotao, setMostrarBotao] = useState(false);
  const [animacaoAtiva, setAnimacaoAtiva] = useState(false);
  const [particulas, setParticulas] = useState([]);

  // ✅ HOOK DE EASTER EGGS
  const { findEasterEgg, showMessage, setShowMessage, specialEffects } =
    useEasterEggs("home");

  useEffect(() => {
    // Criar partículas flutuantes
    const novasParticulas = [];
    for (let i = 0; i < 50; i++) {
      novasParticulas.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      });
    }
    setParticulas(novasParticulas);

    // Ativar animação principal
    setTimeout(() => {
      setAnimacaoAtiva(true);
    }, 500);
  }, []);

  const aceitarDesafio = () => {
    setMostrarBotao(true);
    // Trigger easter egg automaticamente
    findEasterEgg({ x: 50, y: 60 });
  };

  const comecar = () => {
    router.push("/joguinho");
  };

  return (
    <div style={containerStyle}>
      {/* ✅ CSS GLOBAL */}
      <style jsx global>{`
        ${musicPlayerCSS}
        ${easterEggCSS}
        
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes sparkle {
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

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
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

        @keyframes glow {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes slideIn {
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

      {/* ✅ MÚSICA E EASTER EGGS */}
      <MusicPlayer
        phaseName="home"
        position="bottom-right"
        showControls={true}
      />

      <EasterEggCounter currentPhase="home" position="top-right" />

      {/* ✅ EASTER EGGS ESCONDIDOS */}
      <EasterEggButton
        position={{ top: "10%", left: "15%" }}
        size={45}
        onFind={findEasterEgg}
      />

      <EasterEggButton
        position={{ bottom: "20%", right: "10%" }}
        size={40}
        onFind={findEasterEgg}
      />

      <EasterEggButton
        position={{ top: "60%", left: "8%" }}
        size={50}
        onFind={findEasterEgg}
        shape="square"
      />

      <EasterEggButton
        position={{ top: "30%", right: "12%" }}
        size={35}
        onFind={findEasterEgg}
      />

      {/* Background com gradiente animado */}
      <div style={backgroundGradient}></div>

      {/* Partículas flutuantes */}
      {particulas.map((particula) => (
        <div
          key={particula.id}
          style={{
            ...particulaStyle,
            left: `${particula.x}%`,
            top: `${particula.y}%`,
            animationDelay: `${particula.delay}s`,
            animationDuration: `${particula.duration}s`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Conteúdo principal */}
      <div style={contentContainer}>
        <div
          style={{
            ...mainCard,
            transform: animacaoAtiva
              ? "translateY(0) scale(1)"
              : "translateY(50px) scale(0.9)",
            opacity: animacaoAtiva ? 1 : 0,
          }}
        >
          {/* Ícone do coração animado com easter egg */}
          <div
            style={heartContainer}
            onClick={() => findEasterEgg({ x: 50, y: 40 })}
          >
            <div style={heartIcon}>💖</div>
            <div style={heartGlow}></div>
          </div>

          <h1 style={titleStyle}>Bom dia, meu amor! ☀️</h1>

          <p style={subtitleStyle}>
            Hoje você foi escolhida para uma missão muito especial...
            <br />
            Uma jornada através de mundos mágicos e aventuras incríveis
            <br />
            que irá revelar o maior segredo do universo! 🌟
          </p>

          <div style={decorativeElements}>
            <div
              style={elementLeft}
              onClick={() => findEasterEgg({ x: 30, y: 50 })}
            >
              🌙
            </div>
            <div
              style={elementRight}
              onClick={() => findEasterEgg({ x: 70, y: 50 })}
            >
              ⭐
            </div>
          </div>

          {!mostrarBotao ? (
            <button
              onClick={aceitarDesafio}
              style={challengeButton}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1) rotate(2deg)";
                e.target.style.boxShadow =
                  "0 15px 35px rgba(255, 105, 180, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1) rotate(0deg)";
                e.target.style.boxShadow =
                  "0 10px 25px rgba(255, 105, 180, 0.4)";
              }}
            >
              ✨ Aceitar o Desafio Mágico ✨
            </button>
          ) : (
            <div style={revealContainer}>
              <div style={magicReveal}>
                <h3 style={revealTitle}>🎭 A Magia Começa Aqui! 🎭</h3>
                <p style={revealText}>
                  Prepare-se para uma jornada através de:
                </p>
                <div style={adventureList}>
                  <div style={adventureItem}>🐱 Reino dos Gatos Mágicos</div>
                  <div style={adventureItem}>💎 Templo das Gemas do Amor</div>
                  <div style={adventureItem}>🍺 Taverna dos Amigos Eternos</div>
                  <div style={adventureItem}>🎮 Mundos 8-bit Nostálgicos</div>
                  <div style={adventureItem}>💖 E muito mais...</div>
                </div>
              </div>

              <button
                onClick={comecar}
                style={startButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.background =
                    "linear-gradient(45deg, #ff1493, #ff69b4, #9966cc)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.background =
                    "linear-gradient(45deg, #ff69b4, #ff1493, #9966cc)";
                }}
              >
                🚀 Iniciar Jornada 🚀
              </button>
            </div>
          )}

          {/* Elementos decorativos rodapé com easter eggs */}
          <div style={footerElements}>
            <div
              style={floatingElement1}
              onClick={() => findEasterEgg({ x: 20, y: 80 })}
            >
              🦋
            </div>
            <div
              style={floatingElement2}
              onClick={() => findEasterEgg({ x: 50, y: 80 })}
            >
              🌸
            </div>
            <div
              style={floatingElement3}
              onClick={() => findEasterEgg({ x: 80, y: 80 })}
            >
              ✨
            </div>
          </div>
        </div>
      </div>

      {/* ✅ COMPONENTES DE FEEDBACK */}
      <EasterEggMessage
        message={showMessage}
        onClose={() => setShowMessage(null)}
      />

      <SpecialEffects effects={specialEffects} />
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: '"Inter", "Segoe UI", sans-serif',
};

const backgroundGradient = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(-45deg, #ff9a9e, #fecfef, #fecfef, #ff9a9e)",
  backgroundSize: "400% 400%",
  animation: "gradientShift 8s ease infinite",
};

const particulaStyle = {
  position: "absolute",
  fontSize: "12px",
  animation: "float infinite ease-in-out",
  pointerEvents: "none",
  zIndex: 1,
};

const contentContainer = {
  position: "relative",
  zIndex: 2,
  padding: "20px",
  width: "100%",
  maxWidth: "600px",
};

const mainCard = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "50px 40px",
  textAlign: "center",
  backdropFilter: "blur(20px)",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
};

const heartContainer = {
  position: "relative",
  display: "inline-block",
  marginBottom: "30px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const heartIcon = {
  fontSize: "4rem",
  animation: "heartbeat 2s ease-in-out infinite",
  position: "relative",
  zIndex: 2,
};

const heartGlow = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80px",
  height: "80px",
  background:
    "radial-gradient(circle, rgba(255, 105, 180, 0.6) 0%, transparent 70%)",
  borderRadius: "50%",
  animation: "glow 2s ease-in-out infinite",
};

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "700",
  background: "linear-gradient(45deg, #ff69b4, #ff1493)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: "25px",
  lineHeight: "1.2",
};

const subtitleStyle = {
  fontSize: "1.1rem",
  color: "#555",
  lineHeight: "1.6",
  marginBottom: "35px",
  fontWeight: "400",
};

const decorativeElements = {
  position: "relative",
  height: "40px",
  marginBottom: "20px",
};

const elementLeft = {
  position: "absolute",
  left: "20%",
  fontSize: "1.5rem",
  animation: "float 3s ease-in-out infinite",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const elementRight = {
  position: "absolute",
  right: "20%",
  fontSize: "1.5rem",
  animation: "float 3s ease-in-out infinite 1.5s",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const challengeButton = {
  padding: "18px 35px",
  fontSize: "1.2rem",
  fontWeight: "600",
  background: "linear-gradient(45deg, #ff69b4, #ff1493)",
  color: "white",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 10px 25px rgba(255, 105, 180, 0.4)",
  position: "relative",
  overflow: "hidden",
};

const revealContainer = {
  animation: "slideIn 0.8s ease-out",
};

const magicReveal = {
  backgroundColor: "#f8f9fa",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px dashed #ff69b4",
};

const revealTitle = {
  color: "#ff1493",
  marginBottom: "15px",
  fontSize: "1.3rem",
};

const revealText = {
  color: "#666",
  marginBottom: "20px",
};

const adventureList = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const adventureItem = {
  padding: "8px 15px",
  backgroundColor: "rgba(255, 105, 180, 0.1)",
  borderRadius: "20px",
  color: "#ff1493",
  fontWeight: "500",
  fontSize: "0.9rem",
};

const startButton = {
  padding: "18px 35px",
  fontSize: "1.3rem",
  fontWeight: "700",
  background: "linear-gradient(45deg, #ff69b4, #ff1493, #9966cc)",
  color: "white",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 15px 30px rgba(255, 105, 180, 0.5)",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const footerElements = {
  position: "absolute",
  bottom: "20px",
  left: 0,
  right: 0,
  height: "30px",
};

const floatingElement1 = {
  position: "absolute",
  left: "10%",
  fontSize: "1.2rem",
  animation: "float 4s ease-in-out infinite",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const floatingElement2 = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "1.2rem",
  animation: "float 4s ease-in-out infinite 1s",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const floatingElement3 = {
  position: "absolute",
  right: "10%",
  fontSize: "1.2rem",
  animation: "float 4s ease-in-out infinite 2s",
  cursor: "pointer",
  transition: "all 0.3s ease",
};
