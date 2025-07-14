import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Fase3Melhorada() {
  const router = useRouter();
  const [resposta, setResposta] = useState(null);
  const [magicDust, setMagicDust] = useState([]);
  const [castleVisible, setCastleVisible] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [royalCats, setRoyalCats] = useState([]);

  useEffect(() => {
    // Criar poeira mágica
    const dust = [];
    for (let i = 0; i < 40; i++) {
      dust.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        emoji: ["✨", "💫", "🌟", "⭐", "💎"][Math.floor(Math.random() * 5)],
      });
    }
    setMagicDust(dust);

    // Gatos reais do castelo
    const cats = [
      { id: 1, emoji: "👑🐱", x: 10, y: 80, name: "Rei Gatinho" },
      { id: 2, emoji: "👸🐱", x: 85, y: 75, name: "Rainha Miadora" },
      { id: 3, emoji: "🐱‍🏍", x: 15, y: 20, name: "Cavaleiro Miau" },
      { id: 4, emoji: "🐱‍👤", x: 80, y: 25, name: "Mago Felino" },
    ];
    setRoyalCats(cats);

    // Animações sequenciais
    setTimeout(() => setCastleVisible(true), 600);
    setTimeout(() => setLibraryOpen(true), 1200);

    // Música ambiente
    const iframe = document.getElementById("casteloMusic");
    if (iframe) {
      iframe.src += "&autoplay=1";
    }
  }, []);

  const avancar = () => {
    router.push("/aventura/fase4");
  };

  return (
    <div style={containerStyle}>
      {/* Fundo mágico com estrelas */}
      <div style={backgroundOverlay}></div>

      {/* Poeira mágica flutuante */}
      {magicDust.map((particle) => (
        <div
          key={particle.id}
          style={{
            ...dustParticle,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Gatos reais do castelo */}
      {royalCats.map((cat) => (
        <div
          key={cat.id}
          style={{
            ...royalCatStyle,
            left: `${cat.x}%`,
            top: `${cat.y}%`,
          }}
        >
          <div style={catCharacter}>{cat.emoji}</div>
          <div style={catNameTag}>{cat.name}</div>
        </div>
      ))}

      <div style={contentContainer}>
        <div
          style={{
            ...castleContainer,
            transform: castleVisible
              ? "scale(1) rotateY(0deg)"
              : "scale(0.8) rotateY(-20deg)",
            opacity: castleVisible ? 1 : 0,
          }}
        >
          {/* Torre do castelo */}
          <div style={castleTower}>
            <div style={towerTop}>🏰</div>
            <div style={towerFlag}>🚩</div>
          </div>

          <div style={castleMain}>
            <h1 style={titleStyle}>🏰 O Castelo Encantado dos Gatinhos 🏰</h1>

            <div style={castleStory}>
              <div style={storyScroll}>
                <p style={mysticalText}>
                  As antigas pedras do castelo sussurram segredos milenares...
                  <br />
                  Os gatos reais guardam uma pergunta sagrada que ecoa pelas
                  torres desde tempos imemoriais...
                </p>
              </div>
            </div>

            {/* Biblioteca secreta */}
            <div
              style={{
                ...libraryContainer,
                maxHeight: libraryOpen ? "400px" : "0px",
                opacity: libraryOpen ? 1 : 0,
              }}
            >
              <h2 style={libraryTitle}>📚 Biblioteca Secreta Real 📚</h2>

              <div style={booksContainer}>
                {["📖", "📜", "📚", "📋", "📄"].map((book, index) => (
                  <div
                    key={index}
                    style={{
                      ...bookItem,
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    {book}
                  </div>
                ))}
              </div>

              <div style={questionScroll}>
                <h3 style={ancientQuestion}>💌 A Pergunta Ancestral 💌</h3>
                <p style={questionText}>
                  Se você encontrasse uma carta de amor escondida na biblioteca
                  secreta, assinada por ele... o que seu coração mandaria você
                  fazer?
                </p>

                <div style={heartGlow}>💖</div>
              </div>

              {!resposta ? (
                <div style={optionsContainer}>
                  <button
                    onClick={() => setResposta("guardar")}
                    style={{ ...enchantedButton, backgroundColor: "#9B59B6" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1) translateY(-5px)";
                      e.target.style.boxShadow =
                        "0 15px 30px rgba(155, 89, 182, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1) translateY(0px)";
                      e.target.style.boxShadow =
                        "0 8px 20px rgba(155, 89, 182, 0.4)";
                    }}
                  >
                    ✨ Guardaria como um tesouro encantado ✨
                  </button>

                  <button
                    onClick={() => setResposta("responder")}
                    style={{ ...enchantedButton, backgroundColor: "#E74C3C" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1) translateY(-5px)";
                      e.target.style.boxShadow =
                        "0 15px 30px rgba(231, 76, 60, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1) translateY(0px)";
                      e.target.style.boxShadow =
                        "0 8px 20px rgba(231, 76, 60, 0.4)";
                    }}
                  >
                    💌 Escreveria uma resposta apaixonada 💌
                  </button>

                  <button
                    onClick={() => setResposta("chorar")}
                    style={{ ...enchantedButton, backgroundColor: "#3498DB" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1) translateY(-5px)";
                      e.target.style.boxShadow =
                        "0 15px 30px rgba(52, 152, 219, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1) translateY(0px)";
                      e.target.style.boxShadow =
                        "0 8px 20px rgba(52, 152, 219, 0.4)";
                    }}
                  >
                    😭 Choraria de amor na torre mais alta 😭
                  </button>
                </div>
              ) : (
                <div style={responseContainer}>
                  <div style={magicResponse}>
                    <div style={celebrationContainer}>
                      <div style={royalCelebration}>
                        <span style={celebratingCat1}>👑😸</span>
                        <span style={celebratingCat2}>💖</span>
                        <span style={celebratingCat3}>👸😻</span>
                      </div>

                      <h3 style={responseTitle}>
                        ✨ Os Gatos Reais Aprovam! ✨
                      </h3>

                      <p style={responseText}>
                        O castelo reconhece a pureza da sua resposta...
                        <br />
                        As torres ecoam com aprovação real!
                      </p>

                      <div style={castleBlessing}>
                        <div style={blessingRunes}>🌟💫✨💎🌟</div>
                      </div>
                    </div>

                    <button
                      onClick={avancar}
                      style={royalButton}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.15) rotate(2deg)";
                        e.target.style.background =
                          "linear-gradient(45deg, #FFD700, #FFA500, #FF6347)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1) rotate(0deg)";
                        e.target.style.background =
                          "linear-gradient(45deg, #a29bfe, #6c5ce7, #9b59b6)";
                      }}
                    >
                      🏰 Avançar pelo Portão Real 🏰
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Música ambiente */}
      <div style={{ display: "none" }}>
        <iframe
          id="casteloMusic"
          width="0"
          height="0"
          src="https://www.youtube.com/embed/ygyZLO9qzI8?autoplay=1&loop=1&playlist=ygyZLO9qzI8"
          title="Tema Castelo Encantado"
          frameBorder="0"
          allow="autoplay"
        ></iframe>
      </div>

      <style jsx global>{`
        @keyframes sparkleFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) rotate(180deg) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes castleEntrance {
          from {
            transform: scale(0.8) rotateY(-20deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotateY(0deg);
            opacity: 1;
          }
        }

        @keyframes royalWave {
          0%,
          100% {
            transform: rotate(-10deg) scale(1);
          }
          50% {
            transform: rotate(10deg) scale(1.1);
          }
        }

        @keyframes bookShimmer {
          0%,
          100% {
            transform: scale(1) rotateY(0deg);
          }
          50% {
            transform: scale(1.1) rotateY(20deg);
          }
        }

        @keyframes heartPulse {
          0%,
          100% {
            transform: scale(1);
            filter: hue-rotate(0deg);
          }
          50% {
            transform: scale(1.3);
            filter: hue-rotate(180deg);
          }
        }

        @keyframes towerFlag {
          0%,
          100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes runesGlow {
          0%,
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  backgroundImage:
    'url("https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  color: "#fffef9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: '"Cinzel Decorative", cursive',
  position: "relative",
  overflow: "hidden",
  padding: 0,
  margin: 0,
};

const backgroundOverlay = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(rgba(75, 0, 130, 0.3), rgba(25, 25, 112, 0.4))",
  zIndex: 0,
};

const dustParticle = {
  position: "absolute",
  fontSize: "18px",
  animation: "sparkleFloat 5s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
};

const royalCatStyle = {
  position: "absolute",
  textAlign: "center",
  zIndex: 10,
};

const catCharacter = {
  fontSize: "2.5rem",
  animation: "royalWave 3s ease-in-out infinite",
  cursor: "pointer",
};

const catNameTag = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#4B0082",
  padding: "5px 10px",
  borderRadius: "15px",
  fontSize: "10px",
  fontWeight: "bold",
  marginTop: "5px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
};

const contentContainer = {
  position: "relative",
  zIndex: 2,
  padding: "20px",
  width: "100%",
  maxWidth: "900px",
};

const castleContainer = {
  transition: "all 2s cubic-bezier(0.4, 0, 0.2, 1)",
  transformStyle: "preserve-3d",
};

const castleTower = {
  textAlign: "center",
  marginBottom: "20px",
  position: "relative",
};

const towerTop = {
  fontSize: "4rem",
  filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))",
};

const towerFlag = {
  position: "absolute",
  top: "10px",
  left: "60%",
  fontSize: "1.5rem",
  animation: "towerFlag 3s ease-in-out infinite",
};

const castleMain = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "35px",
  border: "4px solid #DAA520",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(15px)",
  color: "#4B0082",
};

const titleStyle = {
  fontSize: "32px",
  textAlign: "center",
  background: "linear-gradient(45deg, #4B0082, #8B008B, #9370DB)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "25px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
};

const castleStory = {
  textAlign: "center",
  marginBottom: "25px",
};

const storyScroll = {
  backgroundColor: "#F5F5DC",
  border: "3px solid #DAA520",
  borderRadius: "15px",
  padding: "20px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
};

const mysticalText = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#4B0082",
  fontStyle: "italic",
  fontWeight: "500",
};

const libraryContainer = {
  overflow: "hidden",
  transition: "all 1.5s ease-in-out",
  backgroundColor: "rgba(75, 0, 130, 0.1)",
  borderRadius: "20px",
  padding: "20px",
  border: "2px solid #9370DB",
};

const libraryTitle = {
  textAlign: "center",
  color: "#4B0082",
  fontSize: "24px",
  marginBottom: "20px",
};

const booksContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "25px",
};

const bookItem = {
  fontSize: "2.5rem",
  animation: "bookShimmer 3s ease-in-out infinite",
  cursor: "pointer",
};

const questionScroll = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #DAA520",
  textAlign: "center",
};

const ancientQuestion = {
  color: "#8B008B",
  fontSize: "20px",
  marginBottom: "15px",
};

const questionText = {
  fontSize: "18px",
  color: "#4B0082",
  lineHeight: "1.6",
  marginBottom: "15px",
  fontWeight: "500",
};

const heartGlow = {
  fontSize: "2rem",
  animation: "heartPulse 2s ease-in-out infinite",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "20px",
};

const enchantedButton = {
  padding: "18px 25px",
  fontSize: "16px",
  border: "3px solid #DAA520",
  borderRadius: "25px",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 8px 20px rgba(75, 0, 130, 0.4)",
  fontFamily: "inherit",
};

const responseContainer = {
  textAlign: "center",
};

const magicResponse = {
  backgroundColor: "rgba(218, 165, 32, 0.1)",
  borderRadius: "20px",
  padding: "30px",
  border: "3px solid #DAA520",
};

const celebrationContainer = {
  marginBottom: "25px",
};

const royalCelebration = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  marginBottom: "20px",
};

const celebratingCat1 = {
  fontSize: "3rem",
  animation: "royalWave 2s ease-in-out infinite",
};

const celebratingCat2 = {
  fontSize: "3rem",
  animation: "heartPulse 2s ease-in-out infinite",
};

const celebratingCat3 = {
  fontSize: "3rem",
  animation: "royalWave 2s ease-in-out infinite 1s",
};

const responseTitle = {
  color: "#8B008B",
  fontSize: "24px",
  marginBottom: "15px",
};

const responseText = {
  fontSize: "18px",
  color: "#4B0082",
  lineHeight: "1.6",
  marginBottom: "20px",
};

const castleBlessing = {
  textAlign: "center",
};

const blessingRunes = {
  fontSize: "2rem",
  animation: "runesGlow 3s ease-in-out infinite",
};

const royalButton = {
  padding: "20px 40px",
  fontSize: "20px",
  background: "linear-gradient(45deg, #a29bfe, #6c5ce7, #9b59b6)",
  color: "#fff",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 15px 30px rgba(162, 155, 254, 0.5)",
  fontFamily: "inherit",
};
