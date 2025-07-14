import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function FaseFinalMelhorada() {
  const router = useRouter();
  const [revelarEtapas, setRevelarEtapas] = useState(0);
  const [fireworks, setFireworks] = useState([]);
  const [catCelebration, setCatCelebration] = useState([]);
  const [cosmicElements, setCosmicElements] = useState([]);

  useEffect(() => {
    // Criar fogos de artifício
    const fireworksArray = [];
    for (let i = 0; i < 15; i++) {
      fireworksArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 60 + 20,
        delay: Math.random() * 4,
        color: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"][
          Math.floor(Math.random() * 5)
        ],
      });
    }
    setFireworks(fireworksArray);

    // Gatos celebrando
    const cats = [
      { id: 1, emoji: "🎉🐱", x: 5, y: 80 },
      { id: 2, emoji: "🎊😸", x: 90, y: 75 },
      { id: 3, emoji: "🎈🐱", x: 10, y: 20 },
      { id: 4, emoji: "🎆😻", x: 85, y: 25 },
      { id: 5, emoji: "🎵🐱", x: 50, y: 90 },
    ];
    setCatCelebration(cats);

    // Elementos cósmicos
    const cosmic = [];
    for (let i = 0; i < 25; i++) {
      cosmic.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ["🌟", "✨", "💫", "⭐", "🌙", "🪐"][
          Math.floor(Math.random() * 6)
        ],
        delay: Math.random() * 3,
      });
    }
    setCosmicElements(cosmic);

    // Sequência de revelação
    const timeouts = [
      setTimeout(() => setRevelarEtapas(1), 1000),
      setTimeout(() => setRevelarEtapas(2), 3000),
      setTimeout(() => setRevelarEtapas(3), 5000),
      setTimeout(() => setRevelarEtapas(4), 7000),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const irParaPedido = () => {
    router.push("/pedido");
  };

  return (
    <div style={containerStyle}>
      {/* Fundo cósmico */}
      <div style={cosmicBackground}></div>

      {/* Fogos de artifício */}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          style={{
            ...fireworkStyle,
            left: `${firework.x}%`,
            top: `${firework.y}%`,
            backgroundColor: firework.color,
            animationDelay: `${firework.delay}s`,
          }}
        />
      ))}

      {/* Elementos cósmicos flutuantes */}
      {cosmicElements.map((element) => (
        <div
          key={element.id}
          style={{
            ...cosmicElementStyle,
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
          }}
        >
          {element.emoji}
        </div>
      ))}

      {/* Gatos celebrando */}
      {catCelebration.map((cat) => (
        <div
          key={cat.id}
          style={{
            ...celebratingCatStyle,
            left: `${cat.x}%`,
            top: `${cat.y}%`,
          }}
        >
          {cat.emoji}
        </div>
      ))}

      <div style={contentContainer}>
        <div style={revelationContainer}>
          {/* Título épico */}
          <div
            style={{
              ...titleContainer,
              opacity: revelarEtapas >= 1 ? 1 : 0,
              transform:
                revelarEtapas >= 1
                  ? "scale(1) rotateY(0deg)"
                  : "scale(0.5) rotateY(-90deg)",
            }}
          >
            <h1 style={epicTitle}>💫 A GRANDE REVELAÇÃO 💫</h1>
            <div style={titleGlow}>
              <span style={glowText1}>✨</span>
              <span style={glowText2}>🌟</span>
              <span style={glowText3}>✨</span>
            </div>
          </div>

          {/* Jornada completada */}
          {revelarEtapas >= 2 && (
            <div style={journeyContainer}>
              <h2 style={journeyTitle}>🎯 Jornada Épica Completada! 🎯</h2>

              <div style={achievementsGrid}>
                <div style={achievementCard}>
                  <div style={achievementIcon}>📜</div>
                  <p style={achievementText}>Grimório Decifrado</p>
                </div>
                <div style={achievementCard}>
                  <div style={achievementIcon}>🧪</div>
                  <p style={achievementText}>Poção Preparada</p>
                </div>
                <div style={achievementCard}>
                  <div style={achievementIcon}>🏰</div>
                  <p style={achievementText}>Castelo Conquistado</p>
                </div>
                <div style={achievementCard}>
                  <div style={achievementIcon}>⚡</div>
                  <p style={achievementText}>Força Dominada</p>
                </div>
                <div style={achievementCard}>
                  <div style={achievementIcon}>🌸</div>
                  <p style={achievementText}>Certificado Kawaii</p>
                </div>
                <div style={achievementCard}>
                  <div style={achievementIcon}>💎</div>
                  <p style={achievementText}>Gemas Fusionadas</p>
                </div>
                <div style={achievementCard}>
                  <div style={achievementIcon}>🎮</div>
                  <p style={achievementText}>High Score Arcade</p>
                </div>
                <div style={achievementCard}>
                  <div style={achievementIcon}>🍺</div>
                  <p style={achievementText}>História Legendary</p>
                </div>
              </div>
            </div>
          )}

          {/* Mensagem especial */}
          {revelarEtapas >= 3 && (
            <div style={specialMessageContainer}>
              <div style={heartContainer}>
                <div style={mainHeart}>💖</div>
                <div style={heartRing1}>💕</div>
                <div style={heartRing2}>💓</div>
                <div style={heartRing3}>💗</div>
              </div>

              <div style={messageScroll}>
                <h3 style={scrollTitle}>💌 Carta do Coração 💌</h3>
                <p style={loveMessage}>
                  Você completou uma jornada ÉPICA através de 8 mundos mágicos!
                  <br />
                  Do Grimório Secreto ao Anime Café Kawaii...
                  <br />
                  Das Gemas do Steven Universe ao Arcade 8-bit...
                  <br />
                  Do MacLaren's Pub às aventuras galácticas!
                  <br />
                  <br />
                  Em cada mundo, em cada escolha, em cada risada...
                  <br />
                  A magia do amor brilhou intensamente! ✨
                  <br />
                  <br />
                  Os gatos aprovaram, os magos se curvaram,
                  <br />
                  os Jedis reconheceram, as Gems fusionaram,
                  <br />
                  o Barney declarou LEGENDARY!
                  <br />
                  <br />
                  Agora chegou a hora da maior revelação de todas! 💍
                </p>
              </div>

              <div style={catChorus}>
                <div style={chorusCat1}>🐱</div>
                <div style={chorusCat2}>😸</div>
                <div style={chorusCat3}>😻</div>
                <div style={chorusCat4}>🐱‍👤</div>
                <div style={chorusCat5}>🐱‍🚀</div>
              </div>
            </div>
          )}

          {/* Botão final épico */}
          {revelarEtapas >= 4 && (
            <div style={finalActionContainer}>
              <div style={anticipationText}>
                <h3 style={finalTitle}>⭐ O Momento Chegou ⭐</h3>
                <p style={finalSubtitle}>
                  Prepare seu coração para a revelação mais importante...
                </p>
              </div>

              <div style={magicButton}>
                <button
                  onClick={irParaPedido}
                  style={revelationButton}
                  onMouseEnter={(e) => {
                    e.target.style.transform =
                      "scale(1.2) rotate(5deg) translateY(-10px)";
                    e.target.style.background =
                      "linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #FFA07A)";
                    e.target.style.boxShadow =
                      "0 25px 50px rgba(255, 107, 107, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform =
                      "scale(1) rotate(0deg) translateY(0px)";
                    e.target.style.background =
                      "linear-gradient(45deg, #6a5acd, #9370db, #8a2be2)";
                    e.target.style.boxShadow =
                      "0 15px 30px rgba(106, 90, 205, 0.6)";
                  }}
                >
                  💍 Revelar o Destino do Coração 💍
                </button>
              </div>

              <div style={finalCatBlessing}>
                <p style={blessingText}>
                  "Com a bênção de todos os gatinhos mágicos..." 🐾✨
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fireworkExplode {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(3) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes cosmicFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-30px) rotate(180deg) scale(1.2);
          }
        }

        @keyframes catParty {
          0%,
          100% {
            transform: scale(1) rotate(-10deg);
          }
          25% {
            transform: scale(1.2) rotate(10deg);
          }
          50% {
            transform: scale(1.1) rotate(-5deg);
          }
          75% {
            transform: scale(1.3) rotate(15deg);
          }
        }

        @keyframes epicTitle {
          0%,
          100% {
            text-shadow:
              0 0 10px #ffd700,
              0 0 20px #ffd700;
            transform: scale(1);
          }
          50% {
            text-shadow:
              0 0 20px #ffd700,
              0 0 30px #ffd700,
              0 0 40px #ffd700;
            transform: scale(1.05);
          }
        }

        @keyframes heartPulse {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.3) rotate(5deg);
          }
        }

        @keyframes heartRing {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.4;
          }
          100% {
            transform: scale(2) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes chorusWave {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.2);
          }
        }

        @keyframes scrollUnfurl {
          from {
            transform: scaleY(0) rotateX(-90deg);
            opacity: 0;
          }
          to {
            transform: scaleY(1) rotateX(0deg);
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
  background:
    "linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: '"Cinzel", serif',
  position: "relative",
  overflow: "hidden",
  padding: 0,
  margin: 0,
};

const cosmicBackground = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 199, 255, 0.3) 0%, transparent 50%)",
  zIndex: 0,
};

