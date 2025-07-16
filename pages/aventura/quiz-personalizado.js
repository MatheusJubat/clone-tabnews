// pages/aventura/quiz-personalizado.js - Quiz da Millena
import { useState, useEffect } from "react";
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

export default function QuizPersonalizado() {
  const router = useRouter();
  const { isTransitioning, transitionData, startTransition } = useTransition();
  const {
    findEasterEgg,
    showMessage,
    setShowMessage,
    specialEffects,
    getTotalEggsFound,
  } = useEasterEggs("quiz-personalizado");

  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [quizCompleto, setQuizCompleto] = useState(false);
  const [borboletasAssustadoras, setBorboletasAssustadoras] = useState([]);
  const [showingAnswer, setShowingAnswer] = useState(false);

  const perguntas = [
    {
      pergunta: "Qual é o maior medo da Millena?",
      opcoes: [
        "🕷️ Aranhas grandes",
        "🦋 Borboletas (kkkkkk)",
        "🌙 Escuro total",
        "🎤 Falar em público",
      ],
      correta: 1,
      explicacao:
        "KKKKKK isso mesmo! A Millena tem medo de borboletas! Quem diria que algo tão fofo pode ser assustador né? 😂🦋",
      pontos: 100,
    },
    {
      pergunta: "Quando a Millena quer dizer 'pouco', ela fala:",
      opcoes: [
        "🤏 Um pouquinho",
        "📏 Pico (nossa mania!)",
        "✨ Um tantinho",
        "🔍 Bem pequeno",
      ],
      correta: 1,
      explicacao:
        "Exato! 'Pico' é nossa mania especial! Tipo: 'Espera um pico!' ou 'Só mais um picoson!' 😄",
      pontos: 150,
    },
    {
      pergunta: "O que a Millena sempre faz na barriga do Matheus?",
      opcoes: [
        "💆 Massagem relaxante",
        "👉 Picos (cutucões!)",
        "🤗 Abraços carinhosos",
        "😘 Beijinhos doces",
      ],
      correta: 1,
      explicacao:
        "Os famosos PICOS! 👉 Aqueles cutucõezinhos na barriga que ela adora fazer e eu finjo que não gostoson! 😂",
      pontos: 200,
    },
    {
      pergunta: "Qual jogo a Millena adora e quer que o Matheus jogue?",
      opcoes: ["🎮 Fallout 4", "🏎️ Far Cry", "🎯 Ambos!", "🎲 Nenhum desses"],
      correta: 2,
      explicacao:
        "AMBOS! Ela vive falando: 'Matheusss, vamos jogar Fallout!' ou 'Por que você não joga Far Cry comigo?' E eu sempre inventando desculpa! 😅🎮",
      pontos: 250,
    },
    {
      pergunta: "Como vocês falam quando querem enfatizar algo?",
      opcoes: [
        "➕ Colocamos 'son' no final",
        "⭐ Repetimos 3 vezes",
        "🔥 Gritamos alto",
        "💫 Fazemos careta",
      ],
      correta: 0,
      explicacao:
        "Issoooo! Colocamos 'son' no final! Tipo: 'Eu te amoson demais!' ou 'Não gostoson disso!' É nossa marca registrada! 😄💕",
      pontos: 300,
    },
    {
      pergunta: "PERGUNTA FINAL: O que o Matheus mais ama na Millena?",
      opcoes: [
        "💖 Literalmente TUDO nela",
        "😂 Seu jeito engraçado",
        "🎮 Amor por games",
        "🌟 Sua personalidade única",
      ],
      correta: 0,
      explicacao:
        "TUDO! Cada detalhe, cada mania, cada risada, cada pico, cada 'son', cada medo bobo... EU AMO TUDO NA MILLENA! 💕💕💕",
      pontos: 500,
    },
  ];

  useEffect(() => {
    // Criar borboletas assustadoras para efeito especial
    const borboletas = [];
    for (let i = 0; i < 8; i++) {
      borboletas.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: "🦋",
        velocidade: Math.random() * 3 + 1,
        direcao: Math.random() * 360,
      });
    }
    setBorboletasAssustadoras(borboletas);
  }, []);

  // Animar borboletas
  useEffect(() => {
    const interval = setInterval(() => {
      setBorboletasAssustadoras((prev) =>
        prev.map((borboleta) => {
          let newX =
            borboleta.x + Math.cos(borboleta.direcao) * borboleta.velocidade;
          let newY =
            borboleta.y + Math.sin(borboleta.direcao) * borboleta.velocidade;
          let newDirecao = borboleta.direcao;

          if (newX < 0 || newX > 100) {
            newDirecao = Math.PI - borboleta.direcao;
            newX = Math.max(0, Math.min(100, newX));
          }
          if (newY < 0 || newY > 100) {
            newDirecao = -borboleta.direcao;
            newY = Math.max(0, Math.min(100, newY));
          }

          return {
            ...borboleta,
            x: newX,
            y: newY,
            direcao: newDirecao,
          };
        }),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const responder = (opcaoIndex) => {
    const pergunta = perguntas[perguntaAtual];
    const acertou = opcaoIndex === pergunta.correta;
    const pontosGanhos = acertou
      ? pergunta.pontos
      : Math.floor(pergunta.pontos / 2);

    setPontuacao((prev) => prev + pontosGanhos);
    setRespostas((prev) => [
      ...prev,
      { pergunta: perguntaAtual, resposta: opcaoIndex, acertou },
    ]);
    setShowingAnswer(true);

    // Easter egg especial para pergunta das borboletas
    if (perguntaAtual === 0 && opcaoIndex === 1) {
      findEasterEgg({
        x: 50,
        y: 50,
        message: "AHHHHH! BORBOLETAS! 😱🦋 A Millena saiu correndo!",
      });
    }

    // Easter egg para os picos
    if (perguntaAtual === 2) {
      findEasterEgg({
        x: Math.random() * 100,
        y: Math.random() * 100,
        message: "👉 PICO! Cutucão na barriga! 😂",
      });
    }

    setTimeout(() => {
      setShowingAnswer(false);
      if (perguntaAtual < perguntas.length - 1) {
        setPerguntaAtual((prev) => prev + 1);
      } else {
        setQuizCompleto(true);
      }
    }, 3000);
  };

  const clickBorboleta = (borboletaId) => {
    findEasterEgg({
      x: Math.random() * 100,
      y: Math.random() * 100,
      message: "KYAAAAA! UMA BORBOLETA! 🦋😰 *Millena correndo*",
    });
  };

  const avancar = async () => {
    const message = getTransitionMessage("quiz-personalizado", "fase-games");
    await startTransition("quiz-personalizado", "fase-games", message, 1000);
  };

  // Se estiver em transição
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
        
        @keyframes borboletaVoo {
          0%,
          100% {
            transform: scale(1) rotate(-10deg);
          }
          25% {
            transform: scale(1.2) rotate(10deg);
          }
          50% {
            transform: scale(0.8) rotate(-5deg);
          }
          75% {
            transform: scale(1.1) rotate(5deg);
          }
        }

        @keyframes picoEffect {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5) rotate(10deg);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes quizGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.6);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 105, 180, 1);
          }
        }

        @keyframes correctAnswer {
          0% {
            background-color: #28a745;
            transform: scale(1);
          }
          50% {
            background-color: #20c997;
            transform: scale(1.05);
          }
          100% {
            background-color: #28a745;
            transform: scale(1);
          }
        }

        @keyframes wrongAnswer {
          0% {
            background-color: #dc3545;
            transform: translateX(0);
          }
          25% {
            background-color: #e63946;
            transform: translateX(-5px);
          }
          50% {
            background-color: #dc3545;
            transform: translateX(5px);
          }
          75% {
            background-color: #e63946;
            transform: translateX(-3px);
          }
          100% {
            background-color: #dc3545;
            transform: translateX(0);
          }
        }

        @keyframes celebration {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.2) rotate(-5deg);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
          75% {
            transform: scale(1.3) rotate(-3deg);
          }
        }
      `}</style>

      {/* Player de Música */}
      <MusicPlayer
        phaseName="quiz-personalizado"
        position="bottom-right"
        showControls={true}
      />

      {/* Contador de Easter Eggs */}
      <EasterEggCounter
        currentPhase="quiz-personalizado"
        position="top-right"
      />

      {/* Easter Eggs Escondidos */}
      <EasterEggButton
        position={{ top: "12%", left: "8%" }}
        size={42}
        onFind={findEasterEgg}
      />

      <EasterEggButton
        position={{ bottom: "18%", right: "12%" }}
        size={38}
        onFind={findEasterEgg}
      />

      {/* Borboletas assustadoras */}
      {borboletasAssustadoras.map((borboleta) => (
        <div
          key={borboleta.id}
          style={{
            ...borboletaStyle,
            left: `${borboleta.x}%`,
            top: `${borboleta.y}%`,
          }}
          onClick={() => clickBorboleta(borboleta.id)}
        >
          {borboleta.emoji}
        </div>
      ))}

      <div style={contentContainer}>
        {!quizCompleto ? (
          <div style={quizContainer}>
            <div style={headerContainer}>
              <h1 style={titleStyle}>
                🎯 Quiz Super Personalizado da Millena 🎯
              </h1>
              <div style={progressContainer}>
                <div style={progressText}>
                  Pergunta {perguntaAtual + 1} de {perguntas.length}
                </div>
                <div style={scoreText}>Pontuação: {pontuacao}</div>
              </div>
            </div>

            {!showingAnswer ? (
              <div style={perguntaContainer}>
                <div style={perguntaHeader}>
                  <div style={perguntaNumero}>#{perguntaAtual + 1}</div>
                  <h2 style={perguntaTexto}>
                    {perguntas[perguntaAtual].pergunta}
                  </h2>
                </div>

                <div style={opcoesContainer}>
                  {perguntas[perguntaAtual].opcoes.map((opcao, index) => (
                    <button
                      key={index}
                      onClick={() => responder(index)}
                      style={{
                        ...opcaoButton,
                        backgroundColor: [
                          "#ff6b81",
                          "#74b9ff",
                          "#55a3ff",
                          "#fd79a8",
                        ][index],
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform =
                          "scale(1.05) translateY(-3px)";
                        e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1) translateY(0px)";
                        e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                      }}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>

                {/* Dicas especiais para algumas perguntas */}
                {perguntaAtual === 0 && (
                  <div style={dicaContainer}>
                    💡 Dica: Cuidado com as borboletas voando na tela! 🦋😰
                  </div>
                )}

                {perguntaAtual === 1 && (
                  <div style={dicaContainer}>
                    💡 Dica: É uma mania que vocês dois têm! 😄
                  </div>
                )}

                {perguntaAtual === 2 && (
                  <div style={dicaContainer}>
                    💡 Dica: Algo que ela faz e você finge não gostar! 👉😂
                  </div>
                )}
              </div>
            ) : (
              <div style={respostaContainer}>
                <div style={respostaHeader}>
                  <h3 style={respostaTitle}>
                    {respostas[respostas.length - 1]?.acertou
                      ? "🎉 Acertou!"
                      : "😅 Quase lá!"}
                  </h3>
                </div>

                <div style={explicacaoContainer}>
                  <p style={explicacaoTexto}>
                    {perguntas[perguntaAtual].explicacao}
                  </p>
                </div>

                <div style={pontosContainer}>
                  <div style={pontosGanhos}>
                    +
                    {respostas[respostas.length - 1]?.acertou
                      ? perguntas[perguntaAtual].pontos
                      : Math.floor(perguntas[perguntaAtual].pontos / 2)}{" "}
                    pontos
                  </div>
                </div>

                {/* Efeito especial para pergunta das borboletas */}
                {perguntaAtual === 0 &&
                  respostas[respostas.length - 1]?.acertou && (
                    <div style={efeitoEspecial}>
                      <div style={borboletasEffect}>
                        🦋🦋🦋 AHHHH! BORBOLETAS! 🦋🦋🦋
                      </div>
                      <div style={millenaCorrendo}>
                        🏃‍♀️💨 *Millena correndo das borboletas*
                      </div>
                    </div>
                  )}

                {/* Efeito especial para pergunta dos picos */}
                {perguntaAtual === 2 && (
                  <div style={efeitoEspecial}>
                    <div style={picosEffect}>👉 PICO! 👉 PICO! 👉 PICO!</div>
                    <div style={matheusReacao}>
                      😫 "Ai, Millena! Para com isso!" (mas adora no fundo) 😄
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div style={resultadoContainer}>
            <h1 style={resultadoTitle}>🎊 Quiz Completoson! 🎊</h1>

            <div style={pontuacaoFinal}>
              <div style={pontuacaoTexto}>Pontuação Final:</div>
              <div style={pontuacaoValor}>{pontuacao}</div>
              <div style={pontuacaoMax}>
                de {perguntas.reduce((total, p) => total + p.pontos, 0)}
              </div>
            </div>

            <div style={avaliacaoContainer}>
              <h3 style={avaliacaoTitle}>
                📊 Nível de Conhecimento sobre a Millena:
              </h3>
              <div style={avaliacaoNivel}>
                {pontuacao >= 1200 ? (
                  <div style={nivelPerfecto}>
                    <div style={nivelEmoji}>👑</div>
                    <div style={nivelTexto}>EXPERT LEVEL!</div>
                    <div style={nivelDesc}>
                      Você conhece a Millena melhor que ela mesma! 😄💕
                    </div>
                  </div>
                ) : pontuacao >= 900 ? (
                  <div style={nivelBom}>
                    <div style={nivelEmoji}>⭐</div>
                    <div style={nivelTexto}>QUASE EXPERT!</div>
                    <div style={nivelDesc}>
                      Você manja muito da Millena! 😊💖
                    </div>
                  </div>
                ) : (
                  <div style={nivelRegular}>
                    <div style={nivelEmoji}>💪</div>
                    <div style={nivelTexto}>AINDA APRENDENDO!</div>
                    <div style={nivelDesc}>
                      Precisa prestar mais atenção nas manias dela! 😉
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={resumoContainer}>
              <h4 style={resumoTitle}>📝 Resumo das Descobertas:</h4>
              <div style={descobertasList}>
                <div style={descoberta}>
                  🦋 Medos bobos: Borboletas são terror!
                </div>
                <div style={descoberta}>
                  🗣️ Mania linguística: "son" em tudo!
                </div>
                <div style={descoberta}>
                  👉 Hábito irritante: Picos na barriga!
                </div>
                <div style={descoberta}>
                  🎮 Paixão gaming: Fallout & Far Cry!
                </div>
                <div style={descoberta}>
                  💕 Amor verdadeiro: TUDO nela é perfeito!
                </div>
              </div>
            </div>

            <div style={mensagemPersonalizada}>
              <h4 style={mensagemTitle}>💌 Mensagem Especial do Matheus:</h4>
              <div style={mensagemTexto}>
                "Millena, cada mania sua, cada medo bobo, cada 'son' no final,
                cada pico na barriga... TUDO isso faz você ser a pessoa mais
                especial do mundo para mim! Te amoson demais! 💕💕💕"
              </div>
            </div>

            <button onClick={avancar} style={continuarButton}>
              🎮 Próxima Fase: Mundo dos Games! 🎮
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
    "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
  color: "#fff",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Poppins", sans-serif',
};

const borboletaStyle = {
  position: "absolute",
  fontSize: "1.5rem",
  animation: "borboletaVoo 3s ease-in-out infinite",
  cursor: "pointer",
  zIndex: 5,
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
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

const quizContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  width: "100%",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
  border: "4px solid #ff6b81",
  animation: "quizGlow 3s ease-in-out infinite",
};

const headerContainer = {
  textAlign: "center",
  marginBottom: "30px",
};

const titleStyle = {
  fontSize: "2.2rem",
  color: "#ff6b81",
  marginBottom: "20px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
};

const progressContainer = {
  display: "flex",
  justifyContent: "space-between",
  align: "center",
  backgroundColor: "#f8f9fa",
  padding: "15px 20px",
  borderRadius: "15px",
  border: "2px solid #ff6b81",
};

const progressText = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#495057",
};

const scoreText = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#28a745",
};

const perguntaContainer = {
  textAlign: "center",
};

const perguntaHeader = {
  marginBottom: "30px",
};

const perguntaNumero = {
  display: "inline-block",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "#ff6b81",
  color: "#fff",
  fontSize: "1.5rem",
  fontWeight: "bold",
  lineHeight: "50px",
  marginBottom: "20px",
};

const perguntaTexto = {
  fontSize: "1.5rem",
  color: "#495057",
  lineHeight: "1.4",
  margin: 0,
};

const opcoesContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "15px",
  marginBottom: "25px",
};

const opcaoButton = {
  padding: "20px",
  fontSize: "1.1rem",
  color: "#fff",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  textAlign: "left",
  fontFamily: "inherit",
};

const dicaContainer = {
  backgroundColor: "rgba(255, 193, 7, 0.2)",
  border: "2px solid #ffc107",
  borderRadius: "15px",
  padding: "15px",
  fontSize: "1rem",
  color: "#856404",
  fontStyle: "italic",
  fontWeight: "bold",
};

const respostaContainer = {
  textAlign: "center",
};

const respostaHeader = {
  marginBottom: "25px",
};

const respostaTitle = {
  fontSize: "1.8rem",
  color: "#28a745",
  margin: 0,
};

const explicacaoContainer = {
  backgroundColor: "#f8f9fa",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "20px",
  border: "2px solid #28a745",
};

const explicacaoTexto = {
  fontSize: "1.2rem",
  color: "#495057",
  lineHeight: "1.6",
  margin: 0,
  fontStyle: "italic",
};

const pontosContainer = {
  marginBottom: "20px",
};

const pontosGanhos = {
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: "#28a745",
  backgroundColor: "rgba(40, 167, 69, 0.1)",
  padding: "10px 20px",
  borderRadius: "20px",
  border: "2px solid #28a745",
  display: "inline-block",
};

const efeitoEspecial = {
  backgroundColor: "rgba(255, 107, 129, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #ff6b81",
};

const borboletasEffect = {
  fontSize: "1.5rem",
  animation: "borboletaVoo 1s ease-in-out infinite",
  marginBottom: "10px",
};

const millenaCorrendo = {
  fontSize: "1.2rem",
  color: "#ff6b81",
  fontWeight: "bold",
};

const picosEffect = {
  fontSize: "1.5rem",
  animation: "picoEffect 0.5s ease-in-out infinite",
  marginBottom: "10px",
};

const matheusReacao = {
  fontSize: "1.1rem",
  color: "#ff6b81",
  fontStyle: "italic",
};

const resultadoContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  width: "100%",
  textAlign: "center",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
  border: "4px solid #28a745",
};

const resultadoTitle = {
  fontSize: "2.5rem",
  color: "#28a745",
  marginBottom: "30px",
  animation: "celebration 2s ease-in-out infinite",
};

const pontuacaoFinal = {
  marginBottom: "30px",
};

const pontuacaoTexto = {
  fontSize: "1.2rem",
  color: "#495057",
  marginBottom: "10px",
};

const pontuacaoValor = {
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#28a745",
  lineHeight: "1",
};

const pontuacaoMax = {
  fontSize: "1rem",
  color: "#6c757d",
};

const avaliacaoContainer = {
  backgroundColor: "#f8f9fa",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #28a745",
};

const avaliacaoTitle = {
  color: "#495057",
  marginBottom: "20px",
};

const avaliacaoNivel = {
  textAlign: "center",
};

const nivelPerfecto = {
  color: "#ffc107",
};

const nivelBom = {
  color: "#17a2b8",
};

const nivelRegular = {
  color: "#6f42c1",
};

const nivelEmoji = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const nivelTexto = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "10px",
};

const nivelDesc = {
  fontSize: "1.1rem",
  fontStyle: "italic",
};

const resumoContainer = {
  backgroundColor: "rgba(255, 107, 129, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #ff6b81",
};

const resumoTitle = {
  color: "#ff6b81",
  marginBottom: "15px",
};

const descobertasList = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const descoberta = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "10px 15px",
  borderRadius: "10px",
  color: "#495057",
  fontWeight: "bold",
  textAlign: "left",
};

const mensagemPersonalizada = {
  backgroundColor: "rgba(40, 167, 69, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "30px",
  border: "3px solid #28a745",
};

const mensagemTitle = {
  color: "#28a745",
  marginBottom: "15px",
};

const mensagemTexto = {
  fontSize: "1.2rem",
  color: "#495057",
  fontStyle: "italic",
  lineHeight: "1.6",
};

const continuarButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  background: "linear-gradient(45deg, #ff6b81, #74b9ff)",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 15px 30px rgba(255, 107, 129, 0.4)",
  textTransform: "uppercase",
  letterSpacing: "1px",
};
