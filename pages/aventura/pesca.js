import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function PescaMelhorada() {
  const router = useRouter();
  const [posicao, setPosicao] = useState(50);
  const [pegou, setPegou] = useState(false);
  const [tentativas, setTentativas] = useState(0);
  const [fishingCats, setFishingCats] = useState([]);
  const [waterRipples, setWaterRipples] = useState([]);
  const [magicFish, setMagicFish] = useState([]);
  const [encouragement, setEncouragement] = useState("");
  const alvoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Gatos pescadores observando
    const cats = [
      { id: 1, emoji: "🎣🐱", x: 5, y: 85, name: "Mestre Pescador" },
      { id: 2, emoji: "🐱‍🏍", x: 90, y: 80, name: "Gato Aventureiro" },
      { id: 3, emoji: "🐱‍👤", x: 10, y: 15, name: "Ninja Fisher" },
      { id: 4, emoji: "🐱‍🚀", x: 85, y: 20, name: "Astro Cat" },
    ];
    setFishingCats(cats);

    // Peixes mágicos nadando
    const fish = [];
    for (let i = 0; i < 8; i++) {
      fish.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        emoji: ["🐠", "🐟", "🦈", "🐡", "🦑"][Math.floor(Math.random() * 5)],
        delay: Math.random() * 3,
      });
    }
    setMagicFish(fish);

    // Movimento do peixinho target
    const intervalo = setInterval(() => {
      if (!pegou) {
        const novaPos = Math.random() * 70 + 15; // Entre 15% e 85%
        setPosicao(novaPos);
        criarOndas();
      }
    }, 800);

    return () => clearInterval(intervalo);
  }, [pegou]);

  const criarOndas = () => {
    const novaOnda = {
      id: Date.now(),
      x: Math.random() * 100,
      y: 40 + Math.random() * 40,
    };

    setWaterRipples((prev) => [...prev, novaOnda]);

    setTimeout(() => {
      setWaterRipples((prev) => prev.filter((onda) => onda.id !== novaOnda.id));
    }, 2000);
  };

  const tentarPescar = () => {
    const alvoTop = parseFloat(alvoRef.current?.style.top || "50%");
    const isInTarget = alvoTop > 45 && alvoTop < 55;

    setTentativas((prev) => prev + 1);
    criarOndas();

    if (isInTarget) {
      setPegou(true);
      setEncouragement("🎉 INCRÍVEL! Você pescou o coração dele! 💘");
      audioRef.current?.play();

      // Criar celebração
      for (let i = 0; i < 5; i++) {
        setTimeout(() => criarOndas(), i * 200);
      }

      setTimeout(() => {
        router.push("/aventura/fase3");
      }, 3000);
    } else {
      const messages = [
        "Quase lá! O amor requer paciência! 🎯",
        "Tente novamente! Os gatinhos acreditam em você! 🐱",
        "Respire fundo e foque no coração! 💖",
        "A prática leva à perfeição do amor! ✨",
      ];
      setEncouragement(messages[tentativas % messages.length]);

      setTimeout(() => setEncouragement(""), 2000);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Fundo do lago encantado */}
      <div style={backgroundOverlay}></div>

      {/* Ondas na água */}
      {waterRipples.map((onda) => (
        <div
          key={onda.id}
          style={{
            ...rippleStyle,
            left: `${onda.x}%`,
            top: `${onda.y}%`,
          }}
        />
      ))}

      {/* Peixes mágicos nadando */}
      {magicFish.map((fish) => (
        <div
          key={fish.id}
          style={{
            ...fishStyle,
            left: `${fish.x}%`,
            top: `${fish.y}%`,
            animationDelay: `${fish.delay}s`,
          }}
        >
          {fish.emoji}
        </div>
      ))}

      {/* Gatos pescadores */}
      {fishingCats.map((cat) => (
        <div
          key={cat.id}
          style={{
            ...fishingCatStyle,
            left: `${cat.x}%`,
            top: `${cat.y}%`,
          }}
        >
          <div style={catCharacter}>{cat.emoji}</div>
          <div style={catNameTag}>{cat.name}</div>
        </div>
      ))}

      <div style={contentContainer}>
        <div style={gameContainer}>
          {/* Título com efeito de água */}
          <div style={titleContainer}>
            <h2 style={titleStyle}>🎣 Lago Encantado dos Gatinhos 🎣</h2>
            <div style={titleWaves}>
              <span style={wave1}>〰️</span>
              <span style={wave2}>〰️</span>
              <span style={wave3}>〰️</span>
            </div>
          </div>

          <div style={instructionsContainer}>
            <p style={instructionText}>
              🎯 Fique atenta e clique quando o peixinho dourado estiver
              <br />
              <strong>na zona encantada do amor!</strong> 💖
            </p>
          </div>

          {/* Sistema de pontuação */}
          <div style={scoreContainer}>
            <div style={scoreCard}>
              <div style={scoreLabel}>Tentativas</div>
              <div style={scoreValue}>{tentativas}</div>
            </div>
            <div style={scoreCard}>
              <div style={scoreLabel}>Precisão</div>
              <div style={scoreValue}>
                {tentativas > 0
                  ? Math.round(((pegou ? 100 : 0) / tentativas) * 100)
                  : 0}
                %
              </div>
            </div>
          </div>

          {/* Aquário mágico */}
          <div style={aquariumContainer}>
            <div style={aquarium}>
              {/* Zona target mágica */}
              <div style={targetZone}>
                <div style={targetIndicator}>💖 ZONA DO AMOR 💖</div>
              </div>

              {/* Peixinho alvo */}
              <div
                ref={alvoRef}
                style={{
                  ...targetFish,
                  top: `${posicao}%`,
                }}
              >
                🐠✨
              </div>

              {/* Decorações do aquário */}
              <div style={aquariumDecorations}>
                <div style={seaweed1}>🌿</div>
                <div style={seaweed2}>🌿</div>
                <div style={coral}>🪸</div>
                <div style={shell}>🐚</div>
              </div>

              {/* Bolhas */}
              <div style={bubblesContainer}>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      ...bubbleStyle,
                      left: `${20 + i * 12}%`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    💧
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback e encorajamento */}
          {encouragement && (
            <div style={feedbackContainer}>
              <p style={feedbackText}>{encouragement}</p>
            </div>
          )}

          {/* Controles */}
          <div style={controlsContainer}>
            {!pegou ? (
              <button
                onClick={tentarPescar}
                style={fishingButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1) rotate(2deg)";
                  e.target.style.boxShadow =
                    "0 15px 30px rgba(89, 195, 195, 0.8)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) rotate(0deg)";
                  e.target.style.boxShadow =
                    "0 8px 20px rgba(89, 195, 195, 0.6)";
                }}
              >
                🎣 Lançar Vara Mágica! 🎣
              </button>
            ) : (
              <div style={successContainer}>
                <div style={successTitle}>🎉 PESCOU O CORAÇÃO! 🎉</div>
                <div style={celebrationFish}>
                  <span style={celebrationEmoji1}>🐠</span>
                  <span style={celebrationEmoji2}>💖</span>
                  <span style={celebrationEmoji3}>🐠</span>
                </div>
                <p style={successText}>
                  Os gatinhos pescadores ficaram impressionados!
                  <br />
                  Você provou que tem paciência e amor verdadeiro! 💕
                </p>
                <div style={fishingReward}>
                  <div style={rewardText}>🏆 Recompensa Conquistada! 🏆</div>
                  <div style={rewardItem}>💎 Cristal do Coração Pescado</div>
                </div>
              </div>
            )}
          </div>

          {/* Galeria de gatos torcendo */}
          <div style={cheeringContainer}>
            <div style={cheeringTitle}>🎭 Torcida Felina 🎭</div>
            <div style={cheeringCats}>
              <div style={cheerCat1}>📣🐱</div>
              <div style={cheerCat2}>🎉😸</div>
              <div style={cheerCat3}>👏🐱</div>
              <div style={cheerCat4}>🥳😻</div>
            </div>
            <p style={cheeringText}>
              "Vai! Vai! Você consegue!" - Coro dos Gatinhos
            </p>
          </div>
        </div>
      </div>

      {/* Som */}
      <audio
        ref={audioRef}
        src="https://www.fesliyanstudios.com/play-mp3/387"
        preload="auto"
      />

      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes fishSwim {
          0%,
          100% {
            transform: translateX(-20px) rotateY(0deg);
          }
          50% {
            transform: translateX(20px) rotateY(180deg);
          }
        }

        @keyframes catFishing {
          0%,
          100% {
            transform: rotate(-5deg) scale(1);
          }
          50% {
            transform: rotate(5deg) scale(1.1);
          }
        }

        @keyframes waveMove {
          0%,
          100% {
            transform: translateX(-10px);
          }
          50% {
            transform: translateX(10px);
          }
        }

        @keyframes bubbleFloat {
          0% {
            transform: translateY(0px) scale(0.8);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes targetGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.6);
          }
          50% {
            box-shadow:
              0 0 30px rgba(255, 105, 180, 1),
              0 0 40px rgba(255, 105, 180, 0.8);
          }
        }

        @keyframes celebration {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.3) rotate(-10deg);
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          75% {
            transform: scale(1.4) rotate(-5deg);
          }
        }

        @keyframes seaweedSway {
          0%,
          100% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
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
    "linear-gradient(135deg, #87CEEB 0%, #4682B4 25%, #1E90FF 50%, #0077BE 75%, #006494 100%)",
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
  color: "#ffffff",
  fontFamily: '"Press Start 2P", monospace',
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
  background:
    "radial-gradient(circle at 50% 100%, rgba(0, 191, 255, 0.3) 0%, transparent 50%)",
  zIndex: 0,
};

