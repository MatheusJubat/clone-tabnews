// hooks/useTransition.js - Versão Corrigida
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
            router.push(`/aventura/${toPhase}`);
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

// Mensagens personalizadas para cada transição
export const transitionMessages = {
  "joguinho-to-galeria": "Preparando galeria de momentos especiais...",
  "galeria-to-fase1": "Os gatinhos estão abrindo o grimório secreto...",
  "fase1-to-fase2": "Maomao está preparando poções mágicas...",
  "fase2-to-pesca": "Preparando vara de pescar encantada...",
  "pesca-to-fase3": "Os gatos reais estão abrindo os portões do castelo...",
  "fase3-to-fase4": "Os Jedi Cats estão ativando os sabres de luz...",
  "fase4-to-fase5": "Steven está sintonizando a frequência kawaii...",
  "fase5-to-fase6": "As Crystal Gems estão preparando o templo...",
  "fase6-to-fase7": "Carregando cartuchos 8-bit...",
  "fase7-to-fase8": "Ted está separando uma mesa no MacLaren's...",
  "fase8-to-fase-final": "Preparando a revelação mais importante...",
  "fase-final-to-pedido": "O momento mais especial está chegando...",
};

// Função helper para obter mensagem da transição
export const getTransitionMessage = (from, to) => {
  const key = `${from}-to-${to}`;
  return transitionMessages[key] || "Preparando próxima aventura mágica...";
};
