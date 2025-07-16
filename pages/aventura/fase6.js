// pages/aventura/fase6.js - Steven Universe Melhorado com Quiz Divertido
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Fase6StevenUniverseMelhorada() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [gemasColetadas, setGemasColetadas] = useState([]);
  const [stevenFeliz, setStevenFeliz] = useState(false);
  const [fusionCompleta, setFusionCompleta] = useState(false);
  const [animacaoFusao, setAnimacaoFusao] = useState(false);

  const perguntasGemas = [
    {
      pergunta: "Se a Millena fosse uma Gem, qual seria seu poder especial?",
      opcoes: [
        "🎮 Controlar videogames com a mente",
        "😂 Fazer qualquer um rir instantaneamente",
        "🐱 Invocar gatinhos fofinhos",
        "💻 Hackear qualquer sistema (inclusive o coração do Matheus)",
      ],
      correta: 3,
      gema: "Millena-nita",
      cor: "#ff69b4",
      reacao: "Steven: 'UAU! Que poder incrível son!' ⭐",
    },
    {
      pergunta: "E se o Matheus fosse uma Gem, qual seria seu maior defeito?",
      opcoes: [
        "🎮 Procrastinar jogando ao invés de trabalhar",
        "☕ Não funcionar sem café",
        "😴 Roncar durante as missões importantes",
        "📱 Demorar 3 horas pra responder mensagem son",
      ],
      correta: 3,
      gema: "Matheusita",
      cor: "#4ecdc4",
      reacao: "Garnet: 'Vejo o futuro... ele vai melhorar isso!' 🔮",
    },
    {
      pergunta: "Como vocês dois reagiriam se tivessem que salvar Beach City?",
      opcoes: [
        "💪 Millena iria sozinha enquanto Matheus faz café",
        "🤝 Trabalhariam juntos como uma equipe perfeita",
        "😅 Matheus tentaria resolver com programação",
        "🐱 Mandariam os gatinhos resolverem son",
      ],
      correta: 1,
      gema: "Millena + Matheus",
      cor: "#9966cc",
      reacao: "Steven: 'Isso é amor verdadeiro! Como o Cookie Cat!' 🍪",
    },
    {
      pergunta: "Qual seria o nome da fusão de vocês dois?",
      opcoes: [
        "💎 Milletheus (muito formal)",
        "🌟 MateMillena (clássico)",
        "😂 Millão-de-Amor (zoeira)",
        "💕 AmoreDeluxe (estilo JoJo son)",
      ],
      correta: 2,
      gema: "Fusão Completa",
      cor: "#ffd700",
      reacao: "TODAS as Gems: 'KKKKK PERFEITO SON!' 😂💎",
    },
  ];

  useEffect(() => {
    setTimeout(() => setEtapaAtual(1), 1000);
  }, []);

  const responderPergunta = (opcaoIndex) => {
    const pergunta = perguntasGemas[perguntaAtual];
    const acertou = opcaoIndex === pergunta.correta;

    if (acertou) {
      setPontos(pontos + 100);
      setGemasColetadas([...gemasColetadas, pergunta.gema]);
      setStevenFeliz(true);
    } else {
      setPontos(pontos + 50);
    }

    setTimeout(() => {
      if (perguntaAtual < perguntasGemas.length - 1) {
        setPerguntaAtual(perguntaAtual + 1);
        setStevenFeliz(false);
      } else {
        iniciarFusao();
      }
    }, 2500);
  };

  const iniciarFusao = () => {
    setAnimacaoFusao(true);
    setTimeout(() => {
      setFusionCompleta(true);
      setEtapaAtual(3);
    }, 3000);
  };

  const avancar = () => {
    router.push("/aventura/fase7"); // Vai para o arcade 8-bit
  };

  const perguntaAtualObj = perguntasGemas[perguntaAtual] || perguntasGemas[0];

  return (
    <div style={containerStyle}>
      {/* Background do Beach City */}
      <div style={beachCityBackground}>
        <div style={temple}>🏛️</div>
        <div style={donut}>🍩</div>
        <div style={warpPad}>⭐</div>
      </div>

      <div style={contentContainer}>
        {/* Etapa 0 - Loading */}
        {etapaAtual === 0 && (
          <div style={loadingContainer}>
            <div style={stevenLoading}>⭐</div>
            <p style={loadingText}>Steven está preparando as Gems...</p>
          </div>
        )}

        {/* Etapa 1 - Introdução Steven */}
        {etapaAtual === 1 && (
          <div style={introContainer}>
            <h1 style={titleStyle}>⭐ Steven Universe & as Crystal Gems ⭐</h1>

            <div style={stevenIntroContainer}>
              <div style={stevenAvatar}>
                <div style={stevenFace}>👦⭐</div>
                <div style={stevenGlow}></div>
              </div>
              <div style={stevenSpeech}>
                "OI! Eu sou Steven! As Crystal Gems me contaram sobre vocês dois
                e cara... QUE HISTÓRIA DE AMOR INCRÍVEL SON! 🌟
                <br />
                <br />
                Vamos fazer um teste especial para ver se vocês são uma fusão
                perfeita! Tipo... mais perfeita que Cookie Cat! 🍪✨"
              </div>
            </div>

            <div style={gemsIntro}>
              <h3 style={gemsTitle}>💎 Conheçam as Crystal Gems! 💎</h3>
              <div style={gemsContainer}>
                <div style={gemCard}>
                  <div style={gemAvatar}>💜</div>
                  <div style={gemName}>Ametista</div>
                  <div style={gemRole}>
                    "Eles são legais! Como batata frita!"
                  </div>
                </div>
                <div style={gemCard}>
                  <div style={gemAvatar}>🤍</div>
                  <div style={gemName}>Pérola</div>
                  <div style={gemRole}>
                    "Que relacionamento bem organizado!"
                  </div>
                </div>
                <div style={gemCard}>
                  <div style={gemAvatar}>❤️</div>
                  <div style={gemName}>Garnet</div>
                  <div style={gemRole}>
                    "Eu vejo um futuro brilhante juntos."
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => setEtapaAtual(2)} style={startTestButton}>
              💎 Começar Teste de Fusão! 💎
            </button>
          </div>
        )}

        {/* Etapa 2 - Quiz das Gems */}
        {etapaAtual === 2 && (
          <div style={quizContainer}>
            <div style={quizHeader}>
              <h2 style={quizTitle}>💎 Teste das Crystal Gems 💎</h2>
              <div style={progressContainer}>
                <div>
                  Pergunta: {perguntaAtual + 1}/{perguntasGemas.length}
                </div>
                <div>Pontos: {pontos}</div>
                <div>Gemas: {gemasColetadas.length}</div>
              </div>
            </div>

            <div style={questionContainer}>
              <div style={stevenQuizHost}>
                <div style={stevenQuizAvatar}>
                  <div
                    style={{
                      ...stevenQuizFace,
                      animation: stevenFeliz
                        ? "stevenExcited 1s ease-in-out infinite"
                        : "stevenNormal 3s ease-in-out infinite",
                    }}
                  >
                    {stevenFeliz ? "🤩⭐" : "👦⭐"}
                  </div>
                </div>
                <div style={stevenQuizSpeech}>
                  {stevenFeliz
                    ? "ISSO AÍ SON! Vocês são demais! 🌟"
                    : "Vamos ver... essa é importante!"}
                </div>
              </div>

              <div style={questionBox}>
                <h3 style={questionText}>{perguntaAtualObj.pergunta}</h3>

                <div style={optionsContainer}>
                  {perguntaAtualObj.opcoes.map((opcao, index) => (
                    <button
                      key={index}
                      onClick={() => responderPergunta(index)}
                      style={{
                        ...optionButton,
                        backgroundColor:
                          index % 2 === 0 ? "#e74c3c" : "#3498db",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05) rotate(1deg)";
                        e.target.style.boxShadow =
                          "0 10px 20px rgba(0,0,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1) rotate(0deg)";
                        e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
                      }}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reação das Gems */}
              {stevenFeliz && (
                <div style={gemsReactionContainer}>
                  <div style={reactionBubble}>{perguntaAtualObj.reacao}</div>
                  <div style={celebratingGems}>
                    <div style={celebratingGem1}>💜</div>
                    <div style={celebratingGem2}>🤍</div>
                    <div style={celebratingGem3}>❤️</div>
                    <div style={celebratingGem4}>⭐</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Etapa 3 - Fusão Completa */}
        {etapaAtual === 3 && (
          <div style={fusionContainer}>
            {animacaoFusao && !fusionCompleta && (
              <div style={fusionAnimation}>
                <h2 style={fusionTitle}>✨💎 INICIANDO FUSÃO! 💎✨</h2>
                <div style={fusionCircle}>
                  <div style={fusionGem1}>💎</div>
                  <div style={fusionGem2}>💖</div>
                  <div style={fusionGem3}>⭐</div>
                </div>
                <p style={fusionText}>Combinando essências do amor...</p>
              </div>
            )}

            {fusionCompleta && (
              <div style={fusionCompleteContainer}>
                <h1 style={fusionCompleteTitle}>🌟💖 FUSÃO PERFEITA! 💖🌟</h1>

                <div style={fusionResultContainer}>
                  <div style={fusionAvatar}>
                    <div style={fusionCharacter}>👨‍❤️‍👩</div>
                    <div style={fusionAura}></div>
                  </div>
                  <h2 style={fusionName}>✨ MILLÃO-DE-AMOR ✨</h2>
                  <p style={fusionDescription}>
                    A fusão mais fofa e engraçada de Beach City son!
                  </p>
                </div>

                <div style={fusionPowersContainer}>
                  <h3 style={powersTitle}>🌟 Poderes da Fusão:</h3>
                  <div style={powersList}>
                    <div style={powerItem}>
                      💕 Amor Incondicional Level 9000
                    </div>
                    <div style={powerItem}>
                      😂 Risadas Infinitas (sem cooldown)
                    </div>
                    <div style={powerItem}>🎮 Sincronização Gamer Perfeita</div>
                    <div style={powerItem}>🐱 Magnetismo Felino</div>
                    <div style={powerItem}>☕ Produção Ilimitada de Café</div>
                    <div style={powerItem}>💻 Debug de Relacionamento</div>
                  </div>
                </div>

                <div style={gemsApprovalContainer}>
                  <h3 style={approvalTitle}>💎 Aprovação das Crystal Gems:</h3>
                  <div style={approvalGems}>
                    <div style={approvalGem}>
                      <div style={gemEmoji}>💜</div>
                      <div style={gemApproval}>
                        "Vocês são demais! Like, sério!" - Ametista
                      </div>
                    </div>
                    <div style={approvalGem}>
                      <div style={gemEmoji}>🤍</div>
                      <div style={gemApproval}>
                        "Que técnica de fusão impecável!" - Pérola
                      </div>
                    </div>
                    <div style={approvalGem}>
                      <div style={gemEmoji}>❤️</div>
                      <div style={gemApproval}>
                        "Eu vejo casamento no futuro." - Garnet
                      </div>
                    </div>
                  </div>
                </div>

                <div style={stevenFinalContainer}>
                  <div style={stevenFinalAvatar}>👦⭐</div>
                  <div style={stevenFinalText}>
                    "UAU! Isso foi MELHOR que quando descobri que Cookie Cat
                    voltou! Vocês são uma equipe INCRÍVEL son! 🍪⭐
                    <br />
                    <br />
                    Agora vamos para a próxima aventura!"
                  </div>
                </div>

                <button onClick={avancar} style={nextAdventureButton}>
                  🎮 Próxima Fase: Arcade 8-bit! 🎮
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes stevenNormal {
          0%,
          100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }

        @keyframes stevenExcited {
          0%,
          100% {
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

        @keyframes gemFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }

        @keyframes fusionSpin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.5);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes fusionGlow {
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

        @keyframes gemCelebrate {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          25% {
            transform: translateY(-15px) scale(1.2);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
          75% {
            transform: translateY(-20px) scale(1.3);
          }
        }

        @keyframes cookieCat {
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

// Estilos
const containerStyle = {
  minHeight: "100vh",
  background:
    "linear-gradient(135deg, #87CEEB 0%, #98FB98 30%, #FFB6C1 70%, #DDA0DD 100%)",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Comic Sans MS", cursive',
  color: "#fff",
};

const beachCityBackground = {
  position: "absolute",
  width: "100%",
  height: "100%",
  opacity: 0.3,
  pointerEvents: "none",
};

const temple = {
  position: "absolute",
  top: "10%",
  left: "10%",
  fontSize: "4rem",
  animation: "gemFloat 4s ease-in-out infinite",
};

const donut = {
  position: "absolute",
  top: "20%",
  right: "15%",
  fontSize: "3rem",
  animation: "cookieCat 3s ease-in-out infinite",
};

const warpPad = {
  position: "absolute",
  bottom: "20%",
  right: "20%",
  fontSize: "3rem",
  animation: "gemFloat 4s ease-in-out infinite 2s",
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
  opacity: 0.9,
};

const introContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  border: "4px solid #FF69B4",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  color: "#333",
};

const titleStyle = {
  fontSize: "2.5rem",
  background: "linear-gradient(45deg, #FF69B4, #9966CC, #FFB6C1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "25px",
};

const stevenIntroContainer = {
  backgroundColor: "rgba(255, 182, 193, 0.3)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "30px",
  border: "3px solid #FF69B4",
};

const stevenAvatar = {
  position: "relative",
  display: "inline-block",
  marginBottom: "15px",
};

const stevenFace = {
  fontSize: "4rem",
  animation: "stevenNormal 3s ease-in-out infinite",
  position: "relative",
  zIndex: 2,
};

const stevenGlow = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80px",
  height: "80px",
  background:
    "radial-gradient(circle, rgba(255, 105, 180, 0.6) 0%, transparent 70%)",
  borderRadius: "50%",
  animation: "fusionGlow 2s ease-in-out infinite",
};

const stevenSpeech = {
  fontSize: "1.1rem",
  color: "#FF1493",
  lineHeight: "1.6",
  fontWeight: "bold",
};

const gemsIntro = {
  marginBottom: "30px",
};

const gemsTitle = {
  color: "#9966CC",
  fontSize: "1.5rem",
  marginBottom: "20px",
};

const gemsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
};

const gemCard = {
  backgroundColor: "#f8f9fa",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #9966CC",
  textAlign: "center",
};

const gemAvatar = {
  fontSize: "2.5rem",
  marginBottom: "8px",
  animation: "gemFloat 3s ease-in-out infinite",
};

const gemName = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#9966CC",
  marginBottom: "5px",
};

const gemRole = {
  fontSize: "0.9rem",
  color: "#666",
  fontStyle: "italic",
};

const startTestButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  backgroundColor: "#FF69B4",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  fontFamily: "inherit",
};

const quizContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  border: "4px solid #9966CC",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  color: "#333",
};

const quizHeader = {
  textAlign: "center",
  marginBottom: "30px",
};

const quizTitle = {
  color: "#9966CC",
  fontSize: "2rem",
  marginBottom: "15px",
};

const progressContainer = {
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "#f8f9fa",
  padding: "15px",
  borderRadius: "15px",
  border: "2px solid #FF69B4",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#9966CC",
};

const questionContainer = {
  textAlign: "center",
};

const stevenQuizHost = {
  backgroundColor: "rgba(255, 182, 193, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #FF69B4",
};

const stevenQuizAvatar = {
  marginBottom: "10px",
};

const stevenQuizFace = {
  fontSize: "3rem",
};

const stevenQuizSpeech = {
  fontSize: "1rem",
  color: "#FF1493",
  fontWeight: "bold",
  fontStyle: "italic",
};

const questionBox = {
  backgroundColor: "#f8f9fa",
  borderRadius: "20px",
  padding: "25px",
  border: "3px solid #9966CC",
};

const questionText = {
  fontSize: "1.3rem",
  color: "#333",
  marginBottom: "20px",
  lineHeight: "1.4",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginBottom: "20px",
};

const optionButton = {
  padding: "15px 20px",
  fontSize: "1rem",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  fontFamily: "inherit",
  textAlign: "left",
};

const gemsReactionContainer = {
  marginTop: "20px",
  textAlign: "center",
};

const reactionBubble = {
  backgroundColor: "rgba(40, 167, 69, 0.2)",
  border: "2px solid #28a745",
  borderRadius: "15px",
  padding: "15px",
  marginBottom: "15px",
  color: "#28a745",
  fontWeight: "bold",
  fontStyle: "italic",
};

const celebratingGems = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
};

const celebratingGem1 = {
  fontSize: "2rem",
  animation: "gemCelebrate 2s ease-in-out infinite",
};

const celebratingGem2 = {
  fontSize: "2rem",
  animation: "gemCelebrate 2s ease-in-out infinite 0.2s",
};

const celebratingGem3 = {
  fontSize: "2rem",
  animation: "gemCelebrate 2s ease-in-out infinite 0.4s",
};

const celebratingGem4 = {
  fontSize: "2rem",
  animation: "gemCelebrate 2s ease-in-out infinite 0.6s",
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

const fusionAnimation = {
  textAlign: "center",
};

const fusionTitle = {
  fontSize: "2rem",
  color: "#FFD700",
  marginBottom: "25px",
  animation: "gemFloat 2s ease-in-out infinite",
};

const fusionCircle = {
  position: "relative",
  display: "inline-block",
  marginBottom: "20px",
};

const fusionGem1 = {
  fontSize: "3rem",
  animation: "fusionSpin 3s linear infinite",
  position: "absolute",
  left: "-40px",
};

const fusionGem2 = {
  fontSize: "3rem",
  animation: "fusionSpin 3s linear infinite 1s",
  position: "relative",
  zIndex: 2,
};

const fusionGem3 = {
  fontSize: "3rem",
  animation: "fusionSpin 3s linear infinite 2s",
  position: "absolute",
  right: "-40px",
};

const fusionText = {
  fontSize: "1.2rem",
  color: "#9966CC",
  fontStyle: "italic",
};

const fusionCompleteContainer = {
  textAlign: "center",
};

const fusionCompleteTitle = {
  fontSize: "2.5rem",
  background: "linear-gradient(45deg, #FFD700, #FF69B4, #9966CC)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "25px",
  animation: "gemFloat 3s ease-in-out infinite",
};

const fusionResultContainer = {
  backgroundColor: "rgba(255, 215, 0, 0.2)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #FFD700",
};

const fusionAvatar = {
  position: "relative",
  display: "inline-block",
  marginBottom: "15px",
};

const fusionCharacter = {
  fontSize: "4rem",
  animation: "stevenExcited 2s ease-in-out infinite",
  position: "relative",
  zIndex: 2,
};

const fusionAura = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100px",
  height: "100px",
  background:
    "radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%)",
  borderRadius: "50%",
  animation: "fusionGlow 2s ease-in-out infinite",
};

const fusionName = {
  fontSize: "2rem",
  color: "#FFD700",
  fontWeight: "bold",
  marginBottom: "10px",
};

const fusionDescription = {
  fontSize: "1.2rem",
  color: "#FF69B4",
  fontStyle: "italic",
  fontWeight: "bold",
};

const fusionPowersContainer = {
  backgroundColor: "#f8f9fa",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #9966CC",
};

const powersTitle = {
  color: "#9966CC",
  fontSize: "1.5rem",
  marginBottom: "15px",
};

const powersList = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const powerItem = {
  backgroundColor: "rgba(153, 102, 204, 0.1)",
  padding: "10px 15px",
  borderRadius: "15px",
  color: "#9966CC",
  fontWeight: "bold",
  fontSize: "0.9rem",
};

const gemsApprovalContainer = {
  backgroundColor: "rgba(255, 182, 193, 0.2)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #FF69B4",
};

const approvalTitle = {
  color: "#FF69B4",
  fontSize: "1.3rem",
  marginBottom: "15px",
};

const approvalGems = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const approvalGem = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  borderRadius: "10px",
  padding: "10px 15px",
};

const gemEmoji = {
  fontSize: "1.5rem",
};

const gemApproval = {
  flex: 1,
  fontSize: "0.9rem",
  color: "#666",
  fontWeight: "bold",
  textAlign: "left",
};

const stevenFinalContainer = {
  backgroundColor: "rgba(255, 182, 193, 0.3)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #FF69B4",
};

const stevenFinalAvatar = {
  fontSize: "3rem",
  animation: "stevenExcited 2s ease-in-out infinite",
  marginBottom: "10px",
};

const stevenFinalText = {
  fontSize: "1rem",
  color: "#FF1493",
  fontWeight: "bold",
  lineHeight: "1.5",
};

const nextAdventureButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  background: "linear-gradient(45deg, #FF69B4, #9966CC)",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  fontFamily: "inherit",
};