const rippleStyle = {
  position: "absolute",
  width: "20px",
  height: "20px",
  border: "2px solid rgba(255, 255, 255, 0.6)",
  borderRadius: "50%",
  animation: "ripple 2s ease-out forwards",
  pointerEvents: "none",
};

const fishStyle = {
  position: "absolute",
  fontSize: "1.5rem",
  animation: "fishSwim 4s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
};

const fishingCatStyle = {
  position: "absolute",
  textAlign: "center",
  zIndex: 10,
};

const catCharacter = {
  fontSize: "2rem",
  animation: "catFishing 3s ease-in-out infinite",
  cursor: "pointer",
};

const catNameTag = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#1E90FF",
  padding: "4px 8px",
  borderRadius: "10px",
  fontSize: "8px",
  fontWeight: "bold",
  marginTop: "5px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
};

const contentContainer = {
  position: "relative",
  zIndex: 2,
  padding: "20px",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const gameContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "30px",
  maxWidth: "600px",
  width: "100%",
  border: "4px solid #1E90FF",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(10px)",
  color: "#2C3E50",
};

const titleContainer = {
  textAlign: "center",
  marginBottom: "20px",
};

const titleStyle = {
  fontSize: "16px",
  background: "linear-gradient(45deg, #1E90FF, #00BFFF)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "10px",
};

