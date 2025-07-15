// pages/aventura/fase3.js - Castelo Ambulante do Howl Melhorado
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Fase3HowlCastle() {
  const router = useRouter();
  const [resposta, setResposta] = useState(null);
  const [calciferFeliz, setCalciferFeliz] = useState(false);
  const [magicPortals, setMagicPortals] = useState([]);
  const [castleMoving, setCastleMoving] = useState(false);
  const [howlVanity, setHowlVanity] = useState(0);

  useEffect(() => {
    // Criar portais mágicos flutuando
    const portals = [];
    for (let i = 0; i < 8; i++) {
      portals.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ["💚", "💙", "💜", "🧡"][Math.floor(Math.random() * 4)],
        delay: Math.random() * 3,
      });
    }
    setMagicPortals(portals);

    // Calcifer animado
    setTimeout(() => setCastleMoving(true), 1000);
  }, []);

  const responder = (opcao) => {
    setResposta(opcao);
    setCalciferFeliz(true);

    if (opcao === "flores") {
      setHowlVanity(3); // Howl fica dramático
    }

    setTimeout(() => {
      router.push("/aventura/fase4");
    }, 3000);
  };

  return (
    <div style={containerStyle}>
      {/* Fundo do Castelo Ambulante */}
      <div style={castleBackground}>
        <div style={castleBody}></div>
        <div style={castleLegs}>🦵🦵🦵🦵</div>
      </div>

      {/* Portais mágicos */}
      {magicPortals.map((portal) => (
        <div
          key={portal.id}
          style={{
            ...portalStyle,
            left: `${portal.x}%`,
            top: `${portal.y}%`,
            animationDelay: `${portal.delay}s`,
          }}
        >
          {portal.color}
        </div>
      ))}

      <div style={contentContainer}>
        <div style={castleInterior}>
          {/* Calcifer animado */}
          <div style={calciferContainer}>
            <div
              style={{
                ...calciferStyle,
                animation: calciferFeliz
                  ? "calciferHappy 2s ease-in-out infinite"
                  : "calciferNormal 3s ease-in-out infinite",
              }}
            >
              🔥
            </div>
            <div style={calciferSpeech}>
              {calciferFeliz
                ? "Que resposta mágica! O castelo aprova! 🔥✨"
                : "Olá! Sou Calcifer! O que faz seu coração queimar de amor?"}
            </div>
          </div>

          <h1 style={titleStyle}>🏰 O Castelo Ambulante do Amor 🏰</h1>

          <div style={storyContainer}>
            <p style={storyText}>
              Dentro do mágico Castelo Ambulante, Calcifer guarda os segredos
              dos corações apaixonados.
              <br />
              Howl está no banheiro arrumando o cabelo (como sempre), então
              Calcifer tem uma pergunta especial...
            </p>
          </div>

          {/* Howl dramático */}
          {howlVanity > 0 && (
            <div style={howlContainer}>
              <div style={howlAvatar}>💁‍♂️✨</div>
              <div style={howlDrama}>
                {howlVanity === 3
                  ? "MEU CABELO! As flores vão estragar meu penteado perfeito! 😱💅"
                  : ""}
              </div>
            </div>
          )}

          <div style={questionContainer}>
            <h2 style={questionStyle}>
              🌸 Se você pudesse dar uma flor mágica para a Millena, qual seria?
              🌸
            </h2>
          </div>

          {!resposta ? (
            <div style={optionsContainer}>
              <button
                onClick={() => responder("rosas")}
                style={{ ...magicButton, backgroundColor: "#ff6b9d" }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1) rotate(2deg)";
                  e.target.style.boxShadow =
                    "0 15px 30px rgba(255, 107, 157, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) rotate(0deg)";
                  e.target.style.boxShadow =
                    "0 8px 20px rgba(255, 107, 157, 0.4)";
                }}
              >
                🌹 Rosas vermelhas que nunca murcham
              </button>

              <button
                onClick={() => responder("girassol")}
                style={{ ...magicButton, backgroundColor: "#ffd93d" }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1) rotate(-2deg)";
                  e.target.style.boxShadow =
                    "0 15px 30px rgba(255, 217, 61, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) rotate(0deg)";
                  e.target.style.boxShadow =
                    "0 8px 20px rgba(255, 217, 61, 0.4)";
                }}
              >
                🌻 Girassol que sempre olha pra ela
              </button>

              <button
                onClick={() => responder("flores")}
                style={{ ...magicButton, backgroundColor: "#6bcf7f" }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1) rotate(2deg)";
                  e.target.style.boxShadow =
                    "0 15px 30px rgba(107, 207, 127, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) rotate(0deg)";
                  e.target.style.boxShadow =
                    "0 8px 20px rgba(107, 207, 127, 0.4)";
                }}
              >
                🌺 Um jardim inteiro só pra ela
              </button>

              <button
                onClick={() => responder("borboletas")}
                style={{ ...magicButton, backgroundColor: "#a8e6cf" }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1) rotate(-2deg)";
                  e.target.style.boxShadow =
                    "0 15px 30px rgba(168, 230, 207, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) rotate(0deg)";
                  e.target.style.boxShadow =
                    "0 8px 20px rgba(168, 230, 207, 0.4)";
                }}
              >
                🦋 Flores que atraem borboletas (ela vai surtar! 😈)
              </button>
            </div>
          ) : (
            <div style={responseContainer}>
              <div style={magicResponse}>
                <div style={celebrationFire}>
                  <span style={fireEffect1}>🔥</span>
                  <span style={fireEffect2}>✨</span>
                  <span style={fireEffect3}>🔥</span>
                </div>

                <h3 style={responseTitle}>
                  🔥 Calcifer aprova sua escolha! 🔥
                </h3>

                <p style={responseText}>
                  {resposta === "borboletas"
                    ? "HAHAHA! Você conhece bem ela! Borboletas são o kryptonite da Millena! 😂🦋"
                    : resposta === "flores"
                      ? "Um jardim inteiro! Que romântico! Howl está com ciúmes da sua criatividade! 💐"
                      : "Que escolha linda! O castelo inteiro brilha com essa resposta! ✨"}
                </p>

                {resposta === "borboletas" && (
                  <div style={butterflyJoke}>
                    <div style={butterflySwarm}>🦋🦋🦋</div>
                    <p style={jokeText}>*Millena correndo do buquê* 😱💨</p>
                  </div>
                )}

                <div style={castleApproval}>
                  <div style={approvalElements}>🏰✨🔥💕🌸</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes calciferNormal {
          0%,
          100% {
            transform: scale(1) rotate(-5deg);
          }
          50% {
            transform: scale(1.2) rotate(5deg);
          }
        }

        @keyframes calciferHappy {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.4) rotate(-10deg);
          }
          50% {
            transform: scale(1.6) rotate(10deg);
          }
          75% {
            transform: scale(1.3) rotate(-5deg);
          }
        }

        @keyframes portalFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-30px) rotate(180deg) scale(1.3);
            opacity: 1;
          }
        }

        @keyframes castleWalk {
          0%,
          100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(10px);
          }
        }

        @keyframes butterflyFly {
          0%,
          100% {
            transform: translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateX(20px) rotate(90deg);
          }
          50% {
            transform: translateX(-10px) rotate(180deg);
          }
          75% {
            transform: translateX(15px) rotate(270deg);
          }
        }

        @keyframes fireEffect {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            filter: hue-rotate(0deg);
          }
          50% {
            transform: scale(1.3) rotate(180deg);
            filter: hue-rotate(60deg);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  background:
    "linear-gradient(to bottom, #87CEEB 0%, #98FB98 30%, #F0E68C 70%, #DDA0DD 100%)",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Georgia", serif',
  color: "#2F4F4F",
};

