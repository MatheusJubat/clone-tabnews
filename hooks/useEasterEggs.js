// hooks/useEasterEggs.js
import { useState, useEffect } from "react";

export const easterEggMessages = {
  home: [
    "🐱 Miau! Você encontrou o gatinho da sorte! +100 pontos de amor!",
    "✨ Brilho mágico ativado! O amor está no ar!",
    "💖 Segredo descoberto: Ela já te ama muito!",
  ],
  joguinho: [
    "😸 Os gatinhos aprovam sua persistência!",
    "💕 Easter egg do amor! Vocês são perfeitos juntos!",
    "🎮 Achievement unlocked: Cat Whisperer!",
  ],
  galeria: [
    "📸 Foto secreta desbloqueada: Vocês são fotogênicos demais!",
    "🌟 Memória especial encontrada: Primeiro encontro!",
    "💝 Album secreto: 1001 momentos de felicidade!",
  ],
  fase1: [
    "📜 Página secreta do grimório: 'Receita do Amor Eterno'",
    "🔮 Bola de cristal revela: Muito amor no futuro!",
    "🐱‍👤 Gato mago sussurra: 'Ela é especial, não deixe escapar!'",
    "✨ Feitiço ativado: Amor infinito!",
  ],
  fase2: [
    "🧪 Poção secreta descoberta: Elixir da Felicidade!",
    "🌸 Maomao sorri: 'Vocês são o casal mais fofo!'",
    "💊 Ingrediente secreto revelado: Muito carinho!",
    "🔬 Fórmula descoberta: Amor + Tempo = Felicidade Eterna!",
  ],
  pesca: [
    "🐠 Peixe dourado da sorte capturado! Faça um pedido!",
    "🎣 Pescador mestre sussurra: 'O maior tesouro já está com você'",
    "🌊 Sereia aparece: 'O amor de vocês é mais profundo que o oceano!'",
    "✨ Tesouro submersso encontrado: Confiança mútua!",
  ],
  fase3: [
    "👑 Gato real decreta: 'Vocês são o casal mais nobre do reino!'",
    "🏰 Torre secreta revelada: Sala dos Juramentos de Amor!",
    "💎 Joia da coroa pisca: Algo especial está chegando...",
    "🛡️ Cavaleiro felino proclama: 'Defendo este amor!'",
    "📚 Livro real aberto: 'Como Amar Para Sempre - Capítulo Vocês'",
  ],
  fase4: [
    "⚡ Yoda Gato sussurra: 'Strong with love, you two are!'",
    "🛸 Nave secreta aparece: USS Romance!",
    "💫 Força revelada: O poder do amor verdadeiro!",
    "🤖 R2-D2 Gato beeps: 'Love-love-beep-true-love!'",
    "🌟 Jedi Council aprova: 'Destinados vocês são!'",
  ],
  fase5: [
    "🍜 Naruto Gato grita: 'Dattebayo! Vocês são um time incrível!'",
    "🧪 Maomao anota: 'Caso de amor perfeito observado!'",
    "⚔️ Tanjiro Gato sorri: 'Sinto o aroma da felicidade!'",
    "💎 Steven Gato canta: 'Love like yours is rare and true!'",
    "🌸 Sakura secreta floresce: Amor em plena primavera!",
  ],
  fase6: [
    "💎 Ametista brinca: 'Vocês são mais preciosos que qualquer gema!'",
    "🤍 Pérola organiza: 'Relationship goals achieved!'",
    "❤️ Garnet sorri: 'I can see your future... it's beautiful!'",
    "🌟 Steven vibra: 'Your love makes my gem glow!'",
    "🎵 Música das esferas toca: Harmonia perfeita!",
  ],
  fase7: [
    "🎮 Achievement Unlocked: Power Couple!",
    "👾 Pixel perfeito encontrado: Vocês juntos!",
    "🕹️ High Score batido: Amor Level MAX!",
    "💖 8-bit heart collected: +1000 love points!",
    "🏆 Ranking amoroso: #1 Couple no servidor!",
  ],
  fase8: [
    "🍺 Barney aparece: 'Legen-- wait for it... DARY!'",
    "📺 Ted conta: 'E assim começou a maior história de amor...'",
    "👨‍⚖️ Marshall bate o martelo: 'Relationship approved!'",
    "🎨 Lily pinta: 'Vocês são minha obra de arte favorita!'",
    "📰 Robin reporta: 'Breaking: Cutest couple ever found!'",
  ],
  "fase-final": [
    "🌟 Revelação cósmica: Vocês são almas gêmeas!",
    "💫 Portal do amor se abre: Destino confirmado!",
    "✨ Magia suprema ativada: Amor eterno garantido!",
    "🔮 Profecia realizada: 'E viveram felizes para sempre...'",
    "🌈 Arco-íris aparece: Sinal de sorte para sempre!",
  ],
  pedido: [
    "💍 O anel brilha: 'Este é o momento!'",
    "👰‍♀️ Véu de noiva aparece magicamente: 'Ela vai dizer sim!'",
    "🎊 Confetes dourados caem: 'Momento perfeito!'",
    "💒 Igreja dos sonhos se materializa: 'Para o grande dia!'",
    "💕 Cupido aparece: 'Missão cumprida!'",
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

    // Esconder mensagem após 3 segundos
    setTimeout(() => {
      setShowMessage(null);
    }, 3000);

    // Salvar no localStorage para persistir entre sessões
    const saved = JSON.parse(localStorage.getItem("easterEggs") || "{}");
    saved[phaseName] = (saved[phaseName] || 0) + 1;
    localStorage.setItem("easterEggs", JSON.stringify(saved));
  };

  const createSpecialEffect = (position) => {
    const effects = [];
    for (let i = 0; i < 8; i++) {
      effects.push({
        id: `effect-${Date.now()}-${i}`,
        x: position.x + (Math.random() - 0.5) * 100,
        y: position.y + (Math.random() - 0.5) * 100,
        emoji: ["✨", "💖", "🌟", "💫", "⭐"][Math.floor(Math.random() * 5)],
        delay: i * 100,
      });
    }

    setSpecialEffects(effects);

    // Limpar efeitos após animação
    setTimeout(() => {
      setSpecialEffects([]);
    }, 2000);
  };

  const getTotalEggsFound = () => {
    const saved = JSON.parse(localStorage.getItem("easterEggs") || "{}");
    return Object.values(saved).reduce((total, count) => total + count, 0);
  };

  const getPhaseEggsFound = () => {
    const saved = JSON.parse(localStorage.getItem("easterEggs") || "{}");
    return saved[phaseName] || 0;
  };

  return {
    findEasterEgg,
    showMessage,
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
    opacity: isHovered || debug ? 0.3 : 0,
    transition: "all 0.3s ease",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="🐱 Clique aqui para um easter egg!"
    >
      {debug && "🥚"}
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
        backgroundColor: "rgba(255, 105, 180, 0.95)",
        color: "white",
        padding: "20px 30px",
        borderRadius: "20px",
        border: "3px solid #fff",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
        zIndex: 10000,
        textAlign: "center",
        maxWidth: "400px",
        animation: "easterEggPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      }}
    >
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        🎉 Easter Egg Encontrado! 🎉
      </div>

      <div
        style={{
          fontSize: "1rem",
          lineHeight: "1.4",
        }}
      >
        {message.text}
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: "15px",
          padding: "8px 16px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          border: "2px solid white",
          borderRadius: "15px",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
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
            fontSize: "1.5rem",
            pointerEvents: "none",
            zIndex: 9999,
            animation: `easterEggSparkle 2s ease-out forwards`,
            animationDelay: `${effect.delay}ms`,
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
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        padding: isExpanded ? "15px" : "10px",
        borderRadius: "15px",
        border: "2px solid #ff69b4",
        cursor: "pointer",
        transition: "all 0.3s ease",
        zIndex: 1001,
        minWidth: isExpanded ? "200px" : "60px",
        textAlign: "center",
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div style={{ fontSize: "1.2rem" }}>🥚 {totalEggs}</div>

      {isExpanded && (
        <div
          style={{
            fontSize: "0.8rem",
            marginTop: "8px",
            opacity: 0.9,
          }}
        >
          <div>Total: {totalEggs} easter eggs</div>
          <div>Nesta fase: {phaseEggs}</div>
          <div style={{ marginTop: "5px", fontSize: "0.7rem" }}>
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
      transform: translate(-50%, -50%) scale(0.5);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes easterEggSparkle {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5) rotate(360deg);
    }
  }

  @keyframes easterEggFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;
