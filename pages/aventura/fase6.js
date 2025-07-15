// pages/aventura/fase6.js - Steven Universe Melhorado
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Fase6StevenUniverseMelhorada() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [gemasColetadas, setGemasColetadas] = useState([]);
  const [musicaAtiva, setMusicaAtiva] = useState(false);
  const [fusionCompleta, setFusionCompleta] = useState(false);
  const [stevenFeliz, setStevenFeliz] = useState(false);
  const [cookieCat, setCookieCat] = useState(false);

  const gemas = [
    {
      nome: "Ametista",
      cor: "#9966CC",
      emoji: "💜",
      personalidade: "Divertida como a Millena quando joga",
      poder: "Shapeshifting do Coração",
      frase: "Ei, vocês são tão legais quanto Cookie Cat!",
    },
    {
      nome: "Pérola",
      cor: "#FFE4E1", 
      emoji: "🤍",
      personalidade: "Organizada como o Matheus tentando ser",
      poder: "Perfeição no Amor",
      frase: "Que relacionamento bem estruturado!",
    },
    {
      nome: "Garnet",
      cor: "#DC143C",
      emoji: "❤️",
      personalidade: "Sábia como vocês dois juntos",
      poder: "Visão do Futuro (spoiler: casamento!)",
      frase: "Eu posso ver... vocês vão ser muito felizes!",
    },
    {
      nome: "Steven",
      cor: "#FF69B4",
      emoji: "🌟",
      personalidade: "Empolgado como vocês com games",
      poder: "Escudo do Amor Protetor",
      frase: "WOW! Esse amor é mais forte que meu escudo!",
    },
  ];

  const perguntas = [
    {
      pergunta: "Se o Steven fosse escolher um jogo pra vocês jogarem juntos, qual seria?",
      opcoes: [
        "🎮 Fallout 4 (a Millena ia adorar son)",
        "🏠 Animal Crossing (fofo demais)",
        "⚔️ Far Cry (que ela quer que você jogue!)",
        "🌟 Todos, desde que seja junto",
      ],
      correta: 3,
      reacao: "Steven aprova! Jogar junto é o que importa! 🎮💕",
    },
    {
      pergunta: "Qual seria a fusão perfeita de vocês dois?",
      opcoes: [
        "👑 Matheus + Millena = Poder Supremo do Amor",
        "🎮 GameCouple (mestres dos controles)",
        "💻 CodeLove (programando o futuro)",
        "😻 CatParents (país de gatos)",
      ],
      correta: 0,
      reacao: "Garnet está orgulhosa! Essa fusão seria ÉPICA! ✨",
    },
  ];

  const [perguntaAtual, setPerguntaAtual] = useState(0);

  useEffect(() => {
    // Sequência de apresentação
    const timeouts = [
      setTimeout(() => setEtapaAtual(1), 1000), // Steven aparece
      setTimeout(() => setStevenFeliz(true), 2000), // Steven fica feliz
      setTimeout(() => setCookieCat(true), 3000), // Cookie Cat aparece
      setTimeout(() => setEtapaAtual(2), 4000), // Começar coleta de gemas
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const coletarGema = (gemaIndex) => {
    const gema = gemas[gemaIndex];
    if (!gemasColetadas.includes(gema.nome)) {
      setGemasColetadas([...gemasColetadas, gema.nome]);
      
      // Ativar música quando coletar primeira gema
      if (gemasColetadas.length === 0) {
        setMusicaAtiva(true);
      }

      // Se coletou todas as gemas, ir para perguntas
      if (gemasColetadas.length === 3) {
        setTimeout(() => {
          setEtapaAtual(3);
        }, 1500);
      }
    }
  };

  const responderPergunta = (opcaoIndex) => {
    const pergunta = perguntas[perguntaAtual];
    const acertou = opcaoIndex === pergunta.correta;

    if (acertou && perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    } else if (acertou) {
      // Fusão completa!
      setFusionCompleta(true);
      setTimeout(() => {
        router.push("/aventura/fase7");
      }, 4000);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Background do templo */}
      <div style={templeBackground}>
        <div style={templeDoor}>🏛️</div>
        <div style={warpPad}>⭐</div>
      </div>

      {/* Cookie Cat flutuando */}
      {cookieCat && (
        <div style={cookieCatContainer}>
          <div style={cookieCatEmoji}>🍪🐱</div>
          <div style={cookieCatSong}>
            ♪ "Cookie Cat, he's a pet for your tummy!" ♪
          </div>
        </div>
      )}

      <div style={contentContainer}>
        {/* Etapa 0 - Loading */}
        {etapaAtual === 0 && (
          <div style={loadingContainer}>
            <div style={stevenLoading}>🌟</div>
            <p style={loadingText}>Steven está preparando o templo...</p>
          </div>
        )}

        {/* Etapa 1 - Steven apresenta */}
        {etapaAtual >= 1 && etapaAtual < 2 && (
          <div style={stevenContainer}>
            <div style={stevenAvatar}>
              <div 
                style={{
                  ...stevenChar,
                  animation: stevenFeliz ? "stevenExcited 2s ease-in-out infinite" : "stevenNormal 3s ease-in-out infinite"
                }}
              >
                👦🌟
              </div>
            </div>

            <div style={stevenSpeech}>
              <h2 style={stevenTitle}>🌟 Oi! Eu sou Steven! 🌟</h2>
              <p style={stevenText}>
                As Crystal Gems me contaram sobre vocês dois e WOW! 
                <br />
                Que história de amor incrível! ✨
                <br />
                Vamos fazer um teste especial para ver se vocês são uma fusão perfeita!
              </p>
              
              {stevenFeliz && (
                <div style={stevenExcitement}>
                  <p style={excitedText}>
                    "Isso vai ser ÉPICO! Tipo quando eu descobri meus poderes!" 🎸⭐
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Etapa 2 - Coleta de Gemas */}
        {etapaAtual === 2 && (
          <div style={gemsContainer}>
            <h1 style={titleStyle}>💎 Templo das Crystal Gems 💎</h1>
            <p style={instructionStyle}>
              Colete 4 gemas para formar a fusão perfeita do amor! ✨
            </p>

            {/* Música indicator */}
            {musicaAtiva && (
              <div style={musicIndicator}>
                <div style={musicNote}>🎵</div>
                <div style={musicText}>♪ "We are the Crystal Gems!" ♪</div>
                <div style={musicNote}>🎶</div>
              </div>
            )}

            <div style={gemsGrid}>
              {gemas.map((gema, index) => (
                <div
                  key={index}
                  style={{
                    ...gemCard,
                    backgroundColor: gema.cor,
                    opacity: gemasColetadas.includes(gema.nome) ? 0.5 : 1,
                    transform: gemasColetadas.includes(gema.nome) ? "scale(0.8)" : "scale(1)",
                  }}
                  onClick={() => coletarGema(index)}
                >
                  <div style={gemEmoji}>{gema.emoji}</div>
                  <h3 style={gemNome}>{gema.nome}</h3>
                  <p style={gemPersonalidade}>{gema.personalidade}</p>
                  <div style={gemPoder}>{gema.poder}</div>
                  
                  {gemasColetadas.includes(gema.nome) && (
                    <div style={gemFrase}>
                      "{gema.frase}"
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={progressContainer}>
              <p style={progressText}>
                Gemas coletadas: {gemasColetadas.length}/4 💎
              </p>
              <div style={progressBar}>
                <div 
                  style={{
                    ...progressFill,
                    width: `${(gemasColetadas.length / 4) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Etapa 3 - Perguntas finais */}
        {etapaAtual === 3 && !fusionCompleta && (
          <div style={questionContainer}>
            <h2 style={questionTitle}>
              🌟 Teste Final das Crystal Gems 🌟
            </h2>

            <div style={questionCard}>
              <p style={questionText}>
                {perguntas[perguntaAtual].pergunta}
              </p>

              <div style={optionsContainer}>
                {perguntas[perguntaAtual].opcoes.map((opcao, index) => (
                  <button
                    key={index}
                    onClick={() => responderPergunta(index)}
                    style={{
                      ...optionButton,
                      backgroundColor: index % 2 === 0 ? "#e74c3c" : "#3498db",
                    }}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </div>

            <div style={gemsCheering}>
              <div style={cheeringGem1}>💜</div>
              <div style={cheeringGem2}>🤍</div>
              <div style={cheeringGem3}>❤️</div>
              <div style={cheeringGem4}>🌟</div>
            </div>
          </div>
        )}

        {/* Etapa 4 - Fusão Completa */}
        {fusionCompleta && (
          <div style={fusionContainer}>
            <h1 style={fusionTitle}>✨💎 FUSÃO COMPLETA! 💎✨</h1>

            <div style={fusionGem}>
              <div style={fusionAvatar}>💑🌟</div>
              <div style={fusionGlow}></div>
            </div>

            <div style={fusionDescription}>
              <h3 style={fusionName}>Matheus + Millena = AMOR INFINITO!</h3>
              <p style={fusionPowers}>
                Poderes da Fusão:
                <br />
                💖 Amor Incondicional
                <br />
                🎮 Sintonia em Games
                <br />
                😂 Risadas Infinitas
                <br />
                🏠 Criação do Lar Perfeito
              </p>
            </div>

            <div style={allGemsApproval}>
              <h3 style={approvalTitle}>💎 As Crystal Gems Aprovam! 💎</h3>
              <div style={gemsReaction}>
                <div style={gemReaction}>
                  <div style={reactionGem}>💜</div>
                  <div style={reactionText}>"Vocês são demais!" - Ametista</div>
                </div>
                <div style={gemReaction}>
                  <div style={reactionGem}>🤍</div>
                  <div style={reactionText}>"Perfeição!" - Pérola</div>
                </div>
                <div style={gemReaction}>
                  <div style={reactionGem}>❤️</div>
                  <div style={reactionText}>"Destinados!" - Garnet</div>
                </div>
                <div style={gemReaction}>
                  <div style={reactionGem}>🌟</div>
                  <div style={reactionText}>"INCRÍVEL!" - Steven</div>
                </div>
              </div>
            </div>

            <div style={stevenFinalMessage}>
              <div style={stevenFinalAvatar}>👦⭐</div>
              <div style={stevenFinalText}>
                "Cara, isso foi MELHOR que Cookie Cat! Vocês são uma fusão perfeita! 
                Agora vamos para a próxima aventura!" 🎸✨
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes stevenNormal {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes stevenExcited {
          0%, 100% {
            transform: scale(1) rotate(-5deg);
          }
          25% {
            transform: scale(1.2) rotate(5deg);
          }
          50% {
            transform: scale(1.1) rotate(-3deg);
          }
          75% {
            transform: scale(1.3) rotate(7deg);
          }
        }

        @keyframes gemGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.6);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 105, 180, 1);
          }
        }

        @keyframes cookieCatFloat {
          0%, 100% {
            transform: translateY(0px) rotate(-5deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes musicNote {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.2);
          }
        }

        @keyframes fusionPower {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            filter: hue-rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            filter: hue-rotate(180deg);
          }
        }

        @keyframes gemCheer {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          25% {
            transform: translateY(-20px) scale(1.3);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
          75% {
            transform: translateY(-15px) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Comic Sans MS", cursive',
  color: "#fff",
};

const templeBackground = {
  position: "absolute",
  top: "10%",
  right: "10%",
  opacity: 0.3,
  fontSize: "4rem",
};

const templeDoor = {
  fontSize: "5rem",
  marginBottom: "20px",
};

const warpPad = {
  fontSize: "3rem",
  animation: "gemGlow 3s ease-in-out infinite",
};

const cookieCatContainer = {
  position: "absolute",
  top: "15%",
  left: "10%",
  textAlign: "center",
  zIndex: 10,
};

const cookieCatEmoji = {
  fontSize: "3rem",
  animation: "cookieCatFloat 4s ease-in-out infinite",
  marginBottom: "10px",
};

const cookieCatSong = {
  backgroundColor: "rgba(255, 192, 203, 0.9)",
  color: "#8B4513",
  padding: "10px 15px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
  border: "2px solid #FF69B4",
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

const stevenLoading = {
  fontSize: "4rem",
  animation: "stevenExcited 2s ease-in-out infinite",
  marginBottom: "20px",
};

const loadingText = {
  fontSize: "1.2rem",
  opacity: 0.8,
};

const stevenContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "700px",
  border: "4px solid #FF69B4",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  color: "#333",
  textAlign: "center",
};

const stevenAvatar = {
  marginBottom: "20px",
};

const stevenChar = {
  fontSize: "4rem",
};

const stevenSpeech = {
  marginBottom: "20px",
};

const stevenTitle = {
  color: "#FF69B4",
  fontSize: "2rem",
  marginBottom: "15px",
};

const stevenText = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  marginBottom: "15px",
};

const stevenExcitement = {
  backgroundColor: "rgba(255, 215, 0, 0.2)",
  borderRadius: "15px",
  padding: "15px",
  border: "2px solid #FFD700",
};

const excitedText = {
  color: "#FF8C00",
  fontWeight: "bold",
  fontStyle: "italic",
  margin: 0,
};

const gemsContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "900px",
  border: "4px solid #9966CC",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  color: "#333",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "2.5rem",
  background: "linear-gradient(45deg, #9966CC, #FF69B4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "15px",
};

const instructionStyle = {
  fontSize: "1.2rem",
  color: "#666",
  marginBottom: "30px",
};

const musicIndicator = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  backgroundColor: "rgba(153, 102, 204, 0.2)",
  borderRadius: "15px",
  padding: "15px",
  marginBottom: "30px",
  border: "2px solid #9966CC",
};

const musicNote = {
  fontSize: "1.5rem",
  animation: "musicNote 2s ease-in-out infinite",
};

const musicText = {
  color: "#9966CC",
  fontWeight: "bold",
  fontStyle: "italic",
};

const gemsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const gemCard = {
  padding: "25px",
  borderRadius: "20px",
  cursor: "pointer",
  transition: "all 0.5s ease",
  border: "3px solid white",
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  animation: "gemGlow 3s ease-in-out infinite",
};

const gemEmoji = {
  fontSize: "3rem",
  marginBottom: "15px",
};

const gemNome = {
  margin: "10px 0",
  fontSize: "1.3rem",
};

const gemPersonalidade = {
  fontSize: "0.9rem",
  opacity: 0.9,
  marginBottom: "10px",
  fontStyle: "italic",
};

const gemPoder = {
  fontSize: "0.8rem",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  padding: "8px 12px",
  borderRadius: "15px",
  marginBottom: "10px",
};

const gemFrase = {
  fontSize: "0.8rem",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  padding: "8px 12px",
  borderRadius: "10px",
  fontStyle: "italic",
  marginTop: "10px",
};

const progressContainer = {
  textAlign: "center",
};

const progressText = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#9966CC",
  marginBottom: "10px",
};

const progressBar = {
  width: "100%",
  height: "12px",
  backgroundColor: "rgba(153, 102, 204, 0.3)",
  borderRadius: "6px",
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  backgroundColor: "#9966CC",
  borderRadius: "6px",
  transition: "width 0.5s ease",
};

const questionContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  border: "4px solid #FF69B4",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  color: "#333",
  textAlign: "center",
};

const questionTitle = {
  color: "#FF69B4",
  fontSize: "2rem",
  marginBottom: "25px",
};

const questionCard = {
  backgroundColor: "#f8f9fa",
  borderRadius: "20px",
  padding: "30px",
  marginBottom: "30px",
  border: "3px solid #9966CC",
};

const questionText = {
  fontSize: "1.3rem",
  color: "#333",
  marginBottom: "25px",
  lineHeight: "1.4",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const optionButton = {
  padding: "18px 25px",
  fontSize: "1.1rem",
  color: "#fff",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  fontFamily: "inherit",
};

const gemsCheering = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  marginTop: "20px",
};

const cheeringGem1 = {
  fontSize: "2.5rem",
  animation: "gemCheer 2s ease-in-out infinite",
};

const cheeringGem2 = {
  fontSize: "2.5rem",
  animation: "gemCheer 2s ease-in-out infinite 0.3s",
};

const cheeringGem3 = {
  fontSize: "2.5rem",
  animation: "gemCheer 2s ease-in-out infinite 0.6s",
};

const cheeringGem4 = {
  fontSize: "2.5rem",
  animation: "gemCheer 2s ease-in-out infinite 0.9s",
};

const fusionContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  border: "4px solid #FFD700",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
  color: "#333",
  textAlign: "center",
};

const fusionTitle = {
  fontSize: "2.5rem",
  background: "linear-gradient(45deg, #FFD700, #FF69B4, #9966CC)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "25px",
};

const fusionGem = {
  position: "relative",
  display: "inline-block",
  marginBottom: "25px",
};

const fusionAvatar = {
  fontSize: "5rem",
  animation: "fusionPower 3s ease-in-out infinite",
};

const fusionGlow = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)",
  animation: "fusionPower 3s ease-in-out infinite",
};

const fusionDescription = {
  marginBottom: "30px",
};

const fusionName = {
  color: "#FFD700",
  fontSize: "1.8rem",
  marginBottom: "15px",
};

const fusionPowers = {
  fontSize: "1.1rem",
  lineHeight: "1.8",
  color: "#666",
};

const allGemsApproval = {
  backgroundColor: "#f8f9fa",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #9966CC",
};

const approvalTitle = {
  color: "#9966CC",
  fontSize: "1.5rem",
  marginBottom: "20px",
};

const gemsReaction = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "15px",
};

const gemReaction = {
  textAlign: "center",
};

const reactionGem = {
  fontSize: "2rem",
  marginBottom: "8px",
};

const reactionText = {
  fontSize: "0.9rem",
  color: "#666",
  fontWeight: "bold",
};

const stevenFinalMessage = {
  backgroundColor: "rgba(255, 105, 180, 0.2)",
  borderRadius: "20px",
  padding: "25px",
  border: "3px solid #FF69B4",
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const stevenFinalAvatar = {
  fontSize: "3rem",
  animation: "stevenExcited 2s ease-in-out infinite",
};

const stevenFinalText = {
  flex: 1,
  color: "#FF1493",
  fontSize: "1.1rem",
  fontWeight: "bold",
  fontStyle: "italic",
  textAlign: "left",
};