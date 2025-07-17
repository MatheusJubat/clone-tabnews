// pages/pedido.js - Pedido Final Melhorado
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MusicPlayer, musicPlayerCSS } from "../hooks/useMusic";
import {
  useEasterEggs,
  EasterEggButton,
  EasterEggMessage,
  SpecialEffects,
  EasterEggCounter,
  easterEggCSS,
} from "../hooks/useEasterEggs";
import LoveStats from "../components/LoveStats";

export default function PedidoFinal() {
  const router = useRouter();
  const {
    findEasterEgg,
    showMessage,
    setShowMessage,
    specialEffects,
    getTotalEggsFound,
  } = useEasterEggs("pedido-final");

  const [etapaAtual, setEtapaAtual] = useState("revelacao"); // 'revelacao', 'pergunta', 'resposta', 'celebracao'
  const [resposta, setResposta] = useState(null);
  const [coracoes, setCoracoes] = useState([]);
  const [gatinhosDancando, setGatinhosDancando] = useState([]);
  const [fogosDeArtificio, setFogosDeArtificio] = useState([]);
  const [mostrarAnel, setMostrarAnel] = useState(false);
  const [musicaAtiva, setMusicaAtiva] = useState(false);

  const gatinhosCelebrando = [
    { id: 1, emoji: "🐱", nome: "Whiskers", x: 10, y: 80 },
    { id: 2, emoji: "😸", nome: "Mittens", x: 20, y: 60 },
    { id: 3, emoji: "😻", nome: "Shadow", x: 80, y: 70 },
    { id: 4, emoji: "🐱‍👤", nome: "Ninja", x: 90, y: 85 },
    { id: 5, emoji: "🐱‍🚀", nome: "Cosmos", x: 50, y: 90 },
  ];

  useEffect(() => {
    // Configurar gatinhos dançando
    setGatinhosDancando(gatinhosCelebrando);

    // Efeito de entrada
    setTimeout(() => {
      setMostrarAnel(true);
    }, 2000);
  }, []);

  const criarCoracao = (x, y) => {
    const novoCoracao = {
      id: Date.now() + Math.random(),
      x: x,
      y: y,
      emoji: ["💖", "💕", "💓", "💗", "💘", "💝"][
        Math.floor(Math.random() * 6)
      ],
    };

    setCoracoes((prev) => [...prev, novoCoracao]);

    setTimeout(() => {
      setCoracoes((prev) => prev.filter((c) => c.id !== novoCoracao.id));
    }, 3000);
  };

  const criarFogosDeArtificio = () => {
    const fogos = [];
    for (let i = 0; i < 20; i++) {
      fogos.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 60 + 20,
        cor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#ffa07a", "#98d8c8", "#f7b733"][
          Math.floor(Math.random() * 6)
        ],
        delay: Math.random() * 2,
      });
    }
    setFogosDeArtificio(fogos);

    setTimeout(() => {
      setFogosDeArtificio([]);
    }, 5000);
  };

  const responderSim = () => {
    setResposta("sim");
    setEtapaAtual("celebracao");
    setMusicaAtiva(true);

    // Criar explosão de corações
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        criarCoracao(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
        );
      }, i * 100);
    }

    // Fogos de artifício
    criarFogosDeArtificio();

    // Easter egg especial
    findEasterEgg({
      x: 50,
      y: 50,
      message: "💍 ELA DISSE SIM!!!! 🎉🎉🎉",
    });
  };

  const responderNao = () => {
    // Easter egg brincalhão
    findEasterEgg({
      x: Math.random() * 100,
      y: Math.random() * 100,
      message: "😢 Mas... mas... eu fiz um site inteiro! 😭",
    });
  };

  const clickGatinho = (gatinho) => {
    findEasterEgg({
      x: gatinho.x,
      y: gatinho.y,
      message: `🐱 ${gatinho.nome} está torcendo pelo SIM! 💕`,
    });
  };

  const prosseguirPergunta = () => {
    setEtapaAtual("pergunta");
  };

  return (
    <div style={containerStyle}>
      <style jsx global>{`
        ${musicPlayerCSS}
        ${easterEggCSS}
        
        @keyframes coracaoVoando {
          0% {
            transform: translateY(0px) scale(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-300px) scale(1.5) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes gatinhoDancando {
          0%,
          100% {
            transform: scale(1) rotate(-10deg);
          }
          25% {
            transform: scale(1.2) rotate(10deg);
          }
          50% {
            transform: scale(1.1) rotate(-5deg);
          }
          75% {
            transform: scale(1.3) rotate(15deg);
          }
        }

        @keyframes fogosExplodindo {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        @keyframes anelBrilhando {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            filter: brightness(1) drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            filter: brightness(1.5) drop-shadow(0 0 30px rgba(255, 215, 0, 1));
          }
        }

        @keyframes backgroundCelebration {
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

        @keyframes tituloMagico {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(255, 105, 180, 0.8);
            transform: scale(1);
          }
          50% {
            text-shadow:
              0 0 40px rgba(255, 105, 180, 1),
              0 0 60px rgba(255, 105, 180, 0.8);
            transform: scale(1.05);
          }
        }

        @keyframes botaoSim {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(40, 167, 69, 0.6);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 40px rgba(40, 167, 69, 1);
          }
        }

        @keyframes gatinahoAbraco {
          0%,
          100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(-10px);
          }
        }

        @keyframes gatinahoAbraco2 {
          0%,
          100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(10px);
          }
        }

        @keyframes celebracaoText {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.1) rotate(-2deg);
          }
          50% {
            transform: scale(1.2) rotate(2deg);
          }
          75% {
            transform: scale(1.1) rotate(-1deg);
          }
        }
      `}</style>

      {/* Player de Música - toca música divertida na celebração */}
      {musicaAtiva && (
        <div style={{ display: "none" }}>
          <iframe
            width="0"
            height="0"
            src="https://www.youtube.com/embed/y6120QOlsfU?autoplay=1&start=0"
            title="Música de Celebração"
            frameBorder="0"
            allow="autoplay"
          ></iframe>
        </div>
      )}

      <MusicPlayer
        phaseName="pedido-final"
        position="bottom-right"
        showControls={true}
      />

      {/* Contador de Easter Eggs */}
      <EasterEggCounter currentPhase="pedido-final" position="top-right" />

      {/* Easter Eggs Escondidos */}
      <EasterEggButton
        position={{ top: "8%", left: "5%" }}
        size={50}
        onFind={findEasterEgg}
      />

      <EasterEggButton
        position={{ bottom: "12%", right: "8%" }}
        size={45}
        onFind={findEasterEgg}
      />

      {/* Corações voando */}
      {coracoes.map((coracao) => (
        <div
          key={coracao.id}
          style={{
            ...coracaoStyle,
            left: `${coracao.x}px`,
            top: `${coracao.y}px`,
          }}
        >
          {coracao.emoji}
        </div>
      ))}

      {/* Fogos de artifício */}
      {fogosDeArtificio.map((fogo) => (
        <div
          key={fogo.id}
          style={{
            ...fogoStyle,
            left: `${fogo.x}%`,
            top: `${fogo.y}%`,
            backgroundColor: fogo.cor,
            animationDelay: `${fogo.delay}s`,
          }}
        />
      ))}

      {/* Gatinhos dançando */}
      {etapaAtual === "celebracao" &&
        gatinhosDancando.map((gatinho) => (
          <div
            key={gatinho.id}
            style={{
              ...gatinhoDancandoStyle,
              left: `${gatinho.x}%`,
              top: `${gatinho.y}%`,
            }}
            onClick={() => clickGatinho(gatinho)}
          >
            <div style={gatinhoEmoji}>{gatinho.emoji}</div>
            <div style={gatinhoNome}>{gatinho.nome}</div>
          </div>
        ))}

      <div style={contentContainer}>
        {etapaAtual === "revelacao" && (
          <div style={revelacaoContainer}>
            <div style={anelContainer}>
              <div
                style={{
                  ...anelStyle,
                  opacity: mostrarAnel ? 1 : 0,
                  transform: mostrarAnel ? "scale(1)" : "scale(0)",
                }}
              >
                💍
              </div>
            </div>

            <h1 style={tituloReveal}>✨ O Momento Mais Especial ✨</h1>

            <div style={mensagemReveal}>
              <p style={textoReveal}>
                Millena, meu amor...
                <br />
                <br />
                Você acabou de completar uma jornada mágica através de 8 mundos
                incríveis!
                <br />
                Enfrentou dragões, resolveu enigmas, pescou memórias,
                <br />
                convenceu até o Barney Stinson...
                <br />
                <br />
                Mas a verdadeira magia sempre foi você na minha vida! 💕
              </p>
            </div>

            <div style={estatisticasFinais}>
              <LoveStats showDetailed={true} theme="wedding" />
            </div>

            <div style={transicaoContainer}>
              <p style={transicaoTexto}>
                E agora chegou a hora da pergunta mais importante de todas...
              </p>
              <button
                onClick={prosseguirPergunta}
                style={prosseguirButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1) translateY(-5px)";
                  e.target.style.boxShadow =
                    "0 20px 40px rgba(255,105,180,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) translateY(0px)";
                  e.target.style.boxShadow =
                    "0 10px 25px rgba(255,105,180,0.4)";
                }}
              >
                💍 Revelar a Pergunta Final 💍
              </button>
            </div>
          </div>
        )}

        {etapaAtual === "pergunta" && (
          <div style={perguntaContainer}>
            <div style={anelCentral}>
              <div style={anelBrilhante}>💍</div>
              <div style={anelLuz}></div>
            </div>

            <h1 style={perguntaFinal}>
              Millena, meu amor da minha vida...
              <br />
              <span style={perguntaDestaque}>Você quer casar comigo? 💍💕</span>
            </h1>

            <div style={declaracaoContainer}>
              <div style={declaracaoTexto}>
                <p style={declaracaoP}>
                  "Quero passar o resto da minha vida rindo das suas piadas,
                  <br />
                  ouvindo seus 'son' no final das frases,
                  <br />
                  aguentando seus picos na barriga,
                  <br />
                  jogando Fallout e Far Cry com você,
                  <br />e amando cada detalhe que faz você ser... VOCÊ! 💕"
                </p>
              </div>
            </div>

            <div style={botoesContainer}>
              <button
                onClick={responderSim}
                style={botaoSim}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.2) rotate(5deg)";
                  e.target.style.boxShadow = "0 15px 35px rgba(40,167,69,0.8)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) rotate(0deg)";
                  e.target.style.boxShadow = "0 10px 25px rgba(40,167,69,0.6)";
                }}
              >
                💖 SIM! EU ACEITO! 💖
              </button>

              <button
                onClick={responderNao}
                style={botaoNao}
                onMouseEnter={() => {
                  // Botão foge quando passa o mouse
                  const newX = Math.random() * 70;
                  const newY = Math.random() * 50;
                  document.getElementById("botao-nao").style.position =
                    "absolute";
                  document.getElementById("botao-nao").style.left = `${newX}%`;
                  document.getElementById("botao-nao").style.top = `${newY}%`;
                }}
                id="botao-nao"
              >
                😢 Não...
              </button>
            </div>
          </div>
        )}

        {etapaAtual === "celebracao" && (
          <div style={celebracaoContainer}>
            <div style={celebracaoHeader}>
              <h1 style={celebracaoTitulo}>🎉 ELA DISSE SIM!!!! 🎉</h1>
              <div style={celebracaoSubtitulo}>💍 ESTAMOS NOIVOS! 💍</div>
            </div>

            {/* Gatinhos se abraçando - o pedido especial! */}
            <div style={gatinhosAbracandoContainer}>
              <div style={gatinhosAbracando}>
                <div style={gatinhoEsquerdo}>
                  <div style={gatinhoCarinha}>😻</div>
                  <div style={gatinhoNomeEsquerdo}>Matheus</div>
                </div>
                <div style={gatinhoCentral}>
                  <div style={coracaoGrande}>💕</div>
                  <div style={textoCentral}>+</div>
                </div>
                <div style={gatinhoDireito}>
                  <div style={gatinhoCarinha}>😸</div>
                  <div style={gatinhoNomeDireito}>Millena</div>
                </div>
              </div>
              <div style={abracoTexto}>
                🐾 Gatinhos celebrando nosso amor! 🐾
              </div>
            </div>

            <div style={mensagemFinalCasamento}>
              <h3 style={mensagemFinalTitulo}>
                💌 Nossa História Começa Agora 💌
              </h3>
              <div style={mensagemFinalTexto}>
                <p style={mensagemFinalP}>
                  "Millena, você completou todos os desafios, descobriu todos os
                  segredos,
                  <br />
                  e agora embarcamos na maior aventura de todas:
                  <br />
                  <strong>NOSSA VIDA JUNTOS!</strong> 💕
                  <br />
                  <br />
                  Que venham mais risadas, mais 'sons', mais picos,
                  <br />
                  mais jogos, mais amor... e para sempre, mais NÓS! 💖"
                </p>
              </div>
            </div>

            <div style={estatisticasNoivado}>
              <div style={estatNoivado}>
                <div style={estatLabel}>Status do Relacionamento:</div>
                <div style={estatValue}>💍 NOIVOS! 💍</div>
              </div>
              <div style={estatNoivado}>
                <div style={estatLabel}>Nível de Felicidade:</div>
                <div style={estatValue}>∞ INFINITO! ∞</div>
              </div>
              <div style={estatNoivado}>
                <div style={estatLabel}>Próxima Fase:</div>
                <div style={estatValue}>💒 CASAMENTO! 💒</div>
              </div>
            </div>

            <div style={agradecimentoFinal}>
              <h4 style={agradecimentoTitulo}>🙏 Obrigado por Jogar 🙏</h4>
              <p style={agradecimentoTexto}>
                Este site foi feito com muito amor pelo Matheus,
                <br />
                especialmente para a Millena,
                <br />
                a pessoa mais especial do universo! 💕
                <br />
                <br />
                <strong>Te amo para sempre, meu amor! 💖</strong>
              </p>
            </div>

            <div style={easteEggFinal}>
              <p style={easterEggTexto}>
                🎮 Easter Eggs Encontrados: {getTotalEggsFound()} 🎮
                <br />
                🏆 Você é oficialmente uma Master Easter Egg Hunter! 🏆
              </p>
            </div>
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
  background:
    "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
  backgroundSize: "400% 400%",
  animation: "backgroundCelebration 10s ease infinite",
  color: "#fff",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Dancing Script", cursive',
};

const coracaoStyle = {
  position: "absolute",
  fontSize: "2rem",
  animation: "coracaoVoando 3s ease-out forwards",
  pointerEvents: "none",
  zIndex: 15,
};

const fogoStyle = {
  position: "absolute",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  animation: "fogosExplodindo 2s ease-out forwards",
  pointerEvents: "none",
  zIndex: 10,
};

const gatinhoDancandoStyle = {
  position: "absolute",
  textAlign: "center",
  animation: "gatinhoDancando 1.5s ease-in-out infinite",
  cursor: "pointer",
  zIndex: 12,
};

const gatinhoEmoji = {
  fontSize: "3rem",
  marginBottom: "5px",
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
};

const gatinhoNome = {
  fontSize: "0.8rem",
  backgroundColor: "rgba(255,255,255,0.9)",
  color: "#333",
  padding: "3px 8px",
  borderRadius: "10px",
  fontWeight: "bold",
};

const contentContainer = {
  position: "relative",
  zIndex: 5,
  padding: "20px",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const revelacaoContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "30px",
  padding: "50px",
  maxWidth: "900px",
  width: "100%",
  textAlign: "center",
  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
  border: "4px solid #ff69b4",
  color: "#333",
};

const anelContainer = {
  marginBottom: "30px",
};

const anelStyle = {
  fontSize: "6rem",
  animation: "anelBrilhando 3s ease-in-out infinite",
  transition: "all 2s cubic-bezier(0.4, 0, 0.2, 1)",
};

const tituloReveal = {
  fontSize: "3rem",
  color: "#ff69b4",
  marginBottom: "30px",
  animation: "tituloMagico 3s ease-in-out infinite",
};

const mensagemReveal = {
  marginBottom: "30px",
};

const textoReveal = {
  fontSize: "1.3rem",
  lineHeight: "1.8",
  color: "#555",
  fontStyle: "italic",
};

const estatisticasFinais = {
  marginBottom: "30px",
};

const transicaoContainer = {
  marginTop: "30px",
};

const transicaoTexto = {
  fontSize: "1.2rem",
  color: "#777",
  fontStyle: "italic",
  marginBottom: "25px",
};

const prosseguirButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  background: "linear-gradient(45deg, #ff69b4, #ff1493)",
  color: "#fff",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 10px 25px rgba(255, 105, 180, 0.4)",
  fontFamily: "inherit",
};

const perguntaContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "30px",
  padding: "50px",
  maxWidth: "800px",
  width: "100%",
  textAlign: "center",
  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
  border: "4px solid #ffd700",
  color: "#333",
};

const anelCentral = {
  position: "relative",
  display: "inline-block",
  marginBottom: "40px",
};

const anelBrilhante = {
  fontSize: "8rem",
  animation: "anelBrilhando 2s ease-in-out infinite",
  position: "relative",
  zIndex: 2,
};

const anelLuz = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "150px",
  height: "150px",
  background:
    "radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)",
  borderRadius: "50%",
  animation: "anelBrilhando 2s ease-in-out infinite",
};

const perguntaFinal = {
  fontSize: "2.5rem",
  color: "#333",
  marginBottom: "30px",
  lineHeight: "1.4",
};

const perguntaDestaque = {
  color: "#ff1493",
  fontWeight: "bold",
  fontSize: "3rem",
  display: "block",
  marginTop: "20px",
};

const declaracaoContainer = {
  backgroundColor: "rgba(255, 105, 180, 0.1)",
  borderRadius: "20px",
  padding: "30px",
  marginBottom: "40px",
  border: "3px solid #ff69b4",
};

const declaracaoTexto = {
  fontSize: "1.2rem",
  lineHeight: "1.8",
  color: "#555",
  fontStyle: "italic",
};

