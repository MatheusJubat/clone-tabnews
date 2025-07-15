// hooks/useEasterEggs.js - Versão Completa
import { useState, useEffect } from "react";

export const easterEggMessages = {
  home: [
    "🐱 Miau! Você encontrou o gatinho da sorte! +100 pontos de amor!",
    "✨ Brilho mágico ativado! O amor está no ar!",
    "💖 Segredo descoberto: Ela já te ama muito!",
    "🌟 Easter egg especial: Você é incrível!",
  ],
  joguinho: [
    "😸 Os gatinhos aprovam sua persistência!",
    "💕 Easter egg do amor! Vocês são perfeitos juntos!",
    "🎮 Achievement unlocked: Cat Whisperer!",
    "🏆 Segredo: Este jogo foi feito com muito amor!",
  ],
  galeria: [
    "📸 Foto secreta desbloqueada: Vocês são fotogênicos demais!",
    "🌟 Memória especial encontrada: Primeiro encontro!",
    "💝 Album secreto: 1001 momentos de felicidade!",
    "✨ Easter egg: Cada foto conta uma história linda!",
  ],
  fase1: [
    "📜 Página secreta do grimório: 'Receita do Amor Eterno'",
    "🔮 Bola de cristal revela: Muito amor no futuro!",
    "🐱‍👤 Gato mago sussurra: 'Ela é especial, não deixe escapar!'",
    "✨ Feitiço ativado: Amor infinito!",
    "🌙 A lua aprova esta união mágica!",
  ],
  fase2: [
    "🧪 Poção secreta descoberta: Elixir da Felicidade!",
    "🌸 Maomao sorri: 'Vocês são o casal mais fofo!'",
    "💊 Ingrediente secreto revelado: Muito carinho!",
    "🔬 Fórmula descoberta: Amor + Tempo = Felicidade Eterna!",
    "🏮 Lanterna mágica: Desejo de casamento concedido!",
  ],
  pesca: [
    "🐠 Peixe dourado da sorte capturado! Faça um pedido!",
    "🎣 Pescador mestre sussurra: 'O maior tesouro já está com você'",
    "🌊 Sereia aparece: 'O amor de vocês é mais profundo que o oceano!'",
    "✨ Tesouro submarino encontrado: Confiança mútua!",
    "🦈 Tubarão amigável: 'Protegerei este amor!'",
  ],
  fase3: [
    "👑 Gato real decreta: 'Vocês são o casal mais nobre do reino!'",
    "🏰 Torre secreta revelada: Sala dos Juramentos de Amor!",
    "💎 Joia da coroa pisca: Algo especial está chegando...",
    "🛡️ Cavaleiro felino proclama: 'Defendo este amor!'",
    "📚 Livro real aberto: 'Como Amar Para Sempre - Capítulo Vocês'",
    "👸 Rainha gata aprova: 'Casamento real aprovado!'",
  ],
  fase4: [
    "⚡ Yoda Gato sussurra: 'Strong with love, you two are!'",
    "🛸 Nave secreta aparece: USS Romance!",
    "💫 Força revelada: O poder do amor verdadeiro!",
    "🤖 R2-D2 Gato beeps: 'Love-love-beep-true-love!'",
    "🌟 Jedi Council aprova: 'Destinados vocês são!'",
    "🔥 Sabre de luz do amor ativado!",
  ],
  fase5: [
    "🍜 Naruto Gato grita: 'Dattebayo! Vocês são um time incrível!'",
    "🧪 Maomao anota: 'Caso de amor perfeito observado!'",
    "⚔️ Tanjiro Gato sorri: 'Sinto o aroma da felicidade!'",
    "💎 Steven Gato canta: 'Love like yours is rare and true!'",
    "🌸 Sakura secreta floresce: Amor em plena primavera!",
    "🎌 Anime power-up: Relacionamento level MAX!",
  ],
  fase6: [
    "💎 Ametista brinca: 'Vocês são mais preciosos que qualquer gema!'",
    "🤍 Pérola organiza: 'Relationship goals achieved!'",
    "❤️ Garnet sorri: 'I can see your future... it's beautiful!'",
    "🌟 Steven vibra: 'Your love makes my gem glow!'",
    "🎵 Música das esferas toca: Harmonia perfeita!",
    "💠 Fusão perfeita descoberta: Amor Eterno!",
  ],
  fase7: [
    "🎮 Achievement Unlocked: Power Couple!",
    "👾 Pixel perfeito encontrado: Vocês juntos!",
    "🕹️ High Score batido: Amor Level MAX!",
    "💖 8-bit heart collected: +1000 love points!",
    "🏆 Ranking amoroso: #1 Couple no servidor!",
    "🎯 Easter egg 8-bit: Vocês são retro e modernos!",
  ],
  fase8: [
    "🍺 Barney aparece: 'Legen-- wait for it... DARY!'",
    "📺 Ted conta: 'E assim começou a maior história de amor...'",
    "👨‍⚖️ Marshall bate o martelo: 'Relationship approved!'",
    "🎨 Lily pinta: 'Vocês são minha obra de arte favorita!'",
    "📰 Robin reporta: 'Breaking: Cutest couple ever found!'",
    "🎭 MacLaren's special: Mesa reservada para sempre!",
  ],
  "fase-final": [
    "🌟 Revelação cósmica: Vocês são almas gêmeas!",
    "💫 Portal do amor se abre: Destino confirmado!",
    "✨ Magia suprema ativada: Amor eterno garantido!",
    "🔮 Profecia realizada: 'E viveram felizes para sempre...'",
    "🌈 Arco-íris aparece: Sinal de sorte para sempre!",
    "🚀 Última easter egg: A aventura final começou!",
  ],
  pedido: [
    "💍 O anel brilha: 'Este é o momento!'",
    "👰‍♀️ Véu de noiva aparece magicamente: 'Ela vai dizer sim!'",
    "🎊 Confetes dourados caem: 'Momento perfeito!'",
    "💒 Igreja dos sonhos se materializa: 'Para o grande dia!'",
    "💕 Cupido aparece: 'Missão cumprida!'",
    "🎉 Easter egg final: Parabéns pelos noivos!",
  ],
};

