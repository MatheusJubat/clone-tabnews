// pages/aventura/fase-games.js - Fase dos Games (Fallout/Far Cry)
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function FaseGames() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [argumentos, setArgumentos] = useState([]);
  const [resistenciaMatheus, setResistenciaMatheus] = useState(100);
  const [millenaTentativas, setMillenaTentativas] = useState(0);
  const [gameEscolhido, setGameEscolhido] = useState("");
  const [mateusConvencido, setMateusConvencido] = useState(false);

  const argumentosDisponiveis = [
    {
      id: 1,
      texto: "🏝️ Far Cry tem paisagens lindas pra explorar juntos!",
      efetividade: 15,
      reacao: "Matheus: 'Mas... mas... eu to jogando outras coisas...' 😅",
      emoji: "🌴",
    },
    {
      id: 2,
      texto: "💥 Você pode explodir tudo! Que homem não gosta disso?",
      efetividade: 25,
      reacao: "Matheus: 'Hmm... explosões são legais mesmo...' 🤔",
      emoji: "💣",
    },
    {
      id: 3,
      texto: "🐱 Se você jogar, eu te faço um cafézinho gostoso!",
      efetividade: 35,
      reacao: "Matheus: 'Café? Agora você falou minha língua!' ☕",
      emoji: "☕",
    },
    {
      id: 4,
      texto: "😘 Eu te dou beijinhos a cada missão completada!",
      efetividade: 40,
      reacao: "Matheus: 'Isso é... isso é chantagem emocional!' 😳💕",
      emoji: "💋",
    },
    {
      id: 5,
      texto: "🎮 Podemos jogar co-op! Eu te protejo dos bandidos!",
      efetividade: 30,
      reacao: "Matheus: 'Você me protegendo? Interessante...' 😏",
      emoji: "🛡️",
    },
    {
      id: 6,
      texto: "😤 SE VOCÊ NÃO JOGAR EU VOU FICAR BRAVA SON!",
      efetividade: 50,
      reacao: "Matheus: 'CALMA! NÃO PRECISA GRITAR!' 😱",
      emoji: "😡",
    },
  ];

  useEffect(() => {
    // Introdução
    setTimeout(() => setEtapaAtual(1), 1000);
  }, []);

  const usarArgumento = (argumento) => {
    if (argumentos.includes(argumento.id)) return;

    setArgumentos([...argumentos, argumento.id]);
    setMillenaTentativas(millenaTentativas + 1);
    setResistenciaMatheus(
      Math.max(0, resistenciaMatheus - argumento.efetividade),
    );

    // Se resistência chegou a zero, Matheus foi convencido
    if (resistenciaMatheus - argumento.efetividade <= 0) {
      setTimeout(() => {
        setMateusConvencido(true);
        setEtapaAtual(3);
      }, 2000);
    }
  };

  const escolherGame = (game) => {
    setGameEscolhido(game);
    setTimeout(() => {
      setEtapaAtual(4);
    }, 2000);
  };

  const avancar = () => {
    router.push("/aventura/fase3");
  };

  return (
    <div style={containerStyle}>
      {/* Background de guerra/aventura */}
      <div style={gameBackground}>
        <div style={backgroundElement1}>🏝️</div>
        <div style={backgroundElement2}>🔫</div>
        <div style={backgroundElement3}>💥</div>
        <div style={backgroundElement4}>🗻</div>
      </div>

      <div style={contentContainer}>
        {/* Etapa 0 - Loading */}
        {etapaAtual === 0 && (
          <div style={loadingContainer}>
            <div style={gameLoading}>🎮</div>
            <p style={loadingText}>Carregando arsenal de argumentos...</p>
          </div>
        )}

        {/* Etapa 1 - Introdução */}
        {etapaAtual === 1 && (
          <div style={introContainer}>
            <h1 style={titleStyle}>🎮 A GRANDE MISSÃO 🎮</h1>
            <h2 style={subtitleStyle}>
              "Operação: Convencer o Matheus a Jogar"
            </h2>

            <div style={charactersContainer}>
              <div style={millenaSide}>
                <div style={millenaAvatar}>👩‍🎮</div>
                <div style={millenaSpeech}>
                  "Matheus! Você PRECISA jogar Far Cry comigo! É o jogo mais
                  incrível do mundo son!"
                </div>
                <div style={millenaStats}>
                  <div>Determinação: 💯%</div>
                  <div>Argumentos: ♾️</div>
                </div>
              </div>

              <div style={vs}>⚔️ VS ⚔️</div>

              <div style={matheusSide}>
                <div style={matheusAvatar}>👨‍💻</div>
                <div style={matheusSpeech}>
                  "Não sei... to meio ocupado com outros jogos... talvez mais
                  tarde..." 😅
                </div>
                <div style={matheusStats}>
                  <div>Resistência: {resistenciaMatheus}%</div>
                  <div>Excusas: 📚</div>
                </div>
              </div>
            </div>

            <button onClick={() => setEtapaAtual(2)} style={startMissionButton}>
              🚀 Iniciar Operação Convencimento 🚀
            </button>
          </div>
        )}

        {/* Etapa 2 - Fase de Convencimento */}
        {etapaAtual === 2 && (
          <div style={missionContainer}>
            <h2 style={missionTitle}>
              🎯 MISSÃO: Reduzir resistência do Matheus para 0%
            </h2>

            <div style={statsContainer}>
              <div style={statCard}>
                <div style={statLabel}>Resistência do Matheus:</div>
                <div style={resistanceBar}>
                  <div
                    style={{
                      ...resistanceFill,
                      width: `${resistenciaMatheus}%`,
                      backgroundColor:
                        resistenciaMatheus > 50
                          ? "#e74c3c"
                          : resistenciaMatheus > 20
                            ? "#f39c12"
                            : "#27ae60",
                    }}
                  ></div>
                </div>
                <div style={statValue}>{resistenciaMatheus}%</div>
              </div>

              <div style={statCard}>
                <div style={statLabel}>Tentativas da Millena:</div>
                <div style={statValue}>{millenaTentativas}</div>
              </div>
            </div>

            <div style={argumentsGrid}>
              <h3 style={argumentsTitle}>🎯 Escolha seu argumento:</h3>
              {argumentosDisponiveis.map((argumento) => (
                <button
                  key={argumento.id}
                  onClick={() => usarArgumento(argumento)}
                  disabled={argumentos.includes(argumento.id)}
                  style={{
                    ...argumentButton,
                    opacity: argumentos.includes(argumento.id) ? 0.5 : 1,
                    cursor: argumentos.includes(argumento.id)
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  <div style={argumentEmoji}>{argumento.emoji}</div>
                  <div style={argumentText}>{argumento.texto}</div>
                  <div style={argumentPower}>
                    Poder: {argumento.efetividade}
                  </div>
                  {argumentos.includes(argumento.id) && (
                    <div style={argumentUsed}>✅ USADO</div>
                  )}
                </button>
              ))}
            </div>

            {/* Mostrar última reação */}
            {argumentos.length > 0 && (
              <div style={reactionContainer}>
                <div style={reactionBubble}>
                  {
                    argumentosDisponiveis.find(
                      (arg) => arg.id === argumentos[argumentos.length - 1],
                    )?.reacao
                  }
                </div>
              </div>
            )}

            {/* Dicas do jogo */}
            <div style={tipsContainer}>
              <h4 style={tipsTitle}>💡 Dicas de Sobrevivência:</h4>
              <div style={tip}>• Argumentos emocionais são mais efetivos</div>
              <div style={tip}>• Combos de café + carinho = CRÍTICO!</div>
              <div style={tip}>
                • Se nada funcionar, use a tática "brava son"
              </div>
            </div>
          </div>
        )}

        {/* Etapa 3 - Matheus Convencido */}
        {etapaAtual === 3 && (
          <div style={victoryContainer}>
            <h1 style={victoryTitle}>🎉 MISSÃO CUMPRIDA! 🎉</h1>

            <div style={convencidoContainer}>
              <div style={matheusDefeated}>👨‍💻💔</div>
              <div style={defeatSpeech}>
                "Tá bom, tá bom! Você ganhou! Eu vou jogar Far Cry com você! Mas
                só porque você é muito convincente... e linda... e faz café
                gostoso..." 😍
              </div>
            </div>

            <div style={millenaVictory}>
              <div style={millenaChampion}>👩‍🎮🏆</div>
              <div style={victorySpeech}>
                "EU SABIA! Mais uma vitória para o time da Millena! Agora vamos
                dominar o Far Cry juntos son!" 🎮💕
              </div>
            </div>

            <div style={gameSelection}>
              <h3 style={selectionTitle}>
                🎮 Escolha o primeiro jogo da jornada:
              </h3>
              <div style={gamesContainer}>
                <button
                  onClick={() => escolherGame("far_cry")}
                  style={gameButton}
                >
                  <div style={gameIcon}>🏝️</div>
                  <div style={gameName}>Far Cry</div>
                  <div style={gameDesc}>Ilhas tropicais e muita ação!</div>
                </button>

                <button
                  onClick={() => escolherGame("fallout")}
                  style={gameButton}
                >
                  <div style={gameIcon}>☢️</div>
                  <div style={gameName}>Fallout 4</div>
                  <div style={gameDesc}>Mundo pós-apocalíptico!</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Etapa 4 - Final */}
        {etapaAtual === 4 && (
          <div style={finalContainer}>
            <h1 style={finalTitle}>🏆 RELACIONAMENTO LEVEL UP! 🏆</h1>

            <div style={gameChosenContainer}>
              <div style={chosenGameIcon}>
                {gameEscolhido === "far_cry" ? "🏝️" : "☢️"}
              </div>
              <h2 style={chosenGameTitle}>
                {gameEscolhido === "far_cry"
                  ? "Far Cry Selecionado!"
                  : "Fallout 4 Selecionado!"}
              </h2>
              <p style={chosenGameText}>
                {gameEscolhido === "far_cry"
                  ? "Preparem-se para explorar ilhas paradisíacas e enfrentar vilões juntos!"
                  : "Hora de explorar o wasteland e construir o futuro lado a lado!"}
              </p>
            </div>

            <div style={coupleGaming}>
              <div style={gamingCouple}>👨‍💻❤️👩‍🎮</div>
              <div style={couplingText}>
                "E assim, Matheus descobriu que jogar com a pessoa amada torna
                qualquer jogo 1000x melhor!" 💕
              </div>
            </div>

            <div style={achievementUnlocked}>
              <h3 style={achievementTitle}>🏅 Achievement Desbloqueado:</h3>
              <div style={achievementCard}>
                <div style={achievementIcon}>🎮💕</div>
                <div style={achievementName}>"Player 2 do Coração"</div>
                <div style={achievementDesc}>
                  Convenceu o namorado a jogar seus jogos favoritos
                </div>
              </div>
            </div>

            <button onClick={avancar} style={nextAdventureButton}>
              🎮 Continuar Co-op da Vida 🎮
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes gameFlash {
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

        @keyframes resistanceDecrease {
          0% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0.8);
          }
        }

        @keyframes millenaPower {
          0%,
          100% {
            transform: scale(1) rotate(-2deg);
          }
          50% {
            transform: scale(1.1) rotate(2deg);
          }
        }

        @keyframes matheusDefeat {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(0.9) rotate(-5deg);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
          75% {
            transform: scale(0.95) rotate(-3deg);
          }
        }

        @keyframes victoryDance {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(-10deg);
          }
          50% {
            transform: translateY(-5px) rotate(10deg);
          }
          75% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Orbitron", "Arial", sans-serif',
  color: "#fff",
};

const gameBackground = {
  position: "absolute",
  width: "100%",
  height: "100%",
  opacity: 0.1,
  pointerEvents: "none",
};

const backgroundElement1 = {
  position: "absolute",
  top: "10%",
  left: "10%",
  fontSize: "4rem",
  animation: "gameFlash 3s ease-in-out infinite",
};

const backgroundElement2 = {
  position: "absolute",
  top: "20%",
  right: "15%",
  fontSize: "3rem",
  animation: "gameFlash 3s ease-in-out infinite 1s",
};

const backgroundElement3 = {
  position: "absolute",
  bottom: "25%",
  left: "20%",
  fontSize: "3.5rem",
  animation: "gameFlash 3s ease-in-out infinite 2s",
};

const backgroundElement4 = {
  position: "absolute",
  bottom: "15%",
  right: "10%",
  fontSize: "4rem",
  animation: "gameFlash 3s ease-in-out infinite 0.5s",
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

const gameLoading = {
  fontSize: "4rem",
  animation: "gameFlash 1.5s ease-in-out infinite",
  marginBottom: "20px",
};

const loadingText = {
  fontSize: "1.2rem",
  opacity: 0.8,
};

const introContainer = {
  backgroundColor: "rgba(44, 62, 80, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "900px",
  border: "4px solid #e74c3c",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "2.5rem",
  color: "#e74c3c",
  marginBottom: "15px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
};

const subtitleStyle = {
  fontSize: "1.3rem",
  color: "#f39c12",
  marginBottom: "30px",
  fontStyle: "italic",
};

const charactersContainer = {
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  gap: "20px",
  alignItems: "center",
  marginBottom: "30px",
};

const millenaSide = {
  textAlign: "center",
};

const millenaAvatar = {
  fontSize: "4rem",
  marginBottom: "15px",
  animation: "millenaPower 2s ease-in-out infinite",
};

const millenaSpeech = {
  backgroundColor: "rgba(231, 76, 60, 0.2)",
  border: "2px solid #e74c3c",
  borderRadius: "15px",
  padding: "15px",
  fontSize: "1rem",
  marginBottom: "15px",
  color: "#ecf0f1",
};

const millenaStats = {
  fontSize: "0.9rem",
  color: "#e74c3c",
};

const vs = {
  fontSize: "2rem",
  color: "#f39c12",
  fontWeight: "bold",
};

const matheusSide = {
  textAlign: "center",
};

const matheusAvatar = {
  fontSize: "4rem",
  marginBottom: "15px",
};

const matheusSpeech = {
  backgroundColor: "rgba(52, 152, 219, 0.2)",
  border: "2px solid #3498db",
  borderRadius: "15px",
  padding: "15px",
  fontSize: "1rem",
  marginBottom: "15px",
  color: "#ecf0f1",
};

const matheusStats = {
  fontSize: "0.9rem",
  color: "#3498db",
};

const startMissionButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  backgroundColor: "#27ae60",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  textTransform: "uppercase",
  fontFamily: "inherit",
};

const missionContainer = {
  backgroundColor: "rgba(44, 62, 80, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "1000px",
  border: "4px solid #f39c12",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
};

const missionTitle = {
  color: "#f39c12",
  fontSize: "1.8rem",
  textAlign: "center",
  marginBottom: "25px",
};

const statsContainer = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
  marginBottom: "30px",
};

const statCard = {
  backgroundColor: "rgba(52, 73, 94, 0.8)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #34495e",
};

const statLabel = {
  fontSize: "1rem",
  marginBottom: "10px",
  color: "#bdc3c7",
};

const resistanceBar = {
  width: "100%",
  height: "20px",
  backgroundColor: "rgba(127, 140, 141, 0.3)",
  borderRadius: "10px",
  overflow: "hidden",
  marginBottom: "10px",
};

const resistanceFill = {
  height: "100%",
  borderRadius: "10px",
  transition: "all 0.5s ease",
};

const statValue = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#ecf0f1",
  textAlign: "center",
};

const argumentsGrid = {
  marginBottom: "30px",
};

const argumentsTitle = {
  color: "#e74c3c",
  fontSize: "1.3rem",
  marginBottom: "20px",
  textAlign: "center",
};

const argumentButton = {
  display: "block",
  width: "100%",
  backgroundColor: "rgba(231, 76, 60, 0.8)",
  border: "2px solid #e74c3c",
  borderRadius: "15px",
  padding: "15px 20px",
  margin: "10px 0",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textAlign: "left",
  color: "#fff",
  fontFamily: "inherit",
};

const argumentEmoji = {
  fontSize: "1.5rem",
  marginRight: "10px",
  display: "inline-block",
};

const argumentText = {
  fontSize: "1rem",
  fontWeight: "bold",
  marginBottom: "5px",
};

const argumentPower = {
  fontSize: "0.8rem",
  color: "#f39c12",
  fontWeight: "bold",
};

const argumentUsed = {
  color: "#27ae60",
  fontSize: "0.9rem",
  fontWeight: "bold",
  marginTop: "5px",
};

const reactionContainer = {
  textAlign: "center",
  marginBottom: "20px",
};

const reactionBubble = {
  backgroundColor: "rgba(52, 152, 219, 0.8)",
  border: "2px solid #3498db",
  borderRadius: "20px",
  padding: "15px 25px",
  display: "inline-block",
  fontSize: "1rem",
  fontStyle: "italic",
  color: "#ecf0f1",
};

const tipsContainer = {
  backgroundColor: "rgba(39, 174, 96, 0.2)",
  border: "2px solid #27ae60",
  borderRadius: "15px",
  padding: "20px",
};

const tipsTitle = {
  color: "#27ae60",
  fontSize: "1.1rem",
  marginBottom: "10px",
};

const tip = {
  color: "#ecf0f1",
  fontSize: "0.9rem",
  marginBottom: "5px",
};

const victoryContainer = {
  backgroundColor: "rgba(39, 174, 96, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  border: "4px solid #27ae60",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
  textAlign: "center",
};

const victoryTitle = {
  fontSize: "2.5rem",
  color: "#fff",
  marginBottom: "25px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
};

const convencidoContainer = {
  backgroundColor: "rgba(231, 76, 60, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #e74c3c",
};

const matheusDefeated = {
  fontSize: "3rem",
  marginBottom: "15px",
  animation: "matheusDefeat 2s ease-in-out infinite",
};

const defeatSpeech = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  color: "#ecf0f1",
};

const millenaVictory = {
  backgroundColor: "rgba(243, 156, 18, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #f39c12",
};

const millenaChampion = {
  fontSize: "3rem",
  marginBottom: "15px",
  animation: "victoryDance 2s ease-in-out infinite",
};

const victorySpeech = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  color: "#ecf0f1",
  fontWeight: "bold",
};

