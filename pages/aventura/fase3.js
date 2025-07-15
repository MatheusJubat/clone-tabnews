// pages/aventura/fase3.js - Castelo Encantado Estilo Ghibli
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Fase3Ghibli() {
  const router = useRouter();
  const [resposta, setResposta] = useState(null);
  const [magicSpirits, setMagicSpirits] = useState([]);
  const [castleVisible, setCastleVisible] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [forestCats, setForestCats] = useState([]);

  useEffect(() => {
    // Espíritos mágicos flutuando (estilo Ghibli)
    const spirits = [];
    for (let i = 0; i < 15; i++) {
      spirits.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        emoji: ["🌸", "🍃", "✨", "🦋", "🌙"][Math.floor(Math.random() * 5)],
        speed: 3 + Math.random() * 4,
      });
    }
    setMagicSpirits(spirits);

    // Gatos da floresta encantada
    const cats = [
      { id: 1, emoji: "🐱🌸", x: 8, y: 80, name: "Totoro Cat" },
      { id: 2, emoji: "🦋🐱", x: 90, y: 75, name: "Butterfly Cat" },
      { id: 3, emoji: "🌙🐱", x: 12, y: 20, name: "Moon Cat" },
      { id: 4, emoji: "🍃🐱", x: 85, y: 25, name: "Wind Cat" },
    ];
    setForestCats(cats);

    // Animações sequenciais
    setTimeout(() => setCastleVisible(true), 600);
    setTimeout(() => setLibraryOpen(true), 1200);
  }, []);

  const avancar = () => {
    router.push("/aventura/fase4");
  };

  return (
    <div style={containerStyle}>
      {/* Fundo degradê estilo Ghibli */}
      <div style={ghibliBackground}></div>

      {/* Espíritos mágicos flutuando */}
      {magicSpirits.map((spirit) => (
        <div
          key={spirit.id}
          style={{
            ...spiritStyle,
            left: `${spirit.x}%`,
            top: `${spirit.y}%`,
            animationDelay: `${spirit.delay}s`,
            animationDuration: `${spirit.speed}s`,
          }}
        >
          {spirit.emoji}
        </div>
      ))}

      {/* Gatos da floresta */}
      {forestCats.map((cat) => (
        <div
          key={cat.id}
          style={{
            ...forestCatStyle,
            left: `${cat.x}%`,
            top: `${cat.y}%`,
          }}
        >
          <div style={catCharacter}>{cat.emoji}</div>
          <div style={catNameTag}>{cat.name}</div>
        </div>
      ))}

      {/* Elementos decorativos da floresta */}
      <div style={forestElements}>
        <div style={tree1}>🌳</div>
        <div style={tree2}>🌲</div>
        <div style={flower1}>🌺</div>
        <div style={flower2}>🌻</div>
        <div style={mushroom}>🍄</div>
      </div>

      <div style={contentContainer}>
        <div
          style={{
            ...castleContainer,
            transform: castleVisible
              ? "scale(1) rotateY(0deg)"
              : "scale(0.8) rotateY(-20deg)",
            opacity: castleVisible ? 1 : 0,
          }}
        >
          {/* Castelo no Céu inspirado */}
          <div style={castleHeader}>
            <div style={castleTowers}>
              <div style={tower1}>🏰</div>
              <div style={tower2}>🗼</div>
              <div style={tower3}>🏯</div>
            </div>
            <div style={castleFlag}>🚩</div>
          </div>

          <div style={castleMain}>
            <h1 style={titleStyle}>🌸 Castelo no Céu dos Gatinhos 🌸</h1>

            <div style={enchantedStory}>
              <div style={storyScroll}>
                <p style={ghibliText}>
                  Em uma floresta encantada, onde os espíritos da natureza
                  dançam entre as árvores,
                  <br />
                  ergue-se um castelo mágico guardado por gatos especiais...
                  <br />
                  Eles sussurram uma pergunta que ecoa pelas nuvens há
                  séculos...
                </p>
              </div>
            </div>

            {/* Biblioteca mágica */}
            <div
              style={{
                ...libraryContainer,
                maxHeight: libraryOpen ? "500px" : "0px",
                opacity: libraryOpen ? 1 : 0,
              }}
            >
              <h2 style={libraryTitle}>📚 Biblioteca das Memórias 📚</h2>

              <div style={magicalBooks}>
                {["📖", "📜", "📚", "📋", "📓"].map((book, index) => (
                  <div
                    key={index}
                    style={{
                      ...bookItem,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  >
                    {book}
                  </div>
                ))}
              </div>

              <div style={questionScroll}>
                <h3 style={ancientQuestion}>💌 A Pergunta dos Espíritos 💌</h3>
                <p style={questionText}>
                  Se você encontrasse uma carta de amor dele escondida em um
                  livro antigo, uma carta que ele escreveu mas nunca teve
                  coragem de entregar...
                  <br />O que seu coração mandaria você fazer?
                </p>

                <div style={heartSpirit}>💕</div>
              </div>

              {!resposta ? (
                <div style={optionsContainer}>
                  <button
                    onClick={() => setResposta("guardar")}
                    style={{ ...ghibliButton, backgroundColor: "#81C784" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1) translateY(-5px)";
                      e.target.style.boxShadow =
                        "0 15px 30px rgba(129, 199, 132, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1) translateY(0px)";
                      e.target.style.boxShadow =
                        "0 8px 20px rgba(129, 199, 132, 0.4)";
                    }}
                  >
                    🌸 Guardaria como um tesouro precioso 🌸
                  </button>

                  <button
                    onClick={() => setResposta("responder")}
                    style={{ ...ghibliButton, backgroundColor: "#FFB74D" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1) translateY(-5px)";
                      e.target.style.boxShadow =
                        "0 15px 30px rgba(255, 183, 77, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1) translateY(0px)";
                      e.target.style.boxShadow =
                        "0 8px 20px rgba(255, 183, 77, 0.4)";
                    }}
                  >
                    💌 Escreveria uma resposta ainda mais bonita 💌
                  </button>

                  <button
                    onClick={() => setResposta("emocionar")}
                    style={{ ...ghibliButton, backgroundColor: "#F06292" }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1) translateY(-5px)";
                      e.target.style.boxShadow =
                        "0 15px 30px rgba(240, 98, 146, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1) translateY(0px)";
                      e.target.style.boxShadow =
                        "0 8px 20px rgba(240, 98, 146, 0.4)";
                    }}
                  >
                    😭 Choraria de emoção no topo da torre mais alta 😭
                  </button>
                </div>
              ) : (
                <div style={responseContainer}>
                  <div style={ghibliResponse}>
                    <div style={spiritCelebration}>
                      <div style={celebratingSpirits}>
                        <span style={celebratingSpirit1}>🌸</span>
                        <span style={celebratingSpirit2}>💕</span>
                        <span style={celebratingSpirit3}>🦋</span>
                      </div>

                      <h3 style={responseTitle}>
                        ✨ Os Espíritos da Floresta Aprovam! ✨
                      </h3>

                      <p style={responseText}>
                        O castelo inteiro brilha com a pureza da sua resposta...
                        <br />
                        As flores desabrocham, os pássaros cantam,
                        <br />e o vento sussurra palavras de aprovação!
                      </p>

                      <div style={natureBlessing}>
                        <div style={blessingElements}>🌸🦋🌙✨🍃</div>
                      </div>
                    </div>

                    <button
                      onClick={avancar}
                      style={enchantedButton}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.15) rotate(2deg)";
                        e.target.style.background =
                          "linear-gradient(45deg, #81C784, #FFB74D, #F06292)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1) rotate(0deg)";
                        e.target.style.background =
                          "linear-gradient(45deg, #66BB6A, #42A5F5, #AB47BC)";
                      }}
                    >
                      🌸 Voar para a Próxima Aventura 🌸
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spiritFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-40px) rotate(180deg) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes ghibliEntrance {
          from {
            transform: scale(0.8) rotateY(-20deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotateY(0deg);
            opacity: 1;
          }
        }

        @keyframes forestSway {
          0%,
          100% {
            transform: rotate(-3deg) scale(1);
          }
          50% {
            transform: rotate(3deg) scale(1.05);
          }
        }

        @keyframes bookGlow {
          0%,
          100% {
            transform: scale(1) rotateY(0deg);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.1) rotateY(15deg);
            filter: brightness(1.2);
          }
        }

        @keyframes heartSpirit {
          0%,
          100% {
            transform: scale(1);
            filter: hue-rotate(0deg);
          }
          50% {
            transform: scale(1.3);
            filter: hue-rotate(60deg);
          }
        }

        @keyframes natureBless {
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

        @keyframes windSway {
          0%,
          100% {
            transform: translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateX(10px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Georgia", serif',
  color: "#2E7D32",
};

const ghibliBackground = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "linear-gradient(to bottom, #87CEEB 0%, #98FB98 30%, #90EE90 70%, #228B22 100%)",
  zIndex: 0,
};

const spiritStyle = {
  position: "absolute",
  fontSize: "1.5rem",
  animation: "spiritFloat infinite ease-in-out",
  pointerEvents: "none",
  zIndex: 1,
};

const forestCatStyle = {
  position: "absolute",
  textAlign: "center",
  zIndex: 10,
};

const catCharacter = {
  fontSize: "2rem",
  animation: "forestSway 4s ease-in-out infinite",
  cursor: "pointer",
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
};

const catNameTag = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  color: "#2E7D32",
  padding: "4px 8px",
  borderRadius: "10px",
  fontSize: "9px",
  fontWeight: "bold",
  marginTop: "5px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  border: "1px solid #81C784",
};

const forestElements = {
  position: "absolute",
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 1,
};

const tree1 = {
  position: "absolute",
  left: "5%",
  bottom: "0%",
  fontSize: "4rem",
  animation: "windSway 6s ease-in-out infinite",
};

const tree2 = {
  position: "absolute",
  right: "8%",
  bottom: "0%",
  fontSize: "3.5rem",
  animation: "windSway 6s ease-in-out infinite 2s",
};

const flower1 = {
  position: "absolute",
  left: "20%",
  bottom: "5%",
  fontSize: "2rem",
  animation: "forestSway 4s ease-in-out infinite",
};

const flower2 = {
  position: "absolute",
  right: "25%",
  bottom: "8%",
  fontSize: "1.8rem",
  animation: "forestSway 4s ease-in-out infinite 1s",
};

const mushroom = {
  position: "absolute",
  left: "15%",
  bottom: "2%",
  fontSize: "1.5rem",
  animation: "forestSway 5s ease-in-out infinite 3s",
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

const castleContainer = {
  transition: "all 2s cubic-bezier(0.4, 0, 0.2, 1)",
  transformStyle: "preserve-3d",
  maxWidth: "800px",
  width: "100%",
};

const castleHeader = {
  textAlign: "center",
  marginBottom: "20px",
  position: "relative",
};

const castleTowers = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  marginBottom: "10px",
};

const tower1 = {
  fontSize: "3rem",
  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  animation: "forestSway 6s ease-in-out infinite",
};

const tower2 = {
  fontSize: "3.5rem",
  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  animation: "forestSway 6s ease-in-out infinite 1s",
};

const tower3 = {
  fontSize: "3rem",
  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  animation: "forestSway 6s ease-in-out infinite 2s",
};

const castleFlag = {
  fontSize: "1.5rem",
  animation: "windSway 3s ease-in-out infinite",
};

const castleMain = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "35px",
  border: "4px solid #81C784",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(10px)",
};