const declaracaoP = {
  margin: 0,
};

const botoesContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  flexWrap: "wrap",
  position: "relative",
};

const botaoSim = {
  padding: "25px 50px",
  fontSize: "1.5rem",
  background: "linear-gradient(45deg, #28a745, #20c997)",
  color: "#fff",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 10px 25px rgba(40, 167, 69, 0.6)",
  animation: "botaoSim 2s ease-in-out infinite",
  fontFamily: "inherit",
  textTransform: "uppercase",
  letterSpacing: "2px",
};

const botaoNao = {
  padding: "15px 30px",
  fontSize: "1.1rem",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  fontFamily: "inherit",
  opacity: 0.7,
};

const celebracaoContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "30px",
  padding: "50px",
  maxWidth: "1000px",
  width: "100%",
  textAlign: "center",
  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
  border: "4px solid #28a745",
  color: "#333",
};

const celebracaoHeader = {
  marginBottom: "40px",
};

const celebracaoTitulo = {
  fontSize: "3.5rem",
  color: "#28a745",
  marginBottom: "20px",
  animation: "celebracaoText 2s ease-in-out infinite",
};

const celebracaoSubtitulo = {
  fontSize: "2rem",
  color: "#ffd700",
  fontWeight: "bold",
  animation: "tituloMagico 2s ease-in-out infinite",
};