const fireworkStyle = {
  position: "absolute",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  animation: "fireworkExplode 2s ease-out infinite",
  pointerEvents: "none",
};

const cosmicElementStyle = {
  position: "absolute",
  fontSize: "20px",
  animation: "cosmicFloat 4s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
};

const celebratingCatStyle = {
  position: "absolute",
  fontSize: "2.5rem",
  animation: "catParty 2s ease-in-out infinite",
  zIndex: 10,
};

const contentContainer = {
  position: "relative",
  zIndex: 2,
  padding: "20px",
  width: "100%",
  maxWidth: "900px",
};

const revelationContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "30px",
  padding: "40px",
  border: "4px solid #FFD700",
  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(20px)",
  color: "#2C1810",
};

const titleContainer = {
  textAlign: "center",
  marginBottom: "30px",
  transition: "all 2s cubic-bezier(0.4, 0, 0.2, 1)",
  transformStyle: "preserve-3d",
};

const epicTitle = {
  fontSize: "38px",
  fontWeight: "bold",
  background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6347)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "epicTitle 3s ease-in-out infinite",
  marginBottom: "15px",
};

const titleGlow = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
};

const glowText1 = {
  fontSize: "2rem",
  animation: "cosmicFloat 3s ease-in-out infinite",
};

const glowText2 = {
  fontSize: "2.5rem",
  animation: "cosmicFloat 3s ease-in-out infinite 1s",
};