const castleBackground = {
  position: "absolute",
  top: "10%",
  right: "5%",
  fontSize: "4rem",
  opacity: 0.3,
  animation: "castleWalk 8s ease-in-out infinite",
};

const castleBody = {
  width: "100px",
  height: "150px",
  backgroundColor: "#8B4513",
  borderRadius: "10px 10px 0 0",
  position: "relative",
};

const castleLegs = {
  fontSize: "2rem",
  textAlign: "center",
  animation: "castleWalk 2s ease-in-out infinite",
};

const portalStyle = {
  position: "absolute",
  fontSize: "2rem",
  animation: "portalFloat 5s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
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

const castleInterior = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  border: "4px solid #DAA520",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(10px)",
};

const calciferContainer = {
  textAlign: "center",
  marginBottom: "30px",
  backgroundColor: "rgba(255, 140, 0, 0.2)",
  borderRadius: "20px",
  padding: "20px",
  border: "3px solid #FF8C00",
};

const calciferStyle = {
  fontSize: "4rem",
  marginBottom: "15px",
  cursor: "pointer",
};

const calciferSpeech = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#FF4500",
  padding: "15px",
  borderRadius: "15px",
  fontSize: "16px",
  fontWeight: "bold",
  fontStyle: "italic",
};

const titleStyle = {
  fontSize: "2.5rem",
  textAlign: "center",
  background: "linear-gradient(45deg, #DAA520, #FF8C00, #CD853F)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "25px",
};

