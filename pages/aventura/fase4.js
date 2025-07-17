// pages/aventura/fase4.js - Jedi Cats Galaxy Melhorada
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TransitionComponent from "../../components/TransitionComponent";
import { useTransition, getTransitionMessage } from "../../hooks/useTransition";

export default function Fase4JediCatsMelhorada() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [missaoAtual, setMissaoAtual] = useState(0);
  const [pontosJedi, setPontosJedi] = useState(0);
  const [sabresCor, setSabresCor] = useState([]);
  const [forceAwakened, setForceAwakened] = useState(false);
  const [estrelas, setEstrelas] = useState([]);
  const [gatosJedi, setGatosJedi] = useState([]);

  const missoes = [
    {
      titulo: "🐱‍👤 Missão: O Mestre Meow-Wan Kenobi",
      pergunta:
        "Padawan, me diga: qual é o lado negro da Força no relacionamento de vocês?",
      opcoes: [
        "😴 Quando o Matheus ronca e eu fico braba son",
        "📱 Quando ele demora 3 horas pra responder no WhatsApp",
        "🎮 Quando ele não quer jogar Far Cry comigo",
        "🤷‍♀️ Não existe lado negro, só picos às vezes son",
      ],
      correta: 3,
      mestre: "Meow-Wan",
      emoji: "🐱‍👤",
      reacao:
        "Sábio você é, jovem Padawan! O amor verdadeiro supera os pequenos picos da vida!",
      sabre: "azul",
    },
    {
      titulo: "🐱‍🚀 Missão: Luke Whiskers e a Rebelião",
      pergunta:
        "Soldado! Como vocês dois lutariam contra o Império dos Relacionamentos Tóxicos?",
      opcoes: [
        "💪 Com muito diálogo e compreensão mútua",
        "☕ Fazendo café e resolvendo tudo numa boa",
        "😂 Rindo de tudo junto e não levando nada a sério",
        "🐱 Mandando os gatinhos resolver por nós son",
      ],
      correta: 0,
      mestre: "Luke Whiskers",
      emoji: "🐱‍🚀",
      reacao:
        "Excelente estratégia! A comunicação é a arma mais poderosa da galáxia!",
      sabre: "verde",
    },
    {
      titulo: "🐱‍💻 Missão: Paw-da Yoda, o Sábio",
      pergunta:
        "Hmmm... Responder você deve: qual o segredo do equilíbrio na Força do Amor?",
      opcoes: [
        "🔄 Dar espaço um para o outro quando necessário",
        "🎮 Jogar videogame juntos (especialmente Far Cry son)",
        "😘 Beijinhos e cafuné todos os dias",
        "🤝 Aceitar as manias e esquisitices um do outro",
      ],
      correta: 3,
      mestre: "Paw-da Yoda",
      emoji: "🐱‍💻",
      reacao:
        "Hmmm... Sábio você é! Aceitar as diferenças, o caminho do amor verdadeiro é.",
      sabre: "roxo",
    },
    {
      titulo: "🐱‍🐉 Missão Final: Derrotar Darth Mittens",
      pergunta:
        "Darth Mittens desafia: 'Você tem medo de algo na Millena?' O que responde?",
      opcoes: [
        "😱 Sim! Tenho medo das borboletas que ela tem medo",
        "💔 Tenho medo de um dia não conseguir fazê-la rir",
        "🎮 Tenho medo que ela me force a jogar Far Cry... espera, isso é bom!",
        "❤️ Só tenho medo de perdê-la, porque ela é minha vida son",
      ],
      correta: 3,
      mestre: "Darth Mittens",
      emoji: "🐱‍🐉",
      reacao:
        "IMPOSSÍVEL! O poder do amor é forte em você! Darth Mittens se rende!",
      sabre: "dourado",
    },
  ];

  useEffect(() => {
    // Criar campo de estrelas
    const novasEstrelas = [];
    for (let i = 0; i < 100; i++) {
      novasEstrelas.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        speed: Math.random() * 2 + 1,
        size: Math.random() * 3 + 1,
      });
    }
    setEstrelas(novasEstrelas);

    // Gatos Jedi
    const cats = [
      { id: 1, emoji: "🐱‍👤", x: 10, y: 20, nome: "Meow-Wan Kenobi" },
      { id: 2, emoji: "🐱‍🚀", x: 85, y: 30, nome: "Luke Whiskers" },
      { id: 3, emoji: "🐱‍💻", x: 15, y: 70, nome: "Paw-da Yoda" },
      { id: 4, emoji: "🐱‍🐉", x: 80, y: 75, nome: "Darth Mittens" },
    ];
    setGatosJedi(cats);

    setTimeout(() => setEtapaAtual(1), 1000);
    setTimeout(() => setForceAwakened(true), 2000);
  }, []);

  const completarMissao = (opcaoIndex) => {
    const missao = missoes[missaoAtual];
    const acertou = opcaoIndex === missao.correta;

    if (acertou) {
      setPontosJedi(pontosJedi + 100);
      setSabresCor([...sabresCor, missao.sabre]);
    } else {
      setPontosJedi(pontosJedi + 50);
    }

    setTimeout(() => {
      if (missaoAtual < missoes.length - 1) {
        setMissaoAtual(missaoAtual + 1);
      } else {
        setEtapaAtual(3); // Finalização Jedi
      }
    }, 3000);
  };

  const avancar = async () => {
    const message = getTransitionMessage("fase4", "fase5");
    await startTransition("fase4", "fase5", message, 1000);
  };

  const missaoAtualObj = missoes[missaoAtual] || missoes[0];

  return (
    <div style={containerStyle}>
      {/* Campo de estrelas */}
      {estrelas.map((estrela) => (
        <div
          key={estrela.id}
          style={{
            ...estrelasStyle,
            left: `${estrela.x}%`,
            top: `${estrela.y}%`,
            animationDelay: `${estrela.delay}s`,
            animationDuration: `${estrela.speed}s`,
            fontSize: `${estrela.size}px`,
          }}
        >
          ⭐
        </div>
      ))}

      {/* Gatos Jedi flutuando */}
      {gatosJedi.map((gato) => (
        <div
          key={gato.id}
          style={{
            ...gatoJediStyle,
            left: `${gato.x}%`,
            top: `${gato.y}%`,
          }}
        >
          <div style={gatoCharacter}>{gato.emoji}</div>
          <div style={gatoNome}>{gato.nome}</div>
        </div>
      ))}

      {/* Nave Imperial (Death Star) no fundo */}
      <div style={deathStarStyle}>🌑</div>

      <div style={contentContainer}>
        {/* Etapa 0 - Loading */}
        {etapaAtual === 0 && (
          <div style={loadingContainer}>
            <div style={jediLoading}>⚡</div>
            <p style={loadingText}>A galáxia está se preparando...</p>
          </div>
        )}

        {/* Etapa 1 - Introdução */}
        {etapaAtual === 1 && (
          <div style={introContainer}>
            <h1 style={titleStyle}>⚡ JEDI CATS GALAXY ⚡</h1>
            <div style={subtitleStyle}>Uma galáxia muito, muito fofa...</div>

            <div
              style={{
                ...academyContainer,
                transform: forceAwakened ? "scale(1)" : "scale(0.8)",
                opacity: forceAwakened ? 1 : 0,
              }}
            >
              <div style={academyTitle}>🏛️ Academia Jedi dos Gatinhos 🏛️</div>

              <div style={masterPresentation}>
                <div style={masterYoda}>🐱‍💻</div>
                <div style={yodaSpeech}>
                  "Bem-vindos, jovens Padawans, vocês são! Treinar o caminho da
                  Força do Amor, precisam! Quatro missões completar, vocês devem
                  son!"
                </div>
              </div>

              <div style={jediCouncil}>
                <h3 style={councilTitle}>🌟 Conselho Jedi dos Gatos 🌟</h3>
                <div style={councilMembers}>
                  <div style={councilMember}>
                    <div style={memberAvatar}>🐱‍👤</div>
                    <div style={memberName}>Mestre Meow-Wan</div>
                    <div style={memberSpecialty}>
                      Especialista em Relacionamentos
                    </div>
                  </div>
                  <div style={councilMember}>
                    <div style={memberAvatar}>🐱‍🚀</div>
                    <div style={memberName}>Luke Whiskers</div>
                    <div style={memberSpecialty}>Piloto da Millennium Gato</div>
                  </div>
                  <div style={councilMember}>
                    <div style={memberAvatar}>🐱‍💻</div>
                    <div style={memberName}>Paw-da Yoda</div>
                    <div style={memberSpecialty}>Mestre dos Sabres de Luz</div>
                  </div>
                  <div style={councilMember}>
                    <div style={memberAvatar}>🐱‍🐉</div>
                    <div style={memberName}>Darth Mittens</div>
                    <div style={memberSpecialty}>Ex-Sith Convertido</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setEtapaAtual(2)}
                style={startMissionsButton}
              >
                ⚡ Iniciar Treinamento Jedi! ⚡
              </button>
            </div>
          </div>
        )}

        {/* Etapa 2 - Missões */}
        {etapaAtual === 2 && (
          <div style={missionContainer}>
            <div style={missionHeader}>
              <h2 style={missionTitle}>{missaoAtualObj.titulo}</h2>
              <div style={progressJedi}>
                <div>
                  Missão: {missaoAtual + 1}/{missoes.length}
                </div>
                <div>Pontos da Força: {pontosJedi}</div>
                <div>Sabres: {sabresCor.length}</div>
              </div>
            </div>

            <div style={missionContent}>
              <div style={masterContainer}>
                <div style={missionMaster}>
                  <div style={masterAvatar}>{missaoAtualObj.emoji}</div>
                  <div style={masterName}>Mestre {missaoAtualObj.mestre}</div>
                </div>
                <div style={masterDialogue}>
                  <div style={dialogueBubble}>{missaoAtualObj.pergunta}</div>
                </div>
              </div>

              <div style={missionChoices}>
                <h3 style={choicesTitle}>⚡ Escolha seu caminho, Padawan:</h3>
                <div style={choicesContainer}>
                  {missaoAtualObj.opcoes.map((opcao, index) => (
                    <button
                      key={index}
                      onClick={() => completarMissao(index)}
                      style={{
                        ...choiceButton,
                        backgroundColor:
                          index % 2 === 0 ? "#4169E1" : "#FF6347",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05) rotateX(10deg)";
                        e.target.style.boxShadow =
                          "0 15px 30px rgba(0,0,0,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1) rotateX(0deg)";
                        e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
                      }}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sabres coletados */}
              {sabresCor.length > 0 && (
                <div style={sabresContainer}>
                  <h4 style={sabresTitle}>⚔️ Seus Sabres de Luz:</h4>
                  <div style={sabresDisplay}>
                    {sabresCor.map((cor, index) => (
                      <div
                        key={index}
                        style={{
                          ...sabreStyle,
                          background:
                            cor === "azul"
                              ? "#4169E1"
                              : cor === "verde"
                                ? "#32CD32"
                                : cor === "roxo"
                                  ? "#9370DB"
                                  : "#FFD700",
                        }}
                      >
                        ⚔️
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Etapa 3 - Jedi Completo */}
        {etapaAtual === 3 && (
          <div style={jediCompleteContainer}>
            <h1 style={jediCompleteTitle}>⚡🏆 JEDI MESTRE COMPLETO! 🏆⚡</h1>

            <div style={ceremoniaContainer}>
              <div style={ceremoniaTitle}>🎖️ Cerimônia de Graduação 🎖️</div>

              <div style={novoJedi}>
                <div style={novoJediAvatar}>👨‍❤️‍👩⚡</div>
                <div style={jediTitulo}>✨ Mestre Jedi do Amor Eterno ✨</div>
                <div style={jediSubtitulo}>
                  Millena & Matheus - Guardiões da Galáxia dos Corações
                </div>
              </div>

              <div style={poderesConcedidos}>
                <h3 style={poderesTitle}>
                  🌟 Poderes Concedidos pelo Conselho:
                </h3>
                <div style={poderesList}>
                  <div style={poderItem}>⚔️ Sabre de Luz do Amor Infinito</div>
                  <div style={poderItem}>
                    🛡️ Escudo Protetor contra Discussões
                  </div>
                  <div style={poderItem}>
                    🔮 Visão do Futuro (spoiler: casamento!)
                  </div>
                  <div style={poderItem}>
                    🐱 Comunicação telepática com Gatinhos
                  </div>
                  <div style={poderItem}>
                    ☕ Materialização Instantânea de Café
                  </div>
                  <div style={poderItem}>
                    🎮 Sincronização Perfeita em Co-op
                  </div>
                </div>
              </div>

              <div style={conselhoBencao}>
                <h3 style={bencaoTitle}>💫 Bênção do Conselho Jedi:</h3>
                <div style={mensagensConselho}>
                  <div style={mensagemMestre}>
                    <div style={mestreIcon}>🐱‍👤</div>
                    <div style={mensagemTexto}>
                      "Que a Força do Amor os acompanhe sempre!" - Meow-Wan
                      Kenobi
                    </div>
                  </div>
                  <div style={mensagemMestre}>
                    <div style={mestreIcon}>🐱‍🚀</div>
                    <div style={mensagemTexto}>
                      "Vocês são nossa única esperança... de cuteness!" - Luke
                      Whiskers
                    </div>
                  </div>
                  <div style={mensagemMestre}>
                    <div style={mestreIcon}>🐱‍💻</div>
                    <div style={mensagemTexto}>
                      "Muito orgulhoso, este mestre está! Hmmm!" - Paw-da Yoda
                    </div>
                  </div>
                  <div style={mensagemMestre}>
                    <div style={mestreIcon}>🐱‍🐉</div>
                    <div style={mensagemTexto}>
                      "Até eu me rendo ao poder do amor de vocês!" - Darth
                      Mittens
                    </div>
                  </div>
                </div>
              </div>

              <div style={finalMessage}>
                <div style={r2d2Gato}>🤖🐱</div>
                <div style={finalText}>
                  "Beep boop meow! R2-D2 aprova este relacionamento! May the
                  Force be with mew, sempre son!"
                </div>
              </div>

              <button onClick={avancar} style={nextGalaxyButton}>
                🎬 Próxima Galáxia: Cinema do Amor! 🎬
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes starTravel {
          0% {
            transform: translateX(-100vw) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes jediFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(-5deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }

        @keyframes forceGlow {
          0%,
          100% {
            text-shadow:
              0 0 10px #ffe81f,
              0 0 20px #ffe81f;
            transform: scale(1);
          }
          50% {
            text-shadow:
              0 0 20px #ffe81f,
              0 0 30px #ffe81f,
              0 0 40px #ffe81f;
            transform: scale(1.05);
          }
        }

        @keyframes sabreGlow {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
            filter: brightness(1.3);
          }
        }

        @keyframes deathStarRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes jediPower {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            filter: hue-rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            filter: hue-rotate(180deg);
          }
        }

        @keyframes ceremonial {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          25% {
            transform: translateY(-10px) scale(1.05);
          }
          50% {
            transform: translateY(-5px) scale(1.1);
          }
          75% {
            transform: translateY(-15px) scale(1.03);
          }
        }
      `}</style>
    </div>
  );
}

// Estilos
const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #000000 0%, #0a0a2e 50%, #16213e 100%)",
  color: "#FFE81F",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: '"Orbitron", sans-serif',
  position: "relative",
  overflow: "hidden",
  padding: 0,
  margin: 0,
};

const estrelasStyle = {
  position: "absolute",
  color: "#FFFFFF",
  animation: "starTravel infinite linear",
  pointerEvents: "none",
};

const gatoJediStyle = {
  position: "absolute",
  textAlign: "center",
  zIndex: 10,
};

const gatoCharacter = {
  fontSize: "2.5rem",
  animation: "jediFloat 4s ease-in-out infinite",
  cursor: "pointer",
  filter: "drop-shadow(0 0 10px rgba(255, 232, 31, 0.8))",
};

const gatoNome = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "#FFE81F",
  padding: "5px 10px",
  borderRadius: "15px",
  fontSize: "10px",
  fontWeight: "bold",
  marginTop: "5px",
  border: "1px solid #FFE81F",
  boxShadow: "0 0 10px rgba(255, 232, 31, 0.5)",
};

const deathStarStyle = {
  position: "absolute",
  top: "5%",
  right: "5%",
  fontSize: "6rem",
  opacity: 0.3,
  animation: "deathStarRotate 60s linear infinite",
  zIndex: 1,
};

const contentContainer = {
  position: "relative",
  zIndex: 2,
  padding: "20px",
  width: "100%",
  maxWidth: "900px",
};

const loadingContainer = {
  textAlign: "center",
};

const jediLoading = {
  fontSize: "4rem",
  animation: "jediPower 2s ease-in-out infinite",
  marginBottom: "20px",
};

const loadingText = {
  fontSize: "1.2rem",
  opacity: 0.8,
};

const introContainer = {
  backgroundColor: "rgba(0, 191, 255, 0.1)",
  border: "2px solid #00BFFF",
  borderRadius: "25px",
  padding: "40px",
  boxShadow: "0 0 30px rgba(0, 191, 255, 0.3)",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "36px",
  fontWeight: "bold",
  animation: "forceGlow 3s ease-in-out infinite",
  marginBottom: "10px",
  letterSpacing: "3px",
};

const subtitleStyle = {
  fontSize: "14px",
  color: "#00BFFF",
  fontStyle: "italic",
  textShadow: "0 0 5px #00BFFF",
  marginBottom: "30px",
};

const academyContainer = {
  transition: "all 2s cubic-bezier(0.4, 0, 0.2, 1)",
  transformStyle: "preserve-3d",
};

const academyTitle = {
  fontSize: "1.5rem",
  color: "#FFE81F",
  marginBottom: "25px",
  textAlign: "center",
};

const masterPresentation = {
  backgroundColor: "rgba(255, 232, 31, 0.1)",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #FFE81F",
  textAlign: "center",
};

const masterYoda = {
  fontSize: "4rem",
  animation: "jediFloat 3s ease-in-out infinite",
  marginBottom: "15px",
};

const yodaSpeech = {
  fontSize: "1.1rem",
  color: "#00BFFF",
  fontStyle: "italic",
  lineHeight: "1.6",
};

const jediCouncil = {
  marginBottom: "30px",
};

const councilTitle = {
  color: "#FFE81F",
  fontSize: "1.3rem",
  marginBottom: "20px",
  textAlign: "center",
};

const councilMembers = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "15px",
};

const councilMember = {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  borderRadius: "15px",
  padding: "15px",
  textAlign: "center",
  border: "2px solid #FFE81F",
};

const memberAvatar = {
  fontSize: "2rem",
  marginBottom: "8px",
  animation: "jediFloat 3s ease-in-out infinite",
};

const memberName = {
  color: "#FFE81F",
  fontSize: "0.9rem",
  fontWeight: "bold",
  marginBottom: "5px",
};

const memberSpecialty = {
  color: "#00BFFF",
  fontSize: "0.8rem",
  fontStyle: "italic",
};

const startMissionsButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  background: "linear-gradient(45deg, #FFE81F, #00BFFF)",
  color: "#000",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  fontFamily: "inherit",
  textTransform: "uppercase",
};

const missionContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  borderRadius: "25px",
  padding: "40px",
  border: "3px solid #FFE81F",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
};

const missionHeader = {
  textAlign: "center",
  marginBottom: "30px",
};

const missionTitle = {
  color: "#FFE81F",
  fontSize: "1.8rem",
  marginBottom: "15px",
  animation: "forceGlow 2s ease-in-out infinite",
};

const progressJedi = {
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "rgba(0, 191, 255, 0.2)",
  padding: "15px",
  borderRadius: "15px",
  border: "2px solid #00BFFF",
  fontSize: "1rem",
  fontWeight: "bold",
};

const missionContent = {
  textAlign: "center",
};

const masterContainer = {
  marginBottom: "30px",
};

const missionMaster = {
  display: "flex",
  flex: "column",
  alignItems: "center",
  marginBottom: "20px",
};

const masterAvatar = {
  fontSize: "4rem",
  animation: "jediFloat 3s ease-in-out infinite",
  marginBottom: "10px",
};

const masterName = {
  color: "#FFE81F",
  fontSize: "1.2rem",
  fontWeight: "bold",
};

const masterDialogue = {
  display: "flex",
  justify: "center",
};

const dialogueBubble = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#333",
  padding: "20px",
  borderRadius: "20px",
  fontSize: "1.1rem",
  fontWeight: "bold",
  border: "3px solid #FFE81F",
  maxWidth: "500px",
  lineHeight: "1.5",
};

const missionChoices = {
  marginBottom: "30px",
};

const choicesTitle = {
  color: "#00BFFF",
  fontSize: "1.2rem",
  marginBottom: "20px",
};

const choicesContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const choiceButton = {
  padding: "18px 25px",
  fontSize: "1rem",
  color: "#fff",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
  fontFamily: "inherit",
  textAlign: "left",
};

const sabresContainer = {
  backgroundColor: "rgba(255, 232, 31, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #FFE81F",
};

const sabresTitle = {
  color: "#FFE81F",
  fontSize: "1.1rem",
  marginBottom: "15px",
  textAlign: "center",
};

const sabresDisplay = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
};

const sabreStyle = {
  fontSize: "2rem",
  padding: "10px",
  borderRadius: "10px",
  animation: "sabreGlow 2s ease-in-out infinite",
  border: "2px solid #fff",
};

const jediCompleteContainer = {
  backgroundColor: "rgba(255, 215, 0, 0.9)",
  color: "#000",
  borderRadius: "25px",
  padding: "40px",
  textAlign: "center",
  border: "4px solid #FF4500",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
};

const jediCompleteTitle = {
  fontSize: "2.5rem",
  marginBottom: "30px",
  animation: "jediPower 2s ease-in-out infinite",
};

const ceremoniaContainer = {
  textAlign: "center",
};

const ceremoniaTitle = {
  fontSize: "1.8rem",
  color: "#FF4500",
  marginBottom: "25px",
  fontWeight: "bold",
};

const novoJedi = {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #FF4500",
};

const novoJediAvatar = {
  fontSize: "5rem",
  animation: "ceremonial 3s ease-in-out infinite",
  marginBottom: "15px",
};

const jediTitulo = {
  fontSize: "1.8rem",
  color: "#FF4500",
  fontWeight: "bold",
  marginBottom: "10px",
};

const jediSubtitulo = {
  fontSize: "1.2rem",
  color: "#666",
  fontStyle: "italic",
};

const poderesConcedidos = {
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
};

const poderesTitle = {
  color: "#FF4500",
  fontSize: "1.3rem",
  marginBottom: "15px",
};

const poderesList = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const poderItem = {
  backgroundColor: "rgba(255, 69, 0, 0.2)",
  padding: "10px 15px",
  borderRadius: "15px",
  color: "#333",
  fontWeight: "bold",
  fontSize: "0.9rem",
  border: "2px solid #FF4500",
};

const conselhoBencao = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
};

const bencaoTitle = {
  color: "#FF4500",
  fontSize: "1.3rem",
  marginBottom: "20px",
};

const mensagensConselho = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const mensagemMestre = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  borderRadius: "15px",
  padding: "12px 15px",
  border: "2px solid #FFD700",
};

const mestreIcon = {
  fontSize: "1.5rem",
};

const mensagemTexto = {
  flex: 1,
  fontSize: "0.9rem",
  color: "#333",
  fontWeight: "bold",
  textAlign: "left",
  fontStyle: "italic",
};

const finalMessage = {
  backgroundColor: "rgba(0, 191, 255, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #00BFFF",
};

const r2d2Gato = {
  fontSize: "3rem",
  animation: "jediFloat 2s ease-in-out infinite",
  marginBottom: "10px",
};

const finalText = {
  color: "#333",
  fontWeight: "bold",
  fontStyle: "italic",
  fontSize: "1rem",
};

const nextGalaxyButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  backgroundColor: "#FF4500",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  fontFamily: "inherit",
  textTransform: "uppercase",
};
