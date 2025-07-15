import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Fase8MacLarensPub() {
  const router = useRouter();
  const [jogoAtivo, setJogoAtivo] = useState("entrada");
  const [pontuacao, setPontuacao] = useState(0);
  const [respostasCorretas, setRespostasCorretas] = useState(0);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [playbook, setPlaybook] = useState([]);
  const [tempoRestante, setTempoRestante] = useState(30);
  const [jogoCompleto, setJogoCompleto] = useState(false);
  const [pubCustomers, setPubCustomers] = useState([]);

  const perguntas = [
    {
      pergunta:
        "Ted está contando para os filhos: 'E foi assim que descobri que o amor verdadeiro...'",
      opcoes: [
        "💕 ...é como encontrar sua Yellow Umbrella",
        "🎯 ...acontece quando menos esperamos",
        "🏠 ...é sobre construir um lar juntos",
        "⭐ ...é sobre encontrar seu 'The One'",
      ],
      correta: 2,
      tedResponse:
        "Exato! O amor é sobre criar um lar, não apenas encontrar uma pessoa.",
    },
    {
      pergunta: "Marshall e Lily diriam que o segredo de um relacionamento é:",
      opcoes: [
        "🥪 Compartilhar sanduíches enormes",
        "💰 Ter objetivos financeiros juntos",
        "🎯 Ser melhores amigos primeiro",
        "🌮 Ter rituais bobos só de vocês",
      ],
      correta: 2,
      lillyResponse:
        "Marshall sempre diz: 'Lily é minha melhor amiga e meu grande amor!'",
    },
    {
      pergunta:
        "Robin como jornalista perguntaria: 'Qual é a headline do relacionamento de vocês?'",
      opcoes: [
        "📰 'Casal Local Descobre Receita da Felicidade'",
        "🌟 'Duas Almas Gêmeas Reescrevem as Regras do Amor'",
        "💻 'Programador e Sua Musa Codificam o Amor Perfeito'",
        "🐱 'História de Amor Mais Fofa que Gatinhos Vira Viral'",
      ],
      correta: 1,
      robinResponse:
        "Como jornalista, posso confirmar: essa é uma história que merece primeira página!",
    },
  ];

  const barneyPlays = [
    "💻 O Mestre do Código - impressionar com skills de programação",
    "🐱 O Encantador de Gatos - conquistar através dos gatinhos",
    "🎮 O Player Dois - ser o parceiro perfeito nos jogos",
    "☕ A Conexão Café - momentos especiais no café da manhã",
    "❤️ O Cara Genuíno - ser autêntico e verdadeiro (LENDÁRIO!)",
  ];

  useEffect(() => {
    // Clientes do pub (personagens HIMYM com gatos)
    const customers = [
      { id: 1, emoji: "👨‍💼🐱", x: 10, y: 80, name: "Ted Gato", mood: "📚" },
      { id: 2, emoji: "👩‍💼🐱", x: 85, y: 75, name: "Robin Gata", mood: "📺" },
      { id: 3, emoji: "👨‍⚖️🐱", x: 15, y: 25, name: "Marshall Gato", mood: "🥪" },
      { id: 4, emoji: "👩‍🎨🐱", x: 80, y: 30, name: "Lily Gata", mood: "🎨" },
      { id: 5, emoji: "👔🐱", x: 50, y: 85, name: "Barney Gato", mood: "👔" },
    ];
    setPubCustomers(customers);
  }, []);

  useEffect(() => {
    let timer;
    if (jogoAtivo === "countdown" && tempoRestante > 0) {
      timer = setTimeout(() => {
        setTempoRestante(tempoRestante - 1);
      }, 1000);
    } else if (tempoRestante === 0 && jogoAtivo === "countdown") {
      setJogoCompleto(true);
    }
    return () => clearTimeout(timer);
  }, [tempoRestante, jogoAtivo]);

  const responder = (opcao) => {
    const pontos = opcao === perguntas[perguntaAtual].correta ? 100 : 50;
    if (opcao === perguntas[perguntaAtual].correta) {
      setRespostasCorretas(respostasCorretas + 1);
    }
    setPontuacao(pontuacao + pontos);

    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      setJogoAtivo("playbook");
    }
  };

  const adicionarPlay = (play) => {
    if (!playbook.includes(play)) {
      setPlaybook([...playbook, play]);
      setPontuacao(pontuacao + 50);
      if (playbook.length >= 2) {
        setJogoAtivo("countdown");
      }
    }
  };

  const finalizarJogo = () => {
    setJogoCompleto(true);
  };

  const avancar = () => {
    router.push("/aventura/faseFinal");
  };

  return (
    <div style={pubStyle}>
      {/* Background do pub com atmosfera */}
      <div style={backgroundOverlay}></div>

      {/* Clientes do pub */}
      {pubCustomers.map((customer) => (
        <div
          key={customer.id}
          style={{
            ...customerStyle,
            left: `${customer.x}%`,
            top: `${customer.y}%`,
          }}
        >
          <div style={customerChar}>{customer.emoji}</div>
          <div style={customerMood}>{customer.mood}</div>
          <div style={customerName}>{customer.name}</div>
        </div>
      ))}

      <div style={contentContainer}>
        {jogoAtivo === "entrada" && (
          <div style={entradaContainer}>
            <div style={pubSign}>
              <h1 style={signTitle}>🍺 MacLaren's Pub 🍺</h1>
              <div style={signSubtitle}>EST. 2005 - Onde Histórias Começam</div>
            </div>

            <div style={tedIntro}>
              <div style={tedAvatar}>👨‍💼📖</div>
              <div style={tedSpeech}>
                "Crianças, chegamos à parte mais importante da história...
                <br />
                Sentem-se, vou contar como descobri que o amor verdadeiro não é
                sobre encontrar a pessoa perfeita..."
              </div>
            </div>

            <div style={friendsIntro}>
              <h3 style={friendsTitle}>🎭 A Turma Reunida 🎭</h3>
              <div style={friendsContainer}>
                <div style={friend}>
                  <div style={friendAvatar}>👨‍💼</div>
                  <div style={friendName}>Ted</div>
                  <div style={friendRole}>O Contador de Histórias</div>
                </div>
                <div style={friend}>
                  <div style={friendAvatar}>👩‍💼</div>
                  <div style={friendName}>Robin</div>
                  <div style={friendRole}>A Repórter</div>
                </div>
                <div style={friend}>
                  <div style={friendAvatar}>👨‍⚖️</div>
                  <div style={friendName}>Marshall</div>
                  <div style={friendRole}>O Gigante Gentil</div>
                </div>
                <div style={friend}>
                  <div style={friendAvatar}>👩‍🎨</div>
                  <div style={friendName}>Lily</div>
                  <div style={friendRole}>O Coração</div>
                </div>
                <div style={friend}>
                  <div style={friendAvatar}>👔</div>
                  <div style={friendName}>Barney</div>
                  <div style={friendRole}>A Lenda</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setJogoAtivo("perguntas")}
              style={startButton}
            >
              🎯 "Vista o Terno!" - Começar História Final
            </button>
          </div>
        )}

        {jogoAtivo === "perguntas" && (
          <div style={gameContainer}>
            <h2 style={questionTitle}>📺 O Quiz Final da Turma 📺</h2>
            <div style={scoreDisplay}>
              Pontuação: {pontuacao} | História do Ted: {perguntaAtual + 1}/
              {perguntas.length}
            </div>

            <div style={questionContainer}>
              <div style={tedNarrator}>
                <div style={narratorAvatar}>👨‍💼</div>
                <div style={narratorBubble}>"E então eu percebi..."</div>
              </div>

              <h3 style={questionText}>{perguntas[perguntaAtual].pergunta}</h3>

              <div style={optionsContainer}>
                {perguntas[perguntaAtual].opcoes.map((opcao, index) => (
                  <button
                    key={index}
                    onClick={() => responder(index)}
                    style={optionButton}
                  >
                    {opcao}
                  </button>
                ))}
              </div>

              {/* Resposta do personagem */}
              <div style={characterResponse}>
                <div style={responseAvatar}>
                  {perguntaAtual === 0
                    ? "👨‍💼"
                    : perguntaAtual === 1
                      ? "👩‍🎨"
                      : "👩‍💼"}
                </div>
                <div style={responseText}>
                  {perguntaAtual === 0
                    ? perguntas[0].tedResponse
                    : perguntaAtual === 1
                      ? perguntas[1].lillyResponse
                      : perguntas[2].robinResponse}
                </div>
              </div>
            </div>
          </div>
        )}

        {jogoAtivo === "playbook" && (
          <div style={playbookContainer}>
            <h2 style={playbookTitle}>📚 O MANUAL FINAL DO BARNEY 📚</h2>
            <p style={playbookSubtitle}>
              "Espera aí... O Barney preparou as jogadas LENDÁRIAS para vocês!"
            </p>

            <div style={barneyIntro}>
              <div style={barneyAvatar}>👔⭐</div>
              <div style={barneySpeech}>
                "Lendá-- espera aí... ÁRIO! Escolham as jogadas que definem o
                relacionamento perfeito!"
              </div>
            </div>

            <div style={playsContainer}>
              {barneyPlays.map((play, index) => (
                <div
                  key={index}
                  style={{
                    ...playCard,
                    backgroundColor: playbook.includes(play)
                      ? "#ffd700"
                      : "#fff",
                    border: playbook.includes(play)
                      ? "3px solid #ff6b81"
                      : "2px solid #ddd",
                  }}
                  onClick={() => adicionarPlay(play)}
                >
                  {play}
                </div>
              ))}
            </div>

            <div style={selectedPlays}>
              <h4 style={selectedTitle}>🎯 Jogadas Selecionadas:</h4>
              {playbook.map((play, index) => (
                <div key={index} style={selectedPlay}>
                  {play}
                </div>
              ))}
            </div>

            {playbook.length >= 3 && (
              <button
                onClick={() => setJogoAtivo("countdown")}
                style={continueButton}
              >
                👔 "VISTA O TERNO!" - Última Chamada
              </button>
            )}
          </div>
        )}

        {jogoAtivo === "countdown" && !jogoCompleto && (
          <div style={countdownContainer}>
            <h2 style={countdownTitle}>⏰ ÚLTIMA CHAMADA NO MacLAREN'S! ⏰</h2>
            <p style={countdownSubtitle}>
              Marshall bate o martelo: você tem {tempoRestante} segundos para a
              decisão mais importante da noite...
            </p>

            <div style={marshallJudge}>
              <div style={judgeAvatar}>👨‍⚖️🔨</div>
              <div style={judgeSpeech}>
                "Como juiz desta mesa, declaro: é hora da verdade final!"
              </div>
            </div>

            <div style={clockContainer}>
              <div style={clockFace}>
                <div style={clockNumbers}>{tempoRestante}</div>
                <div style={clockLabel}>SEGUNDOS</div>
              </div>
            </div>

            <div style={finalQuestion}>
              <h3 style={questionFinal}>
                Se tivesse que escolher UMA palavra para descrever o que sente
                por ele:
              </h3>
              <div style={finalOptions}>
                <button onClick={finalizarJogo} style={finalOption}>
                  🏠 LAR - ele é meu lar
                </button>
                <button onClick={finalizarJogo} style={finalOption}>
                  🌟 DESTINO - nosso destino
                </button>
                <button onClick={finalizarJogo} style={finalOption}>
                  ♾️ INFINITO - amor infinito
                </button>
                <button onClick={finalizarJogo} style={finalOption}>
                  💖 TUDO - ele é tudo
                </button>
              </div>
            </div>
          </div>
        )}

        {jogoCompleto && (
          <div style={endGameContainer}>
            <h1 style={legendaryTitle}>🎉 LENDÁ-- ESPERA AÍ... ÁRIO! 🎉</h1>

            <div style={finalScore}>
              Pontuação Final da História: {pontuacao}
            </div>

            <div style={groupApproval}>
              <h3 style={approvalTitle}>🎭 Aprovação Unânime da Turma 🎭</h3>
              <div style={friendsApproval}>
                <div style={approval}>
                  <div style={approvalAvatar}>👨‍💼</div>
                  <div style={approvalQuote}>
                    "Clássico! Uma história linda!" - Ted
                  </div>
                </div>
                <div style={approval}>
                  <div style={approvalAvatar}>👩‍💼</div>
                  <div style={approvalQuote}>
                    "Essa é primeira página!" - Robin
                  </div>
                </div>
                <div style={approval}>
                  <div style={approvalAvatar}>👨‍⚖️</div>
                  <div style={approvalQuote}>
                    "Advogado! Caso ganho!" - Marshall
                  </div>
                </div>
                <div style={approval}>
                  <div style={approvalAvatar}>👩‍🎨</div>
                  <div style={approvalQuote}>
                    "Você pintou um amor lindo!" - Lily
                  </div>
                </div>
                <div style={approval}>
                  <div style={approvalAvatar}>👔</div>
                  <div style={approvalQuote}>"LENDÁRIO!" - Barney</div>
                </div>
              </div>
            </div>

            <div style={storyEnd}>
              <h3 style={storyTitle}>📖 Final da História 📖</h3>
              <p style={tedFinalWords}>
                "E foi assim, crianças, que aprendi que o amor verdadeiro não é
                sobre encontrar alguém perfeito...
                <br />
                <br />
                É sobre encontrar alguém que torna você querer ser uma pessoa
                melhor.
                <br />
                <br />E essa é a história de como vocês dois se tornaram...
                LENDÁRIOS!"
              </p>
            </div>

            <button onClick={avancar} style={nextAdventureButton}>
              💍 Revelar o Final da Jornada 💍
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes pubGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(218, 165, 32, 0.6);
          }
          50% {
            box-shadow:
              0 0 40px rgba(218, 165, 32, 1),
              0 0 60px rgba(218, 165, 32, 0.8);
          }
        }

        @keyframes customerChat {
          0%,
          100% {
            transform: scale(1) rotate(-2deg);
          }
          50% {
            transform: scale(1.1) rotate(2deg);
          }
        }

        @keyframes speechBubble {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes clockTick {
          0%,
          100% {
            transform: scale(1);
            color: #fff;
          }
          50% {
            transform: scale(1.2);
            color: #ff6b6b;
          }
        }

        @keyframes legendary {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.1) rotate(-2deg);
          }
          50% {
            transform: scale(1.2) rotate(2deg);
          }
          75% {
            transform: scale(1.1) rotate(-1deg);
          }
        }
      `}</style>
    </div>
  );
}

// Mantenho todos os estilos iguais ao original, apenas mudando os textos
const pubStyle = {
  minHeight: "100vh",
  backgroundImage:
    'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
  backgroundColor: "#2C1810",
  color: "#FFFFFF",
  fontFamily: '"Comic Sans MS", cursive',
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
    "radial-gradient(circle at center, rgba(139,69,19,0.3) 0%, rgba(0,0,0,0.8) 100%)",
};

const customerStyle = {
  position: "absolute",
  textAlign: "center",
  zIndex: 5,
};

const customerChar = {
  fontSize: "2rem",
  animation: "customerChat 4s ease-in-out infinite",
};

const customerMood = {
  fontSize: "1rem",
  marginTop: "3px",
};

const customerName = {
  backgroundColor: "rgba(218, 165, 32, 0.9)",
  color: "#2C1810",
  padding: "3px 8px",
  borderRadius: "10px",
  fontSize: "8px",
  fontWeight: "bold",
  marginTop: "5px",
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

const entradaContainer = {
  backgroundColor: "rgba(139, 69, 19, 0.9)",
  borderRadius: "25px",
  padding: "40px",
  textAlign: "center",
  border: "4px solid #DAA520",
  maxWidth: "700px",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
  animation: "pubGlow 3s ease-in-out infinite",
};

const pubSign = {
  marginBottom: "30px",
};

const signTitle = {
  fontSize: "2.5rem",
  color: "#DAA520",
  marginBottom: "10px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
};

const signSubtitle = {
  fontSize: "1rem",
  color: "#F0E68C",
  fontStyle: "italic",
};

const tedIntro = {
  backgroundColor: "rgba(25, 25, 112, 0.3)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "30px",
  border: "2px solid #4169E1",
};

const tedAvatar = {
  fontSize: "3rem",
  marginBottom: "15px",
};

const tedSpeech = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  fontStyle: "italic",
  animation: "speechBubble 2s ease-out",
};

const friendsIntro = {
  marginBottom: "30px",
};

const friendsTitle = {
  color: "#DAA520",
  fontSize: "1.4rem",
  marginBottom: "20px",
};

const friendsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "15px",
};

const friend = {
  backgroundColor: "rgba(25, 25, 112, 0.4)",
  borderRadius: "15px",
  padding: "15px",
  textAlign: "center",
  border: "2px solid #4169E1",
};

const friendAvatar = {
  fontSize: "2rem",
  marginBottom: "8px",
};

const friendName = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#DAA520",
  marginBottom: "5px",
};

const friendRole = {
  fontSize: "11px",
  color: "#F0E68C",
  fontStyle: "italic",
};

const startButton = {
  padding: "18px 35px",
  fontSize: "1.2rem",
  backgroundColor: "#FF4500",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  textTransform: "uppercase",
  fontFamily: "inherit",
};

const gameContainer = {
  backgroundColor: "rgba(25, 25, 112, 0.9)",
  borderRadius: "20px",
  padding: "30px",
  maxWidth: "700px",
  border: "3px solid #DAA520",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
};

const questionTitle = {
  color: "#DAA520",
  textAlign: "center",
  fontSize: "1.8rem",
  marginBottom: "20px",
};

const scoreDisplay = {
  textAlign: "center",
  backgroundColor: "#000",
  color: "#00FF00",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "25px",
  fontFamily: "monospace",
  fontSize: "14px",
};

const questionContainer = {
  textAlign: "center",
};

const tedNarrator = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "20px",
};

const narratorAvatar = {
  fontSize: "2.5rem",
};

const narratorBubble = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#2C1810",
  padding: "10px 15px",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: "bold",
};

const questionText = {
  fontSize: "1.3rem",
  marginBottom: "25px",
  lineHeight: "1.4",
  color: "#FFFFFF",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "25px",
};

const optionButton = {
  padding: "15px 20px",
  fontSize: "1rem",
  backgroundColor: "#4169E1",
  color: "#FFFFFF",
  border: "2px solid #DAA520",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textAlign: "left",
  fontFamily: "inherit",
};

const characterResponse = {
  backgroundColor: "rgba(255, 215, 0, 0.2)",
  borderRadius: "15px",
  padding: "15px",
  border: "2px solid #DAA520",
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const responseAvatar = {
  fontSize: "2rem",
};

const responseText = {
  fontSize: "14px",
  color: "#F0E68C",
  fontStyle: "italic",
  flex: 1,
};

const playbookContainer = {
  backgroundColor: "rgba(25, 25, 112, 0.9)",
  borderRadius: "20px",
  padding: "30px",
  maxWidth: "800px",
  border: "3px solid #DAA520",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
};

const playbookTitle = {
  color: "#DAA520",
  textAlign: "center",
  fontSize: "2rem",
  marginBottom: "15px",
};

const playbookSubtitle = {
  textAlign: "center",
  marginBottom: "25px",
  fontSize: "1.1rem",
  color: "#F0E68C",
};

const barneyIntro = {
  backgroundColor: "rgba(255, 69, 0, 0.3)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  textAlign: "center",
  border: "2px solid #FF4500",
};

const barneyAvatar = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const barneySpeech = {
  fontSize: "1rem",
  fontStyle: "italic",
  color: "#FFE4E1",
};

const playsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "15px",
  marginBottom: "25px",
};

const playCard = {
  padding: "15px",
  backgroundColor: "#FFFFFF",
  color: "#000",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textAlign: "center",
  fontWeight: "bold",
  border: "2px solid #DAA520",
};

const selectedPlays = {
  backgroundColor: "rgba(255,255,255,0.1)",
  borderRadius: "15px",
  padding: "15px",
  marginBottom: "20px",
};

const selectedTitle = {
  color: "#DAA520",
  fontSize: "1.2rem",
  marginBottom: "10px",
};

const selectedPlay = {
  backgroundColor: "#32CD32",
  color: "#000",
  padding: "8px 12px",
  borderRadius: "15px",
  margin: "5px",
  display: "inline-block",
  fontSize: "13px",
  fontWeight: "bold",
};

const continueButton = {
  display: "block",
  margin: "0 auto",
  padding: "15px 30px",
  fontSize: "1.1rem",
  backgroundColor: "#FF4500",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  fontFamily: "inherit",
};

const countdownContainer = {
  backgroundColor: "rgba(220, 20, 60, 0.9)",
  borderRadius: "20px",
  padding: "30px",
  maxWidth: "600px",
  textAlign: "center",
  border: "3px solid #DAA520",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
};

const countdownTitle = {
  color: "#FFFFFF",
  fontSize: "2rem",
  marginBottom: "15px",
};

const countdownSubtitle = {
  marginBottom: "25px",
  fontSize: "1.1rem",
  color: "#FFE4E1",
};

const marshallJudge = {
  backgroundColor: "rgba(0, 100, 0, 0.3)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #32CD32",
};

const judgeAvatar = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const judgeSpeech = {
  fontSize: "1rem",
  fontStyle: "italic",
  color: "#90EE90",
};

const clockContainer = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "25px",
};

const clockFace = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  backgroundColor: "#000",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "4px solid #DAA520",
  animation: "clockTick 1s infinite",
};

const clockNumbers = {
  fontSize: "2.5rem",
  fontWeight: "bold",
};

const clockLabel = {
  fontSize: "12px",
  color: "#DAA520",
};

const finalQuestion = {
  marginTop: "20px",
};

const questionFinal = {
  fontSize: "1.3rem",
  marginBottom: "20px",
  color: "#FFFFFF",
};

const finalOptions = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const finalOption = {
  padding: "15px 20px",
  backgroundColor: "#FFFFFF",
  color: "#000",
  border: "2px solid #DAA520",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
  fontFamily: "inherit",
};

const endGameContainer = {
  backgroundColor: "rgba(255, 215, 0, 0.9)",
  color: "#000",
  borderRadius: "25px",
  padding: "40px",
  textAlign: "center",
  maxWidth: "700px",
  border: "4px solid #FF4500",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
};

const legendaryTitle = {
  fontSize: "2.5rem",
  marginBottom: "20px",
  color: "#FF4500",
  animation: "legendary 2s ease-in-out infinite",
};

const finalScore = {
  fontSize: "1.5rem",
  marginBottom: "25px",
  fontWeight: "bold",
  color: "#B8860B",
};

const groupApproval = {
  backgroundColor: "rgba(0,0,0,0.1)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
};

const approvalTitle = {
  fontSize: "1.4rem",
  color: "#B8860B",
  marginBottom: "20px",
};

const friendsApproval = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const approval = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  backgroundColor: "rgba(255,255,255,0.3)",
  borderRadius: "10px",
  padding: "10px",
};

const approvalAvatar = {
  fontSize: "1.5rem",
};

const approvalQuote = {
  fontSize: "14px",
  fontStyle: "italic",
  flex: 1,
  textAlign: "left",
};

const storyEnd = {
  backgroundColor: "rgba(25, 25, 112, 0.3)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
};

const storyTitle = {
  color: "#B8860B",
  fontSize: "1.3rem",
  marginBottom: "15px",
};

const tedFinalWords = {
  fontSize: "1rem",
  lineHeight: "1.6",
  fontStyle: "italic",
  color: "#2C3E50",
};

const nextAdventureButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  backgroundColor: "#FF4500",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  fontFamily: "inherit",
  textTransform: "uppercase",
};
