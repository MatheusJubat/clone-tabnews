import { useEffect, useState } from "react";

export default function PedidoCasamentoFinal() {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [mostrarCoracoes, setMostrarCoracoes] = useState(false);
  const [confettiAtivo, setConfettiAtivo] = useState(false);
  const [mensagemRevelada, setMensagemRevelada] = useState("");
  const [resposta, setResposta] = useState(null);

  const mensagemCompleta =
    "Minha Millena... Depois de tudo o que passamos juntos, todas as aventuras, risos, lágrimas e sonhos compartilhados... Eu tenho uma pergunta muito importante pra te fazer...";

  useEffect(() => {
    // Sequência temporal da apresentação
    const timeouts = [
      setTimeout(() => setEtapaAtual(1), 2000), // Mostrar primeira mensagem
      setTimeout(() => setEtapaAtual(2), 6000), // Revelar carrossel de memórias
      setTimeout(() => setEtapaAtual(3), 12000), // Mostrar countdown
      setTimeout(() => setEtapaAtual(4), 18000), // PERGUNTA FINAL
    ];

    // Efeito de digitação
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < mensagemCompleta.length) {
        setMensagemRevelada(mensagemCompleta.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(typingEffect);
    };
  }, []);

  const responderSim = async () => {
    setResposta("sim");
    setMostrarCoracoes(true);
    setConfettiAtivo(true);

    // Importar e disparar confetti
    const { default: confetti } = await import("canvas-confetti");

    // Múltiplas rajadas de confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Confetti contínuo
    const interval = setInterval(() => {
      fire(0.1, {
        spread: 60,
        startVelocity: 30,
      });
    }, 250);

    setTimeout(() => clearInterval(interval), 5000);
  };

  const memorias = [
    { emoji: "🐱", texto: "Nossos momentos com gatinhos" },
    { emoji: "💻", texto: "Você me ajudando com código" },
    { emoji: "📺", texto: "Maratonando séries juntos" },
    { emoji: "🎮", texto: "Jogando videogame até tarde" },
    { emoji: "☕", texto: "Cafés da manhã especiais" },
    { emoji: "🌟", texto: "Sonhando com o futuro" },
  ];

  return (
    <div style={containerStyle}>
      {/* Background com estrelas animadas */}
      <div style={starsBackground}>
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            style={{
              ...starStyle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Chuva de corações quando aceita */}
      {mostrarCoracoes && (
        <div style={heartsContainer}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                ...heartRain,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${Math.random() * 20 + 15}px`,
              }}
            >
              💖
            </div>
          ))}
        </div>
      )}

      <div style={contentWrapper}>
        {/* Etapa 0 - Intro silenciosa */}
        {etapaAtual === 0 && (
          <div style={introContainer}>
            <div style={loadingHeart}>💖</div>
            <p style={loadingText}>Preparando algo muito especial...</p>
          </div>
        )}

        {/* Etapa 1 - Mensagem digitando */}
        {etapaAtual >= 1 && (
          <div style={messageContainer}>
            <div style={avatarContainer}>
              <div style={avatar}>👨‍💻</div>
              <div style={heartPulse}>💕</div>
            </div>
            <div style={messageBox}>
              <p style={typingMessage}>
                {mensagemRevelada}
                <span style={cursor}>|</span>
              </p>
            </div>
          </div>
        )}

        {/* Etapa 2 - Carrossel de memórias */}
        {etapaAtual >= 2 && (
          <div style={memoriesSection}>
            <h2 style={memoriesTitle}>💫 Nossas Memórias Especiais 💫</h2>
            <div style={memoriesGrid}>
              {memorias.map((memoria, index) => (
                <div
                  key={index}
                  style={{
                    ...memoryCard,
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div style={memoryEmoji}>{memoria.emoji}</div>
                  <p style={memoryText}>{memoria.texto}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Etapa 3 - Countdown */}
        {etapaAtual >= 3 && etapaAtual < 4 && (
          <div style={countdownContainer}>
            <h2 style={countdownTitle}>
              A pergunta mais importante está chegando...
            </h2>
            <div style={countdownNumbers}>
              <div style={countNumber}>3</div>
              <div style={countNumber}>2</div>
              <div style={countNumber}>1</div>
            </div>
          </div>
        )}

        {/* Etapa 4 - PERGUNTA FINAL */}
        {etapaAtual >= 4 && !resposta && (
          <div style={proposalContainer}>
            <div style={ringContainer}>
              <div style={ring}>💍</div>
              <div style={ringGlow}></div>
            </div>

            <h1 style={proposalTitle}>
              ✨ Millena, você quer casar comigo? ✨
            </h1>

            <div style={proposalSubtext}>
              <p>Prometo te fazer rir todos os dias</p>
              <p>Ser seu player 2 para sempre</p>
              <p>E amar você em todas as aventuras da vida</p>
            </div>

            <div style={buttonsContainer}>
              <button
                onClick={responderSim}
                style={yesButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.2) rotate(5deg)";
                  e.target.style.boxShadow =
                    "0 20px 40px rgba(255, 105, 180, 0.8)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) rotate(0deg)";
                  e.target.style.boxShadow =
                    "0 15px 30px rgba(255, 105, 180, 0.6)";
                }}
              >
                💖 SIM! MIL VEZES SIM! 💖
              </button>

              <button
                style={noButton}
                onClick={() => alert("Essa opção não existe! 😄💕")}
              >
                🤔 Hmm... (botão quebrado)
              </button>
            </div>
          </div>
        )}

        {/* Resposta SIM */}
        {resposta === "sim" && (
          <div style={celebrationContainer}>
            <h1 style={celebrationTitle}>🎉💍 ELA DISSE SIM! 💍🎉</h1>

            <div style={celebrationContent}>
              <div style={coupleEmoji}>👨‍❤️‍👩</div>

              <div style={finalMessage}>
                <h2>Você é incrível!</h2>
                <p>Agora somos oficialmente noivos! 💕</p>
                <p>Mal posso esperar para construir nosso futuro juntos,</p>
                <p>cheio de aventuras, risadas e muito amor!</p>
              </div>

              <div style={weddingPlans}>
                <h3>🏰 Próximos Episódios:</h3>
                <div style={plansList}>
                  <div style={planItem}>📅 Marcar a data mágica</div>
                  <div style={planItem}>👗 Escolher o vestido dos sonhos</div>
                  <div style={planItem}>🎵 Playlist da festa</div>
                  <div style={planItem}>🏡 Nossa casa dos gatinhos</div>
                  <div style={planItem}>♾️ E viveram felizes para sempre!</div>
                </div>
              </div>

              <div style={finalCats}>
                <div>🐱</div>
                <div>💕</div>
                <div>🐱</div>
              </div>
            </div>
          </div>
        )}
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

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes heartfall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
          }
          50% {
            box-shadow:
              0 0 40px rgba(255, 215, 0, 1),
              0 0 60px rgba(255, 215, 0, 0.8);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-30px);
          }
          60% {
            transform: translateY(-15px);
          }
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Inter", "Segoe UI", sans-serif',
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
  animation: "twinkle infinite ease-in-out",
};

const heartsContainer = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 1000,
};

const heartRain = {
  position: "absolute",
  animation: "heartfall 3s linear infinite",
};

const contentWrapper = {
  position: "relative",
  zIndex: 1,
  padding: "20px",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const introContainer = {
  textAlign: "center",
  color: "white",
};

const loadingHeart = {
  fontSize: "4rem",
  animation: "heartbeat 1.5s ease-in-out infinite",
};

const loadingText = {
  fontSize: "1.2rem",
  marginTop: "20px",
  opacity: 0.8,
};

const messageContainer = {
  display: "flex",
  alignItems: "flex-start",
  gap: "20px",
  maxWidth: "700px",
  margin: "20px 0",
  animation: "slideUp 1s ease-out",
};

const avatarContainer = {
  position: "relative",
};

const avatar = {
  fontSize: "3rem",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "50%",
  padding: "10px",
  border: "3px solid #ff69b4",
};

const heartPulse = {
  position: "absolute",
  top: "-10px",
  right: "-10px",
  fontSize: "1.5rem",
  animation: "heartbeat 2s ease-in-out infinite",
};

const messageBox = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
  padding: "25px",
  borderLeft: "5px solid #ff69b4",
  flex: 1,
};

const typingMessage = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#333",
  margin: 0,
};

const cursor = {
  animation: "blink 1s infinite",
};

const memoriesSection = {
  margin: "40px 0",
  textAlign: "center",
  animation: "slideUp 1s ease-out 0.5s both",
};

const memoriesTitle = {
  color: "white",
  fontSize: "1.8rem",
  marginBottom: "30px",
};

const memoriesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  maxWidth: "800px",
  margin: "0 auto",
};

const memoryCard = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "15px",
  padding: "20px",
  textAlign: "center",
  transform: "translateY(20px)",
  animation: "slideUp 0.8s ease-out forwards",
};

const memoryEmoji = {
  fontSize: "2.5rem",
  marginBottom: "10px",
};

const memoryText = {
  color: "#555",
  fontSize: "0.9rem",
  margin: 0,
};

const countdownContainer = {
  textAlign: "center",
  margin: "40px 0",
  animation: "slideUp 1s ease-out",
};

const countdownTitle = {
  color: "white",
  fontSize: "1.5rem",
  marginBottom: "30px",
};

const countdownNumbers = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
};

const countNumber = {
  fontSize: "4rem",
  color: "#ffd700",
  fontWeight: "bold",
  animation: "bounce 1s ease-in-out infinite",
};

const proposalContainer = {
  textAlign: "center",
  maxWidth: "600px",
  animation: "slideUp 1.5s ease-out",
};

const ringContainer = {
  position: "relative",
  display: "inline-block",
  marginBottom: "30px",
};

const ring = {
  fontSize: "5rem",
  position: "relative",
  zIndex: 2,
  animation: "heartbeat 2s ease-in-out infinite",
};

const ringGlow = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  animation: "glow 2s ease-in-out infinite",
};

const proposalTitle = {
  fontSize: "2.5rem",
  color: "white",
  marginBottom: "30px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
};

const proposalSubtext = {
  color: "rgba(255,255,255,0.9)",
  fontSize: "1.1rem",
  marginBottom: "40px",
  lineHeight: "1.8",
};

const buttonsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "center",
};

const yesButton = {
  padding: "20px 40px",
  fontSize: "1.5rem",
  fontWeight: "bold",
  background: "linear-gradient(45deg, #ff69b4, #ff1493)",
  color: "white",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 15px 30px rgba(255, 105, 180, 0.6)",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const noButton = {
  padding: "10px 20px",
  fontSize: "0.9rem",
  backgroundColor: "rgba(255,255,255,0.3)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.5)",
  borderRadius: "20px",
  cursor: "not-allowed",
  opacity: 0.6,
};

const celebrationContainer = {
  textAlign: "center",
  maxWidth: "700px",
  animation: "slideUp 1s ease-out",
};

const celebrationTitle = {
  fontSize: "3rem",
  color: "#ffd700",
  marginBottom: "30px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
};

const celebrationContent = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  border: "3px solid #ffd700",
};

const coupleEmoji = {
  fontSize: "5rem",
  marginBottom: "20px",
  animation: "heartbeat 2s ease-in-out infinite",
};

const finalMessage = {
  marginBottom: "30px",
  color: "#333",
};

const weddingPlans = {
  backgroundColor: "#f8f9fa",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "30px",
};

const plansList = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "15px",
};

const planItem = {
  padding: "10px 15px",
  backgroundColor: "rgba(255, 105, 180, 0.1)",
  borderRadius: "20px",
  color: "#ff1493",
  fontWeight: "500",
};

const finalCats = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  fontSize: "2rem",
};
