import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Fase2Melhorada() {
  const router = useRouter();
  const [potionBubbles, setPotionBubbles] = useState([]);
  const [maomaoVisible, setMaomaoVisible] = useState(false);
  const [potionReady, setPotionReady] = useState(false);
  const [ingredientCount, setIngredientCount] = useState(0);

  useEffect(() => {
    // Criar bolhas da poção
    const bubbles = [];
    for (let i = 0; i < 20; i++) {
      bubbles.push({
        id: i,
        x: Math.random() * 100,
        y: 100,
        delay: Math.random() * 3,
        size: Math.random() * 15 + 10,
      });
    }
    setPotionBubbles(bubbles);

    // Animações de entrada
    setTimeout(() => setMaomaoVisible(true), 800);
    setTimeout(() => setPotionReady(true), 1500);

    // Música ambiente
    const iframe = document.getElementById("maomaoMusic");
    if (iframe) {
      iframe.src += "&autoplay=1";
    }
  }, []);

  const addIngredient = () => {
    setIngredientCount((prev) => prev + 1);
    if (ingredientCount >= 2) {
      router.push("/aventura/pesca");
    }
  };

  const irParaPesca = () => {
    router.push("/aventura/pesca");
  };

  return (
    <div style={containerStyle}>
      {/* Bolhas mágicas flutuantes */}
      {potionBubbles.map((bubble) => (
        <div
          key={bubble.id}
          style={{
            ...bubbleStyle,
            left: `${bubble.x}%`,
            bottom: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}

      {/* Maomao aparecendo */}
      {maomaoVisible && (
        <div style={maomaoContainer}>
          <div style={maomaoChar}>👩‍🔬</div>
          <div style={speechBubble}>Vamos preparar uma poção especial! 🧪</div>
        </div>
      )}

      {/* Gatos curiosos no laboratório */}
      <div style={labCatsContainer}>
        <div style={labCat1}>🐱</div>
        <div style={labCat2}>😸</div>
        <div style={labCat3}>🙀</div>
      </div>

      <div style={contentContainer}>
        <div style={laboratoryContainer}>
          {/* Título com efeito de vapor */}
          <div style={titleContainer}>
            <h1 style={titleStyle}>🧪 Laboratório da Apotecária 🧪</h1>
            <div style={steamEffect}>
              {["💨", "💨", "💨"].map((steam, i) => (
                <span
                  key={i}
                  style={{ ...steamParticle, animationDelay: `${i * 0.5}s` }}
                >
                  {steam}
                </span>
              ))}
            </div>
          </div>

          <div style={labContent}>
            <div style={storyContainer}>
              <div style={scroll}>
                <h2 style={scrollTitle}>📜 Receita Secreta 📜</h2>
                <p style={recipeText}>
                  Maomao descobriu uma fórmula ancestral no palácio imperial...
                  <br />
                  <em>"A Poção do Amor Verdadeiro"</em>
                  <br />
                  Para ativar seus poderes, você deve provar que possui um
                  coração verdadeiro!
                </p>
              </div>
            </div>

            {/* Mesa de trabalho com ingredientes */}
            <div style={workbenchContainer}>
              <h3 style={workbenchTitle}>🌿 Mesa de Ingredientes 🌿</h3>

              <div style={ingredientsGrid}>
                <div style={ingredientItem} onClick={addIngredient}>
                  <div style={ingredientEmoji}>🌸</div>
                  <p style={ingredientName}>Pétalas de Cereja</p>
                  <p style={ingredientDesc}>Para doçura</p>
                </div>

                <div style={ingredientItem} onClick={addIngredient}>
                  <div style={ingredientEmoji}>💖</div>
                  <p style={ingredientName}>Essência do Amor</p>
                  <p style={ingredientDesc}>Ingrediente principal</p>
                </div>

                <div style={ingredientItem} onClick={addIngredient}>
                  <div style={ingredientEmoji}>✨</div>
                  <p style={ingredientName}>Pó de Estrela</p>
                  <p style={ingredientDesc}>Para magia</p>
                </div>
              </div>

              <div style={progressBar}>
                <p style={progressText}>
                  Ingredientes coletados: {ingredientCount}/3
                </p>
                <div style={progressLine}>
                  <div
                    style={{
                      ...progressFill,
                      width: `${(ingredientCount / 3) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Caldeirão mágico */}
            <div style={cauldronContainer}>
              <div style={cauldron}>
                <div style={potionLiquid}>
                  <div style={potionGlow}></div>
                </div>
                <div style={cauldronEmoji}>🍯</div>
              </div>
              <p style={cauldronText}>Caldeirão Encantado</p>
            </div>

            {potionReady && (
              <div style={actionContainer}>
                <div style={readyMessage}>
                  <h3 style={readyTitle}>✨ Poção Pronta! ✨</h3>
                  <p style={readyText}>
                    A fórmula secreta está completa!
                    <br />
                    Agora você deve passar pelo teste final...
                  </p>

                  <div style={catApproval}>
                    <div style={approvingCats}>
                      <span style={approveCat1}>😸</span>
                      <span style={approveCat2}>💕</span>
                      <span style={approveCat3}>😻</span>
                    </div>
                    <p style={catText}>Os gatos aprovam a poção!</p>
                  </div>
                </div>

                <button
                  onClick={irParaPesca}
                  style={alchemyButton}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1) rotate(2deg)";
                    e.target.style.boxShadow =
                      "0 15px 30px rgba(142, 110, 83, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1) rotate(0deg)";
                    e.target.style.boxShadow =
                      "0 8px 20px rgba(142, 110, 83, 0.4)";
                  }}
                >
                  🧉 Aceitar o Desafio Alquímico 🧉
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Música ambiente */}
      <div style={{ display: "none" }}>
        <iframe
          id="maomaoMusic"
          width="0"
          height="0"
          src="https://www.youtube.com/embed/yZEMrZzr7Z8?autoplay=1&loop=1&playlist=yZEMrZzr7Z8"
          title="Tema Maomao"
          frameBorder="0"
          allow="autoplay"
        ></iframe>
      </div>

      <style jsx global>{`
        @keyframes bubbleFloat {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-50px) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes steamRise {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-50px) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes potionGlow {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes catSway {
          0%,
          100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes scrollUnroll {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        @keyframes ingredientHover {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #f2e3d5 0%, #e9d5c0 50%, #d4c4a8 100%)",
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23D4A574" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
  color: "#4b3832",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: '"Spectral SC", serif',
  position: "relative",
  overflow: "hidden",
  padding: 0,
  margin: 0,
};

const bubbleStyle = {
  position: "absolute",
  backgroundColor: "rgba(142, 110, 83, 0.3)",
  borderRadius: "50%",
  animation: "bubbleFloat 4s ease-in-out infinite",
  pointerEvents: "none",
};

const maomaoContainer = {
  position: "absolute",
  top: "10%",
  right: "10%",
  textAlign: "center",
  zIndex: 10,
};

const maomaoChar = {
  fontSize: "3rem",
  animation: "catSway 3s ease-in-out infinite",
};

const speechBubble = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  color: "#8e6e53",
  padding: "10px 15px",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: "bold",
  marginTop: "10px",
  position: "relative",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};

const labCatsContainer = {
  position: "absolute",
  bottom: "10%",
  left: "5%",
  display: "flex",
  gap: "30px",
  zIndex: 5,
};

const labCat1 = {
  fontSize: "2rem",
  animation: "catSway 2s ease-in-out infinite",
};

const labCat2 = {
  fontSize: "2rem",
  animation: "catSway 2s ease-in-out infinite 0.5s",
};

const labCat3 = {
  fontSize: "2rem",
  animation: "catSway 2s ease-in-out infinite 1s",
};

const contentContainer = {
  position: "relative",
  zIndex: 2,
  padding: "20px",
  width: "100%",
  maxWidth: "900px",
};

const laboratoryContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "25px",
  padding: "30px",
  border: "3px solid #D4A574",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(10px)",
};

const titleContainer = {
  textAlign: "center",
  marginBottom: "30px",
  position: "relative",
};

const titleStyle = {
  fontSize: "32px",
  background: "linear-gradient(45deg, #8e6e53, #D4A574)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "15px",
};

const steamEffect = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const steamParticle = {
  fontSize: "1.5rem",
  animation: "steamRise 3s ease-out infinite",
  opacity: 0.7,
};

const labContent = {
  display: "grid",
  gap: "25px",
};

const storyContainer = {
  display: "flex",
  justifyContent: "center",
};

const scroll = {
  backgroundColor: "#F5E6D3",
  border: "3px solid #8e6e53",
  borderRadius: "15px",
  padding: "20px",
  maxWidth: "500px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  transform: "scaleY(1)",
  transformOrigin: "top",
  animation: "scrollUnroll 1s ease-out",
};

const scrollTitle = {
  textAlign: "center",
  color: "#8e6e53",
  fontSize: "20px",
  marginBottom: "15px",
};

const recipeText = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#5D4E48",
  textAlign: "center",
};

const workbenchContainer = {
  backgroundColor: "rgba(212, 165, 116, 0.1)",
  borderRadius: "15px",
  padding: "25px",
  border: "2px solid #D4A574",
};

const workbenchTitle = {
  textAlign: "center",
  color: "#8e6e53",
  fontSize: "20px",
  marginBottom: "20px",
};

const ingredientsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "15px",
  marginBottom: "20px",
};

const ingredientItem = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "12px",
  padding: "15px",
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  border: "2px solid #D4A574",
  animation: "ingredientHover 2s ease-in-out infinite",
};

const ingredientEmoji = {
  fontSize: "2.5rem",
  marginBottom: "10px",
};

const ingredientName = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#8e6e53",
  margin: "5px 0",
};

const ingredientDesc = {
  fontSize: "12px",
  color: "#999",
  margin: 0,
};

const progressBar = {
  textAlign: "center",
};

const progressText = {
  fontSize: "16px",
  color: "#8e6e53",
  fontWeight: "bold",
  marginBottom: "10px",
};

const progressLine = {
  width: "100%",
  height: "10px",
  backgroundColor: "rgba(212, 165, 116, 0.3)",
  borderRadius: "5px",
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  backgroundColor: "#8e6e53",
  borderRadius: "5px",
  transition: "width 0.5s ease",
};

const cauldronContainer = {
  textAlign: "center",
  margin: "20px 0",
};

const cauldron = {
  position: "relative",
  display: "inline-block",
  margin: "0 auto",
};

const cauldronEmoji = {
  fontSize: "4rem",
  position: "relative",
  zIndex: 2,
};

const potionLiquid = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translateX(-50%)",
  width: "40px",
  height: "20px",
  backgroundColor: "#8e6e53",
  borderRadius: "50%",
  zIndex: 1,
};

const potionGlow = {
  position: "absolute",
  top: "-10px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "60px",
  height: "30px",
  backgroundColor: "rgba(142, 110, 83, 0.4)",
  borderRadius: "50%",
  animation: "potionGlow 2s ease-in-out infinite",
};

const cauldronText = {
  fontSize: "14px",
  color: "#8e6e53",
  marginTop: "10px",
  fontWeight: "bold",
};

const actionContainer = {
  textAlign: "center",
  marginTop: "25px",
};

const readyMessage = {
  backgroundColor: "rgba(142, 110, 83, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "20px",
  border: "2px solid #8e6e53",
};

const readyTitle = {
  color: "#8e6e53",
  fontSize: "22px",
  marginBottom: "10px",
};

const readyText = {
  fontSize: "16px",
  color: "#5D4E48",
  marginBottom: "15px",
  lineHeight: "1.5",
};

const catApproval = {
  marginTop: "15px",
};

const approvingCats = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "10px",
};

const approveCat1 = {
  fontSize: "2rem",
  animation: "catSway 2s ease-in-out infinite",
};

const approveCat2 = {
  fontSize: "2rem",
  animation: "catSway 2s ease-in-out infinite 0.5s",
};

const approveCat3 = {
  fontSize: "2rem",
  animation: "catSway 2s ease-in-out infinite 1s",
};

const catText = {
  fontSize: "14px",
  color: "#8e6e53",
  fontWeight: "bold",
};

const alchemyButton = {
  padding: "18px 35px",
  fontSize: "18px",
  backgroundColor: "#8e6e53",
  border: "3px solid #D4A574",
  borderRadius: "25px",
  color: "#fffefb",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 8px 20px rgba(142, 110, 83, 0.4)",
  fontFamily: "inherit",
};