const glowText3 = {
  fontSize: "2rem",
  animation: "cosmicFloat 3s ease-in-out infinite 2s",
};

const journeyContainer = {
  margin: "30px 0",
  animation: "scrollUnfurl 1.5s ease-out",
};

const journeyTitle = {
  textAlign: "center",
  color: "#6a5acd",
  fontSize: "26px",
  marginBottom: "25px",
};

const achievementsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "20px",
  marginBottom: "25px",
};

const achievementCard = {
  backgroundColor: "rgba(106, 90, 205, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  textAlign: "center",
  border: "2px solid #6a5acd",
  transition: "all 0.3s ease",
};

const achievementIcon = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const achievementText = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#6a5acd",
  margin: 0,
};

const specialMessageContainer = {
  margin: "30px 0",
  textAlign: "center",
};

const heartContainer = {
  position: "relative",
  display: "inline-block",
  marginBottom: "25px",
};

const mainHeart = {
  fontSize: "4rem",
  animation: "heartPulse 2s ease-in-out infinite",
  position: "relative",
  zIndex: 4,
};

const heartRing1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "3rem",
  animation: "heartRing 3s ease-out infinite",
  zIndex: 3,
};

const heartRing2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "3rem",
  animation: "heartRing 3s ease-out infinite 1s",
  zIndex: 2,
};

const heartRing3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "3rem",
  animation: "heartRing 3s ease-out infinite 2s",
  zIndex: 1,
};

const messageScroll = {
  backgroundColor: "#FFF8DC",
  border: "3px solid #FFD700",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
};

const scrollTitle = {
  color: "#B8860B",
  fontSize: "22px",
  marginBottom: "15px",
};

const loveMessage = {
  fontSize: "16px",
  lineHeight: "1.8",
  color: "#8B4513",
  fontStyle: "italic",
  margin: 0,
};

const catChorus = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
};

const chorusCat1 = {
  fontSize: "2.5rem",
  animation: "chorusWave 2s ease-in-out infinite",
};

const chorusCat2 = {
  fontSize: "2.5rem",
  animation: "chorusWave 2s ease-in-out infinite 0.2s",
};

const chorusCat3 = {
  fontSize: "2.5rem",
  animation: "chorusWave 2s ease-in-out infinite 0.4s",
};

const chorusCat4 = {
  fontSize: "2.5rem",
  animation: "chorusWave 2s ease-in-out infinite 0.6s",
};

const chorusCat5 = {
  fontSize: "2.5rem",
  animation: "chorusWave 2s ease-in-out infinite 0.8s",
};

const finalActionContainer = {
  textAlign: "center",
  margin: "30px 0",
};

const anticipationText = {
  marginBottom: "25px",
};

const finalTitle = {
  color: "#8B008B",
  fontSize: "24px",
  marginBottom: "10px",
};

const finalSubtitle = {
  color: "#666",
  fontSize: "16px",
  fontStyle: "italic",
};

const magicButton = {
  marginBottom: "20px",
};

const revelationButton = {
  padding: "25px 45px",
  fontSize: "20px",
  background: "linear-gradient(45deg, #6a5acd, #9370db, #8a2be2)",
  color: "#fff",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 15px 30px rgba(106, 90, 205, 0.6)",
  fontFamily: "inherit",
  textTransform: "uppercase",
  letterSpacing: "2px",
};

const finalCatBlessing = {
  marginTop: "15px",
};

const blessingText = {
  color: "#B8860B",
  fontSize: "14px",
  fontStyle: "italic",
  fontWeight: "bold",
};
