import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Fase4Melhorada() {
  const router = useRouter();
  const [resposta, setResposta] = useState(null);
  const [cliquesSecretos, setCliquesSecretos] = useState(0);
  const [stars, setStars] = useState([]);
  const [jediFelines, setJediFelines] = useState([]);
  const [forceAwakened, setForceAwakened] = useState(false);

  const avancar = () => {
    router.push("/aventura/fase5");
  };

  useEffect(() => {
    // Criar campo de estrelas
    const starField = [];
    for (let i = 0; i < 100; i++) {
      starField.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        speed: Math.random() * 2 + 1,
      });
    }
    setStars(starField);

    // Jedi Cats
    const cats = [
      { id: 1, emoji: "🐱‍👤", x: 10, y: 20, name: "Meow-Wan Kenobi" },
      { id: 2, emoji: "🐱‍🚀", x: 85, y: 30, name: "Luke Whiskers" },
      { id: 3, emoji: "🐱‍💻", x: 15, y: 70, name: "Paw-da Yoda" },
      { id: 4, emoji: "🐱‍🐉", x: 80, y: 75, name: "Darth Mittens" },
    ];
    setJediFelines(cats);

    setTimeout(() => setForceAwakened(true), 1000);

    // Música
    const iframe = document.getElementById("swMusic");
    if (iframe) {
      iframe.src += "&autoplay=1";
    }
  }, []);

  useEffect(() => {
    if (cliquesSecretos === 3) {
      alert(
        "✨ Você descobriu o segredo Jedi dos Gatinhos! May the Force be with mew! ✨",
      );
    }
  }, [cliquesSecretos]);

  return (
    <div
      onClick={() => setCliquesSecretos((prev) => prev + 1)}
      style={containerStyle}
    >
      {/* Campo de estrelas animado */}
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            ...starStyle,
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.speed}s`,
          }}
        >
          ⭐
        </div>
      ))}

      {/* Jedi Cats flutuando */}
      {jediFelines.map((cat) => (
        <div
          key={cat.id}
          style={{
            ...jediCatStyle,
            left: `${cat.x}%`,
            top: `${cat.y}%`,
          }}
        >
          <div style={jediCharacter}>{cat.emoji}</div>
          <div style={jediNameTag}>{cat.name}</div>
        </div>
      ))}

      {/* Death Star no fundo */}
      <div style={deathStarStyle}>🌑</div>

      <div style={contentContainer}>
        <div
          style={{
            ...galaxyContainer,
            transform: forceAwakened ? "scale(1)" : "scale(0.8)",
            opacity: forceAwakened ? 1 : 0,
          }}
        >
          {/* Logo Star Wars */}
          <div style={logoContainer}>
            <h1 style={titleStyle}>⚡ JEDI CATS GALAXY ⚡</h1>
            <div style={subtitleGlow}>Uma Galáxia muito, muito fofa...</div>
          </div>

          <div style={holoContainer}>
            <div style={holoTitle}>📡 Transmissão Holográfica 📡</div>

            <div style={holoContent}>
              <div style={holoText}>
                <p style={forceText}>
                  Você sente uma perturbação na Força...
                  <br />
                  Os antigos Mestres Jedi Felinos sussurram uma pergunta que
                  ecoará pela galáxia...
                </p>
              </div>

              <div style={questionContainer}>
                <h2 style={galacticQuestion}>
                  🤖 Você ainda amaria seu namorado se ele fosse um droide velho
                  e enferrujado? 🤖
                </h2>

                <div style={forceAura}>
                  <div style={forceWave}>⚡💫⚡</div>
                </div>
              </div>

              {!resposta ? (
                <div style={optionsContainer}>
                  <button
                    onClick={() => setResposta("sim")}
                    style={{ ...jediButton, backgroundColor: "#00FF41" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1) rotateX(10deg)";
                      e.target.style.boxShadow =
                        "0 15px 30px rgba(0, 255, 65, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1) rotateX(0deg)";
                      e.target.style.boxShadow =
                        "0 8px 20px rgba(0, 255, 65, 0.4)";
                    }}
                  >
                    ⚙️ Sim! O amor não se enferruja! ⚙️
                  </button>

                  <button
                    onClick={() => setResposta("talvez")}
                    style={{ ...jediButton, backgroundColor: "#FFE81F" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1) rotateX(10deg)";
                      e.target.style.boxShadow =
                        "0 15px 30px rgba(255, 232, 31, 0.6)";
                      e.target.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1) rotateX(0deg)";
                      e.target.style.boxShadow =
                        "0 8px 20px rgba(255, 232, 31, 0.4)";
                      e.target.style.color = "#000";
                    }}
                  >
                    🤖 Talvez, se ele falasse igual o C-3PO 🤖
                  </button>

                  <button
                    onClick={() => setResposta("nao")}
                    style={{ ...jediButton, backgroundColor: "#FF6B6B" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1) rotateX(10deg)";
                      e.target.style.boxShadow =
                        "0 15px 30px rgba(255, 107, 107, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1) rotateX(0deg)";
                      e.target.style.boxShadow =
                        "0 8px 20px rgba(255, 107, 107, 0.4)";
                    }}
                  >
                    💥 Só se ele tivesse um sabre de luz 💥
                  </button>
                </div>
              ) : (
                <div style={responseContainer}>
                  <div style={jediApproval}>
                    <div style={masterCats}>
                      <div style={yodaCat}>🐱‍👤</div>
                      <div style={forcePower}>⚡</div>
                      <div style={lukeCat}>🐱‍🚀</div>
                    </div>

                    <h3 style={wisdomTitle}>
                      🌟 Sabedoria Jedi dos Gatinhos Detectada! 🌟
                    </h3>

                    <p style={wisdomText}>
                      "Strong with the Force, you are.
                      <br />
                      In love, trust you must."
                      <br />- Mestre Yoda Cat 🐱
                    </p>

                    <div style={lightSaberEffect}>
                      <div style={blueSaber}>🔵━━━━━━━━</div>
                      <div style={greenSaber}>🟢━━━━━━━━</div>
                    </div>
                  </div>

                  <button
                    onClick={avancar}
                    style={hyperdriveButton}
                    onMouseEnter={(e) => {
                      e.target.style.transform =
                        "scale(1.15) perspective(500px) rotateX(-10deg)";
                      e.target.style.background =
                        "linear-gradient(45deg, #00BFFF, #1E90FF, #0080FF)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform =
                        "scale(1) perspective(500px) rotateX(0deg)";
                      e.target.style.background =
                        "linear-gradient(45deg, #4caf50, #45a049, #2e7d32)";
                    }}
                  >
                    🚀 Ativar Hiperdrive! 🚀
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Personagens clássicos */}
          <div style={charactersContainer}>
            <div style={characterCard}>
              <img
                src="https://www.pngall.com/wp-content/uploads/2016/06/Yoda-Free-Download-PNG.png"
                alt="Yoda"
                style={characterImage}
              />
              <p style={characterName}>Mestre Yoda</p>
            </div>

            <div style={characterCard}>
              <img
                src="https://www.pngmart.com/files/2/R2-D2-PNG-Photos.png"
                alt="R2-D2"
                style={characterImage}
              />
              <p style={characterName}>R2-D2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Música */}
      <div style={{ display: "none" }}>
        <iframe
          id="swMusic"
          width="0"
          height="0"
          src="https://www.youtube.com/embed/_D0ZQPqeJkk?autoplay=1&loop=1&playlist=_D0ZQPqeJkk"
          title="Star Wars Theme"
          frameBorder="0"
          allow="autoplay"
        ></iframe>
      </div>

      <style jsx global>{`
        @keyframes starTravel {
          0% {
            transform: translateX(-100vw) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes jediFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(-5deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }

        @keyframes forceGlow {
          0%,
          100% {
            text-shadow:
              0 0 10px #ffe81f,
              0 0 20px #ffe81f;
            transform: scale(1);
          }
          50% {
            text-shadow:
              0 0 20px #ffe81f,
              0 0 30px #ffe81f,
              0 0 40px #ffe81f;
            transform: scale(1.05);
          }
        }

        @keyframes holoFlicker {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          25%,
          75% {
            opacity: 0.9;
          }
        }

        @keyframes saberGlow {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
        }

        @keyframes deathStarRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes forceWave {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            filter: hue-rotate(0deg);
          }
          50% {
            transform: scale(1.3) rotate(180deg);
            filter: hue-rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(180deg, #000000 0%, #0a0a2e 50%, #16213e 100%)",
  color: "#FFE81F",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: '"Orbitron", sans-serif',
  position: "relative",
  overflow: "hidden",
  padding: 0,
  margin: 0,
  cursor: "crosshair",
};

const starStyle = {
  position: "absolute",
  fontSize: "12px",
  animation: "starTravel infinite linear",
  pointerEvents: "none",
  color: "#FFFFFF",
};

const jediCatStyle = {
  position: "absolute",
  textAlign: "center",
  zIndex: 10,
};

const jediCharacter = {
  fontSize: "2.5rem",
  animation: "jediFloat 4s ease-in-out infinite",
  cursor: "pointer",
  filter: "drop-shadow(0 0 10px rgba(255, 232, 31, 0.8))",
};

const jediNameTag = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "#FFE81F",
  padding: "5px 10px",
  borderRadius: "15px",
  fontSize: "10px",
  fontWeight: "bold",
  marginTop: "5px",
  border: "1px solid #FFE81F",
  boxShadow: "0 0 10px rgba(255, 232, 31, 0.5)",
};

const deathStarStyle = {
  position: "absolute",
  top: "5%",
  right: "5%",
  fontSize: "6rem",
  opacity: 0.3,
  animation: "deathStarRotate 60s linear infinite",
  zIndex: 1,
};

const contentContainer = {
  position: "relative",
  zIndex: 2,
  padding: "20px",
  width: "100%",
  maxWidth: "900px",
};

const galaxyContainer = {
  transition: "all 2s cubic-bezier(0.4, 0, 0.2, 1)",
  transformStyle: "preserve-3d",
};

const logoContainer = {
  textAlign: "center",
  marginBottom: "30px",
};

const titleStyle = {
  fontSize: "36px",
  fontWeight: "bold",
  animation: "forceGlow 3s ease-in-out infinite",
  marginBottom: "10px",
  letterSpacing: "3px",
};

const subtitleGlow = {
  fontSize: "14px",
  color: "#00BFFF",
  fontStyle: "italic",
  textShadow: "0 0 5px #00BFFF",
};

const holoContainer = {
  backgroundColor: "rgba(0, 191, 255, 0.1)",
  border: "2px solid #00BFFF",
  borderRadius: "20px",
  padding: "30px",
  boxShadow: "0 0 30px rgba(0, 191, 255, 0.3)",
  animation: "holoFlicker 4s ease-in-out infinite",
  marginBottom: "25px",
};

const holoTitle = {
  textAlign: "center",
  color: "#00BFFF",
  fontSize: "18px",
  marginBottom: "20px",
  fontWeight: "bold",
};

const holoContent = {
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderRadius: "15px",
  padding: "25px",
  border: "1px solid #FFE81F",
};

const holoText = {
  textAlign: "center",
  marginBottom: "25px",
};

const forceText = {
  fontSize: "16px",
  color: "#FFFFFF",
  lineHeight: "1.6",
  fontStyle: "italic",
};

const questionContainer = {
  textAlign: "center",
  marginBottom: "25px",
};

const galacticQuestion = {
  fontSize: "20px",
  color: "#FFE81F",
  marginBottom: "20px",
  fontWeight: "bold",
  lineHeight: "1.4",
};

const forceAura = {
  display: "flex",
  justifyContent: "center",
};

const forceWave = {
  fontSize: "2rem",
  animation: "forceWave 3s ease-in-out infinite",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "20px",
};

const jediButton = {
  padding: "18px 25px",
  fontSize: "16px",
  border: "3px solid #FFE81F",
  borderRadius: "25px",
  cursor: "pointer",
  color: "#000",
  fontWeight: "bold",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 8px 20px rgba(255, 232, 31, 0.4)",
  fontFamily: "inherit",
  textAlign: "center",
};

const responseContainer = {
  textAlign: "center",
};

const jediApproval = {
  backgroundColor: "rgba(255, 232, 31, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  border: "2px solid #FFE81F",
  marginBottom: "25px",
};

const masterCats = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginBottom: "20px",
};

const yodaCat = {
  fontSize: "3rem",
  animation: "jediFloat 3s ease-in-out infinite",
};

const forcePower = {
  fontSize: "2.5rem",
  animation: "forceWave 2s ease-in-out infinite",
};

const lukeCat = {
  fontSize: "3rem",
  animation: "jediFloat 3s ease-in-out infinite 1s",
};

const wisdomTitle = {
  color: "#FFE81F",
  fontSize: "22px",
  marginBottom: "15px",
};

const wisdomText = {
  fontSize: "16px",
  color: "#00BFFF",
  lineHeight: "1.6",
  marginBottom: "20px",
  fontStyle: "italic",
};

const lightSaberEffect = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
};

const blueSaber = {
  fontSize: "1.5rem",
  color: "#00BFFF",
  animation: "saberGlow 2s ease-in-out infinite",
};

const greenSaber = {
  fontSize: "1.5rem",
  color: "#00FF41",
  animation: "saberGlow 2s ease-in-out infinite 0.5s",
};

const hyperdriveButton = {
  padding: "20px 40px",
  fontSize: "20px",
  background: "linear-gradient(45deg, #4caf50, #45a049, #2e7d32)",
  color: "#fff",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 15px 30px rgba(76, 175, 80, 0.5)",
  fontFamily: "inherit",
};

const charactersContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  marginTop: "30px",
};

const characterCard = {
  textAlign: "center",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #FFE81F",
};

const characterImage = {
  width: "80px",
  height: "80px",
  objectFit: "contain",
  filter: "drop-shadow(0 0 10px rgba(255, 232, 31, 0.5))",
};

const characterName = {
  color: "#FFE81F",
  fontSize: "14px",
  fontWeight: "bold",
  marginTop: "10px",
  margin: "10px 0 0 0",
};