const gatinhosAbracandoContainer = {
  backgroundColor: "rgba(255, 215, 0, 0.2)",
  borderRadius: "25px",
  padding: "30px",
  marginBottom: "40px",
  border: "3px solid #ffd700",
};

const gatinhosAbracando = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginBottom: "20px",
};

const gatinhoEsquerdo = {
  textAlign: "center",
  animation: "gatinahoAbraco 3s ease-in-out infinite",
};

const gatinhoDireito = {
  textAlign: "center",
  animation: "gatinahoAbraco2 3s ease-in-out infinite",
};

const gatinhoCentral = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const gatinhoCarinha = {
  fontSize: "4rem",
  marginBottom: "10px",
  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
};

const gatinhoNomeEsquerdo = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#4169e1",
};

const gatinhoNomeDireito = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#ff69b4",
};

const coracaoGrande = {
  fontSize: "3rem",
  animation: "anelBrilhando 2s ease-in-out infinite",
};

const textoCentral = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#ff1493",
};

const abracoTexto = {
  fontSize: "1.2rem",
  color: "#28a745",
  fontWeight: "bold",
  fontStyle: "italic",
};

const mensagemFinalCasamento = {
  backgroundColor: "rgba(255, 105, 180, 0.1)",
  borderRadius: "20px",
  padding: "30px",
  marginBottom: "30px",
  border: "3px solid #ff69b4",
};

const mensagemFinalTitulo = {
  color: "#ff69b4",
  marginBottom: "20px",
};

const mensagemFinalTexto = {
  fontSize: "1.2rem",
  lineHeight: "1.8",
  color: "#555",
  fontStyle: "italic",
};

const mensagemFinalP = {
  margin: 0,
};

const estatisticasNoivado = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "30px",
  flexWrap: "wrap",
  gap: "20px",
};

const estatNoivado = {
  backgroundColor: "rgba(40, 167, 69, 0.1)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #28a745",
  minWidth: "200px",
};

const estatLabel = {
  fontSize: "1rem",
  color: "#666",
  marginBottom: "10px",
};

const estatValue = {
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: "#28a745",
};

const agradecimentoFinal = {
  backgroundColor: "rgba(116, 185, 255, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "20px",
  border: "3px solid #74b9ff",
};

const agradecimentoTitulo = {
  color: "#74b9ff",
  marginBottom: "15px",
};

const agradecimentoTexto = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#555",
  fontStyle: "italic",
};

const easteEggFinal = {
  backgroundColor: "rgba(255, 193, 7, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #ffc107",
};

const easterEggTexto = {
  fontSize: "1rem",
  color: "#856404",
  fontWeight: "bold",
  margin: 0,
};
