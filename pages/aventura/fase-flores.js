// pages/aventura/fase-flores.js - Fase do Jardim das Flores
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function FaseFlores() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [flores, setFlores] = useState([]);
  const [borboletas, setBorboletas] = useState([]);
  const [millenaAsustada, setMillenaAsustada] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [floresColetadas, setFloresColetadas] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [susto, setSusto] = useState(false);

  const tiposFlores = [
    { emoji: "🌹", nome: "Rosa", pontos: 10, cor: "#ff6b9d" },
    { emoji: "🌻", nome: "Girassol", pontos: 15, cor: "#ffd93d" },
    { emoji: "🌺", nome: "Hibisco", pontos: 12, cor: "#ff69b4" },
    { emoji: "🌷", nome: "Tulipa", pontos: 18, cor: "#ff1493" },
    { emoji: "🌸", nome: "Sakura", pontos: 20, cor: "#ffb6c1" },
  ];

  useEffect(() => {
    // Introdução
    setTimeout(() => setEtapaAtual(1), 1000);
  }, []);

  const iniciarJogo = () => {
    setEtapaAtual(2);
    gerarFlores();
  };

  const gerarFlores = () => {
    const novasFlores = [];
    for (let i = 0; i < 8; i++) {
      const tipoAleatorio =
        tiposFlores[Math.floor(Math.random() * tiposFlores.length)];
      novasFlores.push({
        id: i,
        ...tipoAleatorio,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        coletada: false,
      });
    }
    setFlores(novasFlores);
  };

  const coletarFlor = (florId) => {
    const florColetada = flores.find((f) => f.id === florId);
    if (florColetada && !florColetada.coletada) {
      setFlores(
        flores.map((f) => (f.id === florId ? { ...f, coletada: true } : f)),
      );
      setPontos(pontos + florColetada.pontos);
      setFloresColetadas(floresColetadas + 1);

      // A cada 3 flores coletadas, surge uma borboleta
      if ((floresColetadas + 1) % 3 === 0) {
        aparecerBorboleta();
      }

      // Verificar vitória
      if (floresColetadas + 1 >= 6) {
        setTimeout(() => {
          setEtapaAtual(3); // Fase final
        }, 1000);
      }
    }
  };

  const aparecerBorboleta = () => {
    const novaBorboleta = {
      id: Date.now(),
      x: Math.random() * 70 + 15,
      y: Math.random() * 50 + 25,
    };

    setBorboletas((prev) => [...prev, novaBorboleta]);
    setMillenaAsustada(true);
    setSusto(true);

    // Remover borboleta após 3 segundos
    setTimeout(() => {
      setBorboletas((prev) => prev.filter((b) => b.id !== novaBorboleta.id));
      setMillenaAsustada(false);
      setSusto(false);
    }, 3000);
  };

  const avancar = () => {
    router.push("/aventura/fase5");
  };

  return (
    <div style={containerStyle}>
      {/* Background do jardim */}
      <div style={gardenBackground}>
        {/* Grama */}
        <div style={grass}>🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱</div>

        {/* Árvores */}
        <div style={tree1}>🌳</div>
        <div style={tree2}>🌲</div>

        {/* Sol */}
        <div style={sun}>☀️</div>
      </div>

      <div style={contentContainer}>
        {/* Etapa 0 - Loading */}
        {etapaAtual === 0 && (
          <div style={loadingContainer}>
            <div style={flowerLoading}>🌸</div>
            <p style={loadingText}>Plantando flores no jardim...</p>
          </div>
        )}

        {/* Etapa 1 - Introdução */}
        {etapaAtual === 1 && (
          <div style={introContainer}>
            <h1 style={titleStyle}>🌺 Jardim Encantado das Flores 🌺</h1>

            <div style={storyContainer}>
              <p style={storyText}>
                Bem-vinda ao mais lindo jardim do mundo! ✨
                <br />
                Aqui você precisa coletar flores especiais para criar um buquê
                mágico...
                <br />
                Mas cuidado! Algumas flores podem atrair... 👀
              </p>
            </div>

            <div style={millenaIntro}>
              <div style={millenaAvatar}>👩‍🌾🌸</div>
              <div style={millenaSpeech}>
                "Que jardim lindo! Vou coletar as flores mais bonitas! Espero
                que não tenha... você-sabe-o-quê... 😰"
              </div>
            </div>

            <div style={instructionsContainer}>
              <h3 style={instructionsTitle}>📋 Como Jogar:</h3>
              <div style={instruction}>
                🌸 Clique nas flores para coletá-las
              </div>
              <div style={instruction}>🎯 Colete 6 flores para ganhar</div>
              <div style={instruction}>
                ⚠️ Cuidado com as "visitantes" inesperadas...
              </div>
              <div style={instruction}>💪 Seja corajosa como a Millena!</div>
            </div>

            <button onClick={iniciarJogo} style={startButton}>
              🌺 Entrar no Jardim 🌺
            </button>
          </div>
        )}

        {/* Etapa 2 - Jogo */}
        {etapaAtual === 2 && (
          <div style={gameContainer}>
            <div style={gameHeader}>
              <h2 style={gameTitle}>🌻 Coletando Flores 🌻</h2>
              <div style={gameStats}>
                <div>Pontos: {pontos}</div>
                <div>Flores: {floresColetadas}/6</div>
              </div>
            </div>

            {/* Área do jardim */}
            <div style={gardenArea}>
              {/* Flores */}
              {flores.map((flor) => (
                <div
                  key={flor.id}
                  style={{
                    ...flowerStyle,
                    left: `${flor.x}%`,
                    top: `${flor.y}%`,
                    opacity: flor.coletada ? 0.3 : 1,
                    transform: flor.coletada ? "scale(0.5)" : "scale(1)",
                    cursor: flor.coletada ? "default" : "pointer",
                  }}
                  onClick={() => coletarFlor(flor.id)}
                  title={flor.nome}
                >
                  {flor.emoji}
                </div>
              ))}

              {/* Borboletas (terror da Millena!) */}
              {borboletas.map((borboleta) => (
                <div
                  key={borboleta.id}
                  style={{
                    ...butterflyStyle,
                    left: `${borboleta.x}%`,
                    top: `${borboleta.y}%`,
                  }}
                >
                  🦋
                </div>
              ))}

              {/* Millena no jardim */}
              <div
                style={{
                  ...millenaInGarden,
                  animation: millenaAsustada
                    ? "millenaScared 0.5s ease-in-out infinite"
                    : "millenaHappy 3s ease-in-out infinite",
                }}
              >
                {millenaAsustada ? "😱" : "😊"}
              </div>

              {/* Grito de susto */}
              {susto && (
                <div style={screamBubble}>"AAAAHHH! BORBOLETA! 😱💨"</div>
              )}
            </div>

            {/* Progresso */}
            <div style={progressContainer}>
              <div style={progressBar}>
                <div
                  style={{
                    ...progressFill,
                    width: `${(floresColetadas / 6) * 100}%`,
                  }}
                ></div>
              </div>
              <p style={progressText}>
                Continue coletando! {6 - floresColetadas} flores restantes
              </p>
            </div>
          </div>
        )}

        {/* Etapa 3 - Final */}
        {etapaAtual === 3 && (
          <div style={completionContainer}>
            <h1 style={completionTitle}>🏆 Missão Cumprida! 🏆</h1>

            <div style={congratsMessage}>
              <p style={congratsText}>
                Parabéns! Você coletou todas as flores! 🌸✨
                <br />
                A Millena superou seu medo das borboletas...
                <br />
                Bom, pelo menos um pouquinho! 😂
              </p>
            </div>

            <div style={bouquetContainer}>
              <h3 style={bouquetTitle}>💐 Seu Buquê Mágico:</h3>
              <div style={bouquetDisplay}>
                {tiposFlores.map((flor, index) => (
                  <div key={index} style={bouquetFlower}>
                    <div style={flowerEmoji}>{flor.emoji}</div>
                    <div style={flowerName}>{flor.nome}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={funnyStats}>
              <h4 style={statsTitle}>📊 Estatísticas Divertidas:</h4>
              <div style={statItem}>
                🦋 Borboletas enfrentadas: {Math.floor(floresColetadas / 3)}
              </div>
              <div style={statItem}>
                😱 Gritos de susto: {Math.floor(floresColetadas / 3) * 3}
              </div>
              <div style={statItem}>💪 Nível de coragem: HEROÍNA!</div>
              <div style={statItem}>🏆 Troféu: Domadora de Borboletas</div>
            </div>

            <div style={millenaVictory}>
              <div style={victoryMillena}>👩‍🌾🏆</div>
              <div style={victoryText}>
                "Eu consegui! Nem as borboletas conseguem me parar!
                <br />
                Bem... ainda tenho um poquinho de medo... mas consegui! 😅"
              </div>
            </div>

            <button onClick={avancar} style={nextButton}>
              🌈 Próxima Aventura Floral 🌈
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes flowerSway {
          0%,
          100% {
            transform: rotate(-5deg) scale(1);
          }
          50% {
            transform: rotate(5deg) scale(1.1);
          }
        }

        @keyframes butterflyFly {
          0%,
          100% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateX(20px) translateY(-10px) rotate(90deg);
          }
          50% {
            transform: translateX(-15px) translateY(-20px) rotate(180deg);
          }
          75% {
            transform: translateX(10px) translateY(-5px) rotate(270deg);
          }
        }

        @keyframes millenaHappy {
          0%,
          100% {
            transform: scale(1) rotate(-2deg);
          }
          50% {
            transform: scale(1.1) rotate(2deg);
          }
        }

        @keyframes millenaScared {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(0.8) rotate(-10deg);
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          75% {
            transform: scale(0.9) rotate(-5deg);
          }
        }

        @keyframes screamShake {
          0%,
          100% {
            transform: translateX(0px);
          }
          25% {
            transform: translateX(-10px) rotate(-5deg);
          }
          50% {
            transform: translateX(10px) rotate(5deg);
          }
          75% {
            transform: translateX(-5px) rotate(-2deg);
          }
        }

        @keyframes sunShine {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background:
    "linear-gradient(to bottom, #87CEEB 0%, #98FB98 30%, #90EE90 70%, #228B22 100%)",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Bubblegum Sans", cursive',
  color: "#2F4F4F",
};

const gardenBackground = {
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: 0,
};

const grass = {
  position: "absolute",
  bottom: "0",
  width: "100%",
  fontSize: "2rem",
  opacity: 0.6,
  letterSpacing: "1rem",
};

const tree1 = {
  position: "absolute",
  top: "15%",
  left: "5%",
  fontSize: "4rem",
  opacity: 0.7,
};

const tree2 = {
  position: "absolute",
  top: "20%",
  right: "8%",
  fontSize: "3.5rem",
  opacity: 0.7,
};

const sun = {
  position: "absolute",
  top: "5%",
  right: "10%",
  fontSize: "3rem",
  animation: "sunShine 6s ease-in-out infinite",
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

const loadingContainer = {
  textAlign: "center",
};

const flowerLoading = {
  fontSize: "4rem",
  animation: "flowerSway 2s ease-in-out infinite",
  marginBottom: "20px",
};

const loadingText = {
  fontSize: "1.2rem",
  color: "#fff",
  opacity: 0.9,
};

const introContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "700px",
  border: "4px solid #ff69b4",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "2.5rem",
  background: "linear-gradient(45deg, #ff69b4, #ff1493, #32cd32)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "25px",
};

const storyContainer = {
  backgroundColor: "rgba(255, 182, 193, 0.3)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #ff69b4",
};

const storyText = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#2F4F4F",
  fontStyle: "italic",
};

const millenaIntro = {
  backgroundColor: "rgba(152, 251, 152, 0.3)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #32cd32",
};

const millenaAvatar = {
  fontSize: "3rem",
  marginBottom: "15px",
};

const millenaSpeech = {
  fontSize: "1rem",
  color: "#2F4F4F",
  fontStyle: "italic",
};

const instructionsContainer = {
  backgroundColor: "#f0f8ff",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #4169e1",
};

const instructionsTitle = {
  color: "#4169e1",
  marginBottom: "15px",
};

const instruction = {
  padding: "8px 15px",
  margin: "5px 0",
  backgroundColor: "rgba(65, 105, 225, 0.1)",
  borderRadius: "10px",
  textAlign: "left",
};

const startButton = {
  padding: "18px 35px",
  fontSize: "1.3rem",
  backgroundColor: "#ff69b4",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 8px 20px rgba(255, 105, 180, 0.4)",
  fontFamily: "inherit",
};

const gameContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "25px",
  padding: "30px",
  maxWidth: "800px",
  width: "100%",
  border: "3px solid #32cd32",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
};

const gameHeader = {
  textAlign: "center",
  marginBottom: "25px",
};

const gameTitle = {
  color: "#228b22",
  fontSize: "2rem",
  marginBottom: "15px",
};

const gameStats = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#ff1493",
};

const gardenArea = {
  position: "relative",
  width: "100%",
  height: "400px",
  backgroundColor: "rgba(144, 238, 144, 0.3)",
  borderRadius: "15px",
  border: "2px solid #228b22",
  marginBottom: "20px",
  overflow: "hidden",
};

const flowerStyle = {
  position: "absolute",
  fontSize: "2.5rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
  animation: "flowerSway 3s ease-in-out infinite",
  zIndex: 2,
};

const butterflyStyle = {
  position: "absolute",
  fontSize: "2rem",
  animation: "butterflyFly 2s ease-in-out infinite",
  zIndex: 3,
};

const millenaInGarden = {
  position: "absolute",
  bottom: "10px",
  left: "10px",
  fontSize: "3rem",
  zIndex: 4,
};

const screamBubble = {
  position: "absolute",
  bottom: "60px",
  left: "10px",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  color: "#ff0000",
  padding: "10px 15px",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: "bold",
  border: "2px solid #ff0000",
  animation: "screamShake 0.5s ease-in-out infinite",
  zIndex: 5,
};

const progressContainer = {
  textAlign: "center",
};

const progressBar = {
  width: "100%",
  height: "20px",
  backgroundColor: "rgba(255, 105, 180, 0.3)",
  borderRadius: "10px",
  overflow: "hidden",
  marginBottom: "10px",
};

const progressFill = {
  height: "100%",
  backgroundColor: "#ff69b4",
  borderRadius: "10px",
  transition: "width 0.5s ease",
};

const progressText = {
  fontSize: "1rem",
  color: "#228b22",
  fontWeight: "bold",
};

const completionContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "700px",
  textAlign: "center",
  border: "4px solid #ffd700",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
};

const completionTitle = {
  fontSize: "2.5rem",
  color: "#ffd700",
  marginBottom: "25px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
};

const congratsMessage = {
  marginBottom: "25px",
};

const congratsText = {
  fontSize: "1.2rem",
  lineHeight: "1.6",
  color: "#2F4F4F",
};

const bouquetContainer = {
  backgroundColor: "#f0f8ff",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #ff69b4",
};

const bouquetTitle = {
  color: "#ff1493",
  marginBottom: "15px",
};

const bouquetDisplay = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  flexWrap: "wrap",
};

const bouquetFlower = {
  textAlign: "center",
};

const flowerEmoji = {
  fontSize: "2rem",
  marginBottom: "5px",
};

const flowerName = {
  fontSize: "0.8rem",
  color: "#666",
};

const funnyStats = {
  backgroundColor: "rgba(255, 218, 185, 0.5)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #ff8c00",
};

const statsTitle = {
  color: "#ff8c00",
  marginBottom: "15px",
};

const statItem = {
  padding: "5px 0",
  fontSize: "1rem",
  color: "#2F4F4F",
};

const millenaVictory = {
  backgroundColor: "rgba(50, 205, 50, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #32cd32",
  textAlign: "center",
};

const victoryMillena = {
  fontSize: "3rem",
  marginBottom: "15px",
  animation: "millenaHappy 2s ease-in-out infinite",
};

const victoryText = {
  fontSize: "1rem",
  color: "#228b22",
  fontStyle: "italic",
  lineHeight: "1.5",
};

const nextButton = {
  padding: "18px 35px",
  fontSize: "1.3rem",
  background: "linear-gradient(45deg, #32cd32, #228b22)",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 12px 25px rgba(50, 205, 50, 0.5)",
  fontFamily: "inherit",
};