const titleStyle = {
  fontSize: "2.2rem",
  textAlign: "center",
  background: "linear-gradient(45deg, #2E7D32, #66BB6A, #4CAF50)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "25px",
};

const enchantedStory = {
  textAlign: "center",
  marginBottom: "25px",
};

const storyScroll = {
  backgroundColor: "#F1F8E9",
  border: "3px solid #81C784",
  borderRadius: "15px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const ghibliText = {
  fontSize: "16px",
  lineHeight: "1.7",
  color: "#2E7D32",
  fontStyle: "italic",
  fontWeight: "500",
};

const libraryContainer = {
  overflow: "hidden",
  transition: "all 1.5s ease-in-out",
  backgroundColor: "rgba(129, 199, 132, 0.1)",
  borderRadius: "20px",
  padding: "20px",
  border: "2px solid #66BB6A",
};

const libraryTitle = {
  textAlign: "center",
  color: "#2E7D32",
  fontSize: "1.5rem",
  marginBottom: "20px",
};

const magicalBooks = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "25px",
};

const bookItem = {
  fontSize: "2rem",
  animation: "bookGlow 3s ease-in-out infinite",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const questionScroll = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #FFB74D",
  textAlign: "center",
};

const ancientQuestion = {
  color: "#FF8F00",
  fontSize: "1.3rem",
  marginBottom: "15px",
};

