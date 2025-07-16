// pages/aventura/fase3.js - Studio Ghibli com Calcifer
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import TransitionComponent from "../../components/TransitionComponent";
import { useTransition, getTransitionMessage } from "../../hooks/useTransition";
import { MusicPlayer, musicPlayerCSS } from "../../hooks/useMusic";
import {
  useEasterEggs,
  EasterEggButton,
  EasterEggMessage,
  SpecialEffects,
  EasterEggCounter,
  easterEggCSS,
} from "../../hooks/useEasterEggs";

export default function Fase3Calcifer() {
  const router = useRouter();
  const { isTransitioning, transitionData, startTransition } = useTransition();
  const {
    findEasterEgg,
    showMessage,
    setShowMessage,
    specialEffects,
    getTotalEggsFound,
  } = useEasterEggs("fase3");

  const [gameState, setGameState] = useState("intro"); // 'intro', 'playing', 'complete'
  const [calciferHealth, setCalciferHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [logs, setLogs] = useState([]);
  const [flames, setFlames] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [gameTime, setGameTime] = useState(60); // 60 segundos

  useEffect(() => {
    // Criar chamas flutuantes de fundo
    const newFlames = [];
    for (let i = 0; i < 15; i++) {
      newFlames.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 3,
      });
    }
    setFlames(newFlames);

    // Criar sparkles
    const newSparkles = [];
    for (let i = 0; i < 25; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ["✨", "🌟", "💫", "⭐"][Math.floor(Math.random() * 4)],
        delay: Math.random() * 4,
      });
    }
    setSparkles(newSparkles);
  }, []);

  // Timer do jogo
  useEffect(() => {
    let timer;
    if (gameState === "playing" && gameTime > 0) {
      timer = setTimeout(() => {
        setGameTime(gameTime - 1);
      }, 1000);
    } else if (gameTime === 0 && gameState === "playing") {
      if (score >= 15) {
        setGameState("complete");
      } else {
        setGameState("failed");
      }
    }
    return () => clearTimeout(timer);
  }, [gameTime, gameState, score]);

  // Gerar logs aleatoriamente
  useEffect(() => {
    if (gameState !== "playing") return;

    const logGenerator = setInterval(() => {
      const newLog = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: 10,
        type: Math.random() < 0.3 ? "golden" : "normal", // 30% chance de log dourado
        falling: true,
      };
      setLogs((prev) => [...prev, newLog]);

      // Remover log após 5 segundos se não for coletado
      setTimeout(() => {
        setLogs((prev) => prev.filter((log) => log.id !== newLog.id));
      }, 5000);
    }, 1500);

    return () => clearInterval(logGenerator);
  }, [gameState]);

  const feedCalcifer = (logId, logType) => {
    setLogs((prev) => prev.filter((log) => log.id !== logId));

    const points = logType === "golden" ? 3 : 1;
    const health = logType === "golden" ? 15 : 5;

    setScore((prev) => prev + points);
    setCalciferHealth((prev) => Math.min(100, prev + health));

    // Criar efeito visual
    createSparkleEffect();
  };

  const createSparkleEffect = () => {
    // Adicionar efeito quando alimenta Calcifer
    findEasterEgg({ x: Math.random() * 100, y: Math.random() * 100 });
  };

  const startGame = () => {
    setGameState("playing");
    setCalciferHealth(100);
    setScore(0);
    setGameTime(60);
    setLogs([]);
  };

  const avancar = async () => {
    const message = getTransitionMessage("fase3", "fase-flores");
    await startTransition("fase3", "fase-flores", message, 1000);
  };

  // Se estiver em transição, mostrar componente de transição
  if (isTransitioning && transitionData) {
    return (
      <TransitionComponent
        fromPhase={transitionData.fromPhase}
        toPhase={transitionData.toPhase}
        message={transitionData.message}
        onComplete={transitionData.onComplete}
      />
    );
  }

  return (
    <div style={containerStyle}>
      <style jsx global>{`
        ${musicPlayerCSS}
        ${easterEggCSS}
        
        @keyframes flameFlicker {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.8;
          }
          25% {
            transform: scale(1.1) rotate(-2deg);
            opacity: 1;
          }
          50% {
            transform: scale(0.9) rotate(2deg);
            opacity: 0.9;
          }
          75% {
            transform: scale(1.05) rotate(-1deg);
            opacity: 0.95;
          }
        }

        @keyframes logFall {
          from {
            transform: translateY(0px) rotate(0deg);
          }
          to {
            transform: translateY(500px) rotate(360deg);
          }
        }

        @keyframes calciferHappy {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes castleFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes sparkleFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>

      {/* Player de Música */}
      <MusicPlayer
        phaseName="fase3"
        position="bottom-right"
        showControls={true}
      />

      {/* Contador de Easter Eggs */}
      <EasterEggCounter currentPhase="fase3" position="top-right" />

      {/* Easter Eggs Escondidos */}
      <EasterEggButton
        position={{ top: "8%", left: "12%" }}
        size={42}
        onFind={findEasterEgg}
      />

      <EasterEggButton
        position={{ bottom: "15%", right: "8%" }}
        size={38}
        onFind={findEasterEgg}
      />

      <EasterEggButton
        position={{ top: "45%", left: "5%" }}
        size={48}
        onFind={findEasterEgg}
      />

      {/* Chamas de fundo */}
      {flames.map((flame) => (
        <div
          key={flame.id}
          style={{
            ...flameStyle,
            left: `${flame.x}%`,
            top: `${flame.y}%`,
            fontSize: `${flame.size}px`,
            animationDelay: `${flame.delay}s`,
          }}
        >
          🔥
        </div>
      ))}

      {/* Sparkles flutuantes */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          style={{
            ...sparkleStyle,
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          {sparkle.emoji}
        </div>
      ))}

      {/* Castelo Flutuante */}
      <div style={castleStyle}>
        <div style={castleEmoji}>🏰</div>
        <div style={castleSmoke}>💨</div>
      </div>

      <div style={contentContainer}>
        {gameState === "intro" && (
          <div style={introContainer}>
            <h1 style={titleStyle}>🔥 O Castelo Andante & Calcifer 🔥</h1>

            <div style={storyContainer}>
              <div style={calciferIntro}>
                <div style={calciferBig}>🔥</div>
                <div style={speechBubble}>
                  "Olá! Sou Calcifer, o demônio do fogo! Preciso da sua ajuda
                  para manter o castelo funcionando. Alimente-me com lenha para
                  que eu possa continuar aquecendo o coração de quem vive
                  aqui... assim como o Matheus aquece o seu! 💕"
                </div>
              </div>

              <div style={howlSophie}>
                <div style={characterContainer}>
                  <div style={howlAvatar}>👨‍🦳</div>
                  <div style={characterName}>Howl</div>
                </div>
                <div style={characterContainer}>
                  <div style={sophieAvatar}>👩‍🦳</div>
                  <div style={characterName}>Sophie</div>
                </div>
              </div>

              <div style={instructionsContainer}>
                <h3 style={instructionsTitle}>Como Jogar:</h3>
                <div style={instruction}>🪵 Clique nos troncos que caem</div>
                <div style={instruction}>
                  🔥 Alimente Calcifer para ganhar pontos
                </div>
                <div style={instruction}>⭐ Troncos dourados valem mais!</div>
                <div style={instruction}>⏰ Você tem 60 segundos</div>
                <div style={instruction}>🎯 Meta: 15 pontos para continuar</div>
              </div>
            </div>

            <button onClick={startGame} style={startGameButton}>
              🔥 Ajudar Calcifer! 🔥
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <div style={gameContainer}>
            <div style={gameHeader}>
              <div style={statsContainer}>
                <div style={statItem}>
                  <div style={statLabel}>Pontos</div>
                  <div style={statValue}>{score}/15</div>
                </div>
                <div style={statItem}>
                  <div style={statLabel}>Saúde Calcifer</div>
                  <div style={statValue}>{calciferHealth}%</div>
                </div>
                <div style={statItem}>
                  <div style={statLabel}>Tempo</div>
                  <div style={statValue}>{gameTime}s</div>
                </div>
              </div>
            </div>

            {/* Área do jogo */}
            <div style={gameArea}>
              {/* Calcifer */}
              <div style={calciferContainer}>
                <div
                  style={{
                    ...calciferMain,
                    animation:
                      calciferHealth > 70
                        ? "calciferHappy 1s ease-in-out infinite"
                        : "none",
                  }}
                  onClick={() => findEasterEgg({ x: 50, y: 80 })}
                >
                  🔥
                </div>
                <div style={calciferBar}>
                  <div
                    style={{
                      ...calciferHealthBar,
                      width: `${calciferHealth}%`,
                      backgroundColor:
                        calciferHealth > 50 ? "#ff6b35" : "#ff4757",
                    }}
                  />
                </div>
                <div style={calciferSpeech}>
                  {calciferHealth > 80
                    ? "Estou forte! 💪"
                    : calciferHealth > 50
                      ? "Mais lenha, por favor! 🪵"
                      : "Estou fraco... 😰"}
                </div>
              </div>

              {/* Logs caindo */}
              {logs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    ...logStyle,
                    left: `${log.x}%`,
                    top: `${log.y}%`,
                    color: log.type === "golden" ? "#ffd700" : "#8b4513",
                    animation: "logFall 4s linear forwards",
                  }}
                  onClick={() => feedCalcifer(log.id, log.type)}
                >
                  {log.type === "golden" ? "🟨🪵" : "🪵"}
                </div>
              ))}
            </div>

            <div style={gameInstructions}>
              💡 Dica: Clique nos troncos antes que caiam!
            </div>
          </div>
        )}

        {gameState === "complete" && (
          <div style={successContainer}>
            <h2 style={successTitle}>🎉 Calcifer está Radiante! 🎉</h2>

            <div style={calciferCelebration}>
              <div style={calciferCelebrating}>🔥✨🔥</div>
              <div style={celebrationSpeech}>
                "Obrigado! Agora o castelo pode continuar voando! Assim como o
                amor de vocês dois pode voar alto! 💕"
              </div>
            </div>

            <div style={completionStats}>
              <div style={statFinal}>Pontos Finais: {score}</div>
              <div style={statFinal}>Saúde Calcifer: {calciferHealth}%</div>
            </div>

            <div style={studioGhibliBlessing}>
              <h3 style={blessingTitle}>✨ Bênção do Studio Ghibli ✨</h3>
              <p style={blessingText}>
                "Que o amor de vocês seja como o Castelo Andante: sempre em
                movimento, sempre mágico, sempre protegendo o que há de mais
                precioso... o coração um do outro! 💖"
              </p>

              <div style={charactersBlessing}>
                <div style={characterBlessing}>
                  <div>👨‍🦳</div>
                  <div>Howl</div>
                </div>
                <div style={characterBlessing}>
                  <div>👩‍🦳</div>
                  <div>Sophie</div>
                </div>
                <div style={characterBlessing}>
                  <div>🔥</div>
                  <div>Calcifer</div>
                </div>
              </div>
            </div>

            <button onClick={avancar} style={continueButton}>
              🌸 Próxima Aventura Mágica 🌸
            </button>
          </div>
        )}

        {gameState === "failed" && (
          <div style={failContainer}>
            <h2 style={failTitle}>😰 Calcifer Está Fraco...</h2>
            <div style={calciferSad}>🔥💔</div>
            <p style={failText}>
              "Preciso de mais lenha para manter o castelo voando! Tente
              novamente!"
            </p>
            <button onClick={startGame} style={retryButton}>
              🔄 Tentar Novamente
            </button>
          </div>
        )}
      </div>

      {/* Mensagem de Easter Egg */}
      <EasterEggMessage
        message={showMessage}
        onClose={() => setShowMessage(null)}
      />

      {/* Efeitos Especiais */}
      <SpecialEffects effects={specialEffects} />
    </div>
  );
}

// Estilos
const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  background:
    "linear-gradient(135deg, #87CEEB 0%, #98FB98 25%, #F0E68C 50%, #DDA0DD 75%, #FFB6C1 100%)",
  color: "#4a4a4a",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Miyazaki", "Comic Sans MS", cursive',
};

const flameStyle = {
  position: "absolute",
  animation: "flameFlicker 2s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
};

const sparkleStyle = {
  position: "absolute",
  fontSize: "16px",
  animation: "sparkleFloat 4s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
};

const castleStyle = {
  position: "absolute",
  top: "10%",
  right: "10%",
  textAlign: "center",
  animation: "castleFloat 6s ease-in-out infinite",
  zIndex: 5,
};

const castleEmoji = {
  fontSize: "4rem",
  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
};

const castleSmoke = {
  fontSize: "1.5rem",
  opacity: 0.7,
  animation: "sparkleFloat 3s ease-in-out infinite",
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

const introContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  textAlign: "center",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
  border: "4px solid #ff6b35",
};

const titleStyle = {
  fontSize: "2.5rem",
  color: "#ff6b35",
  marginBottom: "25px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
};

const storyContainer = {
  marginBottom: "30px",
};

const calciferIntro = {
  backgroundColor: "rgba(255, 107, 53, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #ff6b35",
};

const calciferBig = {
  fontSize: "4rem",
  marginBottom: "15px",
  animation: "flameFlicker 2s ease-in-out infinite",
};

const speechBubble = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#5d4e75",
  fontStyle: "italic",
};

const howlSophie = {
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  marginBottom: "25px",
};

const characterContainer = {
  textAlign: "center",
};

const howlAvatar = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const sophieAvatar = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const characterName = {
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#8b4513",
};

const instructionsContainer = {
  backgroundColor: "rgba(139, 69, 19, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #8b4513",
};

const instructionsTitle = {
  color: "#8b4513",
  marginBottom: "15px",
};

const instruction = {
  padding: "8px 15px",
  margin: "5px 0",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  borderRadius: "10px",
  color: "#5d4e75",
  fontWeight: "bold",
};

const startGameButton = {
  padding: "18px 35px",
  fontSize: "1.3rem",
  backgroundColor: "#ff6b35",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 10px 25px rgba(255, 107, 53, 0.4)",
};

const gameContainer = {
  width: "100%",
  maxWidth: "800px",
  height: "600px",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
  border: "4px solid #ff6b35",
  overflow: "hidden",
  position: "relative",
};

const gameHeader = {
  backgroundColor: "#ff6b35",
  color: "#fff",
  padding: "15px",
};

const statsContainer = {
  display: "flex",
  justifyContent: "space-around",
};

const statItem = {
  textAlign: "center",
};

const statLabel = {
  fontSize: "0.9rem",
  marginBottom: "5px",
};

const statValue = {
  fontSize: "1.2rem",
  fontWeight: "bold",
};

const gameArea = {
  position: "relative",
  height: "450px",
  background: "linear-gradient(180deg, #87CEEB 0%, #98FB98 100%)",
  overflow: "hidden",
};

const calciferContainer = {
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",
};

const calciferMain = {
  fontSize: "4rem",
  cursor: "pointer",
  marginBottom: "10px",
  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
};

const calciferBar = {
  width: "100px",
  height: "10px",
  backgroundColor: "#ddd",
  borderRadius: "5px",
  overflow: "hidden",
  marginBottom: "10px",
};

const calciferHealthBar = {
  height: "100%",
  borderRadius: "5px",
  transition: "width 0.3s ease",
};

const calciferSpeech = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "8px 12px",
  borderRadius: "15px",
  fontSize: "0.9rem",
  fontWeight: "bold",
  color: "#ff6b35",
  border: "2px solid #ff6b35",
};

const logStyle = {
  position: "absolute",
  fontSize: "2rem",
  cursor: "pointer",
  zIndex: 10,
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
  transition: "transform 0.1s ease",
};

const gameInstructions = {
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "0.9rem",
  color: "#8b4513",
  fontStyle: "italic",
  textAlign: "center",
};

const successContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "700px",
  textAlign: "center",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
  border: "4px solid #32CD32",
};

const successTitle = {
  fontSize: "2.2rem",
  color: "#32CD32",
  marginBottom: "25px",
};

const calciferCelebration = {
  marginBottom: "25px",
};

const calciferCelebrating = {
  fontSize: "4rem",
  marginBottom: "15px",
  animation: "calciferHappy 1s ease-in-out infinite",
};

const celebrationSpeech = {
  fontSize: "1.2rem",
  color: "#5d4e75",
  fontStyle: "italic",
  lineHeight: "1.6",
};

const completionStats = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  marginBottom: "25px",
};

const statFinal = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#ff6b35",
};

const studioGhibliBlessing = {
  backgroundColor: "rgba(255, 107, 53, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #ff6b35",
};

const blessingTitle = {
  color: "#ff6b35",
  marginBottom: "15px",
};

const blessingText = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#5d4e75",
  fontStyle: "italic",
  marginBottom: "20px",
};

const charactersBlessing = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
};

const characterBlessing = {
  textAlign: "center",
  fontSize: "2rem",
};

const continueButton = {
  padding: "18px 35px",
  fontSize: "1.3rem",
  backgroundColor: "#32CD32",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 10px 25px rgba(50, 205, 50, 0.4)",
};

const failContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "600px",
  textAlign: "center",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
  border: "4px solid #ff4757",
};

const failTitle = {
  fontSize: "2rem",
  color: "#ff4757",
  marginBottom: "20px",
};

const calciferSad = {
  fontSize: "4rem",
  marginBottom: "15px",
};

const failText = {
  fontSize: "1.1rem",
  color: "#5d4e75",
  marginBottom: "25px",
  fontStyle: "italic",
};

const retryButton = {
  padding: "15px 30px",
  fontSize: "1.1rem",
  backgroundColor: "#ff6b35",
  color: "#fff",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};
