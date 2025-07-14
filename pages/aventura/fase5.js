import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Fase5AnimeCafe() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [anime, setAnime] = useState(null);
  const [sakuraPetals, setSakuraPetals] = useState([]);
  const [cafeCustomers, setCafeCustomers] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);

  const animeQuestions = [
    {
      pergunta: "Se vocês fossem um casal de anime, qual seria a vibe?",
      opcoes: [
        "💖 Naruto e Hinata - amor que cresceu devagar e com muito carinho",
        "🌸 Maomao e Jinshi - ela focada, ele apaixonado (Diário da Apotecária)",
        "⚔️ Como Tanjiro protegendo Nezuko - sempre um pelo outro (Demon Slayer)",
        "💎 Steven e Connie - crescendo juntos e se descobrindo (Steven Universe)",
      ],
      resposta: "Cada amor tem sua magia única, igual vocês dois! 💕",
    },
    {
      pergunta: "Qual seria o poder/habilidade especial do casal de vocês?",
      opcoes: [
        "🔥 Técnica de Respiração do Amor Eterno (Demon Slayer)",
        "💪 Shadow Monarch + Healing - ele protege, você cura (Solo Leveling)",
        "👁️ Sharingan do Coração - ler os sentimentos um do outro (Naruto)",
        "🧪 Poção da Felicidade Infinita (Diário da Apotecária)",
      ],
      resposta: "O verdadeiro poder é o amor que vocês construíram juntos! ⭐",
    },
    {
      pergunta:
        "Se fossem para o mundo de Attack on Titan, qual seria a missão de vocês?",
      opcoes: [
        "🏰 Proteger a humanidade juntos nas muralhas",
        "🕊️ Encontrar um lugar pacífico longe dos titãs",
        "💝 Ser a esperança e alegria em tempos sombrios",
        "🗺️ Explorar o mundo lá fora de mãos dadas",
      ],
      resposta: "Em qualquer mundo, vocês seriam a luz um do outro! 🌟",
    },
  ];

  useEffect(() => {
    // Criar pétalas de sakura
    const petals = [];
    for (let i = 0; i < 25; i++) {
      petals.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        delay: Math.random() * 5,
        speed: 3 + Math.random() * 4,
        emoji: ["🌸", "🌺", "🌷", "💮"][Math.floor(Math.random() * 4)],
      });
    }
    setSakuraPetals(petals);

    // Clientes do café (personagens dos animes que ela gosta)
    const customers = [
      {
        id: 1,
        emoji: "🍜🐱",
        x: 10,
        y: 75,
        name: "Naruto Neko",
        mood: "🍥",
      },
      {
        id: 2,
        emoji: "🧪🐱",
        x: 85,
        y: 70,
        name: "Maomao Cat",
        mood: "💊",
      },
      {
        id: 3,
        emoji: "⚔️🐱",
        x: 15,
        y: 25,
        name: "Tanjiro Cat",
        mood: "🌊",
      },
      {
        id: 4,
        emoji: "💎🐱",
        x: 80,
        y: 30,
        name: "Steven Cat",
        mood: "🛡️",
      },
    ];
    setCafeCustomers(customers);

    // Sequência de abertura
    setTimeout(() => setEtapaAtual(1), 1000);
    setTimeout(() => setMenuAberto(true), 2000);
  }, []);

  const responderPergunta = (perguntaIndex, opcaoIndex) => {
    setPontos(pontos + 100);
    setAnime(animeQuestions[perguntaIndex]);

    if (perguntaIndex < animeQuestions.length - 1) {
      setTimeout(() => {
        setEtapaAtual(perguntaIndex + 2);
        setAnime(null);
      }, 2500);
    } else {
      setTimeout(() => {
        setEtapaAtual(5); // Finalização
      }, 2500);
    }
  };

  const avancar = () => {
    router.push("/aventura/fase6");
  };

  return (
    <div style={containerStyle}>
      {/* Pétalas de sakura caindo */}
      {sakuraPetals.map((petal) => (
        <div
          key={petal.id}
          style={{
            ...petalStyle,
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.speed}s`,
          }}
        >
          {petal.emoji}
        </div>
      ))}

      {/* Clientes do café */}
      {cafeCustomers.map((customer) => (
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
        <div style={cafeContainer}>
          {/* Placa do Café */}
          <div style={cafeSign}>
            <h1 style={signTitle}>🌸 Café Otaku dos Gatinhos 🌸</h1>
            <div style={signSubtitle}>"Onde animes e amor se encontram" ✨</div>
          </div>

          {/* Entrada do café */}
          {etapaAtual === 0 && (
            <div style={welcomeContainer}>
              <div style={welcomeMessage}>
                <h2 style={welcomeTitle}>いらっしゃいませ！ (Bem-vinda!)</h2>
                <p style={welcomeText}>
                  Bem-vinda ao café mais kawaii do universo otaku! 🐾
                  <br />
                  Nossos gatinhos maids têm perguntas especiais sobre seus
                  animes favoritos!
                </p>
                <div style={loadingCats}>
                  <span style={loadingCat1}>😸</span>
                  <span style={loadingCat2}>🐱</span>
                  <span style={loadingCat3}>😻</span>
                </div>
              </div>
            </div>
          )}

          {/* Menu do café */}
          {etapaAtual >= 1 && etapaAtual <= 3 && (
            <div
              style={{
                ...menuContainer,
                transform: menuAberto
                  ? "scale(1) rotateY(0deg)"
                  : "scale(0.8) rotateY(-90deg)",
                opacity: menuAberto ? 1 : 0,
              }}
            >
              <div style={menuHeader}>
                <h2 style={menuTitle}>📋 Menu Kawaii das Perguntas 📋</h2>
                <div style={scoreDisplay}>
                  Pontos Moe: {pontos} ⭐ | Pergunta {etapaAtual}/3
                </div>
              </div>

              <div style={questionCard}>
                <div style={questionHeader}>
                  <div style={questionIcon}>🎌</div>
                  <h3 style={questionText}>
                    {animeQuestions[etapaAtual - 1].pergunta}
                  </h3>
                </div>

                {!anime ? (
                  <div style={optionsContainer}>
                    {animeQuestions[etapaAtual - 1].opcoes.map(
                      (opcao, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            responderPergunta(etapaAtual - 1, index)
                          }
                          style={{
                            ...animeButton,
                            backgroundColor: [
                              "#FF69B4",
                              "#87CEEB",
                              "#98FB98",
                              "#DDA0DD",
                            ][index],
                            animationDelay: `${index * 0.2}s`,
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform =
                              "scale(1.05) rotate(2deg)";
                            e.target.style.boxShadow =
                              "0 10px 25px rgba(255, 105, 180, 0.6)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1) rotate(0deg)";
                            e.target.style.boxShadow =
                              "0 6px 15px rgba(0, 0, 0, 0.3)";
                          }}
                        >
                          {opcao}
                        </button>
                      ),
                    )}
                  </div>
                ) : (
                  <div style={responseContainer}>
                    <div style={animeResponseCard}>
                      <div style={responseIcon}>✨</div>
                      <h4 style={responseTitle}>Resposta Kawaii!</h4>
                      <p style={responseText}>{anime.resposta}</p>
                      <div style={celebrationEmojis}>
                        <span style={celebration1}>🎉</span>
                        <span style={celebration2}>😸</span>
                        <span style={celebration3}>💖</span>
                        <span style={celebration4}>🌸</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Finalização */}
          {etapaAtual === 5 && (
            <div style={finalContainer}>
              <div style={finalCard}>
                <h2 style={finalTitle}>🏆 Certificado Otaku Obtido! 🏆</h2>

                <div style={certificateContainer}>
                  <div style={certificate}>
                    <div style={certificateHeader}>
                      <h3 style={certificateName}>Certificado de Amor Anime</h3>
                      <div style={certificateStamp}>🌸 OFICIAL 🌸</div>
                    </div>

                    <div style={certificateBody}>
                      <p style={certificateText}>
                        Este certificado declara que você possui:
                        <br />
                        ⭐ Nível Máximo de Kawaii
                        <br />
                        💖 Power of Love Ativado
                        <br />
                        🎯 Anime Knowledge: Expert nos seus favoritos
                        <br />
                        🐱 Cat Friendship: Legendary
                      </p>
                    </div>

                    <div style={animeReferences}>
                      <h4 style={referencesTitle}>
                        🎌 Seus Animes do Coração 🎌
                      </h4>
                      <div style={animeGrid}>
                        <div style={animeItem}>🍜 Naruto</div>
                        <div style={animeItem}>🧪 Diário da Apotecária</div>
                        <div style={animeItem}>⚔️ Demon Slayer</div>
                        <div style={animeItem}>💎 Steven Universe</div>
                        <div style={animeItem}>👁️ Jujutsu Kaisen</div>
                        <div style={animeItem}>🏰 Attack on Titan</div>
                        <div style={animeItem}>💪 Solo Leveling</div>
                        <div style={animeItem}>🧙‍♂️ Senhor dos Anéis</div>
                      </div>
                    </div>

                    <div style={certificateFooter}>
                      <div style={signature}>
                        Assinado por: Maid Cat Council 🐾
                      </div>
                      <div style={date}>
                        Data: {new Date().toLocaleDateString("pt-BR")} 📅
                      </div>
                    </div>
                  </div>
                </div>

                <div style={staffApproval}>
                  <h4 style={staffTitle}>💼 Aprovação da Staff Neko 💼</h4>
                  <div style={staffCats}>
                    <div style={staffMember}>
                      <div style={staffAvatar}>👑🐱</div>
                      <div style={staffRole}>Head Maid</div>
                      <div style={staffComment}>"Sugoi desu ne!" ⭐</div>
                    </div>
                    <div style={staffMember}>
                      <div style={staffAvatar}>🎀🐱</div>
                      <div style={staffRole}>Kawaii Expert</div>
                      <div style={staffComment}>"Moe moe kyun!" 💕</div>
                    </div>
                    <div style={staffMember}>
                      <div style={staffAvatar}>🌸🐱</div>
                      <div style={staffRole}>Love Advisor</div>
                      <div style={staffComment}>"Aishiteru yo!" 💖</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={avancar}
                  style={nextButton}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1) translateY(-5px)";
                    e.target.style.background =
                      "linear-gradient(45deg, #FF1493, #FF69B4, #FFB6C1, #FFC0CB)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1) translateY(0px)";
                    e.target.style.background =
                      "linear-gradient(45deg, #FF69B4, #FF1493, #9370DB)";
                  }}
                >
                  🚪 Próxima Dimensão Kawaii 🚪
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes sakuraFall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes customerSway {
          0%,
          100% {
            transform: scale(1) rotate(-3deg);
          }
          50% {
            transform: scale(1.1) rotate(3deg);
          }
        }

        @keyframes kawaiiBounce {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        @keyframes menuSlideIn {
          from {
            transform: scale(0.8) rotateY(-90deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotateY(0deg);
            opacity: 1;
          }
        }

        @keyframes buttonFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes celebrationSpin {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.3) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }

        @keyframes certificateShine {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
          }
          50% {
            box-shadow:
              0 0 40px rgba(255, 215, 0, 1),
              0 0 60px rgba(255, 215, 0, 0.8);
          }
        }

        @keyframes animeGlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// Todos os estilos permanecem iguais, apenas adicionando alguns novos
const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  background:
    "linear-gradient(135deg, #FFE4E1 0%, #FFF0F5 25%, #F0F8FF 50%, #E6E6FA 75%, #F5F5DC 100%)",
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ff69b4" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
  position: "relative",
  overflow: "hidden",
  padding: 0,
  margin: 0,
  fontFamily: '"Noto Sans JP", "Comic Sans MS", cursive',
};

const petalStyle = {
  position: "absolute",
  fontSize: "1.2rem",
  animation: "sakuraFall linear infinite",
  pointerEvents: "none",
  zIndex: 1,
};

const customerStyle = {
  position: "absolute",
  textAlign: "center",
  zIndex: 5,
};

const customerChar = {
  fontSize: "2rem",
  animation: "customerSway 4s ease-in-out infinite",
};

const customerMood = {
  fontSize: "1rem",
  marginTop: "2px",
};

const customerName = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#FF1493",
  padding: "2px 6px",
  borderRadius: "8px",
  fontSize: "8px",
  fontWeight: "bold",
  marginTop: "3px",
  border: "1px solid #FF69B4",
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

const cafeContainer = {
  maxWidth: "800px",
  width: "100%",
};

const cafeSign = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "25px",
  textAlign: "center",
  marginBottom: "25px",
  border: "4px solid #FF69B4",
  boxShadow: "0 15px 30px rgba(255, 105, 180, 0.4)",
  backdropFilter: "blur(10px)",
};

const signTitle = {
  fontSize: "2rem",
  background: "linear-gradient(45deg, #FF69B4, #FF1493, #9370DB)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "10px",
};

const signSubtitle = {
  fontSize: "1.1rem",
  color: "#666",
  fontStyle: "italic",
};

const welcomeContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
  padding: "30px",
  textAlign: "center",
  border: "3px solid #FF69B4",
  boxShadow: "0 15px 30px rgba(255, 105, 180, 0.3)",
};

const welcomeMessage = {
  color: "#2C3E50",
};

const welcomeTitle = {
  fontSize: "1.8rem",
  color: "#FF1493",
  marginBottom: "15px",
};

const welcomeText = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  marginBottom: "20px",
};

const loadingCats = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const loadingCat1 = {
  fontSize: "2rem",
  animation: "kawaiiBounce 1.5s ease-in-out infinite",
};

const loadingCat2 = {
  fontSize: "2rem",
  animation: "kawaiiBounce 1.5s ease-in-out infinite 0.5s",
};

const loadingCat3 = {
  fontSize: "2rem",
  animation: "kawaiiBounce 1.5s ease-in-out infinite 1s",
};

const menuContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
  padding: "25px",
  border: "3px solid #FF69B4",
  boxShadow: "0 20px 40px rgba(255, 105, 180, 0.4)",
  backdropFilter: "blur(10px)",
  transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
};

const menuHeader = {
  textAlign: "center",
  marginBottom: "20px",
};

const menuTitle = {
  fontSize: "1.5rem",
  color: "#FF1493",
  marginBottom: "10px",
};

const scoreDisplay = {
  backgroundColor: "rgba(255, 105, 180, 0.2)",
  color: "#FF1493",
  padding: "8px 15px",
  borderRadius: "15px",
  fontSize: "14px",
  fontWeight: "bold",
  border: "2px solid #FF69B4",
};

const questionCard = {
  backgroundColor: "rgba(255, 240, 245, 0.8)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #FFB6C1",
};

const questionHeader = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
};

const questionIcon = {
  fontSize: "2rem",
  marginRight: "15px",
};

const questionText = {
  fontSize: "1.2rem",
  color: "#2C3E50",
  margin: 0,
  flex: 1,
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const animeButton = {
  padding: "15px 20px",
  fontSize: "16px",
  border: "3px solid #FFF",
  borderRadius: "15px",
  cursor: "pointer",
  color: "#2C3E50",
  fontWeight: "bold",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
  fontFamily: "inherit",
  animation: "buttonFloat 3s ease-in-out infinite",
};

const responseContainer = {
  textAlign: "center",
};

const animeResponseCard = {
  backgroundColor: "rgba(255, 182, 193, 0.3)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #FF69B4",
};

const responseIcon = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const responseTitle = {
  color: "#FF1493",
  fontSize: "1.3rem",
  marginBottom: "10px",
};

const responseText = {
  color: "#2C3E50",
  fontSize: "1.1rem",
  marginBottom: "15px",
};

const celebrationEmojis = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
};

const celebration1 = {
  fontSize: "2rem",
  animation: "celebrationSpin 2s ease-in-out infinite",
};

const celebration2 = {
  fontSize: "2rem",
  animation: "celebrationSpin 2s ease-in-out infinite 0.2s",
};

const celebration3 = {
  fontSize: "2rem",
  animation: "celebrationSpin 2s ease-in-out infinite 0.4s",
};

const celebration4 = {
  fontSize: "2rem",
  animation: "celebrationSpin 2s ease-in-out infinite 0.6s",
};

const finalContainer = {
  textAlign: "center",
};

const finalCard = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "30px",
  border: "4px solid #FFD700",
  boxShadow: "0 25px 50px rgba(255, 215, 0, 0.4)",
  backdropFilter: "blur(15px)",
};

const finalTitle = {
  fontSize: "2rem",
  background: "linear-gradient(45deg, #FFD700, #FFA500)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: "25px",
};

const certificateContainer = {
  marginBottom: "25px",
};

const certificate = {
  backgroundColor: "#FFFACD",
  border: "4px solid #FFD700",
  borderRadius: "15px",
  padding: "20px",
  animation: "certificateShine 3s ease-in-out infinite",
};

const certificateHeader = {
  textAlign: "center",
  marginBottom: "15px",
};

const certificateName = {
  color: "#B8860B",
  fontSize: "1.4rem",
  marginBottom: "8px",
};

const certificateStamp = {
  color: "#FF1493",
  fontSize: "1rem",
  fontWeight: "bold",
};

const certificateBody = {
  marginBottom: "15px",
};

const certificateText = {
  color: "#2C3E50",
  fontSize: "14px",
  lineHeight: "1.8",
};

// Novo: seção de animes favoritos
const animeReferences = {
  backgroundColor: "rgba(255, 105, 180, 0.1)",
  borderRadius: "10px",
  padding: "15px",
  marginBottom: "15px",
};

const referencesTitle = {
  color: "#FF1493",
  fontSize: "1.1rem",
  marginBottom: "10px",
  textAlign: "center",
};

const animeGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "8px",
};

const animeItem = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "5px 8px",
  borderRadius: "10px",
  fontSize: "11px",
  color: "#FF1493",
  fontWeight: "bold",
  textAlign: "center",
  animation: "animeGlow 3s ease-in-out infinite",
};

const certificateFooter = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "12px",
  color: "#666",
};

const signature = {
  fontStyle: "italic",
};

const date = {
  fontWeight: "bold",
};

const staffApproval = {
  backgroundColor: "rgba(255, 105, 180, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #FF69B4",
};

const staffTitle = {
  color: "#FF1493",
  fontSize: "1.2rem",
  marginBottom: "15px",
};

const staffCats = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const staffMember = {
  textAlign: "center",
  minWidth: "120px",
};

const staffAvatar = {
  fontSize: "2rem",
  marginBottom: "5px",
};

const staffRole = {
  fontSize: "12px",
  color: "#666",
  fontWeight: "bold",
  marginBottom: "3px",
};

const staffComment = {
  fontSize: "11px",
  color: "#FF1493",
  fontStyle: "italic",
};

const nextButton = {
  padding: "18px 35px",
  fontSize: "1.2rem",
  background: "linear-gradient(45deg, #FF69B4, #FF1493, #9370DB)",
  color: "#FFF",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 12px 25px rgba(255, 105, 180, 0.5)",
  fontFamily: "inherit",
};