export const useEasterEggs = (phaseName) => {
  const [foundEggs, setFoundEggs] = useState([]);
  const [showMessage, setShowMessage] = useState(null);
  const [eggCount, setEggCount] = useState(0);
  const [specialEffects, setSpecialEffects] = useState([]);

  const findEasterEgg = (position = { x: 50, y: 50 }) => {
    const messages = easterEggMessages[phaseName] || [];
    if (messages.length === 0) return;

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const eggId = `${phaseName}-${Date.now()}`;

    // Adicionar à lista de encontrados
    setFoundEggs((prev) => [...prev, eggId]);
    setEggCount((prev) => prev + 1);

    // Mostrar mensagem
    setShowMessage({
      id: eggId,
      text: randomMessage,
      position,
      timestamp: Date.now(),
    });

    // Criar efeitos especiais
    createSpecialEffect(position);

    // Tocar som de descoberta se possível
    try {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUeCT2W3O/BdSAFKH7K7tiUO",
      );
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Silenciar erro se não conseguir tocar
    } catch (e) {
      // Ignorar erro de áudio
    }

    // Esconder mensagem após 4 segundos
    setTimeout(() => {
      setShowMessage(null);
    }, 4000);

    // Salvar no localStorage para persistir entre sessões
    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("easterEggs") || "{}");
      saved[phaseName] = (saved[phaseName] || 0) + 1;
      localStorage.setItem("easterEggs", JSON.stringify(saved));
    }
  };

  const createSpecialEffect = (position) => {
    const effects = [];
    const emojis = ["✨", "💖", "🌟", "💫", "⭐", "🎉", "🎊", "💎"];

    for (let i = 0; i < 12; i++) {
      effects.push({
        id: `effect-${Date.now()}-${i}`,
        x: position.x + (Math.random() - 0.5) * 120,
        y: position.y + (Math.random() - 0.5) * 120,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        delay: i * 80,
        scale: 0.8 + Math.random() * 0.4,
        rotation: Math.random() * 360,
      });
    }

    setSpecialEffects(effects);

    // Limpar efeitos após animação
    setTimeout(() => {
      setSpecialEffects([]);
    }, 2500);
  };

  const getTotalEggsFound = () => {
    if (typeof window === "undefined") return 0;
    const saved = JSON.parse(localStorage.getItem("easterEggs") || "{}");
    return Object.values(saved).reduce((total, count) => total + count, 0);
  };

  const getPhaseEggsFound = () => {
    if (typeof window === "undefined") return 0;
    const saved = JSON.parse(localStorage.getItem("easterEggs") || "{}");
    return saved[phaseName] || 0;
  };

  return {
    findEasterEgg,
    showMessage,
    setShowMessage,
    eggCount,
    foundEggs,
    specialEffects,
    getTotalEggsFound,
    getPhaseEggsFound,
  };
};

