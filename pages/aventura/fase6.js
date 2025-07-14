import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Fase6StevenUniverse() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [gemaEscolhida, setGemaEscolhida] = useState(null);
  const [fusionCompleta, setFusionCompleta] = useState(false);
  const [partituras, setPartituras] = useState([]);
  const [musicaCompleta, setMusicaCompleta] = useState(false);
  const [cristaisColetados, setCristaisColetados] = useState(0);
  const [gemCats, setGemCats] = useState([]);

  const gemas = [
    {
      nome: "Ametista",
      cor: "#9966CC",
      emoji: "💜",
      personalidade: "Divertida e espontânea",
      poder: "Shapeshifting do Coração",
    },
    {
      nome: "Pérola",
      cor: "#FFE4E1",
      emoji: "🤍",
      personalidade: "Organizada e carinhosa",
      poder: "Perfection in Love",
    },
    {
      nome: "Garnet",
      cor: "#DC143C",
      emoji: "❤️",
      personalidade: "Sábia e protetora",
      poder: "Future Vision do Amor",
    },
    {
      nome: "Quartzo Rosa",
      cor: "#FF69B4",
      emoji: "💖",
      personalidade: "Amorosa e compreensiva",
      poder: "Healing Love Powers",
    },
  ];

  const notasMusica = ["🎵", "🎶", "🎼", "🎹", "🎺", "🎻"];

  useEffect(() => {
    // Gatos das Gemas
    const cats = [
      { id: 1, emoji: "💜🐱", x: 10, y: 80, name: "Amethyst Cat" },
      { id: 2, emoji: "🤍🐱", x: 85, y: 75, name: "Pearl Cat" },
      { id: 3, emoji: "❤️🐱", x: 15, y: 20, name: "Garnet Cat" },
      { id: 4, emoji: "💖🐱", x: 80, y: 25, name: "Rose Cat" },
    ];
    setGemCats(cats);

    // Animação das estrelas
    const interval = setInterval(() => {
      const star = document.createElement("div");
      star.innerHTML = "⭐";
      star.style.position = "absolute";
      star.style.left = Math.random() * window.innerWidth + "px";
      star.style.top = "0px";
      star.style.fontSize = "20px";
      star.style.pointerEvents = "none";
      star.style.animation = "fallingStar 3s linear forwards";
      star.style.zIndex = "1";
      document.body.appendChild(star);

      setTimeout(() => {
        if (star.parentNode) {
          star.parentNode.removeChild(star);
        }
      }, 3000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const escolherGema = (gema) => {
    setGemaEscolhida(gema);
    setTimeout(() => {
      setEtapaAtual(1);
    }, 1500);
  };

  const tocarNota = (nota) => {
    setPartituras([...partituras, nota]);
    if (partituras.length >= 5) {
      setMusicaCompleta(true);
      setTimeout(() => {
        setEtapaAtual(2);
      }, 2000);
    }
  };

  const coletarCristal = () => {
    setCristaisColetados(cristaisColetados + 1);
    if (cristaisColetados >= 2) {
      setFusionCompleta(true);
      setTimeout(() => {
        router.push("/aventura/fase7");
      }, 3000);
    }
  };

  const avancar = () => {
    router.push("/aventura/fase7");
  };

  return (
    <div style={containerStyle}>
      {/* Templo das Gemas background */}
      <div style={templeBackground}>
        <div style={templeShape}></div>
      </div>

      {/* Gatos das Gemas */}
      {gemCats.map((cat) => (
        <div
          key={cat.id}
          style={{
            ...gemCatStyle,
            left: `${cat.x}%`,
            top: `${cat.y}%`,
          }}
        >
          <div style={gemCatChar}>{cat.emoji}</div>
          <div style={gemCatName}>{cat.name}</div>
        </div>
      ))}

      <div style={contentContainer}>
        {etapaAtual === 0 && (
          <div style={sectionContainer}>
            <h1 style={titleStyle}>💎 O TEMPLO DAS GEMAS DO AMOR 💎</h1>
            <p style={subtitleStyle}>
              Steven e os Crystal Gems prepararam um teste especial!
              <br />
              Para descobrir o segredo do amor verdadeiro, você deve escolher
              uma Gema que represente seu coração e formar uma fusão perfeita!
              ✨
            </p>

            <div style={stevenContainer}>
              <div style={stevenAvatar}>👦🌟</div>
              <div style={stevenSpeech}>
                "Ei! Eu sou Steven! As Gems querem te conhecer melhor! Escolha
                uma que combine com você!" 🎸
              </div>
            </div>

            <div style={gemasContainer}>
              {gemas.map((gema, index) => (
                <div
                  key={index}
                  style={{
                    ...gemaCard,
                    backgroundColor: gema.cor,
                    transform:
                      gemaEscolhida === gema
                        ? "scale(1.2) rotate(360deg)"
                        : "scale(1)",
                    boxShadow:
                      gemaEscolhida === gema
                        ? `0 0 30px ${gema.cor}`
                        : `0 0 15px ${gema.cor}`,
                  }}
                  onClick={() => escolherGema(gema)}
                >
                  <div style={gemaEmoji}>{gema.emoji}</div>
                  <h3 style={gemaNome}>{gema.nome}</h3>
                  <p style={gemaPersonalidade}>{gema.personalidade}</p>
                  <div style={gemaPoder}>{gema.poder}</div>
                </div>
              ))}
            </div>

            {gemaEscolhida && (
              <div style={fusionMessage}>
                <h2 style={fusionTitle}>
                  ✨ Fusão iniciada com {gemaEscolhida.nome}! ✨
                </h2>
                <div style={fusionEffect}>
                  <span style={fusionParticle1}>💫</span>
                  <span style={fusionParticle2}>⭐</span>
                  <span style={fusionParticle3}>✨</span>
                </div>
                <p>O poder do amor está se manifestando...</p>
              </div>
            )}
          </div>
        )}

        {etapaAtual === 1 && (
          <div style={sectionContainer}>
            <h1 style={titleStyle}>🎵 COMPOSE A CANÇÃO DO AMOR 🎵</h1>
            <p style={subtitleStyle}>
              Como Steven, você deve criar uma melodia que toque o coração!
              <br />
              As Gems dizem que a música é a linguagem universal do amor! 🎸
            </p>

            <div style={pearlContainer}>
              <div style={pearlAvatar}>👩‍🎤💎</div>
              <div style={pearlSpeech}>
                "A música conecta corações através do espaço e tempo! Toque com
                seu coração!" 🎼
              </div>
            </div>

            <div style={musicContainer}>
              <div style={partituraDisplay}>
                <h3 style={partituraTitle}>🎼 Sua Melodia do Amor 🎼</h3>
                <div style={notasVisuais}>
                  {partituras.map((nota, index) => (
                    <span key={index} style={notaStyle}>
                      {nota}
                    </span>
                  ))}
                </div>
                {partituras.length === 0 && (
                  <p style={placeholderText}>
                    Clique nas notas para compor sua música!
                  </p>
                )}
              </div>

              <div style={instrumentos}>
                <h4 style={instrumentTitle}>🎹 Instrumentos Mágicos 🎹</h4>
                <div style={notasContainer}>
                  {notasMusica.map((nota, index) => (
                    <button
                      key={index}
                      style={{
                        ...notaButton,
                        backgroundColor: [
                          "#9966CC",
                          "#FFE4E1",
                          "#DC143C",
                          "#FF69B4",
                          "#87CEEB",
                          "#98FB98",
                        ][index],
                      }}
                      onClick={() => tocarNota(nota)}
                    >
                      {nota}
                    </button>
                  ))}
                </div>
              </div>

              <p style={progressStyle}>
                Notas na melodia: {partituras.length}/6 🎵
              </p>
            </div>

            {musicaCompleta && (
              <div style={successMessage}>
                <h2 style={successTitle}>
                  🌟 Melodia perfeita! A fusão está quase completa! 🌟
                </h2>
                <div style={musicSuccess}>
                  <span style={musicNote1}>🎵</span>
                  <span style={musicNote2}>💖</span>
                  <span style={musicNote3}>🎶</span>
                </div>
              </div>
            )}
          </div>
        )}

        {etapaAtual === 2 && (
          <div style={sectionContainer}>
            <h1 style={titleStyle}>💖 COLETA DOS CRISTAIS DO AMOR 💖</h1>
            <p style={subtitleStyle}>
              Garnet sente que você está pronta para o teste final!
              <br />
              Colete os cristais especiais para completar a fusão do amor
              verdadeiro! 💎
            </p>

            <div style={garnetContainer}>
              <div style={garnetAvatar}>👩‍❤️‍👩🕶️</div>
              <div style={garnetSpeech}>
                "Eu posso ver o futuro... e vocês dois têm um lindo destino
                juntos! Mas primeiro, prove que seu amor é verdadeiro!" ❤️
              </div>
            </div>

            <div style={cristaisContainer}>
              <div style={cristalButton} onClick={coletarCristal}>
                <div style={cristalEmoji}>💎</div>
                <div style={cristalName}>Cristal da Confiança</div>
                <div style={cristalDesc}>Base do amor verdadeiro</div>
              </div>
              <div style={cristalButton} onClick={coletarCristal}>
                <div style={cristalEmoji}>💎</div>
                <div style={cristalName}>Cristal da Felicidade</div>
                <div style={cristalDesc}>Alegria compartilhada</div>
              </div>
              <div style={cristalButton} onClick={coletarCristal}>
                <div style={cristalEmoji}>💎</div>
                <div style={cristalName}>Cristal da Cumplicidade</div>
                <div style={cristalDesc}>Conexão de almas</div>
              </div>
            </div>

            <p style={progressStyle}>
              Cristais coletados: {cristaisColetados}/3 💎
            </p>

            {fusionCompleta && (
              <div style={finalFusion}>
                <h1 style={fusionCompleteStyle}>✨💖 FUSÃO COMPLETA! 💖✨</h1>
                <div style={fusionGem}>
                  <div style={fusionAvatar}>💑✨</div>
                </div>
                <p style={fusionDescription}>
                  Incrível! Vocês dois se tornaram uma fusão perfeita de amor,
                  confiança e felicidade!
                  <br />
                  Como Garnet sempre diz: "O amor é a resposta para tudo!"
                  <br />
                  Steven está super orgulhoso de vocês! 🌟
                </p>

                <div style={allGemsApproval}>
                  <h3 style={approvalTitle}>
                    💎 Aprovação das Crystal Gems 💎
                  </h3>
                  <div style={gemsReaction}>
                    <div style={gemReaction}>
                      <div style={reactionAvatar}>💜</div>
                      <div style={reactionText}>"Radical!" - Amethyst</div>
                    </div>
                    <div style={gemReaction}>
                      <div style={reactionAvatar}>🤍</div>
                      <div style={reactionText}>"Perfeito!" - Pearl</div>
                    </div>
                    <div style={gemReaction}>
                      <div style={reactionAvatar}>❤️</div>
                      <div style={reactionText}>"Destinados!" - Garnet</div>
                    </div>
                    <div style={gemReaction}>
                      <div style={reactionAvatar}>💖</div>
                      <div style={reactionText}>"Lindo!" - Rose Quartz</div>
                    </div>
                  </div>
                </div>

                <button onClick={avancar} style={nextButton}>
                  🌟 Próxima Dimensão Cristal 🌟
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fallingStar {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes gemGlow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes fusionSpin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes musicFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes crystalShine {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.6);
          }
          50% {
            box-shadow:
              0 0 40px rgba(255, 105, 180, 1),
              0 0 60px rgba(255, 105, 180, 0.8);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Comic Sans MS", cursive',
};

const templeBackground = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0.1,
};

const templeShape = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  height: "300px",
  background: "conic-gradient(from 0deg, #ff69b4, #9966cc, #00bfff, #ff1493)",
  borderRadius: "50%",
  animation: "gemGlow 3s ease-in-out infinite",
};

const gemCatStyle = {
  position: "absolute",
  textAlign: "center",
  zIndex: 10,
};

const gemCatChar = {
  fontSize: "2rem",
  animation: "gemGlow 3s ease-in-out infinite",
};

const gemCatName = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#764ba2",
  padding: "4px 8px",
  borderRadius: "10px",
  fontSize: "10px",
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

const sectionContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
  padding: "40px",
  maxWidth: "800px",
  textAlign: "center",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  border: "3px solid #ff69b4",
};

const titleStyle = {
  fontSize: "32px",
  marginBottom: "20px",
  background: "linear-gradient(45deg, #ff69b4, #9966cc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
};

const subtitleStyle = {
  fontSize: "18px",
  marginBottom: "30px",
  color: "#555",
  lineHeight: "1.6",
};

const stevenContainer = {
  backgroundColor: "rgba(255, 192, 203, 0.3)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "30px",
  border: "2px solid #ff69b4",
};

const stevenAvatar = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const stevenSpeech = {
  fontSize: "16px",
  color: "#333",
  fontStyle: "italic",
};

const gemasContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const gemaCard = {
  padding: "20px",
  borderRadius: "15px",
  cursor: "pointer",
  transition: "all 0.5s ease",
  border: "3px solid white",
  color: "white",
  fontWeight: "bold",
};

const gemaEmoji = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const gemaNome = {
  margin: "10px 0",
  fontSize: "20px",
};

const gemaPersonalidade = {
  fontSize: "14px",
  opacity: 0.9,
  marginBottom: "10px",
};

const gemaPoder = {
  fontSize: "12px",
  fontStyle: "italic",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  padding: "5px 10px",
  borderRadius: "10px",
};

const fusionMessage = {
  padding: "20px",
  backgroundColor: "#ffe4e1",
  borderRadius: "10px",
  border: "2px solid #ff69b4",
};

const fusionTitle = {
  color: "#ff1493",
  marginBottom: "15px",
};

const fusionEffect = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "15px",
};

const fusionParticle1 = {
  fontSize: "2rem",
  animation: "fusionSpin 2s ease-in-out infinite",
};

const fusionParticle2 = {
  fontSize: "2rem",
  animation: "fusionSpin 2s ease-in-out infinite 0.5s",
};

const fusionParticle3 = {
  fontSize: "2rem",
  animation: "fusionSpin 2s ease-in-out infinite 1s",
};

const pearlContainer = {
  backgroundColor: "rgba(255, 228, 225, 0.5)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "30px",
  border: "2px solid #ffe4e1",
};

const pearlAvatar = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const pearlSpeech = {
  fontSize: "16px",
  color: "#333",
  fontStyle: "italic",
};

const musicContainer = {
  backgroundColor: "#f8f9fa",
  padding: "30px",
  borderRadius: "15px",
  border: "2px solid #9966cc",
};

const partituraDisplay = {
  minHeight: "100px",
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
  border: "2px dashed #9966cc",
};

const partituraTitle = {
  color: "#9966cc",
  fontSize: "18px",
  marginBottom: "15px",
};

const notasVisuais = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "10px",
  minHeight: "40px",
};

const notaStyle = {
  fontSize: "2rem",
  margin: "0 5px",
  animation: "musicFloat 2s ease-in-out infinite",
};

const placeholderText = {
  color: "#999",
  fontStyle: "italic",
  margin: 0,
};

const instrumentos = {
  marginBottom: "20px",
};

const instrumentTitle = {
  color: "#764ba2",
  fontSize: "16px",
  marginBottom: "15px",
};

const notasContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  justifyContent: "center",
  marginBottom: "20px",
};

const notaButton = {
  fontSize: "2rem",
  padding: "15px 20px",
  color: "white",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  fontWeight: "bold",
};

const progressStyle = {
  fontSize: "16px",
  color: "#666",
  fontWeight: "bold",
};

const successMessage = {
  padding: "20px",
  backgroundColor: "#e7f3ff",
  borderRadius: "10px",
  border: "2px solid #00bfff",
  marginTop: "20px",
};

const successTitle = {
  color: "#0066cc",
  marginBottom: "15px",
};

const musicSuccess = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
};

const musicNote1 = {
  fontSize: "2rem",
  animation: "musicFloat 1.5s ease-in-out infinite",
};

const musicNote2 = {
  fontSize: "2rem",
  animation: "musicFloat 1.5s ease-in-out infinite 0.3s",
};

const musicNote3 = {
  fontSize: "2rem",
  animation: "musicFloat 1.5s ease-in-out infinite 0.6s",
};

const garnetContainer = {
  backgroundColor: "rgba(220, 20, 60, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "30px",
  border: "2px solid #dc143c",
};

const garnetAvatar = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const garnetSpeech = {
  fontSize: "16px",
  color: "#333",
  fontStyle: "italic",
};

const cristaisContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginBottom: "30px",
};

const cristalButton = {
  padding: "20px",
  backgroundColor: "linear-gradient(45deg, #ff1493, #9966cc)",
  background: "linear-gradient(45deg, #ff1493, #9966cc)",
  color: "white",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontWeight: "bold",
  boxShadow: "0 6px 12px rgba(255, 20, 147, 0.3)",
  animation: "crystalShine 3s ease-in-out infinite",
};

const cristalEmoji = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const cristalName = {
  fontSize: "18px",
  marginBottom: "8px",
};

const cristalDesc = {
  fontSize: "14px",
  opacity: "0.9",
};

const finalFusion = {
  textAlign: "center",
  padding: "30px",
};

const fusionCompleteStyle = {
  fontSize: "36px",
  background: "linear-gradient(45deg, #ff69b4, #9966cc, #00bfff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: "20px",
};

const fusionGem = {
  marginBottom: "20px",
};

const fusionAvatar = {
  fontSize: "4rem",
  animation: "gemGlow 2s ease-in-out infinite",
};

const fusionDescription = {
  fontSize: "18px",
  color: "#555",
  marginBottom: "30px",
  lineHeight: "1.6",
};

const allGemsApproval = {
  backgroundColor: "rgba(255, 105, 180, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "30px",
  border: "2px solid #ff69b4",
};

const approvalTitle = {
  color: "#ff1493",
  fontSize: "20px",
  marginBottom: "15px",
};

const gemsReaction = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "15px",
};

const gemReaction = {
  textAlign: "center",
};

const reactionAvatar = {
  fontSize: "2rem",
  marginBottom: "8px",
};

const reactionText = {
  fontSize: "14px",
  color: "#333",
  fontWeight: "bold",
};

const nextButton = {
  padding: "15px 30px",
  fontSize: "20px",
  backgroundColor: "#ff69b4",
  color: "white",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 6px 12px rgba(255, 105, 180, 0.4)",
};