const questionText = {
  fontSize: "1.1rem",
  color: "#2E7D32",
  lineHeight: "1.6",
  marginBottom: "15px",
  fontWeight: "500",
};

const heartSpirit = {
  fontSize: "2rem",
  animation: "heartSpirit 2s ease-in-out infinite",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "20px",
};

const ghibliButton = {
  padding: "18px 25px",
  fontSize: "1rem",
  border: "3px solid #FFF",
  borderRadius: "20px",
  cursor: "pointer",
  color: "#FFF",
  fontWeight: "bold",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  fontFamily: "inherit",
};

const responseContainer = {
  textAlign: "center",
};

const ghibliResponse = {
  backgroundColor: "rgba(129, 199, 132, 0.1)",
  borderRadius: "20px",
  padding: "30px",
  border: "3px solid #81C784",
};

const spiritCelebration = {
  marginBottom: "25px",
};

const celebratingSpirits = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  marginBottom: "20px",
};

const celebratingSpirit1 = {
  fontSize: "2.5rem",
  animation: "spiritFloat 2s ease-in-out infinite",
};

const celebratingSpirit2 = {
  fontSize: "2.5rem",
  animation: "heartSpirit 2s ease-in-out infinite",
};

const celebratingSpirit3 = {
  fontSize: "2.5rem",
  animation: "spiritFloat 2s ease-in-out infinite 1s",
};

const responseTitle = {
  color: "#2E7D32",
  fontSize: "1.5rem",
  marginBottom: "15px",
};

const responseText = {
  fontSize: "1.1rem",
  color: "#388E3C",
  lineHeight: "1.6",
  marginBottom: "20px",
};

const natureBlessing = {
  textAlign: "center",
};

const blessingElements = {
  fontSize: "2rem",
  animation: "natureBless 3s ease-in-out infinite",
  letterSpacing: "0.3em",
};

const enchantedButton = {
  padding: "20px 40px",
  fontSize: "1.2rem",
  background: "linear-gradient(45deg, #66BB6A, #42A5F5, #AB47BC)",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 12px 25px rgba(102, 187, 106, 0.5)",
  fontFamily: "inherit",
};
