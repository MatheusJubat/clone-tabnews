// hooks/useTransition.js - Versão Corrigida e Atualizada
import { useState } from "react";
import { useRouter } from "next/router";

export const useTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionData, setTransitionData] = useState(null);
  const router = useRouter();

  const startTransition = (fromPhase, toPhase, message, delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTransitionData({
          fromPhase,
          toPhase,
          message,
          onComplete: () => {
            setIsTransitioning(false);
            setTransitionData(null);

            // Roteamento corrigido para as novas fases
            let route = `/aventura/${toPhase}`;

            // Casos especiais de roteamento
            if (toPhase === "galeria") {
              route = "/galeria";
            } else if (toPhase === "joguinho") {
              route = "/joguinho";
            } else if (toPhase === "pedido") {
              route = "/pedido";
            }

            router.push(route);
            resolve();
          },
        });
        setIsTransitioning(true);
      }, delay);
    });
  };

  return {
    isTransitioning,
    transitionData,
    startTransition,
  };
};

// Mensagens personalizadas para cada transição - ATUALIZADAS
export const transitionMessages = {
  "joguinho-to-galeria": "Preparando galeria de momentos especiais...",
  "galeria-to-fase1": "Os gatinhos estão abrindo o grimório secreto...",
  "fase1-to-fase2": "Maomao está preparando poções mágicas...",
  "fase2-to-pesca": "Preparando vara de pescar encantada...",
  "pesca-to-fase3": "Calcifer está aquecendo o castelo andante...",
  "fase3-to-fase-flores": "Plantando sementes do jardim encantado...",
  "fase-flores-to-quiz-personalizado":
    "Preparando quiz super personalizado da Millena...",
  "quiz-personalizado-to-fase-games":
    "Carregando saves dos jogos favoritos (Fallout & Far Cry)...",
  "fase-games-to-fase4": "Os Jedi Cats estão ativando os sabres de luz...",
  "fase4-to-fase5": "Steven está sintonizando a frequência kawaii...",
  "fase5-to-fase6": "As Crystal Gems estão preparando o templo...",
  "fase6-to-jogo-cobrinha": "Preparando cobra do amor...",
  "jogo-cobrinha-to-fase7": "Carregando cartuchos 8-bit...",
  "fase7-to-fase8": "Ted está separando uma mesa no MacLaren's...",
  "fase8-to-faseFinal": "Preparando a revelação mais importante...",
  "faseFinal-to-pedido": "💍 O momento mais especial está chegando... 💍",
};

// Função helper para obter mensagem da transição
export const getTransitionMessage = (from, to) => {
  const key = `${from}-to-${to}`;
  return (
    transitionMessages[key] ||
    `Preparando próxima aventura mágica... (${from} → ${to})`
  );
};

// Mensagens especiais com temática personalizada
export const specialMessages = {
  picos: [
    "👉 Millena está dando picos no Matheus! 😂",
    "Hora dos famosos cutucões na barriga!",
    "Pico! Pico! Pico! (Matheus fingindo que não gosta)",
  ],
  son: [
    "Adicionando 'son' no final das frases...",
    "Carregandoson as próximas aventuras...",
    "Quase prontoson para continuar!",
  ],
  borboletas: [
    "Cuidado! Borboletas assustadoras por perto! 🦋😰",
    "Millena está correndo das borboletas! 🏃‍♀️💨",
    "KYAAAAA! Uma borboleta! (Millena em pânico)",
  ],
  jogos: [
    "Matheus finalmente vai jogar Fallout! 🎮",
    "Carregando Far Cry... (Matheus suspirou)",
    "Preparando sessão de gaming em casal!",
  ],
  gatinhos: [
    "Os gatinhos estão preparando algo especial...",
    "Miau! Miau! (Gatinhos aprovando)",
    "Whiskers está organizando a próxima fase!",
  ],
};

// Função para obter mensagem especial aleatória
export const getSpecialMessage = (type) => {
  const messages = specialMessages[type] || specialMessages.gatinhos;
  return messages[Math.floor(Math.random() * messages.length)];
};

// Configurações de transição personalizadas
export const transitionConfig = {
  duration: {
    fast: 800,
    normal: 1500,
    slow: 2500,
    romantic: 3000, // Para momentos especiais
  },
  effects: {
    hearts: "💕💖💗💓💘",
    sparkles: "✨🌟💫⭐",
    cats: "🐱😸😻🐱‍👤🐱‍🚀",
    games: "🎮🕹️👾🎯🏆",
    flowers: "🌸🌺🌻🌷🌹",
  },
};

