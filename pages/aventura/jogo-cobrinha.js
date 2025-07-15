// pages/aventura/jogo-cobrinha.js - Jogo da Cobrinha Romântica
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

export default function JogoCobrinha() {
  const router = useRouter();
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'gameOver', 'complete'
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15, type: "💖" });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameSpeed, setGameSpeed] = useState(150);
  const [hearts, setHearts] = useState([]);
  const [specialFoods, setSpecialFoods] = useState([]);

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400;

  // Tipos de comida especial com perguntas
  const loveQuestions = [
    {
      food: "💝",
      question: "Qual é a comida favorita que vocês fazem juntos?",
      options: [
        "🍝 Macarrão",
        "🍕 Pizza",
        "🥘 Qualquer coisa, desde que seja juntos",
        "☕ Café da manhã",
      ],
      correct: 2,
      points: 100,
    },
    {
      food: "💍",
      question: "O que mais te faz rir nele?",
      options: [
        "🤓 As piadas ruins",
        "😂 Os memes que manda",
        "🎭 Quando tenta ser sério",
        "💕 Tudo, ele é hilário",
      ],
      correct: 3,
      points: 150,
    },
    {
      food: "🌟",
      question:
        "Verdadeiro ou Falso: Vocês já ficaram acordados até tarde conversando?",
      options: ["✅ Verdadeiro", "❌ Falso"],
      correct: 0,
      points: 75,
    },
    {
      food: "🎮",
      question: "Qual é o super poder do relacionamento de vocês?",
      options: [
        "🛡️ Se apoiar sempre",
        "😂 Rir de tudo juntos",
        "🧩 Se completar",
        "♾️ Todas as anteriores",
      ],
      correct: 3,
      points: 200,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionActive, setQuestionActive] = useState(false);

  // Gerar comida aleatória
  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
        type:
          Math.random() < 0.7
            ? "💖"
            : loveQuestions[Math.floor(Math.random() * loveQuestions.length)]
                .food,
      };
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y,
      )
    );

    return newFood;
  }, [snake]);

  // Verificar colisão
  const checkCollision = (head) => {
    // Colisão com parede
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }
    // Colisão com próprio corpo
    return snake.some(
      (segment) => segment.x === head.x && segment.y === head.y,
    );
  };

  // Controles do teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== "playing") return;

      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const gameLoop = setInterval(() => {
      setSnake((currentSnake) => {
        const newSnake = [...currentSnake];
        const head = {
          x: newSnake[0].x + direction.x,
          y: newSnake[0].y + direction.y,
        };

        if (checkCollision(head)) {
          setGameState("gameOver");
          return currentSnake;
        }

        newSnake.unshift(head);

        // Verificar se comeu
        if (head.x === food.x && head.y === food.y) {
          if (food.type === "💖") {
            setScore((prev) => prev + 10);
            setFood(generateFood());
          } else {
            // Comida especial - mostrar pergunta
            const question = loveQuestions.find((q) => q.food === food.type);
            setCurrentQuestion(question);
            setQuestionActive(true);
            setFood(generateFood());
          }

          // Criar coração na posição
          setHearts((prev) => [
            ...prev,
            {
              id: Date.now(),
              x: head.x * (CANVAS_SIZE / GRID_SIZE),
              y: head.y * (CANVAS_SIZE / GRID_SIZE),
            },
          ]);

          // Aumentar velocidade a cada 5 pontos
          if ((score + 10) % 50 === 0) {
            setLevel((prev) => prev + 1);
            setGameSpeed((prev) => Math.max(80, prev - 20));
          }
        } else {
          newSnake.pop();
        }

        // Verificar vitória
        if (score >= 200) {
          setGameState("complete");
        }

        return newSnake;
      });
    }, gameSpeed);

    return () => clearInterval(gameLoop);
  }, [direction, food, score, gameSpeed, gameState, generateFood]);

  // Remover corações após animação
  useEffect(() => {
    const timer = setTimeout(() => {
      setHearts((prev) => prev.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [hearts]);

  const startGame = () => {
    setGameState("playing");
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setLevel(1);
    setGameSpeed(150);
    setFood(generateFood());
    setHearts([]);
  };

  const answerQuestion = (answerIndex) => {
    const isCorrect = answerIndex === currentQuestion.correct;
    const points = isCorrect
      ? currentQuestion.points
      : Math.floor(currentQuestion.points / 2);

    setScore((prev) => prev + points);
    setQuestionActive(false);
    setCurrentQuestion(null);

    // Feedback visual
    if (isCorrect) {
      // Criar múltiplos corações para resposta certa
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          setHearts((prev) => [
            ...prev,
            {
              id: Date.now() + i,
              x: Math.random() * CANVAS_SIZE,
              y: Math.random() * CANVAS_SIZE,
            },
          ]);
        }, i * 100);
      }
    }
  };

  const avancar = () => {
    router.push("/aventura/fase6"); // ou próxima fase
  };

  return (
    <div style={containerStyle}>
      {/* Corações animados */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            ...heartStyle,
            left: `${heart.x}px`,
            top: `${heart.y}px`,
          }}
        >
          💖
        </div>
      ))}

      <div style={gameContainer}>
        <h1 style={titleStyle}>🐍💕 Cobrinha do Amor 💕🐍</h1>

        {gameState === "start" && (
          <div style={startScreen}>
            <div style={instructions}>
              <h2 style={instructionTitle}>Como Jogar:</h2>
              <div style={instructionList}>
                <div style={instructionItem}>
                  🏃‍♀️ Use as setas ← ↑ ↓ → para mover
                </div>
                <div style={instructionItem}>
                  💖 Colete corações para crescer
                </div>
                <div style={instructionItem}>
                  💝 Comidas especiais fazem perguntas
                </div>
                <div style={instructionItem}>
                  🎯 Faça 200 pontos para ganhar!
                </div>
              </div>
            </div>

            <button onClick={startGame} style={startButton}>
              💕 Começar Jogo do Amor 💕
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <div style={gameArea}>
            <div style={scoreBoard}>
              <div>Pontos: {score}</div>
              <div>Nível: {level}</div>
              <div>Meta: 200 pontos</div>
            </div>

            <div style={gameCanvas}>
              {/* Grid do jogo */}
              <svg width={CANVAS_SIZE} height={CANVAS_SIZE} style={canvasStyle}>
                {/* Corpo da cobra */}
                {snake.map((segment, index) => (
                  <rect
                    key={index}
                    x={segment.x * (CANVAS_SIZE / GRID_SIZE)}
                    y={segment.y * (CANVAS_SIZE / GRID_SIZE)}
                    width={CANVAS_SIZE / GRID_SIZE}
                    height={CANVAS_SIZE / GRID_SIZE}
                    fill={index === 0 ? "#e74c3c" : "#c0392b"}
                    rx="3"
                  />
                ))}

                {/* Comida */}
                <text
                  x={food.x * (CANVAS_SIZE / GRID_SIZE) + 2}
                  y={food.y * (CANVAS_SIZE / GRID_SIZE) + 16}
                  fontSize="16"
                >
                  {food.type}
                </text>
              </svg>
            </div>

            <div style={controls}>
              <div style={controlsTitle}>Controles:</div>
              <div style={arrowKeys}>
                <div style={arrowUp}>↑</div>
                <div style={arrowRow}>
                  <div style={arrowLeft}>←</div>
                  <div style={arrowDown}>↓</div>
                  <div style={arrowRight}>→</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {questionActive && currentQuestion && (
          <div style={questionOverlay}>
            <div style={questionModal}>
              <h3 style={questionTitle}>💕 Pergunta do Coração 💕</h3>
              <p style={questionText}>{currentQuestion.question}</p>

              <div style={questionOptions}>
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => answerQuestion(index)}
                    style={questionButton}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div style={questionReward}>
                Resposta certa: +{currentQuestion.points} pontos
              </div>
            </div>
          </div>
        )}

        {gameState === "gameOver" && (
          <div style={gameOverScreen}>
            <h2 style={gameOverTitle}>💔 Game Over 💔</h2>
            <div style={finalScore}>Pontuação Final: {score}</div>
            <p style={gameOverText}>
              Não desista! O amor verdadeiro requer persistência! 💪
            </p>
            <button onClick={startGame} style={retryButton}>
              🔄 Tentar Novamente
            </button>
          </div>
        )}

        {gameState === "complete" && (
          <div style={completeScreen}>
            <h2 style={completeTitle}>🏆💕 Parabéns! 💕🏆</h2>
            <div style={victoryScore}>Pontuação Final: {score}</div>
            <div style={victoryMessage}>
              <p>Você dominou a arte da cobrinha do amor!</p>
              <p>
                Assim como no jogo, vocês crescem juntos a cada desafio! 🐍💕
              </p>
            </div>

            <div style={achievement}>
              <div style={achievementIcon}>👑</div>
              <div style={achievementText}>Mestre da Cobrinha Romântica</div>
            </div>

            <button onClick={avancar} style={nextButton}>
              💖 Continuar Aventura 💖
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes heartFloat {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes snakeMove {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes buttonPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes gameGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(231, 76, 60, 0.6);
          }
          50% {
            box-shadow: 0 0 40px rgba(231, 76, 60, 0.8);
          }
        }
      `}</style>
    </div>
  );
}

// Estilos
const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #2c3e50 0%, #e74c3c 50%, #c0392b 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: '"Courier New", monospace',
  color: "#fff",
  position: "relative",
  overflow: "hidden",
};

const heartStyle = {
  position: "absolute",
  fontSize: "1.5rem",
  animation: "heartFloat 1s ease-out forwards",
  pointerEvents: "none",
  zIndex: 10,
};

const gameContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "20px",
  padding: "30px",
  border: "3px solid #e74c3c",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
  animation: "gameGlow 3s ease-in-out infinite",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "2rem",
  marginBottom: "25px",
  color: "#e74c3c",
  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
};

const startScreen = {
  textAlign: "center",
};

const instructions = {
  marginBottom: "30px",
};

const instructionTitle = {
  color: "#e74c3c",
  marginBottom: "15px",
};

const instructionList = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const instructionItem = {
  backgroundColor: "rgba(231, 76, 60, 0.2)",
  padding: "10px 15px",
  borderRadius: "10px",
  border: "1px solid #e74c3c",
};

const startButton = {
  padding: "15px 30px",
  fontSize: "1.2rem",
  backgroundColor: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  animation: "buttonPulse 2s ease-in-out infinite",
  transition: "all 0.3s ease",
};

const gameArea = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
};

const scoreBoard = {
  display: "flex",
  justify: "space-around",
  width: "400px",
  backgroundColor: "rgba(52, 73, 94, 0.8)",
  padding: "10px",
  borderRadius: "10px",
  border: "2px solid #3498db",
};

const gameCanvas = {
  position: "relative",
};

const canvasStyle = {
  backgroundColor: "#34495e",
  border: "3px solid #2c3e50",
  borderRadius: "10px",
};

const controls = {
  textAlign: "center",
};

const controlsTitle = {
  marginBottom: "10px",
  color: "#ecf0f1",
};

const arrowKeys = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
};

const arrowUp = {
  padding: "10px 15px",
  backgroundColor: "#3498db",
  borderRadius: "5px",
  fontWeight: "bold",
  fontSize: "1.2rem",
};

const arrowRow = {
  display: "flex",
  gap: "5px",
};

const arrowLeft = {
  padding: "10px 15px",
  backgroundColor: "#3498db",
  borderRadius: "5px",
  fontWeight: "bold",
  fontSize: "1.2rem",
};

const arrowDown = {
  padding: "10px 15px",
  backgroundColor: "#3498db",
  borderRadius: "5px",
  fontWeight: "bold",
  fontSize: "1.2rem",
};

const arrowRight = {
  padding: "10px 15px",
  backgroundColor: "#3498db",
  borderRadius: "5px",
  fontWeight: "bold",
  fontSize: "1.2rem",
};

const questionOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const questionModal = {
  backgroundColor: "#2c3e50",
  borderRadius: "20px",
  padding: "30px",
  border: "3px solid #e74c3c",
  maxWidth: "500px",
  textAlign: "center",
};

const questionTitle = {
  color: "#e74c3c",
  marginBottom: "15px",
};

const questionText = {
  fontSize: "1.1rem",
  marginBottom: "20px",
  lineHeight: "1.5",
};

const questionOptions = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "15px",
};

const questionButton = {
  padding: "12px 20px",
  backgroundColor: "#3498db",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "all 0.3s ease",
};

const questionReward = {
  color: "#f39c12",
  fontSize: "0.9rem",
  fontStyle: "italic",
};

const gameOverScreen = {
  textAlign: "center",
};

const gameOverTitle = {
  color: "#e74c3c",
  marginBottom: "15px",
};

const finalScore = {
  fontSize: "1.5rem",
  color: "#f39c12",
  marginBottom: "15px",
  fontWeight: "bold",
};

const gameOverText = {
  marginBottom: "20px",
  lineHeight: "1.5",
};

const retryButton = {
  padding: "15px 30px",
  backgroundColor: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontSize: "1.1rem",
  fontWeight: "bold",
};

const completeScreen = {
  textAlign: "center",
};

const completeTitle = {
  color: "#27ae60",
  marginBottom: "15px",
};

const victoryScore = {
  fontSize: "1.8rem",
  color: "#f39c12",
  marginBottom: "20px",
  fontWeight: "bold",
};

const victoryMessage = {
  marginBottom: "25px",
  lineHeight: "1.6",
};

const achievement = {
  backgroundColor: "rgba(241, 196, 15, 0.2)",
  border: "2px solid #f1c40f",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
};

const achievementIcon = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const achievementText = {
  color: "#f1c40f",
  fontWeight: "bold",
  fontSize: "1.1rem",
};

const nextButton = {
  padding: "18px 35px",
  backgroundColor: "#27ae60",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontSize: "1.2rem",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};
