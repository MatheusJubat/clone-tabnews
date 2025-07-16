// pages/aventura/fase5.js - Cinema & Quiz Personalizado Melhorado
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Fase5CinemaPersonalizado() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [filmParticles, setFilmParticles] = useState([]);
  const [cinemaLights, setCinemaLights] = useState([]);
  const [plateiaGatos, setPlateiaGatos] = useState([]);

  const perguntasPersonalizadas = [
    {
      tipo: "multipla_escolha",
      pergunta:
        "Quantos empregos o Matheus teve desde que vocês começaram a namorar?",
      opcoes: [
        "🏢 2 empregos (tá de boa son)",
        "💼 5 empregos (o cara é dedicado)",
        "🚀 25 empregos (workaholic level master)",
        "🔄 30 empregos (mudou mais que de roupa son)",
      ],
      correta: 1,
      explicacao: "Foram 5 empregos! O Matheus é dedicado mas não é maluco! 😂",
      piada: "Pelo menos não mudou mais que a Millena muda de playlist son! 🎵",
    },
    {
      tipo: "verdadeiro_falso",
      pergunta: "Verdadeiro ou Falso: A Millena tem medo de borboletas",
      opcoes: [
        "🦋 Verdadeiro (coitadinha da minha princesa)",
        "❌ Falso (ela é corajosa)",
      ],
      correta: 0,
      explicacao: "VERDADEIRO! As borboletas são o kryptonite da Millena! 😱🦋",
      piada: "Imagina ela num jardim botânico... seria só correria! 🏃‍♀️💨",
    },
    {
      tipo: "multipla_escolha",
      pergunta: "Complete a frase da Millena: 'Eu não gosto...'",
      opcoes: [
        "🙄 Eu não gosto (muito simples)",
        "😤 Eu não gostoson (CORRETO!)",
        "🤨 Eu não gosto não (tá errado)",
        "😠 Eu não gosto mesmo (nada a ver)",
      ],
      correta: 1,
      explicacao: "É 'EU NÃO GOSTOSON'! A linguagem oficial do casal! 😂",
      piada: "Se não falar 'son' no final, não é conversa de vocês! 🗣️",
    },
    {
      tipo: "multipla_escolha",
      pergunta: "Onde foi o primeiro encontro de vocês?",
      opcoes: [
        "🍔 McDonald's (muito básico)",
        "🏠 Na casa dela (Netflix and chill)",
        "🍺 No Seu Barzin (HISTÓRICO!)",
        "🎬 Cinema (muito clichê)",
      ],
      correta: 2,
      explicacao:
        "No Seu Barzin no dia 4 de setembro de 2022! Data histórica! 🍻✨",
      piada: "E o Matheus achando que ia ser sequestrado por um veio! KKKKK 😂",
    },
    {
      tipo: "verdadeiro_falso",
      pergunta: "O Matheus pensou que ia ser sequestrado no primeiro encontro?",
      opcoes: ["😂 Verdadeiro (paranóico mesmo)", "❌ Falso (ele é corajoso)"],
      correta: 0,
      explicacao:
        "VERDADEIRO! Ele achou que era bom demais pra ser verdade! 😂",
      piada:
        "Spoiler: não foi sequestrado, foi conquistado pelo charme da Millena! 💘",
    },
    {
      tipo: "multipla_escolha",
      pergunta: "Qual é a maior reclamação da Millena sobre o Matheus?",
      opcoes: [
        "🎮 Ele não quer jogar Far Cry",
        "😴 Ele ronca às vezes",
        "📱 Demora 3 horas pra responder mensagem",
        "🤷‍♂️ Todas as opções acima son",
      ],
      correta: 3,
      explicacao:
        "TODAS AS OPÇÕES! O Matheus é um pacote completo de pequenas irritações! 😂",
      piada: "Mas ela ama ele mesmo assim... que fofa! 💕",
    },
  ];

  useEffect(() => {
    // Criar partículas de filme
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ["🎬", "🎭", "🎪", "🌟", "💫", "🎨"][
          Math.floor(Math.random() * 6)
        ],
        delay: Math.random() * 3,
      });
    }
    setFilmParticles(particles);

    // Luzes do cinema
    const lights = [];
    for (let i = 0; i < 8; i++) {
      lights.push({
        id: i,
        x: i * 12 + 10,
        delay: i * 0.2,
      });
    }
    setCinemaLights(lights);

    // Plateia de gatos
    const gatos = [
      { id: 1, emoji: "😸🍿", x: 15, y: 85, nome: "Crítico Felino" },
      { id: 2, emoji: "😻🎬", x: 30, y: 80, nome: "Cineasta Cat" },
      { id: 3, emoji: "🐱📽️", x: 45, y: 85, nome: "Diretor Bigodes" },
      { id: 4, emoji: "😺🎭", x: 60, y: 80, nome: "Ator Miautor" },
      { id: 5, emoji: "🙀🏆", x: 75, y: 85, nome: "Jurado Oscar" },
    ];
    setPlateiaGatos(gatos);

    setTimeout(() => setEtapaAtual(1), 1000);
  }, []);

  const responder = (opcaoIndex) => {
    const pergunta = perguntasPersonalizadas[perguntaAtual];
    const acertou = opcaoIndex === pergunta.correta;

    const novaResposta = {
      perguntaIndex: perguntaAtual,
      opcaoEscolhida: opcaoIndex,
      acertou: acertou,
      pontos: acertou ? 100 : 50,
    };

    setRespostas([...respostas, novaResposta]);
    setPontos(pontos + (acertou ? 100 : 50));

    setTimeout(() => {
      if (perguntaAtual < perguntasPersonalizadas.length - 1) {
        setPerguntaAtual(perguntaAtual + 1);
      } else {
        setEtapaAtual(3); // Ir para os resultados
      }
    }, 3000);
  };

  const avancar = () => {
    router.push("/aventura/fase6"); // Vai para Steven Universe
  };

  const perguntaAtualObj =
    perguntasPersonalizadas[perguntaAtual] || perguntasPersonalizadas[0];
  const ultimaResposta = respostas[respostas.length - 1];

  return (
    <div style={containerStyle}>
      {/* Partículas de cinema */}
      {filmParticles.map((particle) => (
        <div
          key={particle.id}
          style={{
            ...particleStyle,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Luzes do cinema */}
      <div style={cinemaLightsContainer}>
        {cinemaLights.map((light) => (
          <div
            key={light.id}
            style={{
              ...cinemaLight,
              left: `${light.x}%`,
              animationDelay: `${light.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Plateia de gatos */}
      {plateiaGatos.map((gato) => (
        <div
          key={gato.id}
          style={{
            ...gatoPlateiaStyle,
            left: `${gato.x}%`,
            top: `${gato.y}%`,
          }}
        >
          <div style={gatoCinema}>{gato.emoji}</div>
          <div style={gatoNomeTag}>{gato.nome}</div>
        </div>
      ))}

      <div style={contentContainer}>
        {/* Etapa 0 - Loading */}
        {etapaAtual === 0 && (
          <div style={loadingContainer}>
            <div style={filmReel}>🎬</div>
            <p style={loadingText}>Preparando a sessão de cinema...</p>
          </div>
        )}

        {/* Etapa 1 - Introdução do Cinema */}
        {etapaAtual === 1 && (
          <div style={cinemaIntroContainer}>
            <h1 style={cinemaTitle}>🎬 CINEMA DO RELACIONAMENTO 🎬</h1>
            <div style={subtitle}>
              "Sessão especial: A História do Casal Mais Fofo"
            </div>

            <div style={diretorContainer}>
              <div style={diretorAvatar}>🎭🐱</div>
              <div style={diretorSpeech}>
                "Bem-vindos ao cinema mais fofo da cidade son! Hoje temos uma
                sessão especial sobre o casal Millena e Matheus! Preparem-se
                para um quiz que vai testar o quanto vocês se conhecem!"
              </div>
            </div>

            <div style={infoFilme}>
              <h3 style={filmeTitle}>
                🎞️ "O Amor em Perguntas e Respostas" 🎞️
              </h3>
              <div style={filmeInfo}>
                <div style={infoItem}>📅 Estreia: Hoje!</div>
                <div style={infoItem}>⏱️ Duração: 6 perguntas</div>
                <div style={infoItem}>🏆 Gênero: Comédia Romântica</div>
                <div style={infoItem}>⭐ Classificação: 18+ (muito amor)</div>
              </div>
            </div>

            <div style={plateiaPrevew}>
              <h4 style={plateiaTitle}>🎭 Críticos Especiais:</h4>
              <p style={plateiaDesc}>
                "Uma plateia de gatinhos especialistas em relacionamentos vai
                avaliar suas respostas son!"
              </p>
            </div>

            <button onClick={() => setEtapaAtual(2)} style={startQuizButton}>
              🎬 Começar a Sessão! 🍿
            </button>
          </div>
        )}

        {/* Etapa 2 - Quiz */}
        {etapaAtual === 2 && (
          <div style={quizContainer}>
            <div style={quizHeader}>
              <h2 style={quizTitle}>🎬 Quiz do Relacionamento 🎬</h2>
              <div style={progressContainer}>
                <div>
                  Pergunta: {perguntaAtual + 1}/{perguntasPersonalizadas.length}
                </div>
                <div>Pontos: {pontos}</div>
                <div>Acertos: {respostas.filter((r) => r.acertou).length}</div>
              </div>
            </div>

            {!ultimaResposta || perguntaAtual === 0 ? (
              <div style={questionContainer}>
                <div style={questionBox}>
                  <h3 style={questionText}>{perguntaAtualObj.pergunta}</h3>

                  <div style={optionsContainer}>
                    {perguntaAtualObj.opcoes.map((opcao, index) => (
                      <button
                        key={index}
                        onClick={() => responder(index)}
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
                          e.target.style.boxShadow =
                            "0 5px 15px rgba(0,0,0,0.2)";
                        }}
                      >
                        {opcao}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={cinematicElements}>
                  <div style={camera}>📹</div>
                  <div style={actionText}>🎬 "E... AÇÃO!" 🎬</div>
                  <div style={spotlight}>💡</div>
                </div>
              </div>
            ) : (
              <div style={feedbackContainer}>
                <div style={feedbackHeader}>
                  {ultimaResposta.acertou
                    ? "🎉 ACERTOU SON! 🎉"
                    : "😅 QUASE LÁ! 😅"}
                </div>

                <div style={explicacaoContainer}>
                  <div style={criticoGato}>🐱‍🎓</div>
                  <div style={criticaBox}>
                    <h4 style={criticaTitle}>
                      🎭 Crítica do Gato Especialista:
                    </h4>
                    <p style={explicacaoText}>{perguntaAtualObj.explicacao}</p>
                    <p style={piadaText}>{perguntaAtualObj.piada}</p>
                  </div>
                </div>

                <div style={pontosGanhos}>+{ultimaResposta.pontos} pontos!</div>

                <div style={plateiaReacao}>
                  <div style={gatoReacao1}>😸</div>
                  <div style={gatoReacao2}>😻</div>
                  <div style={gatoReacao3}>🐱</div>
                  <div style={reacaoTexto}>
                    {ultimaResposta.acertou
                      ? "A plateia felina aprova!"
                      : "Os gatinhos acham que você pode melhorar son!"}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Etapa 3 - Resultados Finais */}
        {etapaAtual === 3 && (
          <div style={resultadosContainer}>
            <h1 style={resultadosTitle}>🏆 SESSÃO ENCERRADA! 🏆</h1>

            <div style={notaFinal}>
              <h2 style={notaTitle}>📊 Avaliação Final:</h2>
              <div style={notaDisplay}>
                <div style={pontosFinais}>Pontuação Total: {pontos}</div>
                <div style={acertosFinais}>
                  Acertos: {respostas.filter((r) => r.acertou).length}/
                  {perguntasPersonalizadas.length}
                </div>
                <div style={notaCritica}>
                  {pontos >= 500 ? (
                    <div style={notaExcelente}>
                      ⭐⭐⭐⭐⭐ "OBRA-PRIMA DO AMOR!"
                    </div>
                  ) : pontos >= 400 ? (
                    <div style={notaBoa}>
                      ⭐⭐⭐⭐ "Muito bom! Vocês se conhecem bem son!"
                    </div>
                  ) : (
                    <div style={notaRegular}>
                      ⭐⭐⭐ "Bom! Mas podem se conhecer melhor!"
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={criticas}>
              <h3 style={criticasTitle}>🎭 Críticas da Plateia Felina:</h3>
              <div style={criticasContainer}>
                <div style={criticaCard}>
                  <div style={criticoIcon}>😸🍿</div>
                  <div style={criticaTexto}>
                    "História envolvente e muitas risadas! Aprovado!"
                    <br />- Crítico Felino
                  </div>
                </div>
                <div style={criticaCard}>
                  <div style={criticoIcon}>😻🎬</div>
                  <div style={criticaTexto}>
                    "Que casal fofo son! Merece sequência!"
                    <br />- Cineasta Cat
                  </div>
                </div>
                <div style={criticaCard}>
                  <div style={criticoIcon}>🐱📽️</div>
                  <div style={criticaTexto}>
                    "Direção perfeita! 10/10 patinhas!"
                    <br />- Diretor Bigodes
                  </div>
                </div>
              </div>
            </div>

            <div style={premioContainer}>
              <h3 style={premioTitle}>🏆 Prêmio Conquistado:</h3>
              <div style={premioCard}>
                <div style={premioIcon}>🎭🏆</div>
                <div style={premioNome}>Oscar de Melhor Casal</div>
                <div style={premioDesc}>
                  "Por conhecerem tão bem um ao outro e proporcionarem tantas
                  risadas à plateia son!"
                </div>
              </div>
            </div>

            <div style={proximaAtracao}>
              <h4 style={proximaTitle}>🎬 Próxima Atração:</h4>
              <p style={proximaDesc}>
                "Preparem-se para uma aventura épica no universo das Crystal
                Gems com Steven Universe!"
              </p>
            </div>

            <button onClick={avancar} style={nextPhaseButton}>
              💎 Próxima Aventura: Steven Universe! 💎
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes filmRoll {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes cinemaFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes lightFlicker {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes screenGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(52, 152, 219, 0.6);
          }
          50% {
            box-shadow: 0 0 40px rgba(52, 152, 219, 0.8);
          }
        }

        @keyframes gatoAssistindo {
          0%,
          100% {
            transform: scale(1) rotate(-2deg);
          }
          50% {
            transform: scale(1.1) rotate(2deg);
          }
        }

        @keyframes camera {
          0%,
          100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes spotlight {
          0%,
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.2);
            filter: brightness(1.5);
          }
        }

        @keyframes applause {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          25% {
            transform: translateY(-5px) scale(1.1);
          }
          50% {
            transform: translateY(-3px) scale(1.05);
          }
          75% {
            transform: translateY(-8px) scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}

// Estilos
const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Georgia", serif',
  color: "#fff",
};

const particleStyle = {
  position: "absolute",
  fontSize: "1.5rem",
  animation: "cinemaFloat 4s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
};

const cinemaLightsContainer = {
  position: "absolute",
  top: "5%",
  width: "100%",
  height: "20px",
  zIndex: 1,
};

const cinemaLight = {
  position: "absolute",
  width: "15px",
  height: "15px",
  backgroundColor: "#f39c12",
  borderRadius: "50%",
  animation: "lightFlicker 2s ease-in-out infinite",
  boxShadow: "0 0 20px #f39c12",
};

const gatoPlateiaStyle = {
  position: "absolute",
  textAlign: "center",
  zIndex: 5,
};

const gatoCinema = {
  fontSize: "2rem",
  animation: "gatoAssistindo 3s ease-in-out infinite",
  cursor: "pointer",
};

const gatoNomeTag = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#2c3e50",
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

const loadingContainer = {
  textAlign: "center",
};

const filmReel = {
  fontSize: "4rem",
  animation: "filmRoll 2s linear infinite",
  marginBottom: "20px",
};

const loadingText = {
  fontSize: "1.2rem",
  opacity: 0.8,
};

const cinemaIntroContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  border: "4px solid #e74c3c",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
  animation: "screenGlow 3s ease-in-out infinite",
  textAlign: "center",
};

const cinemaTitle = {
  fontSize: "2.5rem",
  color: "#e74c3c",
  marginBottom: "10px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
};

const subtitle = {
  fontSize: "1.2rem",
  color: "#bdc3c7",
  marginBottom: "30px",
  fontStyle: "italic",
};

const diretorContainer = {
  backgroundColor: "rgba(231, 76, 60, 0.2)",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #e74c3c",
};

const diretorAvatar = {
  fontSize: "3rem",
  marginBottom: "15px",
  animation: "gatoAssistindo 3s ease-in-out infinite",
};

const diretorSpeech = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#ecf0f1",
  fontStyle: "italic",
};

const infoFilme = {
  backgroundColor: "rgba(52, 73, 94, 0.8)",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #34495e",
};

const filmeTitle = {
  color: "#3498db",
  fontSize: "1.4rem",
  marginBottom: "15px",
};

const filmeInfo = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "10px",
};

const infoItem = {
  backgroundColor: "rgba(52, 152, 219, 0.2)",
  padding: "10px",
  borderRadius: "10px",
  textAlign: "center",
  color: "#ecf0f1",
  fontWeight: "bold",
  fontSize: "0.9rem",
};

const plateiaPrevew = {
  backgroundColor: "rgba(243, 156, 18, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #f39c12",
};

const plateiaTitle = {
  color: "#f39c12",
  fontSize: "1.2rem",
  marginBottom: "10px",
};

const plateiaDesc = {
  color: "#ecf0f1",
  fontSize: "1rem",
  fontStyle: "italic",
  margin: 0,
};

const startQuizButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  backgroundColor: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  textTransform: "uppercase",
  fontFamily: "inherit",
};

const quizContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  border: "4px solid #3498db",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
};

const quizHeader = {
  textAlign: "center",
  marginBottom: "30px",
};

const quizTitle = {
  color: "#3498db",
  fontSize: "2rem",
  marginBottom: "15px",
};

const progressContainer = {
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "rgba(52, 73, 94, 0.8)",
  padding: "15px",
  borderRadius: "15px",
  border: "2px solid #34495e",
  color: "#ecf0f1",
  fontWeight: "bold",
};

const questionContainer = {
  textAlign: "center",
};

const questionBox = {
  backgroundColor: "rgba(44, 62, 80, 0.8)",
  borderRadius: "20px",
  padding: "30px",
  marginBottom: "25px",
  border: "2px solid #2c3e50",
};

const questionText = {
  fontSize: "1.4rem",
  color: "#ecf0f1",
  marginBottom: "25px",
  lineHeight: "1.5",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "20px",
};

const optionButton = {
  padding: "18px 25px",
  fontSize: "1.1rem",
  color: "#fff",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  fontFamily: "inherit",
  textAlign: "left",
};

const cinematicElements = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  marginTop: "20px",
};

const camera = {
  fontSize: "2.5rem",
  animation: "camera 3s ease-in-out infinite",
};

const actionText = {
  fontSize: "1.2rem",
  color: "#e74c3c",
  fontWeight: "bold",
  animation: "applause 2s ease-in-out infinite",
};

const spotlight = {
  fontSize: "2rem",
  animation: "spotlight 2s ease-in-out infinite",
};

const feedbackContainer = {
  textAlign: "center",
  backgroundColor: "rgba(39, 174, 96, 0.1)",
  borderRadius: "20px",
  padding: "30px",
  border: "2px solid #27ae60",
};

const feedbackHeader = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#27ae60",
  marginBottom: "20px",
};

const explicacaoContainer = {
  display: "flex",
  alignItems: "flex-start",
  gap: "20px",
  marginBottom: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "15px",
  padding: "20px",
};

const criticoGato = {
  fontSize: "3rem",
  animation: "gatoAssistindo 2s ease-in-out infinite",
};

const criticaBox = {
  flex: 1,
  textAlign: "left",
};

const criticaTitle = {
  color: "#f39c12",
  fontSize: "1.2rem",
  marginBottom: "10px",
};

const explicacaoText = {
  fontSize: "1.1rem",
  color: "#ecf0f1",
  marginBottom: "8px",
  fontWeight: "bold",
};

const piadaText = {
  fontSize: "1rem",
  color: "#bdc3c7",
  fontStyle: "italic",
  margin: 0,
};

const pontosGanhos = {
  fontSize: "1.5rem",
  color: "#f1c40f",
  fontWeight: "bold",
  marginBottom: "20px",
  animation: "applause 1s ease-out",
};

const plateiaReacao = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  backgroundColor: "rgba(243, 156, 18, 0.2)",
  borderRadius: "15px",
  padding: "15px",
  border: "2px solid #f39c12",
};

const gatoReacao1 = {
  fontSize: "2rem",
  animation: "applause 2s ease-in-out infinite",
};

const gatoReacao2 = {
  fontSize: "2rem",
  animation: "applause 2s ease-in-out infinite 0.3s",
};

const gatoReacao3 = {
  fontSize: "2rem",
  animation: "applause 2s ease-in-out infinite 0.6s",
};

const reacaoTexto = {
  flex: 1,
  color: "#f39c12",
  fontWeight: "bold",
  fontStyle: "italic",
};

const resultadosContainer = {
  backgroundColor: "rgba(142, 68, 173, 0.9)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  border: "4px solid #9b59b6",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
  color: "#fff",
  textAlign: "center",
};

const resultadosTitle = {
  fontSize: "2.5rem",
  marginBottom: "30px",
  animation: "applause 2s ease-in-out infinite",
};

const notaFinal = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #ecf0f1",
};

const notaTitle = {
  color: "#ecf0f1",
  fontSize: "1.5rem",
  marginBottom: "15px",
};

const notaDisplay = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const pontosFinais = {
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: "#f1c40f",
};

const acertosFinais = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#27ae60",
};

const notaCritica = {
  fontSize: "1.4rem",
  fontWeight: "bold",
  marginTop: "15px",
};

const notaExcelente = {
  color: "#f1c40f",
  animation: "applause 2s ease-in-out infinite",
};

const notaBoa = {
  color: "#27ae60",
};

const notaRegular = {
  color: "#e67e22",
};

const criticas = {
  backgroundColor: "rgba(52, 73, 94, 0.8)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #34495e",
};

const criticasTitle = {
  color: "#3498db",
  fontSize: "1.3rem",
  marginBottom: "20px",
};

const criticasContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const criticaCard = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "15px",
  padding: "15px",
};

const criticoIcon = {
  fontSize: "2rem",
  animation: "gatoAssistindo 3s ease-in-out infinite",
};

const criticaTexto = {
  flex: 1,
  fontSize: "0.9rem",
  color: "#ecf0f1",
  textAlign: "left",
  fontStyle: "italic",
};

const premioContainer = {
  backgroundColor: "rgba(241, 196, 15, 0.2)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #f1c40f",
};

const premioTitle = {
  color: "#f1c40f",
  fontSize: "1.3rem",
  marginBottom: "15px",
};

const premioCard = {
  textAlign: "center",
};

const premioIcon = {
  fontSize: "4rem",
  marginBottom: "15px",
  animation: "applause 2s ease-in-out infinite",
};

const premioNome = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#f1c40f",
  marginBottom: "10px",
};

const premioDesc = {
  fontSize: "1rem",
  color: "#ecf0f1",
  fontStyle: "italic",
  lineHeight: "1.5",
};

const proximaAtracao = {
  backgroundColor: "rgba(155, 89, 182, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #9b59b6",
};

const proximaTitle = {
  color: "#9b59b6",
  fontSize: "1.2rem",
  marginBottom: "10px",
};

const proximaDesc = {
  color: "#ecf0f1",
  fontSize: "1rem",
  fontStyle: "italic",
  margin: 0,
  lineHeight: "1.5",
};

const nextPhaseButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  background: "linear-gradient(45deg, #9b59b6, #8e44ad)",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  textTransform: "uppercase",
  fontFamily: "inherit",
};
