// hooks/useEasterEggs.js
import { useState, useEffect, useCallback } from "react";

const EASTER_EGG_MESSAGES = [
  "🐱 Miau! Você encontrou um gatinho escondido!",
  "✨ Parabéns! Easter egg descoberto!",
  "💖 Aww, que fofo! Mais um segredinho revelado!",
  "🎉 Surpresa! Você tem olhos de águia!",
  "🌟 Magical! Um tesouro escondido!",
  "😸 Ronronar... Você me achou!",
  "💎 Shiny! Uma gema preciosa encontrada!",
  "🦋 Ops! Uma borboleta... espera, não tenha medo!",
  "🍀 Que sorte! Easter egg capturado!",
  "🎭 Plot twist! Elemento secreto desbloqueado!",
];

const SPECIAL_EFFECTS = ["confetti", "hearts", "sparkles", "rainbows", "cats"];

export function useEasterEggs(phaseName) {
  const [foundEggs, setFoundEggs] = useState(new Set());
  const [showMessage, setShowMessage] = useState(null);
  const [specialEffects, setSpecialEffects] = useState([]);
  const [totalEggsInPhase] = useState(Math.floor(Math.random() * 8) + 5); // 5-12 eggs por fase

  // Carregar progresso do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`easter-eggs-${phaseName}`);
      if (saved) {
        setFoundEggs(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.log("Erro ao carregar easter eggs");
    }
  }, [phaseName]);

  // Salvar progresso
  const saveProgress = useCallback(
    (newFoundEggs) => {
      try {
        localStorage.setItem(
          `easter-eggs-${phaseName}`,
          JSON.stringify([...newFoundEggs]),
        );
      } catch (error) {
        console.log("Erro ao salvar easter eggs");
      }
    },
    [phaseName],
  );

  const findEasterEgg = useCallback(
    (position) => {
      const eggId = `${position.x}-${position.y}`;

      if (foundEggs.has(eggId)) {
        setShowMessage("🤔 Você já encontrou este easter egg son!");
        return;
      }

      const newFoundEggs = new Set([...foundEggs, eggId]);
      setFoundEggs(newFoundEggs);
      saveProgress(newFoundEggs);

      // Mostrar mensagem aleatória
      const randomMessage =
        EASTER_EGG_MESSAGES[
          Math.floor(Math.random() * EASTER_EGG_MESSAGES.length)
        ];
      setShowMessage(randomMessage);

      // Adicionar efeito especial
      const randomEffect =
        SPECIAL_EFFECTS[Math.floor(Math.random() * SPECIAL_EFFECTS.length)];

      const effect = {
        id: Date.now(),
        type: randomEffect,
        x: position.x,
        y: position.y,
      };

      setSpecialEffects((prev) => [...prev, effect]);

      // Remover efeito após 3 segundos
      setTimeout(() => {
        setSpecialEffects((prev) => prev.filter((e) => e.id !== effect.id));
      }, 3000);

      // Fechar mensagem após 2 segundos
      setTimeout(() => {
        setShowMessage(null);
      }, 2000);
    },
    [foundEggs, saveProgress],
  );

  const getTotalEggsFound = useCallback(() => {
    try {
      let total = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("easter-eggs-")) {
          const saved = JSON.parse(localStorage.getItem(key) || "[]");
          total += saved.length;
        }
      }
      return total;
    } catch (error) {
      return foundEggs.size;
    }
  }, [foundEggs]);

  const getPhaseProgress = useCallback(() => {
    return {
      found: foundEggs.size,
      total: totalEggsInPhase,
      percentage: Math.round((foundEggs.size / totalEggsInPhase) * 100),
    };
  }, [foundEggs, totalEggsInPhase]);

  return {
    foundEggs,
    showMessage,
    setShowMessage,
    specialEffects,
    findEasterEgg,
    getTotalEggsFound,
    getPhaseProgress,
  };
}