// Componente de Easter Egg Button (invisível até hover)
export const EasterEggButton = ({
  position,
  size = 30,
  onFind,
  shape = "circle",
  debug = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    const clickPosition = {
      x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
      y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
    };
    onFind(clickPosition);
  };

  const buttonStyle = {
    position: "absolute",
    ...position,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: debug ? "rgba(255, 0, 0, 0.3)" : "transparent",
    border: debug ? "1px solid red" : "none",
    borderRadius: shape === "circle" ? "50%" : "0",
    cursor: "pointer",
    opacity: isHovered || debug ? 0.4 : 0,
    transition: "all 0.3s ease",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: "white",
    fontWeight: "bold",
    backgroundImage: isHovered
      ? "radial-gradient(circle, rgba(255,105,180,0.3) 0%, transparent 70%)"
      : "none",
  };

  return (
    <div
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      title="🐱 Clique aqui para um easter egg!"
    >
      {debug && "🥚"}
      {isHovered && !debug && "✨"}
    </div>
  );
};

// Componente de Mensagem de Easter Egg
export const EasterEggMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(26, 26, 46, 0.98)",
        color: "white",
        padding: "25px 35px",
        borderRadius: "20px",
        border: "3px solid #ff69b4",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
        zIndex: 10000,
        textAlign: "center",
        maxWidth: "450px",
        animation: "easterEggPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          fontSize: "1.4rem",
          fontWeight: "bold",
          marginBottom: "12px",
          background: "linear-gradient(45deg, #ff69b4, #ffd700)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🎉 Easter Egg Encontrado! 🎉
      </div>

      <div
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.5",
          marginBottom: "15px",
          color: "#f0f0f0",
        }}
      >
        {message.text}
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "rgba(255, 105, 180, 0.8)",
          border: "2px solid #ffd700",
          borderRadius: "15px",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          transition: "all 0.3s ease",
          backgroundImage: "linear-gradient(45deg, #ff69b4, #ff1493)",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 5px 15px rgba(255, 105, 180, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "none";
        }}
      >
        ✨ Fechar ✨
      </button>
    </div>
  );
};

// Componente de Efeitos Especiais
export const SpecialEffects = ({ effects }) => {
  if (!effects || effects.length === 0) return null;

  return (
    <>
      {effects.map((effect) => (
        <div
          key={effect.id}
          style={{
            position: "fixed",
            left: `${effect.x}%`,
            top: `${effect.y}%`,
            fontSize: `${16 * effect.scale}px`,
            pointerEvents: "none",
            zIndex: 9999,
            animation: `easterEggSparkle 2.5s ease-out forwards`,
            animationDelay: `${effect.delay}ms`,
            transform: `rotate(${effect.rotation}deg)`,
          }}
        >
          {effect.emoji}
        </div>
      ))}
    </>
  );
};

// Componente de Contador de Easter Eggs
export const EasterEggCounter = ({ currentPhase, position = "top-left" }) => {
  const { getTotalEggsFound, getPhaseEggsFound } = useEasterEggs(currentPhase);
  const [isExpanded, setIsExpanded] = useState(false);

  const totalEggs = getTotalEggsFound();
  const phaseEggs = getPhaseEggsFound();

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
        backgroundColor: "rgba(26, 26, 46, 0.9)",
        color: "white",
        padding: isExpanded ? "18px" : "12px",
        borderRadius: "18px",
        border: "2px solid #ff69b4",
        cursor: "pointer",
        transition: "all 0.4s ease",
        zIndex: 1001,
        minWidth: isExpanded ? "220px" : "70px",
        textAlign: "center",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.05)";
        e.target.style.boxShadow = "0 10px 25px rgba(255, 105, 180, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
      }}
    >
      <div style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
        🥚 {totalEggs}
      </div>

      {isExpanded && (
        <div
          style={{
            fontSize: "0.9rem",
            marginTop: "10px",
            opacity: 0.9,
          }}
        >
          <div style={{ color: "#ffd700", fontWeight: "bold" }}>
            Total: {totalEggs} easter eggs
          </div>
          <div style={{ color: "#ff69b4", marginTop: "3px" }}>
            Nesta fase: {phaseEggs}
          </div>
          <div
            style={{
              marginTop: "8px",
              fontSize: "0.7rem",
              color: "#ccc",
              fontStyle: "italic",
            }}
          >
            Clique em áreas suspeitas! 🔍
          </div>
        </div>
      )}
    </div>
  );
};

// CSS para animações dos easter eggs
export const easterEggCSS = `
  @keyframes easterEggPop {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.3) rotate(-180deg);
    }
    60% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.1) rotate(10deg);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }
  }

  @keyframes easterEggSparkle {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0) rotate(0deg);
    }
    30% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.5) rotate(120deg);
    }
    70% {
      opacity: 0.8;
      transform: translate(-50%, -50%) scale(1.2) rotate(240deg);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.3) rotate(360deg);
    }
  }

  @keyframes easterEggFloat {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(10deg);
    }
  }

  @keyframes easterEggGlow {
    0%, 100% {
      box-shadow: 0 0 10px rgba(255, 105, 180, 0.4);
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 105, 180, 0.8), 
                  0 0 30px rgba(255, 215, 0, 0.4);
    }
  }
`;
