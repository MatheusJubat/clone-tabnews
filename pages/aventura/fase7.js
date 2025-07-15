// pages/aventura/fase7.js - VERSÃO CORRIGIDA
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Fase7Gatos8Bit() {
  const router = useRouter();
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [mostraResposta, setMostraResposta] = useState(false);
  const [pixelEffect, setPixelEffect] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [arcadeCats, setArcadeCats] = useState([]);

  const perguntas = [
    {
      pergunta:
        "Se vocês fossem personagens de videogame, qual seria o gênero?",
      opcoes: [
        "🏠 Life Simulation - construindo uma vida juntos",
        "🎮 Co-op Adventure - aventuras em dupla",
        "💖 Dating Sim - romance pixel perfect",
        "🌟 RPG Épico - heróis do amor!",
      ],
      correta: 3,
      dica: "Todas são certas, mas uma é LEGENDARY!",
    },
    {
      pergunta: "Qual power-up do relacionamento vocês mais usam?",
      opcoes: [
        "💝 Double XP quando estão juntos",
        "🛡️ Shield of Comfort nos dias difíceis",
        "⚡ Speed Boost para resolver problemas",
        "🌟 Love Bomb - super ataque de carinho",
      ],
      correta: 1,
      dica: "O melhor defense é um good offense... de amor!",
    },
    {
      pergunta: "Se fossem NPCs num jogo, qual seria a missão especial?",
      opcoes: [
        "🐱 'Cat Café Quest' - cuidar de gatinhos juntos",
        "💻 'Code Together' - programar o amor",
        "🏡 'Build a Home' - criar seu cantinho especial",
        "♾️ 'Infinite Love Mode' - amar para sempre",
      ],
      correta: 3,
      dica: "A missão final é sempre a mais épica!",
    },
    {
      pergunta: "Boss Battle: Qual seria o maior desafio que já venceram?",
      opcoes: [
        "👹 Boss da Distância - amor à distância",
        "🌊 Boss da Rotina - mantendo a chama acesa",
        "⏰ Boss do Tempo - fazendo tempo um pro outro",
        "💪 Boss Final: Crescer juntos sem perder a essência",
      ],
      correta: 3,
      dica: "O boss final sempre testa tudo que aprenderam!",
    },
  ];

  useEffect(() => {
    // Gatos arcade assistindo
    const cats = [
      { id: 1, emoji: "🕹️🐱", x: 5, y: 85, name: "Player 1 Cat" },
      { id: 2, emoji: "🎮🐱", x: 90, y: 80, name: "Speedrun Cat" },
      { id: 3, emoji: "👾🐱", x: 10, y: 15, name: "Retro Cat" },
      { id: 4, emoji: "🏆🐱", x: 85, y: 20, name: "High Score Cat" },
    ];
    setArcadeCats(cats);

    // Efeito pixel art 8-bit
    const interval = setInterval(() => {
      setPixelEffect((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const responder = (opcao) => {
    const pontosGanhos = opcao === perguntas[perguntaAtual].correta ? 250 : 100;
    setPontos(pontos + pontosGanhos);
    setMostraResposta(true);

    setTimeout(() => {
      if (perguntaAtual < perguntas.length - 1) {
        setPerguntaAtual(perguntaAtual + 1);
        setMostraResposta(false);
      } else {
        setGameOver(true);
        if (pontos + pontosGanhos > highScore) {
          setHighScore(pontos + pontosGanhos);
        }
      }
    }, 2500);
  };

  const avancar = () => {
    router.push("/aventura/fase8");
  };

  const resetGame = () => {
    setPerguntaAtual(0);
    setPontos(0);
    setGameOver(false);
    setMostraResposta(false);
  };

  return (
    <div style={containerStyle}>
      {/* Background 8-bit com estrelas */}
      <div style={starsContainer}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              ...starStyle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Gatos arcade assistindo */}
      {arcadeCats.map((cat) => (
        <div
          key={cat.id}
          style={{
            ...arcadeCatStyle,
            left: `${cat.x}%`,
            top: `${cat.y}%`,
          }}
        >
          <div style={catCharacter}>{cat.emoji}</div>
          <div style={catNameTag}>{cat.name}</div>
        </div>
      ))}

      <div style={gameContainer}>
        {/* Header do Arcade */}
        <div style={arcadeHeader}>
          <h1
            style={{
              ...titleStyle,
              textShadow: pixelEffect ? "0 0 20px #ff69b4" : "0 0 10px #ff1493",
            }}
          >
            🎮 ARCADE DOS GATOS 8-BIT 🎮
          </h1>
          <div style={arcadeSubtitle}>❮❮ LOVE QUEST: ULTIMATE EDITION ❯❯</div>
        </div>

        {/* Placar 8-bit */}
        <div style={scoreboard}>
          <div style={scoreItem}>
            <div style={scoreLabel}>SCORE</div>
            <div style={scoreValue}>{pontos.toString().padStart(6, "0")}</div>
          </div>
          <div style={scoreItem}>
            <div style={scoreLabel}>HIGH</div>
            <div style={scoreValue}>
              {highScore.toString().padStart(6, "0")}
            </div>
          </div>
          <div style={scoreItem}>
            <div style={scoreLabel}>LEVEL</div>
            <div style={scoreValue}>
              {(perguntaAtual + 1).toString().padStart(2, "0")}
            </div>
          </div>
        </div>

        {!gameOver ? (
          <div style={gameQuestionContainer}>
            {" "}
            {/* ✅ ESTA VARIÁVEL ESTAVA FALTANDO */}
            {/* Vida do jogador */}
            <div style={livesContainer}>
              <span style={livesLabel}>LIVES:</span>
              {[...Array(3)].map((_, i) => (
                <span key={i} style={lifeIcon}>
                  💖
                </span>
              ))}
            </div>
            {/* Gato pixel principal */}
            <div style={pixelCat}>{pixelEffect ? "🐱" : "😸"}</div>
            {/* Pergunta principal */}
            <div style={questionBox}>
              <div style={questionHeader}>❮ STAGE {perguntaAtual + 1}-1 ❯</div>
              <h2 style={questionStyle}>{perguntas[perguntaAtual].pergunta}</h2>

              {/* Dica 8-bit */}
              <div style={hintBox}>
                <span style={hintIcon}>💡</span>
                <span style={hintText}>{perguntas[perguntaAtual].dica}</span>
              </div>
            </div>
            {!mostraResposta ? (
              <div style={optionsContainer}>
                {perguntas[perguntaAtual].opcoes.map((opcao, index) => (
                  <button
                    key={index}
                    onClick={() => responder(index)}
                    style={{
                      ...optionButton,
                      backgroundColor: index % 2 === 0 ? "#ff1493" : "#00bfff",
                      transform: pixelEffect ? "scale(1.02)" : "scale(1)",
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <span style={optionPrefix}>
                      [{String.fromCharCode(65 + index)}]
                    </span>
                    {opcao}
                  </button>
                ))}
              </div>
            ) : (
              <div style={feedbackStyle}>
                <div style={feedbackHeader}>
                  {responder === perguntas[perguntaAtual].correta
                    ? "🎉 PERFECT!"
                    : "✨ GREAT!"}
                </div>
                <div style={feedbackEmojis}>
                  <span style={feedbackEmoji1}>🎮</span>
                  <span style={feedbackEmoji2}>💖</span>
                  <span style={feedbackEmoji3}>🏆</span>
                </div>
                <p style={feedbackText}>❮ RESPONSE LOGGED IN CAT SYSTEM ❯</p>
                <div style={bonusPoints}>
                  +
                  {responder === perguntas[perguntaAtual].correta
                    ? "250"
                    : "100"}{" "}
                  PTS
                </div>
              </div>
            )}
            {/* Controles 8-bit */}
            <div style={controlsHint}>❮ SELECT OPTION WITH MOUSE CURSOR ❯</div>
          </div>
        ) : (
          <div style={gameOverContainer}>
            <div style={gameOverHeader}>❮❮ GAME COMPLETE! ❯❯</div>

            <h2 style={finalScoreStyle}>🏆 FINAL SCORE: {pontos} 🏆</h2>

            <div style={rankingContainer}>
              <div style={rankingTitle}>❮ LOVE RANKING ❯</div>
              <div style={rankDisplay}>
                {pontos >= 800 ? (
                  <div style={rankS}>
                    <div style={rankEmoji}>👑🐱👑</div>
                    <div style={rankText}>RANK S: LEGENDARY LOVE!</div>
                    <div style={rankDesc}>
                      Você é oficialmente uma Cat Love Master!
                    </div>
                  </div>
                ) : pontos >= 600 ? (
                  <div style={rankA}>
                    <div style={rankEmoji}>🌟🐱🌟</div>
                    <div style={rankText}>RANK A: AMAZING LOVE!</div>
                    <div style={rankDesc}>
                      Quase perfeito! Os gatos estão impressionados!
                    </div>
                  </div>
                ) : (
                  <div style={rankB}>
                    <div style={rankEmoji}>💖🐱💖</div>
                    <div style={rankText}>RANK B: BEAUTIFUL LOVE!</div>
                    <div style={rankDesc}>Muito bem! O amor está forte!</div>
                  </div>
                )}
              </div>
            </div>

            {/* Achievements desbloqueados */}
            <div style={achievementsContainer}>
              <div style={achievementTitle}>❮ ACHIEVEMENTS UNLOCKED ❯</div>
              <div style={achievementsList}>
                <div style={achievement}>🏆 Cat Whisperer</div>
                <div style={achievement}>💖 Love Expert</div>
                <div style={achievement}>🎮 Retro Romance</div>
                <div style={achievement}>⭐ High Score Hero</div>
              </div>
            </div>

            {/* Botões finais */}
            <div style={finalButtons}>
              <button onClick={resetGame} style={retryButton}>
                🔄 TRY AGAIN
              </button>
              <button onClick={avancar} style={nextButton}>
                ➤ NEXT STAGE
              </button>
            </div>

            {/* Credits 8-bit */}
            <div style={credits}>❮ DEVELOPED WITH 💖 BY LOVE STUDIOS ❯</div>
          </div>
        )}

        {/* Easter egg: clique nos cantos para pontos extras */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "30px",
            height: "30px",
            cursor: "pointer",
          }}
          onClick={() => setPontos(pontos + 50)}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "30px",
            height: "30px",
            cursor: "pointer",
          }}
          onClick={() => setPontos(pontos + 50)}
        />
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes catBounce {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pixelGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 10px #ff69b4);
          }
          50% {
            filter: drop-shadow(0 0 20px #ff1493);
          }
        }

        @keyframes buttonSlide {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0px);
            opacity: 1;
          }
        }

        @keyframes scoreCount {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes achievementPop {
          0% {
            transform: scale(0) rotate(-180deg);
          }
          50% {
            transform: scale(1.2) rotate(-90deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(45deg, #000428 0%, #004e92 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: '"Courier New", monospace',
  color: "#ffffff",
  position: "relative",
  overflow: "hidden",
  padding: "20px",
};

const starsContainer = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};

const starStyle = {
  position: "absolute",
  fontSize: "12px",
  animation: "twinkle 3s infinite",
};

const arcadeCatStyle = {
  position: "absolute",
  textAlign: "center",
  zIndex: 10,
};

const catCharacter = {
  fontSize: "2rem",
  animation: "catBounce 3s ease-in-out infinite",
};

const catNameTag = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "#00ff00",
  padding: "3px 6px",
  borderRadius: "5px",
  fontSize: "8px",
  fontWeight: "bold",
  marginTop: "3px",
  border: "1px solid #00ff00",
};

const gameContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  border: "4px solid #ff69b4",
  borderRadius: "15px",
  padding: "30px",
  maxWidth: "700px",
  width: "100%",
  textAlign: "center",
  boxShadow: "0 0 30px rgba(255, 105, 180, 0.5)",
  position: "relative",
};

const arcadeHeader = {
  marginBottom: "20px",
};

const titleStyle = {
  fontSize: "20px",
  marginBottom: "10px",
  color: "#ff69b4",
  letterSpacing: "2px",
  textTransform: "uppercase",
};

const arcadeSubtitle = {
  fontSize: "12px",
  color: "#00bfff",
  letterSpacing: "1px",
};

const scoreboard = {
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "#000",
  border: "2px solid #00ff00",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "20px",
};

const scoreItem = {
  textAlign: "center",
};

const scoreLabel = {
  color: "#00ff00",
  fontSize: "10px",
  marginBottom: "2px",
};

const scoreValue = {
  color: "#ffff00",
  fontSize: "14px",
  fontWeight: "bold",
};

// ✅ ESTA É A VARIÁVEL QUE ESTAVA FALTANDO:
const gameQuestionContainer = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "15px",
  border: "2px solid #ff69b4",
  margin: "20px 0",
};

const livesContainer = {
  textAlign: "center",
  marginBottom: "15px",
};

const livesLabel = {
  color: "#ff6b6b",
  fontSize: "12px",
  marginRight: "10px",
};

const lifeIcon = {
  fontSize: "1rem",
  margin: "0 3px",
};

const pixelCat = {
  fontSize: "4rem",
  margin: "15px 0",
  animation: "pixelGlow 2s ease-in-out infinite",
};

const questionBox = {
  backgroundColor: "rgba(0, 191, 255, 0.1)",
  border: "2px solid #00bfff",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
};

const questionHeader = {
  color: "#00bfff",
  fontSize: "12px",
  marginBottom: "10px",
  letterSpacing: "1px",
};

const questionStyle = {
  fontSize: "16px",
  marginBottom: "15px",
  color: "#fff",
  lineHeight: "1.4",
};

const hintBox = {
  backgroundColor: "rgba(255, 255, 0, 0.1)",
  border: "1px solid #ffff00",
  borderRadius: "5px",
  padding: "8px",
  fontSize: "11px",
  color: "#ffff00",
};

const hintIcon = {
  marginRight: "5px",
};

const hintText = {
  fontStyle: "italic",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginBottom: "20px",
};

const optionButton = {
  padding: "12px 15px",
  fontSize: "13px",
  border: "2px solid #fff",
  borderRadius: "8px",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  textAlign: "left",
  fontFamily: "inherit",
  animation: "buttonSlide 0.5s ease-out forwards",
};

const optionPrefix = {
  marginRight: "8px",
  color: "#ffff00",
  fontWeight: "bold",
};

const feedbackStyle = {
  padding: "20px",
  backgroundColor: "rgba(0, 255, 0, 0.1)",
  borderRadius: "10px",
  border: "2px solid #00ff00",
};

const feedbackHeader = {
  color: "#00ff00",
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const feedbackEmojis = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "10px",
};

const feedbackEmoji1 = {
  fontSize: "2rem",
  animation: "catBounce 1s ease-in-out infinite",
};

const feedbackEmoji2 = {
  fontSize: "2rem",
  animation: "catBounce 1s ease-in-out infinite 0.2s",
};

const feedbackEmoji3 = {
  fontSize: "2rem",
  animation: "catBounce 1s ease-in-out infinite 0.4s",
};

const feedbackText = {
  color: "#00ff00",
  fontSize: "12px",
  marginBottom: "10px",
};

const bonusPoints = {
  color: "#ffff00",
  fontSize: "14px",
  fontWeight: "bold",
  animation: "scoreCount 1s ease-out",
};

const controlsHint = {
  color: "#666",
  fontSize: "10px",
  fontStyle: "italic",
};

const gameOverContainer = {
  textAlign: "center",
};

const gameOverHeader = {
  color: "#ffd700",
  fontSize: "18px",
  marginBottom: "20px",
  letterSpacing: "2px",
};

const finalScoreStyle = {
  fontSize: "20px",
  color: "#ffd700",
  marginBottom: "20px",
};

const rankingContainer = {
  backgroundColor: "rgba(255, 215, 0, 0.1)",
  border: "2px solid #ffd700",
  borderRadius: "10px",
  padding: "15px",
  marginBottom: "20px",
};

const rankingTitle = {
  color: "#ffd700",
  fontSize: "14px",
  marginBottom: "10px",
};

const rankDisplay = {
  textAlign: "center",
};

const rankS = {
  color: "#ff1493",
};

const rankA = {
  color: "#00bfff",
};

const rankB = {
  color: "#9966cc",
};

const rankEmoji = {
  fontSize: "2.5rem",
  marginBottom: "8px",
};

const rankText = {
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "5px",
};

const rankDesc = {
  fontSize: "11px",
  fontStyle: "italic",
};

const achievementsContainer = {
  backgroundColor: "rgba(0, 255, 0, 0.1)",
  border: "2px solid #00ff00",
  borderRadius: "10px",
  padding: "15px",
  marginBottom: "20px",
};

const achievementTitle = {
  color: "#00ff00",
  fontSize: "12px",
  marginBottom: "10px",
};

const achievementsList = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "8px",
};

const achievement = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: "5px 8px",
  borderRadius: "5px",
  fontSize: "10px",
  color: "#00ff00",
  animation: "achievementPop 0.8s ease-out",
};

const finalButtons = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "15px",
};

const retryButton = {
  padding: "10px 20px",
  fontSize: "12px",
  backgroundColor: "#ff6b6b",
  border: "2px solid #fff",
  borderRadius: "8px",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  fontFamily: "inherit",
};

const nextButton = {
  padding: "10px 20px",
  fontSize: "12px",
  backgroundColor: "#ff1493",
  border: "2px solid #fff",
  borderRadius: "8px",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  fontFamily: "inherit",
};

const credits = {
  color: "#666",
  fontSize: "9px",
  fontStyle: "italic",
};
