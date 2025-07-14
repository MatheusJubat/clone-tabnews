import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function JoguinhoMelhorado() {
  const router = useRouter();
  const naoBtnRef = useRef(null);
  const [aceitou, setAceitou] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [floatingCats, setFloatingCats] = useState([]);
  const [tentativas, setTentativas] = useState(0);
  const [showMagic, setShowMagic] = useState(false);

  function moverBotao() {
    const btn = naoBtnRef.current;
    if (!btn) return;

    setTentativas((prev) => prev + 1);

    const width = window.innerWidth - 150;
    const height = window.innerHeight - 100;
    const randX = Math.random() * width;
    const randY = Math.random() * height;

    btn.style.position = "absolute";
    btn.style.left = `${randX}px`;
    btn.style.top = `${randY}px`;
    btn.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.4})`;

    // Adicionar efeito de frustração no botão
    if (tentativas > 3) {
      btn.style.backgroundColor = "#ff6b6b";
      btn.innerText = tentativas > 6 ? "NÃO VAI DAR! 😤" : "Não! 😠";
    }

    // Criar corações quando tenta clicar em "Não"
    criarCoracao(randX, randY);
  }

  function criarCoracao(x, y) {
    const novoCoracao = {
      id: Date.now(),
      x: x,
      y: y,
      emoji: ["💖", "💕", "💓", "💗", "💘"][Math.floor(Math.random() * 5)],
    };

    setHearts((prev) => [...prev, novoCoracao]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== novoCoracao.id));
    }, 2000);
  }

  useEffect(() => {
    // Criar gatinhos flutuantes
    const cats = [];
    for (let i = 0; i < 8; i++) {
      cats.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ["😸", "😻", "🐱", "😺", "🙀", "😿", "😾"][
          Math.floor(Math.random() * 7)
        ],
        delay: Math.random() * 3,
      });
    }
    setFloatingCats(cats);

    const btn = naoBtnRef.current;
    if (btn) {
      btn.addEventListener("mouseover", moverBotao);
      btn.addEventListener("click", moverBotao);
    }

    return () => {
      if (btn) {
        btn.removeEventListener("mouseover", moverBotao);
        btn.removeEventListener("click", moverBotao);
      }
    };
  }, [tentativas]);

  const handleSim = () => {
    setAceitou(true);
    setShowMagic(true);

    // Criar explosão de corações
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        criarCoracao(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
        );
      }, i * 100);
    }
  };

  const irParaGaleria = () => {
    router.push("/galeria");
  };

  return (
    <div style={containerStyle}>
      {/* Fundo com gradiente animado */}
      <div style={backgroundGradient}></div>

      {/* Corações flutuantes */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            ...heartStyle,
            left: `${heart.x}px`,
            top: `${heart.y}px`,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Gatinhos flutuantes */}
      {floatingCats.map((cat) => (
        <div
          key={cat.id}
          style={{
            ...floatingCatStyle,
            left: `${cat.x}%`,
            top: `${cat.y}%`,
            animationDelay: `${cat.delay}s`,
          }}
        >
          {cat.emoji}
        </div>
      ))}

      <div style={contentContainer}>
        {!aceitou ? (
          <div style={questionContainer}>
            <div style={titleContainer}>
              <h1 style={titleStyle}>Você me ama mesmo? 🥹</h1>
              <div style={subtitleContainer}>
                <p style={subtitleStyle}>
                  Esta é a pergunta mais importante...
                </p>
                <div style={sparkles}>✨💫✨</div>
              </div>
            </div>

            {tentativas > 2 && (
              <div style={hintsContainer}>
                <p style={hintText}>
                  {tentativas > 6
                    ? "Ah, vai! Você sabe a resposta certa! 😄💕"
                    : tentativas > 4
                      ? "Psiu... a resposta é óbvia! 😉"
                      : "Hmm, esse botão vermelho parece fugidio... 🤔"}
                </p>
              </div>
            )}

            <div style={choicesContainer}>
              <button
                style={yesButton}
                onClick={handleSim}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.2) rotate(5deg)";
                  e.target.style.boxShadow =
                    "0 20px 40px rgba(40, 167, 69, 0.8)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) rotate(0deg)";
                  e.target.style.boxShadow =
                    "0 10px 25px rgba(40, 167, 69, 0.6)";
                }}
              >
                💖 SIM! 💖
              </button>

              <button ref={naoBtnRef} style={noButton}>
                Não 😡
              </button>
            </div>

            {tentativas > 0 && (
              <div style={statsContainer}>
                <p style={statsText}>Tentativas de fugir: {tentativas} 😅</p>
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              ...celebrationContainer,
              opacity: showMagic ? 1 : 0,
              transform: showMagic
                ? "scale(1) rotateY(0deg)"
                : "scale(0.8) rotateY(-90deg)",
            }}
          >
            <div style={celebrationContent}>
              <h1 style={celebrationTitle}>Eu sabia!!! 🥰</h1>

              <div style={catCelebrationContainer}>
                <p style={celebrationText}>Olha só quem está comemorando! 🎉</p>

                <div style={celebratingCats}>
                  <div style={catItem1}>🎉</div>
                  <div style={catItem2}>😸</div>
                  <div style={catItem3}>🎊</div>
                  <div style={catItem4}>😻</div>
                  <div style={catItem5}>🎈</div>
                </div>

                <div style={mainCelebrationCat}>
                  <img
                    src="https://media.tenor.com/Ws6Dm1ZW_vMAAAAi/cat-love.gif"
                    alt="Gato comemorando"
                    style={celebrationGif}
                  />
                  <p style={gifCaption}>
                    "Eu por você ter escolhido SIM!" 🐾💕
                  </p>
                </div>
              </div>

              <div style={magicTransition}>
                <h3 style={transitionTitle}>✨ A Jornada Mágica Começa! ✨</h3>
                <p style={transitionText}>
                  Prepare-se para uma aventura inesquecível através de mundos
                  encantados!
                </p>

                <div style={previewContainer}>
                  <div style={previewItem}>🐱 Reino dos Gatinhos</div>
                  <div style={previewItem}>💎 Cristais Mágicos</div>
                  <div style={previewItem}>🏰 Castelos Encantados</div>
                  <div style={previewItem}>⭐ Galáxias Distantes</div>
                </div>
              </div>

              <button
                onClick={irParaGaleria}
                style={continueButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.15) translateY(-5px)";
                  e.target.style.background =
                    "linear-gradient(45deg, #ff1493, #ff69b4, #ba55d3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) translateY(0px)";
                  e.target.style.background =
                    "linear-gradient(45deg, #ff6b81, #ff8e9b, #ffa8a8)";
                }}
              >
                🐱✨ Começar a Aventura! ✨🐱
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(0px) scale(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) scale(1.5) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes catSwim {
          0%,
          100% {
            transform: translateY(0px) rotate(-5deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes backgroundShift {
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

        @keyframes buttonPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes celebration {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.2) rotate(-5deg);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
          75% {
            transform: scale(1.3) rotate(-3deg);
          }
        }

        @keyframes sparkleRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(-90deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: '"Comic Sans MS", cursive',
  overflow: "hidden",
  padding: 0,
  margin: 0,
};

const backgroundGradient = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(-45deg, #ff9a9e, #fecfef, #fecfef, #ff9a9e)",
  backgroundSize: "400% 400%",
  animation: "backgroundShift 8s ease infinite",
};

const heartStyle = {
  position: "absolute",
  fontSize: "2rem",
  animation: "heartFloat 2s ease-out forwards",
  pointerEvents: "none",
  zIndex: 10,
};

const floatingCatStyle = {
  position: "absolute",
  fontSize: "2rem",
  animation: "catSwim 4s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
  opacity: 0.7,
};

const contentContainer = {
  position: "relative",
  zIndex: 2,
  padding: "20px",
  width: "100%",
  maxWidth: "600px",
  textAlign: "center",
};

const questionContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "30px",
  padding: "40px",
  border: "4px solid #ff69b4",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(15px)",
};

const titleContainer = {
  marginBottom: "30px",
};

const titleStyle = {
  fontSize: "2.5rem",
  background: "linear-gradient(45deg, #ff6b81, #ff8e9b)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "15px",
};

const subtitleContainer = {
  marginBottom: "20px",
};

const subtitleStyle = {
  fontSize: "1.2rem",
  color: "#666",
  marginBottom: "10px",
};

const sparkles = {
  fontSize: "1.5rem",
  animation: "sparkleRotate 3s linear infinite",
};

const hintsContainer = {
  backgroundColor: "rgba(255, 107, 129, 0.1)",
  borderRadius: "15px",
  padding: "15px",
  marginBottom: "25px",
  border: "2px dashed #ff6b81",
};

const hintText = {
  color: "#ff6b81",
  fontSize: "1.1rem",
  fontWeight: "bold",
  margin: 0,
  fontStyle: "italic",
};

const choicesContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const yesButton = {
  padding: "20px 40px",
  fontSize: "1.5rem",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 10px 25px rgba(40, 167, 69, 0.6)",
  animation: "buttonPulse 2s ease-in-out infinite",
  fontFamily: "inherit",
};

const noButton = {
  padding: "15px 30px",
  fontSize: "1.2rem",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  position: "relative",
  transition: "all 0.3s ease",
  fontFamily: "inherit",
};

const statsContainer = {
  marginTop: "20px",
};

const statsText = {
  color: "#ff6b81",
  fontSize: "1rem",
  fontWeight: "bold",
};

const celebrationContainer = {
  transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
  transformStyle: "preserve-3d",
};

const celebrationContent = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "30px",
  padding: "40px",
  border: "4px solid #ff69b4",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(15px)",
};

const celebrationTitle = {
  fontSize: "2.5rem",
  background: "linear-gradient(45deg, #ff6b81, #ff8e9b)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "25px",
  animation: "celebration 2s ease-in-out infinite",
};

const catCelebrationContainer = {
  marginBottom: "30px",
};

const celebrationText = {
  fontSize: "1.3rem",
  color: "#666",
  marginBottom: "20px",
};

const celebratingCats = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "25px",
};

const catItem1 = {
  fontSize: "2.5rem",
  animation: "celebration 2s ease-in-out infinite",
};

const catItem2 = {
  fontSize: "2.5rem",
  animation: "celebration 2s ease-in-out infinite 0.2s",
};

const catItem3 = {
  fontSize: "2.5rem",
  animation: "celebration 2s ease-in-out infinite 0.4s",
};

const catItem4 = {
  fontSize: "2.5rem",
  animation: "celebration 2s ease-in-out infinite 0.6s",
};

const catItem5 = {
  fontSize: "2.5rem",
  animation: "celebration 2s ease-in-out infinite 0.8s",
};

const mainCelebrationCat = {
  textAlign: "center",
};

const celebrationGif = {
  width: "250px",
  height: "auto",
  borderRadius: "20px",
  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
  border: "3px solid #ff69b4",
};

const gifCaption = {
  fontSize: "1.1rem",
  color: "#ff6b81",
  fontWeight: "bold",
  marginTop: "15px",
  fontStyle: "italic",
};

const magicTransition = {
  backgroundColor: "rgba(255, 107, 129, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #ff6b81",
};

const transitionTitle = {
  color: "#ff6b81",
  fontSize: "1.5rem",
  marginBottom: "10px",
};

const transitionText = {
  color: "#666",
  fontSize: "1.1rem",
  marginBottom: "20px",
};

const previewContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "10px",
};

const previewItem = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "15px",
  padding: "10px",
  fontSize: "0.9rem",
  color: "#ff6b81",
  fontWeight: "bold",
  border: "2px solid #ff6b81",
};

const continueButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  background: "linear-gradient(45deg, #ff6b81, #ff8e9b, #ffa8a8)",
  color: "white",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 15px 30px rgba(255, 107, 129, 0.6)",
  fontFamily: "inherit",
};