// Componente do botão Easter Egg
export function EasterEggButton({
  position,
  size = 40,
  onFind,
  shape = "circle",
  debug = false,
}) {
  const handleClick = () => {
    onFind(position);
  };

  const baseStyle = {
    position: "absolute",
    ...position,
    width: `${size}px`,
    height: `${size}px`,
    cursor: "pointer",
    zIndex: 5,
    opacity: debug ? 0.3 : 0,
    backgroundColor: debug ? "red" : "transparent",
    borderRadius: shape === "circle" ? "50%" : "4px",
    border: debug ? "2px solid red" : "none",
    transition: "opacity 0.3s ease",
  };

  return (
    <div
      style={baseStyle}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (debug) e.target.style.opacity = "0.6";
      }}
      onMouseLeave={(e) => {
        if (debug) e.target.style.opacity = "0.3";
      }}
    />
  );
}

// Componente da mensagem
export function EasterEggMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10000,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        color: "white",
        padding: "20px 30px",
        borderRadius: "15px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        textAlign: "center",
        border: "3px solid #ff69b4",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        animation: "easterEggPop 0.5s ease-out",
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#ff69b4",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        ✕
      </button>
    </div>
  );
}

// Componente dos efeitos especiais
export function SpecialEffects({ effects }) {
  return (
    <>
      {effects.map((effect) => (
        <div
          key={effect.id}
          style={{
            position: "absolute",
            left: `${effect.x}%`,
            top: `${effect.y}%`,
            zIndex: 9999,
            pointerEvents: "none",
            fontSize: "2rem",
            animation: `specialEffect-${effect.type} 3s ease-out forwards`,
          }}
        >
          {effect.type === "hearts" && "💖💕💗"}
          {effect.type === "sparkles" && "✨🌟💫"}
          {effect.type === "cats" && "😸🐱😻"}
          {effect.type === "confetti" && "🎉🎊🎈"}
          {effect.type === "rainbows" && "🌈✨🦄"}
        </div>
      ))}
    </>
  );
}

// Contador de Easter Eggs
export function EasterEggCounter({ currentPhase, position = "top-left" }) {
  const { getPhaseProgress, getTotalEggsFound } = useEasterEggs(currentPhase);
  const phaseProgress = getPhaseProgress();
  const totalFound = getTotalEggsFound();

  const positionStyles = {
    "top-left": { top: "20px", left: "20px" },
    "top-right": { top: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "bottom-right": { bottom: "20px", right: "20px" },
  };

  return (
    <div
      style={{
        position: "fixed",
        ...positionStyles[position],
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: "15px",
        padding: "10px 15px",
        color: "white",
        fontSize: "12px",
        fontWeight: "bold",
        border: "2px solid #ff69b4",
      }}
    >
      <div>
        🥚 Esta fase: {phaseProgress.found}/{phaseProgress.total}
      </div>
      <div>🏆 Total geral: {totalFound}</div>
      <div
        style={{
          width: "100px",
          height: "4px",
          backgroundColor: "#333",
          borderRadius: "2px",
          marginTop: "5px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${phaseProgress.percentage}%`,
            height: "100%",
            backgroundColor: "#ff69b4",
            borderRadius: "2px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

export const easterEggCSS = `
  @keyframes easterEggPop {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes specialEffect-hearts {
    0% {
      opacity: 0;
      transform: scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.5) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: scale(0.5) rotate(360deg) translateY(-50px);
    }
  }
  
  @keyframes specialEffect-sparkles {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      opacity: 0;
      transform: scale(0) translateY(-30px);
    }
  }
  
  @keyframes specialEffect-cats {
    0% {
      opacity: 0;
      transform: scale(0) rotate(-180deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.3) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: scale(0.8) rotate(180deg) translateY(-40px);
    }
  }
  
  @keyframes specialEffect-confetti {
    0% {
      opacity: 0;
      transform: scale(0) translateY(0px);
    }
    50% {
      opacity: 1;
      transform: scale(1.4) translateY(-20px);
    }
    100% {
      opacity: 0;
      transform: scale(0.6) translateY(-60px);
    }
  }
  
  @keyframes specialEffect-rainbows {
    0% {
      opacity: 0;
      transform: scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.6) rotate(90deg);
    }
    100% {
      opacity: 0;
      transform: scale(0.4) rotate(180deg) translateY(-80px);
    }
  }
`;
