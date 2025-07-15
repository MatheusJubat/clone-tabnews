// pages/aventura/quiz-personalizado.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function QuizPersonalizado() {
  const router = useRouter();
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [respostaCorreta, setRespostaCorreta] = useState(false);
  const [animacaoGato, setAnimacaoGato] = useState("");
  const [gatosTorcendo, setGatosTorcendo] = useState([]);
  const [confettiAtivo, setConfettiAtivo] = useState(false);

  const perguntas = [
    {
      tipo: "múltipla_escolha",
      pergunta:
        "Quantos empregos o Matheus teve desde que vocês começaram a namorar?",
      opcoes: [
        "25 empregos (ele é um workaholic son)",
        "30 empregos (mudou de empresa mais que de roupa)",
        "5 empregos (a resposta normal)",
        "2 empregos (tá de boa)",
      ],
      correta: 2,
      explicacao: "Foram 5 empregos! O Matheus é dedicado mas não é maluco! 😂",
      piada: "Pelo menos não mudou mais que a Millena muda de playlist son! 🎵",
    },
    {
      tipo: "verdadeiro_falso",
      pergunta: "Verdadeiro ou Falso: A Millena tem medo de borboletas",
      opcoes: ["🦋 Verdadeiro (coitadinha)", "❌ Falso"],
      correta: 0,
      explicacao: "VERDADEIRO! As borboletas são o kryptonite da Millena! 😱🦋",
      piada: "Imagina ela num jardim botânico... seria só correria! 🏃‍♀️💨",
    },
    {
      tipo: "múltipla_escolha",
      pergunta: "O que mais incomoda a Millena no Matheus?",
      opcoes: [
        "🎮 Ele não quer jogar Far Cry",
        "😴 Ronca às vezes",
        "🍕 Come a última fatia da pizza",
        "📱 Demora pra responder mensagem",
        "🤷‍♂️ Todas as opções acima son",
      ],
      correta: 4,
      explicacao:
        "TODAS AS OPÇÕES! O Matheus é um pacote completo de pequenas irritações! 😂",
      piada: "Mas ela ama ele mesmo assim... que fofa! 💕",
      gatoEspecial: "triste_chorando",
    },
    {
      tipo: "múltipla_escolha",
      pergunta: "Onde foi o primeiro encontro de vocês?",
      opcoes: [
        "🍔 McDonald's (clássico)",
        "🏠 Na casa dela (Netflix and chill)",
        "🍺 No Seu Barzin (histórico!)",
        "🎬 Cinema (romântico)",
      ],
      correta: 2,
      explicacao:
        "No Seu Barzin no dia 4 de setembro de 2022! Data histórica! 🍻✨",
      piada: "E o Matheus achando que ia ser sequestrado por um veio! KKKKK 😂",
    },
    {
      tipo: "verdadeiro_falso",
      pergunta: "O Matheus pensou que ia ser sequestrado no primeiro encontro?",
      opcoes: ["😂 Verdadeiro (paranóico)", "❌ Falso"],
      correta: 0,
      explicacao:
        "VERDADEIRO! Ele achou que era bom demais pra ser verdade! 😂",
      piada: "Spoiler: não foi sequestrado, foi conquistado! 💘",
    },
    {
      tipo: "múltipla_escolha",
      pergunta: "Complete a frase: 'Eu não gosto...'",
      opcoes: [
        "🙄 Eu não gosto",
        "😤 Eu não gostoson",
        "🤨 Eu não gosto não",
        "😠 Eu não gosto mesmo",
      ],
      correta: 1,
      explicacao: "É 'EU NÃO GOSTOSON'! A linguagem oficial do casal! 😂",
      piada: "Se não falar 'son' no final, não é conversa de vocês! 🗣️",
    },
  ];

  useEffect(() => {
    // Gatos torcendo
    const cats = [];
    for (let i = 0; i < 6; i++) {
      cats.push({
        id: i,
        emoji: ["😸", "😻", "🐱", "😺", "🙀", "😿"][i],
        x: 15 + i * 14,
        animação: `torcida${i + 1}`,
      });
    }
    setGatosTorcendo(cats);
  }, []);

  const responder = async (opcaoIndex) => {
    const pergunta = perguntas[perguntaAtual];
    const correto = opcaoIndex === pergunta.correta;

    setRespostaCorreta(correto);

    if (correto) {
      setPontos(pontos + 100);
      setAnimacaoGato("feliz");

      // Confetti para resposta certa
      if (typeof window !== "undefined") {
        const { default: confetti } = await import("canvas-confetti");
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      setAnimacaoGato(pergunta.gatoEspecial || "triste");
    }

    // Próxima pergunta ou finalizar
    setTimeout(() => {
      if (perguntaAtual < perguntas.length - 1) {
        setPerguntaAtual(perguntaAtual + 1);
        setRespostaCorreta(false);
        setAnimacaoGato("");
      } else {
        finalizarQuiz();
      }
    }, 3000);
  };

  const finalizarQuiz = () => {
    router.push("/aventura/fase-final");
  };

  const pergunta = perguntas[perguntaAtual];

  return (
    <div style={containerStyle}>
      {/* Gatos torcendo */}
      <div style={torcidaContainer}>
        {gatosTorcendo.map((gato) => (
          <div
            key={gato.id}
            style={{
              ...gatoTorcida,
              left: `${gato.x}%`,
              animationName: gato.animação,
            }}
          >
            {gato.emoji}
          </div>
        ))}
      </div>

      <div style={contentContainer}>
        <div style={quizContainer}>
          {/* Header */}
          <div style={headerContainer}>
            <h1 style={titleStyle}>🎭 Quiz do Relacionamento 🎭</h1>
            <div style={subtitleStyle}>
              "Teste seus conhecimentos sobre o casal mais fofo son!"
            </div>

            <div style={progressContainer}>
              <div style={progressText}>
                Pergunta {perguntaAtual + 1} de {perguntas.length}
              </div>
              <div style={scoreText}>Pontuação: {pontos}</div>
            </div>
          </div>

          {/* Pergunta */}
          <div style={questionContainer}>
            <h2 style={questionText}>{pergunta.pergunta}</h2>

            {/* Gato reagindo */}
            <div style={gatoReacao}>
              <div
                style={{
                  ...gatoEmoji,
                  animation: animacaoGato
                    ? `${animacaoGato} 2s ease-in-out infinite`
                    : "none",
                }}
              >
                {animacaoGato === "feliz"
                  ? "😸"
                  : animacaoGato === "triste_chorando"
                    ? "😿"
                    : animacaoGato === "triste"
                      ? "🙀"
                      : "🐱"}
              </div>

              {animacaoGato === "triste_chorando" && (
                <div style={chorandoAnimation}>
                  <div style={lagrima1}>💧</div>
                  <div style={lagrima2}>💧</div>
                  <div style={gatoSadText}>
                    "Ai que dó do Matheus... a Millena reclama de tudo mesmo!
                    😿"
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Opções */}
          {!respostaCorreta && animacaoGato === "" && (
            <div style={optionsContainer}>
              {pergunta.opcoes.map((opcao, index) => (
                <button
                  key={index}
                  onClick={() => responder(index)}
                  style={{
                    ...optionButton,
                    backgroundColor: index % 2 === 0 ? "#e74c3c" : "#3498db",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05) rotate(2deg)";
                    e.target.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
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
          )}

          {/* Feedback */}
          {respostaCorreta !== false && (
            <div style={feedbackContainer}>
              <div style={feedbackHeader}>
                {respostaCorreta
                  ? "🎉 ACERTOU SON! 🎉"
                  : "😅 ERROU, MAS TÁ TUDO BEM! 😅"}
              </div>

              <div style={explicacaoBox}>
                <p style={explicacaoText}>{pergunta.explicacao}</p>
                <p style={piadaText}>{pergunta.piada}</p>
              </div>

              <div style={pontuacaoFeedback}>
                {respostaCorreta
                  ? "+100 pontos!"
                  : "+50 pontos pela tentativa!"}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes feliz {
          0%,
          100% {
            transform: scale(1) rotate(-5deg);
          }
          50% {
            transform: scale(1.3) rotate(5deg);
          }
        }

        @keyframes triste {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.8) rotateY(180deg);
          }
        }

        @keyframes triste_chorando {
          0%,
          100% {
            transform: scale(1) rotate(-2deg);
          }
          25% {
            transform: scale(1.1) rotate(2deg);
          }
          50% {
            transform: scale(0.9) rotate(-3deg);
          }
          75% {
            transform: scale(1.05) rotate(1deg);
          }
        }

        @keyframes torcida1 {
          0%,
          100% {
            transform: translateY(0px) rotate(-5deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes torcida2 {
          0%,
          100% {
            transform: translateY(0px) rotate(5deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }

        @keyframes torcida3 {
          0%,
          100% {
            transform: translateY(0px) rotate(-3deg);
          }
          50% {
            transform: translateY(-8px) rotate(3deg);
          }
        }

        @keyframes torcida4 {
          0%,
          100% {
            transform: translateY(0px) rotate(7deg);
          }
          50% {
            transform: translateY(-12px) rotate(-7deg);
          }
        }

        @keyframes torcida5 {
          0%,
          100% {
            transform: translateY(0px) rotate(-6deg);
          }
          50% {
            transform: translateY(-9px) rotate(6deg);
          }
        }

        @keyframes torcida6 {
          0%,
          100% {
            transform: translateY(0px) rotate(4deg);
          }
          50% {
            transform: translateY(-11px) rotate(-4deg);
          }
        }

        @keyframes lagrimas {
          0% {
            transform: translateY(0px);
            opacity: 1;
          }
          100% {
            transform: translateY(50px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  fontFamily: '"Comic Sans MS", cursive',
  color: "#fff",
  position: "relative",
  overflow: "hidden",
};

const torcidaContainer = {
  position: "absolute",
  top: "10%",
  width: "100%",
  height: "80px",
  zIndex: 1,
};

const gatoTorcida = {
  position: "absolute",
  fontSize: "2rem",
  animationDuration: "2s",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
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
  border: "4px solid #ff69b4",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
  color: "#333",
};

const headerContainer = {
  textAlign: "center",
  marginBottom: "30px",
};

const titleStyle = {
  fontSize: "2.5rem",
  background: "linear-gradient(45deg, #ff69b4, #9966cc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "10px",
};

const subtitleStyle = {
  fontSize: "1.2rem",
  color: "#666",
  fontStyle: "italic",
  marginBottom: "20px",
};

const progressContainer = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#f8f9fa",
  padding: "15px",
  borderRadius: "15px",
  border: "2px solid #ff69b4",
};

const progressText = {
  fontWeight: "bold",
  color: "#ff69b4",
};

const scoreText = {
  fontWeight: "bold",
  color: "#9966cc",
};

const questionContainer = {
  textAlign: "center",
  marginBottom: "30px",
};

const questionText = {
  fontSize: "1.5rem",
  color: "#333",
  marginBottom: "25px",
  lineHeight: "1.4",
};

const gatoReacao = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "20px",
};

const gatoEmoji = {
  fontSize: "4rem",
  marginBottom: "15px",
};

const chorandoAnimation = {
  position: "relative",
  textAlign: "center",
};

const lagrima1 = {
  position: "absolute",
  left: "-20px",
  top: "-10px",
  fontSize: "1.5rem",
  animation: "lagrimas 2s ease-in-out infinite",
};

const lagrima2 = {
  position: "absolute",
  right: "-20px",
  top: "-10px",
  fontSize: "1.5rem",
  animation: "lagrimas 2s ease-in-out infinite 0.5s",
};

const gatoSadText = {
  backgroundColor: "rgba(255, 107, 107, 0.2)",
  border: "2px solid #ff6b6b",
  borderRadius: "15px",
  padding: "15px",
  color: "#d63031",
  fontStyle: "italic",
  fontSize: "1rem",
  marginTop: "10px",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "30px",
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

const feedbackContainer = {
  textAlign: "center",
  backgroundColor: "#f8f9fa",
  borderRadius: "20px",
  padding: "25px",
  border: "3px solid #28a745",
};

const feedbackHeader = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#28a745",
  marginBottom: "15px",
};

const explicacaoBox = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "15px",
  border: "2px solid #ff69b4",
};

const explicacaoText = {
  fontSize: "1.1rem",
  color: "#333",
  marginBottom: "10px",
  fontWeight: "bold",
};

const piadaText = {
  fontSize: "1rem",
  color: "#666",
  fontStyle: "italic",
  margin: 0,
};

const pontuacaoFeedback = {
  fontSize: "1.2rem",
  color: "#ffd700",
  fontWeight: "bold",
  background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
