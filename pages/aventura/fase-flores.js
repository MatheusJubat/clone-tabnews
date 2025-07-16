// pages/aventura/fase-flores.js - Jardim Encantado da Millena
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TransitionComponent from "../../components/TransitionComponent";
import { useTransition, getTransitionMessage } from "../../hooks/useTransition";
import { MusicPlayer, musicPlayerCSS } from "../../hooks/useMusic";
import {
  useEasterEggs,
  EasterEggButton,
  EasterEggMessage,
  SpecialEffects,
  EasterEggCounter,
  easterEggCSS,
} from "../../hooks/useEasterEggs";

export default function FaseFlores() {
  const router = useRouter();
  const { isTransitioning, transitionData, startTransition } = useTransition();
  const {
    findEasterEgg,
    showMessage,
    setShowMessage,
    specialEffects,
    getTotalEggsFound,
  } = useEasterEggs("fase-flores");

  const [etapaAtual, setEtapaAtual] = useState("entrada");
  const [floresColetadas, setFloresColetadas] = useState([]);
  const [borboletas, setBorboletas] = useState([]);
  const [petalas, setPetalas] = useState([]);
  const [dialogoAtual, setDialogoAtual] = useState(0);
  const [jardimCompleto, setJardimCompleto] = useState(false);

  const dialogos = [
    {
      personagem: "🌹",
      nome: "Rosa do Amor",
      fala: "Bem-vinda ao Jardim dos Sentimentos! Sou a Rosa que representa todo o amor que o Matheus sente por você, Millena!",
    },
    {
      personagem: "🌻",
      nome: "Girassol da Alegria",
      fala: "E eu sou o Girassol que sempre se volta para o sol... assim como o coração dele sempre se volta para você!",
    },
    {
      personagem: "🌷",
      nome: "Tulipa da Ternura",
      fala: "Cada flor aqui conta uma história especial... Colete-nos para descobrir todos os sentimentos! 💕",
    },
  ];

  const floresEspeciais = [
    {
      id: 1,
      emoji: "🌹",
      nome: "Rosa do Primeiro Encontro",
      mensagem:
        "A primeira vez que vocês se olharam e souberam que era especial... 💕",
      posicao: { x: 20, y: 60 },
      coletada: false,
    },
    {
      id: 2,
      emoji: "🌻",
      nome: "Girassol das Risadas",
      mensagem: "Todas as gargalhadas que vocês já compartilharam juntos! 😄",
      posicao: { x: 70, y: 40 },
      coletada: false,
    },
    {
      id: 3,
      emoji: "🌷",
      nome: "Tulipa dos Sonhos",
      mensagem: "Todos os planos e sonhos que vocês fazem para o futuro! 🌟",
      posicao: { x: 50, y: 70 },
      coletada: false,
    },
    {
      id: 4,
      emoji: "🌺",
      nome: "Hibisco da Paixão",
      mensagem: "A intensidade do amor que cresce a cada dia! 🔥",
      posicao: { x: 30, y: 30 },
      coletada: false,
    },
    {
      id: 5,
      emoji: "🌸",
      nome: "Cerejeira dos Momentos",
      mensagem: "Cada pequeno momento especial que vocês vivem juntos! ⭐",
      posicao: { x: 80, y: 65 },
      coletada: false,
    },
  ];

  const [flores, setFlores] = useState(floresEspeciais);

  useEffect(() => {
    // Criar borboletas (algumas vão assustar e outras são fofas)
    const novasBorboletas = [];
    for (let i = 0; i < 12; i++) {
      novasBorboletas.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: Math.random() < 0.3 ? "🦋" : "🧚‍♀️", // 30% borboletas, 70% fadas
        velocidade: Math.random() * 2 + 1,
        direcao: Math.random() * 360,
        assustadora: Math.random() < 0.3, // 30% são assustadoras
      });
    }
    setBorboletas(novasBorboletas);

    // Criar pétalas flutuantes
    const novasPetalas = [];
    for (let i = 0; i < 30; i++) {
      novasPetalas.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ["🌸", "🌺", "🌹", "🌷"][Math.floor(Math.random() * 4)],
        delay: Math.random() * 4,
      });
    }
    setPetalas(novasPetalas);
  }, []);

  // Animar borboletas
  useEffect(() => {
    const interval = setInterval(() => {
      setBorboletas((prev) =>
        prev.map((borboleta) => {
          let newX =
            borboleta.x + Math.cos(borboleta.direcao) * borboleta.velocidade;
          let newY =
            borboleta.y + Math.sin(borboleta.direcao) * borboleta.velocidade;
          let newDirecao = borboleta.direcao;

          // Manter borboletas na tela
          if (newX < 0 || newX > 100) {
            newDirecao = Math.PI - borboleta.direcao;
            newX = Math.max(0, Math.min(100, newX));
          }
          if (newY < 0 || newY > 100) {
            newDirecao = -borboleta.direcao;
            newY = Math.max(0, Math.min(100, newY));
          }

          return {
            ...borboleta,
            x: newX,
            y: newY,
            direcao: newDirecao,
          };
        }),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const coletarFlor = (florId) => {
    setFlores((prev) =>
      prev.map((flor) =>
        flor.id === florId ? { ...flor, coletada: true } : flor,
      ),
    );

    const florColetada = flores.find((f) => f.id === florId);
    setFloresColetadas((prev) => [...prev, florColetada]);

    // Criar efeito especial
    findEasterEgg({ x: Math.random() * 100, y: Math.random() * 100 });

    // Verificar se coletou todas
    if (floresColetadas.length + 1 >= flores.length) {
      setTimeout(() => setJardimCompleto(true), 1000);
    }
  };

  const proximoDialogo = () => {
    if (dialogoAtual < dialogos.length - 1) {
      setDialogoAtual(dialogoAtual + 1);
    } else {
      setEtapaAtual("coletando");
    }
  };

  const clickBorboleta = (borboletaId) => {
    const borboleta = borboletas.find((b) => b.id === borboletaId);
    if (borboleta.assustadora) {
      // Easter egg especial para borboletas assustadoras
      findEasterEgg({
        x: borboleta.x,
        y: borboleta.y,
        message: "AHHHH! UMA BORBOLETA! 😱🦋 (O maior medo da Millena kkkkk)",
      });
    } else {
      findEasterEgg({ x: borboleta.x, y: borboleta.y });
    }
  };

  const avancar = async () => {
    const message = getTransitionMessage("fase-flores", "quiz-personalizado");
    await startTransition("fase-flores", "quiz-personalizado", message, 1000);
  };

  // Se estiver em transição
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
    <div style={containerStyle}>
      <style jsx global>{`
        ${musicPlayerCSS}
        ${easterEggCSS}
        
        @keyframes petalFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes borboletaVoo {
          0%,
          100% {
            transform: scale(1) rotate(-5deg);
          }
          25% {
            transform: scale(1.1) rotate(5deg);
          }
          50% {
            transform: scale(0.9) rotate(-3deg);
          }
          75% {
            transform: scale(1.05) rotate(3deg);
          }
        }

        @keyframes florBrilho {
          0%,
          100% {
            filter: brightness(1) drop-shadow(0 0 5px rgba(255, 105, 180, 0.5));
          }
          50% {
            filter: brightness(1.3)
              drop-shadow(0 0 15px rgba(255, 105, 180, 0.8));
          }
        }

        @keyframes jardimMagico {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes florGrow {
          from {
            transform: scale(0) rotate(-180deg);
          }
          to {
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>

      {/* Player de Música */}
      <MusicPlayer
        phaseName="fase-flores"
        position="bottom-right"
        showControls={true}
      />

      {/* Contador de Easter Eggs */}
      <EasterEggCounter currentPhase="fase-flores" position="top-right" />

      {/* Easter Eggs Escondidos */}
      <EasterEggButton
        position={{ top: "10%", left: "15%" }}
        size={45}
        onFind={findEasterEgg}
      />

      <EasterEggButton
        position={{ bottom: "20%", right: "10%" }}
        size={40}
        onFind={findEasterEgg}
      />

      {/* Pétalas flutuantes */}
      {petalas.map((petala) => (
        <div
          key={petala.id}
          style={{
            ...petalaStyle,
            left: `${petala.x}%`,
            top: `${petala.y}%`,
            animationDelay: `${petala.delay}s`,
          }}
        >
          {petala.emoji}
        </div>
      ))}

      {/* Borboletas voando */}
      {borboletas.map((borboleta) => (
        <div
          key={borboleta.id}
          style={{
            ...borboletaStyle,
            left: `${borboleta.x}%`,
            top: `${borboleta.y}%`,
            cursor: borboleta.assustadora ? "help" : "pointer",
            fontSize: borboleta.assustadora ? "1.5rem" : "1.2rem",
          }}
          onClick={() => clickBorboleta(borboleta.id)}
        >
          {borboleta.emoji}
        </div>
      ))}

      <div style={contentContainer}>
        {etapaAtual === "entrada" && (
          <div style={entradaContainer}>
            <h1 style={titleStyle}>🌸 Jardim Encantado da Millena 🌸</h1>

            <div style={dialogoContainer}>
              <div style={personagemContainer}>
                <div style={personagemEmoji}>
                  {dialogos[dialogoAtual].personagem}
                </div>
                <div style={personagemNome}>{dialogos[dialogoAtual].nome}</div>
              </div>

              <div style={falaContainer}>
                <p style={falaTexto}>{dialogos[dialogoAtual].fala}</p>
              </div>

              <button onClick={proximoDialogo} style={proximoButton}>
                {dialogoAtual < dialogos.length - 1
                  ? "💬 Continuar"
                  : "🌺 Explorar Jardim"}
              </button>
            </div>

            <div style={introducaoContainer}>
              <p style={introducaoTexto}>
                "Este é um jardim muito especial, Millena... Cada flor aqui
                representa um sentimento que o Matheus tem por você. Colete
                todas para descobrir a mensagem completa! 💕"
              </p>
            </div>
          </div>
        )}

        {etapaAtual === "coletando" && !jardimCompleto && (
          <div style={coletandoContainer}>
            <div style={headerContainer}>
              <h2 style={coletandoTitle}>🌺 Colete as Flores do Amor 🌺</h2>
              <div style={progressoContainer}>
                <div style={progressoTexto}>
                  Flores coletadas: {floresColetadas.length}/{flores.length}
                </div>
                <div style={progressoBar}>
                  <div
                    style={{
                      ...progressoFill,
                      width: `${(floresColetadas.length / flores.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Jardim com flores */}
            <div style={jardimContainer}>
              {flores.map((flor) => (
                <div
                  key={flor.id}
                  style={{
                    ...florContainer,
                    left: `${flor.posicao.x}%`,
                    top: `${flor.posicao.y}%`,
                    opacity: flor.coletada ? 0.3 : 1,
                    pointerEvents: flor.coletada ? "none" : "auto",
                  }}
                  onClick={() => !flor.coletada && coletarFlor(flor.id)}
                >
                  <div style={florEmoji}>{flor.emoji}</div>
                  <div style={florNome}>{flor.nome}</div>
                  {flor.coletada && <div style={coletadaMarker}>✅</div>}
                </div>
              ))}
            </div>

            {/* Flores coletadas com mensagens */}
            {floresColetadas.length > 0 && (
              <div style={mensagensContainer}>
                <h3 style={mensagensTitle}>💌 Mensagens Descobertas:</h3>
                <div style={mensagensList}>
                  {floresColetadas.map((flor, index) => (
                    <div key={index} style={mensagemCard}>
                      <div style={mensagemEmoji}>{flor.emoji}</div>
                      <div style={mensagemTexto}>{flor.mensagem}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={dicaContainer}>
              💡 Dica: Clique nas flores para coletá-las! Cuidado com as
              borboletas... 🦋😰
            </div>
          </div>
        )}

        {jardimCompleto && (
          <div style={completoContainer}>
            <h1 style={completoTitle}>🎉 Jardim Completo! 🎉</h1>

            <div style={jardimMagicoContainer}>
              <div style={magiaVisual}>
                {flores.map((flor, index) => (
                  <div
                    key={index}
                    style={{
                      ...florMagica,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  >
                    {flor.emoji}
                  </div>
                ))}
              </div>
            </div>

            <div style={mensagemFinalContainer}>
              <h3 style={mensagemFinalTitle}>💕 Mensagem Especial 💕</h3>
              <div style={mensagemFinalTexto}>
                "Millena, assim como este jardim floresceu com amor e carinho,
                meu coração floresce a cada dia que passo ao seu lado. Cada flor
                representa um pedacinho do meu amor por você, e assim como elas,
                meu amor só cresce e fica mais bonito! 🌹💖"
                <br />
                <br />
                <em style={assinatura}>- Com todo amor, Matheus 💕</em>
              </div>
            </div>

            <div style={conquistas}>
              <h4 style={conquistasTitle}>🏆 Conquistas Desbloqueadas:</h4>
              <div style={conquistasList}>
                <div style={conquista}>🌹 Coletora de Rosas do Amor</div>
                <div style={conquista}>🌻 Guardiã dos Girassóis da Alegria</div>
                <div style={conquista}>🌸 Mestre do Jardim Encantado</div>
                <div style={conquista}>
                  🦋 Sobrevivente das Borboletas Assustadoras
                </div>
              </div>
            </div>

            <button onClick={avancar} style={avancarButton}>
              🌟 Próxima Aventura Mágica 🌟
            </button>
          </div>
        )}
      </div>

      {/* Mensagem de Easter Egg */}
      <EasterEggMessage
        message={showMessage}
        onClose={() => setShowMessage(null)}
      />

      {/* Efeitos Especiais */}
      <SpecialEffects effects={specialEffects} />
    </div>
  );
}

// Estilos
const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(45deg, #FFE4E1, #FFF0F5, #F0FFF0, #E0FFFF)",
  backgroundSize: "400% 400%",
  animation: "jardimMagico 8s ease infinite",
  color: "#2C5530",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Georgia", serif',
};

const petalaStyle = {
  position: "absolute",
  fontSize: "1rem",
  animation: "petalFloat 5s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
  opacity: 0.7,
};

const borboletaStyle = {
  position: "absolute",
  animation: "borboletaVoo 3s ease-in-out infinite",
  zIndex: 5,
  transition: "all 0.3s ease",
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

const entradaContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "700px",
  textAlign: "center",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  border: "4px solid #FFB6C1",
};

const titleStyle = {
  fontSize: "2.5rem",
  color: "#FF69B4",
  marginBottom: "30px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
};

const dialogoContainer = {
  backgroundColor: "rgba(255, 182, 193, 0.2)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #FFB6C1",
};

const personagemContainer = {
  display: "flex",
  align: "center",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "20px",
};

const personagemEmoji = {
  fontSize: "3rem",
  animation: "florBrilho 2s ease-in-out infinite",
};

const personagemNome = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#8B4513",
  alignSelf: "center",
};

const falaContainer = {
  marginBottom: "20px",
};

const falaTexto = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#2C5530",
  fontStyle: "italic",
  margin: 0,
};

const proximoButton = {
  padding: "15px 30px",
  fontSize: "1.1rem",
  backgroundColor: "#FF69B4",
  color: "#fff",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const introducaoContainer = {
  backgroundColor: "rgba(144, 238, 144, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #90EE90",
};

const introducaoTexto = {
  fontSize: "1rem",
  lineHeight: "1.5",
  color: "#2C5530",
  margin: 0,
  fontStyle: "italic",
};

const coletandoContainer = {
  width: "100%",
  maxWidth: "1000px",
};

const headerContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
  padding: "25px",
  textAlign: "center",
  marginBottom: "25px",
  border: "3px solid #FFB6C1",
};

const coletandoTitle = {
  fontSize: "2rem",
  color: "#FF69B4",
  marginBottom: "20px",
};

const progressoContainer = {
  marginBottom: "15px",
};

const progressoTexto = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#2C5530",
  marginBottom: "10px",
};

const progressoBar = {
  width: "100%",
  height: "20px",
  backgroundColor: "#F0F0F0",
  borderRadius: "10px",
  overflow: "hidden",
  border: "2px solid #FFB6C1",
};

const progressoFill = {
  height: "100%",
  background: "linear-gradient(45deg, #FF69B4, #FFB6C1)",
  borderRadius: "8px",
  transition: "width 0.5s ease",
};

const jardimContainer = {
  position: "relative",
  width: "100%",
  height: "400px",
  backgroundColor: "rgba(144, 238, 144, 0.3)",
  borderRadius: "20px",
  border: "4px solid #90EE90",
  marginBottom: "25px",
  overflow: "hidden",
};

const florContainer = {
  position: "absolute",
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  animation: "florGrow 0.8s ease-out",
};

const florEmoji = {
  fontSize: "3rem",
  animation: "florBrilho 3s ease-in-out infinite",
  marginBottom: "5px",
};

const florNome = {
  fontSize: "0.8rem",
  fontWeight: "bold",
  color: "#2C5530",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "4px 8px",
  borderRadius: "10px",
  border: "1px solid #90EE90",
};

const coletadaMarker = {
  position: "absolute",
  top: "-10px",
  right: "-10px",
  fontSize: "1.5rem",
};

const mensagensContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "20px",
  border: "3px solid #FFB6C1",
};

const mensagensTitle = {
  color: "#FF69B4",
  marginBottom: "20px",
  textAlign: "center",
};

const mensagensList = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const mensagemCard = {
  display: "flex",
  align: "center",
  gap: "15px",
  backgroundColor: "rgba(255, 182, 193, 0.2)",
  padding: "15px",
  borderRadius: "15px",
  border: "2px solid #FFB6C1",
};

const mensagemEmoji = {
  fontSize: "2rem",
};

const mensagemTexto = {
  fontSize: "1rem",
  color: "#2C5530",
  fontStyle: "italic",
  flex: 1,
};

const dicaContainer = {
  textAlign: "center",
  fontSize: "1rem",
  color: "#8B4513",
  fontStyle: "italic",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "15px",
  borderRadius: "15px",
  border: "2px solid #DDD",
};

const completoContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "800px",
  textAlign: "center",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
  border: "4px solid #32CD32",
};

const completoTitle = {
  fontSize: "2.5rem",
  color: "#32CD32",
  marginBottom: "25px",
  animation: "florBrilho 2s ease-in-out infinite",
};

const jardimMagicoContainer = {
  marginBottom: "30px",
};

const magiaVisual = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "25px",
};

const florMagica = {
  fontSize: "3rem",
  animation: "florGrow 1s ease-out",
};

const mensagemFinalContainer = {
  backgroundColor: "rgba(255, 105, 180, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #FF69B4",
};

const mensagemFinalTitle = {
  color: "#FF69B4",
  marginBottom: "20px",
};

const mensagemFinalTexto = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#2C5530",
  fontStyle: "italic",
};

const assinatura = {
  color: "#FF69B4",
  fontWeight: "bold",
};

const conquistas = {
  backgroundColor: "rgba(50, 205, 50, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #32CD32",
};

const conquistasTitle = {
  color: "#32CD32",
  marginBottom: "15px",
};

const conquistasList = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "10px",
};

const conquista = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "10px",
  borderRadius: "10px",
  fontSize: "0.9rem",
  fontWeight: "bold",
  color: "#2C5530",
  border: "1px solid #32CD32",
};

const avancarButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  background: "linear-gradient(45deg, #FF69B4, #FFB6C1, #FF1493)",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 15px 30px rgba(255, 105, 180, 0.4)",
};