const titleWaves = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const wave1 = {
  fontSize: "1rem",
  color: "#1E90FF",
  animation: "waveMove 2s ease-in-out infinite",
};

const wave2 = {
  fontSize: "1rem",
  color: "#00BFFF",
  animation: "waveMove 2s ease-in-out infinite 0.5s",
};

const wave3 = {
  fontSize: "1rem",
  color: "#87CEEB",
  animation: "waveMove 2s ease-in-out infinite 1s",
};

const instructionsContainer = {
  textAlign: "center",
  marginBottom: "20px",
  backgroundColor: "rgba(30, 144, 255, 0.1)",
  borderRadius: "15px",
  padding: "15px",
  border: "2px solid #1E90FF",
};

const instructionText = {
  fontSize: "10px",
  lineHeight: "1.4",
  color: "#2C3E50",
  margin: 0,
};

const scoreContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "25px",
};

const scoreCard = {
  backgroundColor: "rgba(135, 206, 235, 0.2)",
  borderRadius: "10px",
  padding: "10px 15px",
  textAlign: "center",
  border: "2px solid #87CEEB",
};

const scoreLabel = {
  fontSize: "8px",
  color: "#666",
  marginBottom: "5px",
};

const scoreValue = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#1E90FF",
};

const aquariumContainer = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "25px",
};

const aquarium = {
  position: "relative",
  width: "200px",
  height: "300px",
  background:
    "linear-gradient(to bottom, #87CEEB 0%, #4682B4 50%, #1E90FF 100%)",
  borderRadius: "15px",
  border: "4px solid #ffffff",
  overflow: "hidden",
  boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
};

const targetZone = {
  position: "absolute",
  top: "45%",
  left: 0,
  width: "100%",
  height: "20%",
  backgroundColor: "rgba(255, 105, 180, 0.3)",
  border: "2px dashed #ff69b4",
  borderLeft: "none",
  borderRight: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  animation: "targetGlow 2s ease-in-out infinite",
};

