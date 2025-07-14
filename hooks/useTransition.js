// hooks/useTransition.js
import { useState } from 'react';
import { useRouter } from 'next/router';

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
          }
        });
        setIsTransitioning(true);
      }, delay);
    });
  };

  return {
    isTransitioning,
    transitionData,
    startTransition
  };
};

// Exemplo de uso em uma fase - components/ExempleFase.js
import { useState } from 'react';
import TransitionComponent from '../components/TransitionComponent';
import { useTransition } from '../hooks/useTransition';

export default function ExempleFase() {
  const { isTransitioning, transitionData, startTransition } = useTransition();
  const [faseCompleta, setFaseCompleta] = useState(false);

  const completarFase = async () => {
    setFaseCompleta(true);
    
    // Iniciar transição para próxima fase
    await startTransition(
      'fase1', // fase atual
      'fase2', // próxima fase
      'Os gatinhos estão preparando o laboratório mágico...', // mensagem
      1500 // delay em ms
    );
  };

  // Se estiver em transição, mostrar o componente de transição
  if (isTransitioning && transitionData) {
    return (
      <TransitionComponent
        fromPhase={transitionData.fromPhase}
        toPhase={transitionData.toPhase}
        message={transitionData.message}
        onComplete={transitionData.onComplete}
      />
    );
  }

  return (
    <div>
      {/* Conteúdo normal da fase */}
      <h1>Fase Exemplo</h1>
      
      {!faseCompleta ? (
        <button onClick={completarFase}>
          Completar Fase
        </button>
      ) : (
        <p>Preparando transição...</p>
      )}
    </div>
  );
}

// Exemplo específico para a Fase 1 atualizada - pages/aventura/fase1.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import TransitionComponent from '../../components/TransitionComponent';
import { useTransition } from '../../hooks/useTransition';

export default function Fase1Melhorada() {
  const { isTransitioning, transitionData, startTransition } = useTransition();
  const [resposta, setResposta] = useState(null);
  const [magicParticles, setMagicParticles] = useState([]);
  const [bookOpen, setBookOpen] = useState(false);
  const [catVisible, setCatVisible] = useState(false);

  useEffect(() => {
    // ... código existing para partículas e animações
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        emoji: ["✨", "🌟", "💫", "⭐"][Math.floor(Math.random() * 4)],
      });
    }
    setMagicParticles(particles);

    setTimeout(() => setBookOpen(true), 500);
    setTimeout(() => setCatVisible(true), 1500);
  }, []);

  const avancar = async () => {
    // Usar transição em vez de navegação direta
    await startTransition(
      'fase1',
      'fase2',
      'Maomao está preparando poções especiais no laboratório...',
      1000
    );
  };

  // Se estiver em transição, mostrar componente de transição
  if (isTransitioning && transitionData) {
    return (
      <TransitionComponent
        fromPhase={transitionData.fromPhase}
        toPhase={transitionData.toPhase}
        message={transitionData.message}
        onComplete={transitionData.onComplete}
      />
    );
  }

  // Resto do código da fase permanece igual...
  return (
    <div style={containerStyle}>
      {/* Todo o conteúdo existing da fase 1 */}
      {/* ... */}
      
      {/* Quando resposta for dada, mostrar botão de avançar */}
      {resposta && (
        <button onClick={avancar} style={nextButton}>
          📖 Prosseguir para o próximo capítulo 📖
        </button>
      )}
    </div>
  );
}

// Mensagens personalizadas para cada transição
export const transitionMessages = {
  'joguinho-to-galeria': 'Preparando galeria de momentos especiais...',
  'galeria-to-fase1': 'Os gatinhos estão abrindo o grimório secreto...',
  'fase1-to-fase2': 'Maomao está preparando poções mágicas...',
  'fase2-to-pesca': 'Preparando vara de pescar encantada...',
  'pesca-to-fase3': 'Os gatos reais estão abrindo os portões do castelo...',
  'fase3-to-fase4': 'Os Jedi Cats estão ativando os sabres de luz...',
  'fase4-to-fase5': 'Steven está sintonizando a frequência kawaii...',
  'fase5-to-fase6': 'As Crystal Gems estão preparando o templo...',
  'fase6-to-fase7': 'Carregando cartuchos 8-bit...',
  'fase7-to-fase8': 'Ted está separando uma mesa no MacLaren\'s...',
  'fase8-to-fase-final': 'Preparando a revelação mais importante...',
  'fase-final-to-pedido': 'O momento mais especial está chegando...'
};

// Função helper para obter mensagem da transição
export const getTransitionMessage = (from, to) => {
  const key = `${from}-to-${to}`;
  return transitionMessages[key] || 'Preparando próxima aventura mágica...';
};

// Exemplo de uso completo em qualquer fase:
/*
import TransitionComponent from '../components/TransitionComponent';
import { useTransition, getTransitionMessage } from '../hooks/useTransition';

export default function MinhaFase() {
  const { isTransitioning, transitionData, startTransition } = useTransition();
  
  const irParaProximaFase = async () => {
    const message = getTransitionMessage('fase-atual', 'proxima-fase');
    await startTransition('fase-atual', 'proxima-fase', message);
  };

  if (isTransitioning && transitionData) {
    return <TransitionComponent {...transitionData} />;
  }

  return (
    // Conteúdo da sua fase
  );
}
*/