const storyContainer = {
  backgroundColor: "#F5F5DC",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #DAA520",
};

const storyText = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#2F4F4F",
  textAlign: "center",
  fontStyle: "italic",
};

const howlContainer = {
  backgroundColor: "rgba(147, 112, 219, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "20px",
  border: "2px solid #9370DB",
  textAlign: "center",
};

const howlAvatar = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const howlDrama = {
  color: "#9370DB",
  fontSize: "16px",
  fontWeight: "bold",
  fontStyle: "italic",
};

const questionContainer = {
  textAlign: "center",
  marginBottom: "30px",
};

const questionStyle = {
  fontSize: "1.8rem",
  color: "#2F4F4F",
  marginBottom: "15px",
  fontWeight: "bold",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "20px",
};

const magicButton = {
  padding: "18px 25px",
  fontSize: "16px",
  border: "3px solid #fff",
  borderRadius: "20px",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  fontFamily: "inherit",
};

const responseContainer = {
  textAlign: "center",
};

const magicResponse = {
  backgroundColor: "rgba(255, 140, 0, 0.1)",
  borderRadius: "20px",
  padding: "30px",
  border: "3px solid #FF8C00",
};

const celebrationFire = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "20px",
};

const fireEffect1 = {
  fontSize: "2.5rem",
  animation: "fireEffect 2s ease-in-out infinite",
};

const fireEffect2 = {
  fontSize: "2rem",
  animation: "fireEffect 2s ease-in-out infinite 0.5s",
};

const fireEffect3 = {
  fontSize: "2.5rem",
  animation: "fireEffect 2s ease-in-out infinite 1s",
};

const responseTitle = {
  color: "#FF4500",
  fontSize: "1.5rem",
  marginBottom: "15px",
};

const responseText = {
  fontSize: "16px",
  color: "#2F4F4F",
  lineHeight: "1.6",
  marginBottom: "20px",
};

const butterflyJoke = {
  backgroundColor: "rgba(173, 216, 230, 0.3)",
  borderRadius: "15px",
  padding: "15px",
  marginBottom: "15px",
  border: "2px dashed #87CEEB",
};

const butterflySwarm = {
  fontSize: "1.5rem",
  animation: "butterflyFly 3s ease-in-out infinite",
  marginBottom: "10px",
};

const jokeText = {
  color: "#4682B4",
  fontSize: "14px",
  fontWeight: "bold",
  fontStyle: "italic",
};

const castleApproval = {
  textAlign: "center",
};

const approvalElements = {
  fontSize: "2rem",
  animation: "fireEffect 3s ease-in-out infinite",
  letterSpacing: "0.3em",
};