// Hook personalizado para transições temáticas
export const useThemedTransition = (theme = "default") => {
  const { isTransitioning, transitionData, startTransition } = useTransition();

  const startThemedTransition = (fromPhase, toPhase, delay = 0) => {
    let message = getTransitionMessage(fromPhase, toPhase);

    // Personalizar mensagem baseada no tema
    switch (theme) {
      case "romantic":
        message = `💕 ${message} 💕`;
        break;
      case "gaming":
        message = `🎮 ${message} 🎮`;
        break;
      case "kawaii":
        message = `🌸 ${message} 🌸`;
        break;
      case "magical":
        message = `✨ ${message} ✨`;
        break;
      default:
        // Adicionar emoji de gatinho por padrão
        message = `🐱 ${message}`;
    }

    return startTransition(fromPhase, toPhase, message, delay);
  };

  return {
    isTransitioning,
    transitionData,
    startThemedTransition,
  };
};

// Utilitário para debug de navegação
export const debugNavigation = (enabled = false) => {
  if (!enabled) return;

  console.log("🐱 Debug de Navegação Ativado!");
  console.log("📋 Sequência de Fases:");
  console.log("1. index.js → joguinho.js");
  console.log("2. joguinho.js → galeria.js");
  console.log("3. galeria.js → aventura/fase1.js");
  console.log("4. aventura/fase1.js → aventura/fase2.js");
  console.log("5. aventura/fase2.js → aventura/pesca.js");
  console.log("6. aventura/pesca.js → aventura/fase3.js");
  console.log("7. aventura/fase3.js → aventura/fase-flores.js");
  console.log("8. aventura/fase-flores.js → aventura/quiz-personalizado.js");
  console.log("9. aventura/quiz-personalizado.js → aventura/fase-games.js");
  console.log("10. aventura/fase-games.js → aventura/fase4.js");
  console.log("11. aventura/fase4.js → aventura/fase5.js");
  console.log("12. aventura/fase5.js → aventura/fase6.js");
  console.log("13. aventura/fase6.js → aventura/jogo-cobrinha.js");
  console.log("14. aventura/jogo-cobrinha.js → aventura/fase7.js");
  console.log("15. aventura/fase7.js → aventura/fase8.js");
  console.log("16. aventura/fase8.js → aventura/faseFinal.js");
  console.log("17. aventura/faseFinal.js → pedido.js");
  console.log("💍 FIM: Pedido de Casamento!");
};

// Estatísticas de navegação
export const navigationStats = {
  totalPhases: 17,
  estimatedTime: "45-60 minutos",
  easterEggs: "50+ escondidos",
  themes: ["Romance", "Gaming", "Anime", "Retro", "Magical"],
  personalizedElements: [
    "Picos",
    "Son",
    "Borboletas",
    "Fallout",
    "Far Cry",
    "Gatinhos",
  ],
};

// Função para verificar se uma fase existe
export const validatePhase = (phaseName) => {
  const validPhases = [
    "fase1",
    "fase2",
    "pesca",
    "fase3",
    "fase-flores",
    "quiz-personalizado",
    "fase-games",
    "fase4",
    "fase5",
    "fase6",
    "jogo-cobrinha",
    "fase7",
    "fase8",
    "faseFinal",
  ];

  return validPhases.includes(phaseName);
};

// Função para obter informações da fase
export const getPhaseInfo = (phaseName) => {
  const phaseInfo = {
    fase1: { name: "Grimório dos Gatos", theme: "magical", difficulty: "easy" },
    fase2: {
      name: "Laboratório da Maomao",
      theme: "anime",
      difficulty: "easy",
    },
    pesca: {
      name: "Pescaria dos Momentos",
      theme: "adventure",
      difficulty: "medium",
    },
    fase3: {
      name: "Castelo Andante do Calcifer",
      theme: "magical",
      difficulty: "medium",
    },
    "fase-flores": {
      name: "Jardim Encantado",
      theme: "romantic",
      difficulty: "easy",
    },
    "quiz-personalizado": {
      name: "Quiz da Millena",
      theme: "personal",
      difficulty: "medium",
    },
    "fase-games": {
      name: "Mundo dos Games",
      theme: "gaming",
      difficulty: "hard",
    },
    fase4: { name: "Jedi Cats", theme: "sci-fi", difficulty: "medium" },
    fase5: { name: "Steven Universe", theme: "anime", difficulty: "medium" },
    fase6: { name: "Anime Kawaii", theme: "kawaii", difficulty: "easy" },
    "jogo-cobrinha": {
      name: "Cobrinha do Amor",
      theme: "retro",
      difficulty: "hard",
    },
    fase7: { name: "Arcade 8-bit", theme: "retro", difficulty: "medium" },
    fase8: { name: "MacLaren's Pub", theme: "comedy", difficulty: "medium" },
    faseFinal: {
      name: "Grande Revelação",
      theme: "romantic",
      difficulty: "epic",
    },
  };

  return (
    phaseInfo[phaseName] || {
      name: "Fase Desconhecida",
      theme: "default",
      difficulty: "unknown",
    }
  );
};
