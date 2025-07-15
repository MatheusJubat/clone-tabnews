// pages/aventura/fase5.js - Cinema & Séries Românticas
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Fase5Cinema() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostaCorreta, setRespostaCorreta] = useState(false);
  const [filmParticles, setFilmParticles] = useState([]);
  const [cinemaLights, setCinemaLights] = useState([]);

  const perguntasFilmes = [
    {
      tipo: "múltipla_escolha",
      pergunta:
        "Se vocês fossem um casal de filme, qual seria o gênero da história?",
      opcoes: [
        "🎬 Comédia Romântica - risos e amor garantidos",
        "🌟 Drama Épico - uma história inesquecível",
        "🏠 Slice of Life - momentos reais e especiais",
        "🎭 Musical - dançando pela vida juntos",
      ],
      feedback: "Toda história de amor tem seu próprio gênero especial! ❤️",
    },
    {
      tipo: "certo_errado",
      pergunta:
        "Verdadeiro ou Falso: Vocês já maratonaram uma série inteira em um dia?",
      opcoes: ["✅ Verdadeiro", "❌ Falso"],
      respostaCorreta: 0, // Verdadeiro
      feedback: {
        correto: "Eu sabia! Vocês são o casal maratona perfeito! 📺💕",
        errado:
          "Hmm... tenho certeza que já passaram horas assistindo juntos! 😄",
      },
    },
    {
      tipo: "múltipla_escolha",
      pergunta: "Qual seria o título do filme da história de vocês?",
      opcoes: [
        "💻 'Love.exe - Um Amor em Código'",
        "🐱 'Dois Corações e Mil Gatinhos'",
        "🌟 'A Programadora e seu Príncipe'",
        "🏡 'Construindo o Nosso Para Sempre'",
      ],
      feedback:
        "Qualquer título que seja, vai ser um sucesso de bilheteria! 🎬✨",
    },
    {
      tipo: "certo_errado",
      pergunta:
        "Verdadeiro ou Falso: Ela já riu tanto com ele que chorou de rir?",
      opcoes: ["✅ Verdadeiro", "❌ Falso"],
      respostaCorreta: 0, // Verdadeiro
      feedback: {
        correto: "As melhores histórias de amor têm muitas risadas! 😂💕",
        errado: "Tenho certeza que vocês já riram muito juntos! 😊",
      },
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

    setTimeout(() => setEtapaAtual(1), 1000);
  }, []);

  const responder = (opcaoIndex) => {
    const pergunta = perguntasFilmes[perguntaAtual];

    if (pergunta.tipo === "certo_errado") {
      const correto = opcaoIndex === pergunta.respostaCorreta;
      setRespostaCorreta(correto);
      setPontos(pontos + (correto ? 100 : 50));
    } else {
      setPontos(pontos + 75);
      setRespostaCorreta(true);
    }

    setTimeout(() => {
      if (perguntaAtual < perguntasFilmes.length - 1) {
        setPerguntaAtual(perguntaAtual + 1);
        setRespostaCorreta(false);
      } else {
        setEtapaAtual(2); // Finalização
      }
    }, 2500);
  };

  const avancar = () => {
    router.push("/aventura/fase6");
  };

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

      <div style={contentContainer}>
        {etapaAtual === 0 && (
          <div style={loadingContainer}>
            <div style={filmReel}>🎬</div>
            <p style={loadingText}>Preparando a sessão de cinema...</p>
          </div>
        )}

        {etapaAtual === 1 && (
          <div style={cinemaContainer}>
            <div style={screenContainer}>
              <h1 style={cinemaTitle}>🎬 Cinema do Amor 🎬</h1>
              <div style={subtitle}>
                "Sessão especial para casais apaixonados"
              </div>

              <div style={scoreBoard}>
                <div>
                  Pergunta: {perguntaAtual + 1}/{perguntasFilmes.length}
                </div>
                <div>Pontos: {pontos}</div>
              </div>

              <div style={questionContainer}>
                <div style={questionCard}>
                  <h3 style={questionText}>
                    {perguntasFilmes[perguntaAtual].pergunta}
                  </h3>

                  <div style={optionsContainer}>
                    {perguntasFilmes[perguntaAtual].opcoes.map(
                      (opcao, index) => (
                        <button
                          key={index}
                          onClick={() => responder(index)}
                          style={{
                            ...cinemaButton,
                            backgroundColor:
                              index % 2 === 0 ? "#e74c3c" : "#3498db",
                          }}
                        >
                          {opcao}
                        </button>
                      ),
                    )}
                  </div>

                  {respostaCorreta !== false && (
                    <div style={feedbackContainer}>
                      <div style={feedbackText}>
                        {perguntasFilmes[perguntaAtual].tipo === "certo_errado"
                          ? respostaCorreta
                            ? perguntasFilmes[perguntaAtual].feedback.correto
                            : perguntasFilmes[perguntaAtual].feedback.errado
                          : perguntasFilmes[perguntaAtual].feedback}
                      </div>
                      <div style={applause}>👏 👏 👏</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {etapaAtual === 2 && (
          <div style={finalContainer}>
            <div style={creditsContainer}>
              <h2 style={creditsTitle}>🏆 Fim da Sessão! 🏆</h2>

              <div style={finalScore}>
                <h3>Pontuação Final: {pontos}</h3>
                <div style={rating}>
                  {pontos >= 300 ? (
                    <div>⭐⭐⭐⭐⭐ Casal 5 Estrelas!</div>
                  ) : pontos >= 200 ? (
                    <div>⭐⭐⭐⭐ Quase perfeitos!</div>
                  ) : (
                    <div>⭐⭐⭐ Muito bom!</div>
                  )}
                </div>
              </div>

              <div style={reviewContainer}>
                <h4 style={reviewTitle}>📝 Crítica do Cinema</h4>
                <p style={reviewText}>
                  "Uma história de amor autêntica e envolvente. Com direito a
                  risadas, cumplicidade e muito carinho. Recomendado para todos
                  que acreditam no amor verdadeiro!"
                </p>
                <div style={reviewSignature}>
                  ⭐⭐⭐⭐⭐ - Crítico dos Gatinhos
                </div>
              </div>

              <button
                onClick={avancar}
                style={nextButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.background =
                    "linear-gradient(45deg, #e74c3c, #3498db)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.background =
                    "linear-gradient(45deg, #9b59b6, #e74c3c)";
                }}
              >
                🎭 Próxima Atração 🎭
              </button>
            </div>
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
  color: "#ecf0f1",
};

const cinemaContainer = {
  width: "100%",
  maxWidth: "700px",
};

const screenContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "20px",
  padding: "40px",
  border: "5px solid #34495e",
  animation: "screenGlow 3s ease-in-out infinite",
};

const cinemaTitle = {
  fontSize: "2.5rem",
  textAlign: "center",
  color: "#e74c3c",
  marginBottom: "10px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
};

const subtitle = {
  textAlign: "center",
  color: "#bdc3c7",
  marginBottom: "30px",
  fontStyle: "italic",
};

const scoreBoard = {
  display: "flex",
  justifyContent: "space-between",
  background: "rgba(52, 73, 94, 0.8)",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "30px",
  color: "#ecf0f1",
  fontWeight: "bold",
};

const questionContainer = {
  textAlign: "center",
};

const questionCard = {
  background: "rgba(44, 62, 80, 0.8)",
  borderRadius: "15px",
  padding: "30px",
  border: "2px solid #3498db",
};

const questionText = {
  fontSize: "1.4rem",
  color: "#ecf0f1",
  marginBottom: "25px",
  lineHeight: "1.6",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "20px",
};

const cinemaButton = {
  padding: "15px 20px",
  fontSize: "1.1rem",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  border: "2px solid transparent",
};

const feedbackContainer = {
  background: "rgba(39, 174, 96, 0.8)",
  borderRadius: "10px",
  padding: "20px",
  marginTop: "20px",
};

const feedbackText = {
  fontSize: "1.1rem",
  marginBottom: "10px",
  color: "#fff",
};

const applause = {
  fontSize: "1.5rem",
};

const finalContainer = {
  width: "100%",
  maxWidth: "600px",
  textAlign: "center",
};

const creditsContainer = {
  background: "rgba(0, 0, 0, 0.9)",
  borderRadius: "20px",
  padding: "40px",
  border: "3px solid #e74c3c",
};

const creditsTitle = {
  color: "#e74c3c",
  fontSize: "2rem",
  marginBottom: "25px",
};

const finalScore = {
  background: "rgba(52, 73, 94, 0.8)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
};

const rating = {
  fontSize: "1.3rem",
  color: "#f39c12",
  marginTop: "10px",
};

const reviewContainer = {
  background: "rgba(44, 62, 80, 0.8)",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "30px",
  textAlign: "left",
};

const reviewTitle = {
  color: "#3498db",
  marginBottom: "15px",
};

const reviewText = {
  lineHeight: "1.6",
  marginBottom: "15px",
  fontStyle: "italic",
};

const reviewSignature = {
  textAlign: "right",
  color: "#f39c12",
  fontWeight: "bold",
};

const nextButton = {
  padding: "18px 35px",
  fontSize: "1.2rem",
  background: "linear-gradient(45deg, #9b59b6, #e74c3c)",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  textTransform: "uppercase",
};