const gameSelection = {
  backgroundColor: "rgba(52, 73, 94, 0.8)",
  borderRadius: "15px",
  padding: "25px",
  border: "2px solid #34495e",
};

const selectionTitle = {
  color: "#ecf0f1",
  fontSize: "1.3rem",
  marginBottom: "20px",
};

const gamesContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const gameButton = {
  backgroundColor: "rgba(52, 152, 219, 0.8)",
  border: "2px solid #3498db",
  borderRadius: "15px",
  padding: "20px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  color: "#fff",
  textAlign: "center",
  fontFamily: "inherit",
};

const gameIcon = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const gameName = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: "8px",
};

const gameDesc = {
  fontSize: "0.9rem",
  opacity: 0.8,
};

const finalContainer = {
  backgroundColor: "rgba(142, 68, 173, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  border: "4px solid #9b59b6",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
  textAlign: "center",
};

const finalTitle = {
  fontSize: "2.5rem",
  color: "#fff",
  marginBottom: "25px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
};

const gameChosenContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #ecf0f1",
};

const chosenGameIcon = {
  fontSize: "4rem",
  marginBottom: "15px",
};

const chosenGameTitle = {
  fontSize: "1.8rem",
  color: "#ecf0f1",
  marginBottom: "15px",
};

const chosenGameText = {
  fontSize: "1.1rem",
  color: "#bdc3c7",
  lineHeight: "1.5",
};

const coupleGaming = {
  backgroundColor: "rgba(231, 76, 60, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #e74c3c",
};

const gamingCouple = {
  fontSize: "3rem",
  marginBottom: "15px",
  animation: "victoryDance 3s ease-in-out infinite",
};

const couplingText = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  color: "#ecf0f1",
};

const achievementUnlocked = {
  backgroundColor: "rgba(241, 196, 15, 0.2)",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #f1c40f",
};

const achievementTitle = {
  color: "#f1c40f",
  fontSize: "1.3rem",
  marginBottom: "15px",
};

const achievementCard = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "15px",
  border: "2px solid #f1c40f",
};

const achievementIcon = {
  fontSize: "2.5rem",
  marginBottom: "10px",
};

const achievementName = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#f1c40f",
  marginBottom: "8px",
};

const achievementDesc = {
  fontSize: "0.9rem",
  color: "#bdc3c7",
};

const nextAdventureButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  backgroundColor: "#8e44ad",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  textTransform: "uppercase",
  fontFamily: "inherit",
};
