import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Fase1Melhorada() {
  const router = useRouter();
  const [resposta, setResposta] = useState(null);
  const [magicParticles, setMagicParticles] = useState([]);
  const [bookOpen, setBookOpen] = useState(false);
  const [catVisible, setCatVisible] = useState(false);

  useEffect(() => {
    // Criar partículas mágicas
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        emoji: ["✨", "🌟", "💫", "⭐"][Math.floor(Math.random() * 4)],
      });
    }
    setMagicParticles(particles);

    // Animação de entrada
    setTimeout(() => setBookOpen(true), 500);
    setTimeout(() => setCatVisible(true), 1500);
  }, []);

  const avancar = () => {
    router.push("/aventura/fase2");
  };

  return (
    <div style={containerStyle}>
      {/* Partículas mágicas flutuantes */}
      {magicParticles.map((particle) => (
        <div
          key={particle.id}
          style={{
            ...particleStyle,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Lua mágica no fundo */}
      <div style={moonStyle}>🌙</div>

      {/* Gato mágico observando */}
      {catVisible && (
        <div style={magicCatStyle}>
          <div style={catWizardStyle}>🐱‍👤</div>
          <div style={catSpeechBubble}>Miau mágico! 💜</div>
        </div>
      )}

      <div style={contentContainer}>
        <div
          style={{
            ...grimoryContainer,
            transform: bookOpen
              ? "rotateY(0deg) scale(1)"
              : "rotateY(-90deg) scale(0.8)",
            opacity: bookOpen ? 1 : 0,
          }}
        >
          {/* Grimório com efeito de abertura */}
          <div style={bookCover}>
            <div style={bookSpine}></div>
            <div style={bookTitle}>📜 GRIMÓRIO SECRETO 📜</div>
          </div>

          <div style={bookContent}>
            <h1 style={titleStyle}>O Grimório dos Gatos Encantados</h1>

            <div style={magicText}>
              <p style={storyText}>
                Você foi invocada para uma missão sagrada do coração...
                <br />
                As antigas criaturas mágicas sussurram uma pergunta ancestral...
              </p>
            </div>

            <div style={questionContainer}>
              <h2 style={questionStyle}>
                🪱 Você ainda amaria seu namorado se ele fosse uma... minhoca?
                🪱
              </h2>

              <div style={sparkleEffect}>✨💫✨</div>
            </div>

            {!resposta ? (
              <div style={optionsContainer}>
                <button
                  onClick={() => setResposta("claro")}
                  style={{ ...magicButton, backgroundColor: "#8B5FBF" }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1) rotate(2deg)";
                    e.target.style.boxShadow =
                      "0 10px 25px rgba(139, 95, 191, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1) rotate(0deg)";
                    e.target.style.boxShadow =
                      "0 5px 15px rgba(139, 95, 191, 0.4)";
                  }}
                >
                  🌿 Claro! Faria até um mini ninho de folhas pra ele 🌿
                </button>

                <button
                  onClick={() => setResposta("depende")}
                  style={{ ...magicButton, backgroundColor: "#9B59B6" }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1) rotate(-2deg)";
                    e.target.style.boxShadow =
                      "0 10px 25px rgba(155, 89, 182, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1) rotate(0deg)";
                    e.target.style.boxShadow =
                      "0 5px 15px rgba(155, 89, 182, 0.4)";
                  }}
                >
                  🎲 Depende... ele ainda rolaria iniciativa? 🎲
                </button>

                <button
                  onClick={() => setResposta("nao")}
                  style={{ ...magicButton, backgroundColor: "#7B68EE" }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1) rotate(2deg)";
                    e.target.style.boxShadow =
                      "0 10px 25px rgba(123, 104, 238, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1) rotate(0deg)";
                    e.target.style.boxShadow =
                      "0 5px 15px rgba(123, 104, 238, 0.4)";
                  }}
                >
                  💫 Só se ele fosse uma minhoca mágica 💫
                </button>
              </div>
            ) : (
              <div style={responseContainer}>
                <div style={magicResponse}>
                  <div style={celebrationCats}>
                    <div style={catEmoji}>😸</div>
                    <div style={catEmoji2}>🐱</div>
                    <div style={catEmoji3}>😻</div>
                  </div>

                  <p style={responseText}>
                    🪄 A resposta foi gravada nas páginas encantadas do
                    grimório! 🪄
                  </p>

                  <div style={magicCircle}>
                    <div style={runeStyle}>⚡💜⚡</div>
                  </div>

                  <button
                    onClick={avancar}
                    style={nextButton}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.15)";
                      e.target.style.background =
                        "linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.background =
                        "linear-gradient(45deg, #8f3e9d, #9b59b6, #7b68ee)";
                    }}
                  >
                    📖 Prosseguir para o próximo capítulo 📖
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }

        @keyframes bookOpen {
          from {
            transform: rotateY(-90deg) scale(0.8);
            opacity: 0;
          }
          to {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        @keyframes catBounce {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes runeGlow {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
            filter: hue-rotate(0deg);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
            filter: hue-rotate(180deg);
          }
        }

        @keyframes moonGlow {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #2C1810 0%, #3e1f47 50%, #1c0c24 100%)",
  color: "#fbeaff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: '"Cinzel", "Uncial Antiqua", cursive',
  position: "relative",
  overflow: "hidden",
  padding: 0,
  margin: 0,
};

const particleStyle = {
  position: "absolute",
  fontSize: "16px",
  animation: "float 4s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
};

const moonStyle = {
  position: "absolute",
  top: "10%",
  right: "10%",
  fontSize: "5rem",
  opacity: 0.7,
  animation: "moonGlow 4s ease-in-out infinite",
  zIndex: 1,
};

const magicCatStyle = {
  position: "absolute",
  bottom: "10%",
  left: "10%",
  zIndex: 10,
};

const catWizardStyle = {
  fontSize: "3rem",
  animation: "catBounce 2s ease-in-out infinite",
};

const catSpeechBubble = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#7B68EE",
  padding: "8px 12px",
  borderRadius: "15px",
  fontSize: "12px",
  fontWeight: "bold",
  position: "relative",
  marginTop: "10px",
  textAlign: "center",
};

const contentContainer = {
  position: "relative",
  zIndex: 2,
  padding: "20px",
  width: "100%",
  maxWidth: "800px",
};

const grimoryContainer = {
  perspective: "1000px",
  transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
};

const bookCover = {
  backgroundColor: "#4A2C4A",
  borderRadius: "20px",
  padding: "30px",
  border: "5px solid #D5AAFF",
  position: "relative",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
  background: "linear-gradient(45deg, #4A2C4A, #6A4C93, #8B5FBF)",
};

const bookSpine = {
  position: "absolute",
  left: "-10px",
  top: "10px",
  bottom: "10px",
  width: "20px",
  backgroundColor: "#2C1810",
  borderRadius: "10px 0 0 10px",
  boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
};

const bookTitle = {
  textAlign: "center",
  fontSize: "20px",
  color: "#FFD700",
  fontWeight: "bold",
  marginBottom: "20px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
};

const bookContent = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "15px",
  padding: "30px",
  color: "#2C1810",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "28px",
  marginBottom: "25px",
  background: "linear-gradient(45deg, #8B5FBF, #9B59B6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
};