const targetIndicator = {
  fontSize: "8px",
  color: "#ff1493",
  fontWeight: "bold",
  textAlign: "center",
};

const targetFish = {
  position: "absolute",
  left: "30%",
  fontSize: "20px",
  transition: "top 0.6s ease-in-out",
  zIndex: 3,
  filter: "drop-shadow(0 0 5px #FFD700)",
};

const aquariumDecorations = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "30%",
  zIndex: 1,
};

const seaweed1 = {
  position: "absolute",
  bottom: 0,
  left: "10%",
  fontSize: "1.5rem",
  animation: "seaweedSway 3s ease-in-out infinite",
};

const seaweed2 = {
  position: "absolute",
  bottom: 0,
  right: "10%",
  fontSize: "1.5rem",
  animation: "seaweedSway 3s ease-in-out infinite 1.5s",
};

const coral = {
  position: "absolute",
  bottom: 0,
  left: "40%",
  fontSize: "1.2rem",
};

const shell = {
  position: "absolute",
  bottom: 0,
  right: "30%",
  fontSize: "1rem",
};

const bubblesContainer = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "100%",
  zIndex: 1,
};

const bubbleStyle = {
  position: "absolute",
  bottom: 0,
  fontSize: "0.8rem",
  animation: "bubbleFloat 4s ease-in-out infinite",
  opacity: 0.7,
};

const feedbackContainer = {
  textAlign: "center",
  marginBottom: "15px",
  minHeight: "30px",
};

const feedbackText = {
  fontSize: "10px",
  color: "#1E90FF",
  fontWeight: "bold",
  animation: "celebration 1s ease-in-out",
  margin: 0,
};

const controlsContainer = {
  textAlign: "center",
  marginBottom: "25px",
};

const fishingButton = {
  padding: "15px 25px",
  fontSize: "12px",
  backgroundColor: "#59c3c3",
  color: "#ffffff",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 8px 20px rgba(89, 195, 195, 0.6)",
  fontFamily: "inherit",
};

const successContainer = {
  textAlign: "center",
  backgroundColor: "rgba(76, 175, 80, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  border: "3px solid #4CAF50",
};

const successTitle = {
  fontSize: "14px",
  color: "#4CAF50",
  fontWeight: "bold",
  marginBottom: "15px",
};

const celebrationFish = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "15px",
};

const celebrationEmoji1 = {
  fontSize: "2rem",
  animation: "celebration 2s ease-in-out infinite",
};

const celebrationEmoji2 = {
  fontSize: "2.5rem",
  animation: "celebration 2s ease-in-out infinite 0.5s",
};

const celebrationEmoji3 = {
  fontSize: "2rem",
  animation: "celebration 2s ease-in-out infinite 1s",
};

const successText = {
  fontSize: "10px",
  color: "#2C3E50",
  lineHeight: "1.4",
  marginBottom: "15px",
};

const fishingReward = {
  backgroundColor: "rgba(255, 215, 0, 0.2)",
  borderRadius: "10px",
  padding: "10px",
  border: "2px solid #FFD700",
};

const rewardText = {
  fontSize: "10px",
  color: "#FF8C00",
  fontWeight: "bold",
  marginBottom: "5px",
};

const rewardItem = {
  fontSize: "9px",
  color: "#DAA520",
  fontWeight: "bold",
};

const cheeringContainer = {
  backgroundColor: "rgba(255, 105, 180, 0.1)",
  borderRadius: "15px",
  padding: "15px",
  textAlign: "center",
  border: "2px solid #ff69b4",
};

const cheeringTitle = {
  fontSize: "10px",
  color: "#ff1493",
  fontWeight: "bold",
  marginBottom: "10px",
};

const cheeringCats = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "10px",
};

const cheerCat1 = {
  fontSize: "1.5rem",
  animation: "catFishing 2s ease-in-out infinite",
};

const cheerCat2 = {
  fontSize: "1.5rem",
  animation: "catFishing 2s ease-in-out infinite 0.3s",
};

const cheerCat3 = {
  fontSize: "1.5rem",
  animation: "catFishing 2s ease-in-out infinite 0.6s",
};

const cheerCat4 = {
  fontSize: "1.5rem",
  animation: "catFishing 2s ease-in-out infinite 0.9s",
};

const cheeringText = {
  fontSize: "8px",
  color: "#666",
  fontStyle: "italic",
  margin: 0,
};
