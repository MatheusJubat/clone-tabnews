// pages/aventura/pesca.js - Versão Melhorada: Pescaria dos Momentos
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function PescaMelhorada() {
  const router = useRouter();
  const [fase, setFase] = useState("instrucoes"); // 'instrucoes', 'pescando', 'completo'
  const [peixesPescados, setPeixesPescados] = useState([]);
  const [tentativas, setTentativas] = useState(0);
  const [peixes, setPeixes] = useState([]);
  const [linhaCast, setLinhaCast] = useState(false);
  const [pescaAtiva, setPescaAtiva] = useState(false);
  const [waterRipples, setWaterRipples] = useState([]);
  const [fishingCats, setFishingCats] = useState([]);

  // Peixes especiais com momentos do relacionamento
  const peixesEspeciais = [
    {
      id: 1,
      emoji: "🐠",
      nome: "Peixe da Primeira Conversa",
      memoria: "Lembra da primeira vez que conversamos? 💬",
      cor: "#FF6B6B",
      raridade: "comum",
    },
    {
      id: 2,
      emoji: "🐟",
      nome: 'Peixe do Primeiro "Te Amo"',
      memoria: "O momento mais especial... quando dissemos que nos amávamos 💕",
      cor: "#4ECDC4",
      raridade: "raro",
    },
    {
      id: 3,
      emoji: "🦈",
      nome: "Tubarão dos Desafios",
      memoria: "Todos os obstáculos que superamos juntos nos fortaleceram 💪",
      cor: "#45B7D1",
      raridade: "épico",
    },
    {
      id: 4,
      emoji: "🐡",
      nome: "Baiacu das Risadas",
      memoria: "Quantas gargalhadas já demos juntos! 😂",
      cor: "#96CEB4",
      raridade: "comum",
    },
    {
      id: 5,
      emoji: "🐙",
      nome: "Polvo dos Planos",
      memoria: "Todos os sonhos e planos que fazemos para o futuro 🌟",
      cor: "#FFEAA7",
      raridade: "lendário",
    },
    {
      id: 6,
      emoji: "🦑",
      nome: "Lula da Cumplicidade",
      memoria: "A conexão especial que só vocês dois entendem 🤝",
      cor: "#DDA0DD",
      raridade: "raro",
    },
  ];

  useEffect(() => {
    // Gatos pescadores assistindo
    const cats = [
      { id: 1, emoji: "🎣🐱", x: 5, y: 85, name: "Mestre Pescador" },
      { id: 2, emoji: "⛵🐱", x: 90, y: 80, name: "Capitão Whiskers" },
      { id: 3, emoji: "🐱‍🏍", x: 10, y: 15, name: "Gato Aventureiro" },
      { id: 4, emoji: "🌊🐱", x: 85, y: 20, name: "Surfista Felino" },
    ];
    setFishingCats(cats);

    // Criar peixes nadando
    const peixesIniciais = [];
    for (let i = 0; i < 8; i++) {
      const peixeAleatorio =
        peixesEspeciais[Math.floor(Math.random() * peixesEspeciais.length)];
      peixesIniciais.push({
        ...peixeAleatorio,
        x: Math.random() * 80 + 10,
        y: Math.random() * 40 + 40,
        velocidade: Math.random() * 2 + 1,
        direcao: Math.random() * 360,
        id: i + Date.now(),
      });
    }
    setPeixes(peixesIniciais);
  }, []);

  // Animação dos peixes
  useEffect(() => {
    if (fase !== "pescando") return;

    const intervalo = setInterval(() => {
      setPeixes((prevPeixes) =>
        prevPeixes.map((peixe) => {
          let newX = peixe.x + Math.cos(peixe.direcao) * peixe.velocidade;
          let newY = peixe.y + Math.sin(peixe.direcao) * peixe.velocidade;
          let newDirecao = peixe.direcao;

          // Manter peixes na área da água
          if (newX < 10 || newX > 85) {
            newDirecao = Math.PI - peixe.direcao;
            newX = Math.max(10, Math.min(85, newX));
          }
          if (newY < 40 || newY > 80) {
            newDirecao = -peixe.direcao;
            newY = Math.max(40, Math.min(80, newY));
          }

          return {
            ...peixe,
            x: newX,
            y: newY,
            direcao: newDirecao,
          };
        }),
      );
    }, 100);

    return () => clearInterval(intervalo);
  }, [fase]);

  const criarOnda = (x, y) => {
    const novaOnda = {
      id: Date.now(),
      x: x,
      y: y,
    };

    setWaterRipples((prev) => [...prev, novaOnda]);

    setTimeout(() => {
      setWaterRipples((prev) => prev.filter((onda) => onda.id !== novaOnda.id));
    }, 2000);
  };

  const lancarLinha = () => {
    if (pescaAtiva) return;

    setPescaAtiva(true);
    setLinhaCast(true);
    setTentativas((prev) => prev + 1);

    // Criar onda onde a linha caiu
    criarOnda(50, 60);

    // Simular tempo de espera
    setTimeout(() => {
      // Verificar se pegou algum peixe
      const peixesPertos = peixes.filter((peixe) => {
        const distancia = Math.sqrt(
          Math.pow(peixe.x - 50, 2) + Math.pow(peixe.y - 60, 2),
        );
        return distancia < 15; // Área de captura
      });

      if (peixesPertos.length > 0) {
        const peixePescado = peixesPertos[0];
        setPeixesPescados((prev) => [...prev, peixePescado]);

        // Remover peixe pescado da água
        setPeixes((prev) => prev.filter((p) => p.id !== peixePescado.id));

        // Criar múltiplas ondas de comemoração
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            criarOnda(Math.random() * 60 + 20, Math.random() * 30 + 50);
          }, i * 200);
        }

        // Verificar se completou
        if (peixesPescados.length + 1 >= 4) {
          setTimeout(() => setFase("completo"), 1500);
        }
      }

      setLinhaCast(false);
      setPescaAtiva(false);
    }, 2000);
  };

  const avancar = () => {
    router.push("/aventura/fase3");
  };

  return (
    <div style={containerStyle}>
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
        {fase === "instrucoes" && (
          <div style={instructionsContainer}>
            <h1 style={titleStyle}>🎣 Pescaria dos Momentos Especiais 🎣</h1>

            <div style={storyContainer}>
              <p style={storyText}>
                Em um lago mágico, nadam peixes especiais que guardam as
                memórias mais preciosas do seu relacionamento...
                <br />
                <br />
                Sua missão é pescar 4 peixes para desbloquear os momentos mais
                importantes da jornada de vocês! 💕
              </p>
            </div>

            <div style={instructionsList}>
              <h3 style={instructionsTitle}>Como Pescar:</h3>
              <div style={instruction}>
                🎯 Clique no botão para lançar a linha
              </div>
              <div style={instruction}>🐠 Aguarde os peixes se aproximarem</div>
              <div style={instruction}>⏰ Timing é importante!</div>
              <div style={instruction}>
                💝 Cada peixe revela uma memória especial
              </div>
            </div>

            <button
              onClick={() => setFase("pescando")}
              style={startFishingButton}
            >
              🎣 Começar a Pescaria 🎣
            </button>
          </div>
        )}

        {fase === "pescando" && (
          <div style={fishingGameContainer}>
            <div style={gameHeader}>
              <h2 style={gameTitle}>🌊 Lago dos Momentos 🌊</h2>
              <div style={gameStats}>
                <div>Peixes Pescados: {peixesPescados.length}/4</div>
                <div>Tentativas: {tentativas}</div>
              </div>
            </div>

            {/* Área do lago */}
            <div style={lakeArea}>
              {/* Peixes nadando */}
              {peixes.map((peixe) => (
                <div
                  key={peixe.id}
                  style={{
                    ...fishStyle,
                    left: `${peixe.x}%`,
                    top: `${peixe.y}%`,
                    color: peixe.cor,
                  }}
                  title={peixe.nome}
                >
                  {peixe.emoji}
                </div>
              ))}

              {/* Linha de pesca */}
              {linhaCast && (
                <div style={fishingLine}>
                  <div style={fishingHook}>🪝</div>
                </div>
              )}

              {/* Área de pesca */}
              <div style={fishingSpot}>🎯 Zona de Pesca</div>
            </div>

            <button
              onClick={lancarLinha}
              disabled={pescaAtiva}
              style={{
                ...fishingButton,
                opacity: pescaAtiva ? 0.6 : 1,
                cursor: pescaAtiva ? "not-allowed" : "pointer",
              }}
            >
              {pescaAtiva ? "🎣 Pescando..." : "🎣 Lançar Linha"}
            </button>

            {/* Peixes pescados */}
            {peixesPescados.length > 0 && (
              <div style={caughtFishContainer}>
                <h3 style={caughtTitle}>🏆 Momentos Capturados:</h3>
                <div style={caughtFishList}>
                  {peixesPescados.map((peixe, index) => (
                    <div key={index} style={caughtFishCard}>
                      <div style={caughtFishEmoji}>{peixe.emoji}</div>
                      <div style={caughtFishName}>{peixe.nome}</div>
                      <div style={caughtFishMemory}>{peixe.memoria}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {fase === "completo" && (
          <div style={completionContainer}>
            <h1 style={completionTitle}>🏆 Pescaria Completa! 🏆</h1>

            <div style={completionMessage}>
              <p style={completionText}>
                Parabéns! Você pescou todos os momentos especiais! 🎉
                <br />
                Cada peixe representa uma memória preciosa da jornada de vocês.
                <br />
                Agora essas lembranças estão guardadas para sempre! 💝
              </p>
            </div>

            <div style={allCaughtFish}>
              <h3 style={treasuresTitle}>💎 Tesouros Pescados:</h3>
              <div style={treasuresGrid}>
                {peixesPescados.map((peixe, index) => (
                  <div key={index} style={treasureCard}>
                    <div style={treasureEmoji}>{peixe.emoji}</div>
                    <div style={treasureName}>{peixe.nome}</div>
                    <div style={treasureRarity}>{peixe.raridade}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={fishingReward}>
              <h4 style={rewardTitle}>🎁 Recompensa da Pescaria:</h4>
              <div style={rewardItem}>
                🏵️ Medallha de Mestre Pescador do Amor
              </div>
              <div style={rewardItem}>📜 Pergaminho das Memórias Eternas</div>
            </div>

            <button onClick={avancar} style={continueButton}>
              ⛵ Navegar para Próxima Aventura ⛵
            </button>
          </div>
        )}
      </div>

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
            transform: translateX(0px) scaleX(1);
          }
          50% {
            transform: translateX(5px) scaleX(-1);
          }
        }

        @keyframes hookDrop {
          0% {
            transform: translateY(-100px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes catFishing {
          0%,
          100% {
            transform: rotate(-2deg) scale(1);
          }
          50% {
            transform: rotate(2deg) scale(1.05);
          }
        }

        @keyframes treasureGlow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 1);
          }
        }
      `}</style>
    </div>
  );
}

// Estilos
const containerStyle = {
  minHeight: "100vh",
  background:
    "linear-gradient(to bottom, #87CEEB 0%, #4682B4 30%, #1E90FF 70%, #0077BE 100%)",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Georgia", serif',
  color: "#fff",
};

const rippleStyle = {
  position: "absolute",
  width: "20px",
  height: "20px",
  border: "2px solid rgba(255, 255, 255, 0.8)",
  borderRadius: "50%",
  animation: "ripple 2s ease-out forwards",
  pointerEvents: "none",
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
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
};

const catNameTag = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#1E90FF",
  padding: "4px 8px",
  borderRadius: "10px",
  fontSize: "10px",
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

const instructionsContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "600px",
  textAlign: "center",
  color: "#2C3E50",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
};

const titleStyle = {
  fontSize: "2.2rem",
  color: "#1E90FF",
  marginBottom: "25px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
};

const storyContainer = {
  backgroundColor: "rgba(30, 144, 255, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #1E90FF",
};

const storyText = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#34495E",
  margin: 0,
};

const instructionsList = {
  marginBottom: "30px",
};

const instructionsTitle = {
  color: "#1E90FF",
  marginBottom: "15px",
};

const instruction = {
  backgroundColor: "rgba(52, 152, 219, 0.2)",
  padding: "10px 15px",
  margin: "8px 0",
  borderRadius: "10px",
  textAlign: "left",
  border: "1px solid #3498DB",
};

const startFishingButton = {
  padding: "18px 35px",
  fontSize: "1.3rem",
  backgroundColor: "#1E90FF",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 8px 20px rgba(30, 144, 255, 0.4)",
};

const fishingGameContainer = {
  width: "100%",
  maxWidth: "800px",
};

const gameHeader = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "20px",
  textAlign: "center",
};

const gameTitle = {
  color: "#87CEEB",
  marginBottom: "10px",
};

const gameStats = {
  display: "flex",
  justifyContent: "space-around",
  color: "#B0E0E6",
};

const lakeArea = {
  position: "relative",
  width: "100%",
  height: "400px",
  backgroundColor: "rgba(30, 144, 255, 0.3)",
  borderRadius: "20px",
  border: "3px solid #1E90FF",
  marginBottom: "20px",
  overflow: "hidden",
};

const fishStyle = {
  position: "absolute",
  fontSize: "2rem",
  animation: "fishSwim 3s ease-in-out infinite",
  cursor: "pointer",
  transition: "all 0.3s ease",
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
};

const fishingLine = {
  position: "absolute",
  left: "50%",
  top: "0",
  width: "2px",
  height: "60%",
  backgroundColor: "#8B4513",
  transform: "translateX(-50%)",
};

const fishingHook = {
  position: "absolute",
  bottom: "-20px",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "1.5rem",
  animation: "hookDrop 0.5s ease-out",
};

const fishingSpot = {
  position: "absolute",
  left: "40%",
  top: "55%",
  width: "20%",
  height: "10%",
  border: "2px dashed #FFD700",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#FFD700",
  fontSize: "12px",
  fontWeight: "bold",
  opacity: 0.7,
};

const fishingButton = {
  display: "block",
  margin: "0 auto 30px",
  padding: "15px 30px",
  fontSize: "1.2rem",
  backgroundColor: "#FF6B6B",
  color: "#fff",
  border: "none",
  borderRadius: "20px",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 6px 15px rgba(255, 107, 107, 0.4)",
};

const caughtFishContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  borderRadius: "15px",
  padding: "20px",
};

const caughtTitle = {
  color: "#FFD700",
  textAlign: "center",
  marginBottom: "15px",
};

const caughtFishList = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "15px",
};

const caughtFishCard = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "15px",
  textAlign: "center",
  border: "2px solid #4ECDC4",
};

const caughtFishEmoji = {
  fontSize: "2rem",
  marginBottom: "8px",
};

const caughtFishName = {
  fontWeight: "bold",
  marginBottom: "5px",
  color: "#4ECDC4",
};

const caughtFishMemory = {
  fontSize: "0.9rem",
  fontStyle: "italic",
  color: "#B0E0E6",
};

const completionContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "700px",
  textAlign: "center",
  color: "#2C3E50",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
};

const completionTitle = {
  fontSize: "2.5rem",
  color: "#27AE60",
  marginBottom: "25px",
};

const completionMessage = {
  marginBottom: "30px",
};

const completionText = {
  fontSize: "1.2rem",
  lineHeight: "1.6",
  color: "#34495E",
};

const allCaughtFish = {
  marginBottom: "30px",
};

const treasuresTitle = {
  color: "#F39C12",
  marginBottom: "20px",
};

const treasuresGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "15px",
  marginBottom: "25px",
};

const treasureCard = {
  backgroundColor: "#FFF8DC",
  borderRadius: "15px",
  padding: "15px",
  border: "3px solid #FFD700",
  animation: "treasureGlow 3s ease-in-out infinite",
};

const treasureEmoji = {
  fontSize: "2.5rem",
  marginBottom: "8px",
};

const treasureName = {
  fontWeight: "bold",
  fontSize: "0.9rem",
  marginBottom: "5px",
  color: "#8B4513",
};

const treasureRarity = {
  fontSize: "0.8rem",
  color: "#DAA520",
  textTransform: "uppercase",
  fontWeight: "bold",
};

const fishingReward = {
  backgroundColor: "rgba(255, 215, 0, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "30px",
  border: "2px solid #FFD700",
};

const rewardTitle = {
  color: "#B8860B",
  marginBottom: "15px",
};

const rewardItem = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "8px 15px",
  margin: "5px 0",
  borderRadius: "10px",
  color: "#8B4513",
  fontWeight: "bold",
};

const continueButton = {
  padding: "18px 35px",
  fontSize: "1.3rem",
  backgroundColor: "#3498DB",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 12px 25px rgba(52, 152, 219, 0.5)",
};