const magicText = {
  marginBottom: "25px",
};

const storyText = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#5D4E75",
  fontStyle: "italic",
};

const questionContainer = {
  marginBottom: "30px",
};

const questionStyle = {
  fontSize: "20px",
  color: "#2C1810",
  marginBottom: "15px",
  fontWeight: "bold",
};

const sparkleEffect = {
  fontSize: "24px",
  animation: "sparkle 2s ease-in-out infinite",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "20px",
};

const magicButton = {
  padding: "15px 25px",
  fontSize: "16px",
  border: "3px solid #D5AAFF",
  borderRadius: "25px",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 5px 15px rgba(139, 95, 191, 0.4)",
  fontFamily: "inherit",
};

const responseContainer = {
  textAlign: "center",
};

const magicResponse = {
  backgroundColor: "rgba(139, 95, 191, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  border: "2px solid #D5AAFF",
};

const celebrationCats = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "20px",
};

const catEmoji = {
  fontSize: "2.5rem",
  animation: "catBounce 1s ease-in-out infinite",
};

const catEmoji2 = {
  fontSize: "2.5rem",
  animation: "catBounce 1s ease-in-out infinite 0.3s",
};

const catEmoji3 = {
  fontSize: "2.5rem",
  animation: "catBounce 1s ease-in-out infinite 0.6s",
};

const responseText = {
  fontSize: "18px",
  color: "#8B5FBF",
  fontWeight: "bold",
  marginBottom: "20px",
};

const magicCircle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "25px",
};

const runeStyle = {
  fontSize: "2rem",
  animation: "runeGlow 3s ease-in-out infinite",
};

const nextButton = {
  padding: "18px 35px",
  fontSize: "18px",
  background: "linear-gradient(45deg, #8f3e9d, #9b59b6, #7b68ee)",
  color: "#fff",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 10px 25px rgba(139, 95, 191, 0.5)",
  fontFamily: "inherit",
};
