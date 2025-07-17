// pages/aventura/fase-games.js - Mundo dos Games da Millena
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

export default function FaseGames() {
  const router = useRouter();
  const { isTransitioning, transitionData, startTransition } = useTransition();
  const {
    findEasterEgg,
    showMessage,
    setShowMessage,
    specialEffects,
    getTotalEggsFound,
  } = useEasterEggs("fase-games");

  const [gameMode, setGameMode] = useState("escolha"); // 'escolha', 'fallout', 'farcry', 'completo'
  const [pontuacao, setPontuacao] = useState(0);
  const [gameState, setGameState] = useState("menu");
  const [dialogoAtual, setDialogoAtual] = useState(0);
  const [conquistasDesbloqueadas, setConquistasDesbloqueadas] = useState([]);
  const [particulas, setParticulas] = useState([]);
  const [matheusRelutante, setMatheusRelutante] = useState(true);

  const dialogosFallout = [
    {
      personagem: "🤖",
      nome: "Codsworth",
      fala: "Olá, Sole Survivor! A Millena está tentando convencer o Matheus a explorar o Wasteland conosco há meses!",
    },
    {
      personagem: "🐕",
      nome: "Dogmeat",
      fala: "*AU AU* (Tradução: Ela sempre fala sobre as aventuras incríveis que vocês poderiam ter juntos!)",
    },
    {
      personagem: "💪",
      nome: "Millena Vault Dweller",
      fala: "Matheusss! Olha só como é divertido! Podemos construir nossa própria cidade, lutar contra super mutantes... Por favorzinho? 🥺",
    },
  ];

  const dialogosFarCry = [
    {
      personagem: "🏔️",
      nome: "Jason Brody",
      fala: "Cara, a Millena não para de falar sobre como seria épico se vocês dois jogassem Far Cry juntos!",
    },
    {
      personagem: "🌴",
      nome: "Vaas Montenegro",
      fala: "Did I ever tell you what the definition of insanity is? É o Matheus inventando desculpa para não jogar Far Cry com a Millena!",
    },
    {
      personagem: "🎮",
      nome: "Millena Guerreira",
      fala: "Amor, imagina nós dois explorando ilhas tropicais, fazendo missões juntos... Seria TÃO legal! Por que você não quer jogar comigo? 😢",
    },
  ];

  const desculpasMatheus = [
    "Ah, mas eu tenho que... estudar! 📚",
    "Poxa, hoje não dá, tenho que... organizar os arquivos! 📁",
    "Ai, não sei se vai rodar no meu PC... 💻",
    "Hmm, talvez outro dia... 🤔",
    "Esse jogo é muito complicado para mim! 😅",
    "Que tal assistir um filme ao invés? 🎬",
  ];

  const [desculpaAtual, setDesculpaAtual] = useState(0);

  useEffect(() => {
    // Criar partículas temáticas
    const novasParticulas = [];
    for (let i = 0; i < 25; i++) {
      novasParticulas.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji:
          gameMode === "fallout"
            ? ["⚛️", "🔧", "💊", "🤖"][Math.floor(Math.random() * 4)]
            : ["🌴", "🏔️", "🔫", "💎"][Math.floor(Math.random() * 4)],
        delay: Math.random() * 3,
      });
    }
    setParticulas(novasParticulas);
  }, [gameMode]);

  const escolherJogo = (jogo) => {
    setGameMode(jogo);
    setGameState("dialogo");
    setDialogoAtual(0);

    // Easter egg especial
    findEasterEgg({
      x: 50,
      y: 50,
      message:
        jogo === "fallout"
          ? "🤖 Bem-vindo ao Wasteland! ⚛️"
          : "🏔️ Bem-vindo às ilhas tropicais! 🌴",
    });
  };

  const proximoDialogo = () => {
    const dialogos = gameMode === "fallout" ? dialogosFallout : dialogosFarCry;

    if (dialogoAtual < dialogos.length - 1) {
      setDialogoAtual(dialogoAtual + 1);
    } else {
      setGameState("convencendo");
    }
  };

  const tentarConvencer = () => {
    // Matheus dá uma desculpa
    setDesculpaAtual(Math.floor(Math.random() * desculpasMatheus.length));

    // Millena fica tristinha
    setTimeout(() => {
      setGameState("millena-triste");
    }, 2000);
  };

  const millenaPersiste = () => {
    // Millena não desiste!
    setGameState("insistindo");

    // Easter egg da persistência
    findEasterEgg({
      x: Math.random() * 100,
      y: Math.random() * 100,
      message: "💪 Millena nunca desiste! É isso aí!",
    });
  };

  const matheusDesiste = () => {
    // Matheus finalmente aceita!
    setMatheusRelutante(false);
    setGameState("matheus-aceita");
    setPontuacao(pontuacao + 500);

    // Conquista desbloqueada
    const novaConquista =
      gameMode === "fallout"
        ? "🏆 Conseguiu convencer o Matheus a jogar Fallout!"
        : "🏆 Conseguiu convencer o Matheus a jogar Far Cry!";

    setConquistasDesbloqueadas((prev) => [...prev, novaConquista]);

    // Easter egg da vitória
    findEasterEgg({
      x: 50,
      y: 50,
      message: "🎉 VITÓRIA! Matheus finalmente vai jogar! 🎮",
    });
  };

  const jogarJuntos = () => {
    setGameState("jogando-juntos");
    setPontuacao(pontuacao + 1000);

    // Conquista especial
    setConquistasDesbloqueadas((prev) => [
      ...prev,
      "💕 Couple Goals: Jogando juntos!",
    ]);

    setTimeout(() => {
      setGameMode("completo");
    }, 3000);
  };

  const voltarEscolha = () => {
    setGameMode("escolha");
    setGameState("menu");
    setDialogoAtual(0);
    setMatheusRelutante(true);
  };

  const avancar = async () => {
    const message = getTransitionMessage("fase-games", "fase4");
    await startTransition("fase-games", "fase4", message, 1000);
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
    <div
      style={{
        ...containerStyle,
        background:
          gameMode === "fallout"
            ? "linear-gradient(135deg, #8B4513 0%, #DAA520 25%, #B8860B 50%, #CD853F 75%, #D2691E 100%)"
            : gameMode === "farcry"
              ? "linear-gradient(135deg, #00CED1 0%, #20B2AA 25%, #48D1CC 50%, #40E0D0 75%, #00FFFF 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      }}
    >
      <style jsx global>{`
        ${musicPlayerCSS}
        ${easterEggCSS}
        
        @keyframes gameParticle {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-25px) rotate(180deg) scale(1.1);
            opacity: 1;
          }
        }

        @keyframes millenaSuplica {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes matheusNervoso {
          0%,
          100% {
            transform: translateX(0px);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        @keyframes gameGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 107, 129, 0.6);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 107, 129, 1);
          }
        }

        @keyframes coupleGoals {
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

        @keyframes conquista {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(-90deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>

      {/* Player de Música */}
      <MusicPlayer
        phaseName="fase-games"
        position="bottom-right"
        showControls={true}
      />

      {/* Contador de Easter Eggs */}
      <EasterEggCounter currentPhase="fase-games" position="top-right" />

      {/* Easter Eggs Escondidos */}
      <EasterEggButton
        position={{ top: "12%", left: "10%" }}
        size={45}
        onFind={findEasterEgg}
      />

      <EasterEggButton
        position={{ bottom: "20%", right: "15%" }}
        size={40}
        onFind={findEasterEgg}
      />

      {/* Partículas temáticas */}
      {particulas.map((particula) => (
        <div
          key={particula.id}
          style={{
            ...particulaStyle,
            left: `${particula.x}%`,
            top: `${particula.y}%`,
            animationDelay: `${particula.delay}s`,
          }}
        >
          {particula.emoji}
        </div>
      ))}

      <div style={contentContainer}>
        {gameMode === "escolha" && (
          <div style={escolhaContainer}>
            <h1 style={titleStyle}>🎮 Mundo dos Games da Millena 🎮</h1>

            <div style={introducaoContainer}>
              <div style={millenaGamer}>
                <div style={millenaAvatar}>👩‍💻🎮</div>
                <div style={millenaSpeech}>
                  "Matheusss! Olha só quantos jogos legais a gente podia jogar
                  juntos! Escolhe um aí... por favorzinho? 🥺✨"
                </div>
              </div>

              <div style={matheusRelutancia}>
                <div style={matheusAvatar}>🤔💭</div>
                <div style={matheusSpeech}>
                  "Ah, não sei... jogos são meio complicados... Que tal a
                  gente... assistir Netflix? 😅"
                </div>
              </div>
            </div>

            <div style={gamesContainer}>
              <div
                style={gameCard}
                onClick={() => escolherJogo("fallout")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05) rotate(2deg)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(218, 165, 32, 0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(218, 165, 32, 0.4)";
                }}
              >
                <div style={gameIcon}>🤖⚛️</div>
                <div style={gameTitle}>Fallout 4</div>
                <div style={gameDesc}>
                  "Explorar o Wasteland juntos seria épico! Podemos construir
                  nossa própria cidade!"
                </div>
                <div style={gameStatus}>
                  Status: Matheus fugindo há 6 meses 😂
                </div>
              </div>

              <div
                style={gameCard}
                onClick={() => escolherJogo("farcry")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05) rotate(-2deg)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0, 206, 209, 0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0, 206, 209, 0.4)";
                }}
              >
                <div style={gameIcon}>🏔️🌴</div>
                <div style={gameTitle}>Far Cry</div>
                <div style={gameDesc}>
                  "Aventuras em ilhas tropicais! Missões épicas em co-op!"
                </div>
                <div style={gameStatus}>
                  Status: Matheus inventando desculpas 🙈
                </div>
              </div>
            </div>

            <div style={dicaContainer}>
              💡 Dica: Millena nunca desiste! Ela sempre encontra um jeito de
              convencer! 💪
            </div>
          </div>
        )}

        {gameMode !== "escolha" &&
          gameMode !== "completo" &&
          gameState === "dialogo" && (
            <div style={dialogoContainer}>
              <div style={gameHeader}>
                <h2 style={gameHeaderTitle}>
                  {gameMode === "fallout"
                    ? "🤖 Fallout 4 - Wasteland"
                    : "🏔️ Far Cry - Tropical Paradise"}
                </h2>
                <button onClick={voltarEscolha} style={voltarButton}>
                  ← Escolher Outro Jogo
                </button>
              </div>

              <div style={dialogoBox}>
                {(() => {
                  const dialogos =
                    gameMode === "fallout" ? dialogosFallout : dialogosFarCry;
                  const dialogo = dialogos[dialogoAtual];

                  return (
                    <div style={dialogoContent}>
                      <div style={personagemBox}>
                        <div style={personagemEmoji}>{dialogo.personagem}</div>
                        <div style={personagemNome}>{dialogo.nome}</div>
                      </div>

                      <div style={falaBox}>
                        <p style={falaTexto}>{dialogo.fala}</p>
                      </div>

                      <button
                        onClick={proximoDialogo}
                        style={proximoDialogoButton}
                      >
                        {dialogoAtual < dialogos.length - 1
                          ? "💬 Continuar"
                          : "🎯 Tentar Convencer o Matheus"}
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

        {gameState === "convencendo" && (
          <div style={convencendoContainer}>
            <h3 style={convencendoTitle}>💕 Momento da Verdade 💕</h3>

            <div style={cenarioContainer}>
              <div style={millenaConvencendo}>
                <div style={millenaEmoji}>🥺</div>
                <div style={millenaFala}>
                  "Amor, por favor? Seria TÃO divertido jogar juntos! Imagina as
                  aventuras que a gente ia ter... Só uma horinhasss? 👉👈"
                </div>
              </div>

              <div style={matheusEsquivando}>
                <div style={matheusEmoji}>😅</div>
                <div style={matheusFala}>"Ah, mas eu... hmmm... 🤔"</div>
              </div>
            </div>

            <div style={acaoContainer}>
              <button
                onClick={tentarConvencer}
                style={tentarButton}
                onMouseEnter={(e) => {
                  e.target.style.animation =
                    "millenaSuplica 0.5s ease-in-out infinite";
                }}
                onMouseLeave={(e) => {
                  e.target.style.animation = "none";
                }}
              >
                🥺 Usar Técnica dos Olhinhos de Cachorro
              </button>
            </div>
          </div>
        )}

        {gameState === "millena-triste" && (
          <div style={tristeContainer}>
            <h3 style={tristeTitle}>😢 Matheus Deu uma Desculpa... 😢</h3>

            <div style={desculpaBox}>
              <div style={matheusDesculpa}>
                <div style={matheusEmoji}>😰</div>
                <div style={desculpaTexto}>
                  "{desculpasMatheus[desculpaAtual]}"
                </div>
              </div>

              <div style={millenaTriste}>
                <div style={millenaEmoji}>😭</div>
                <div style={tristeTexto}>
                  "Mas... mas... só uma horinhasss... 🥺💔"
                </div>
              </div>
            </div>

            <div style={opcoesTristeza}>
              <button onClick={millenaPersiste} style={persistirButton}>
                💪 Millena Não Desiste!
              </button>

              <button onClick={voltarEscolha} style={tentarOutroButton}>
                🎮 Tentar Outro Jogo
              </button>
            </div>
          </div>
        )}

        {gameState === "insistindo" && (
          <div style={insistindoContainer}>
            <h3 style={insistindoTitle}>💪 Millena Persiste! 💪</h3>

            <div style={persistenciaBox}>
              <div style={millenaDeterminada}>
                <div style={millenaEmoji}>😤</div>
                <div style={determinadaTexto}>
                  "Matheus! Você SABE que seria super divertido! Lembra quando a
                  gente assistiu gameplay juntos? Você até disse que parecia
                  legal... Só me dá uma chance! Pleaseee! 🙏✨"
                </div>
              </div>

              <div style={matheusRendendo}>
                <div style={matheusEmoji}>🫠</div>
                <div style={rendendoTexto}>
                  "Ah... é... eu... talvez... *suspiro* Está bem... MAS SÓ UMA
                  HORINHAAA! 😫"
                </div>
              </div>
            </div>

            <button onClick={matheusDesiste} style={vitoriButton}>
              🎉 VITÓRIA! Matheus Aceita!
            </button>
          </div>
        )}

        {gameState === "matheus-aceita" && (
          <div style={aceitaContainer}>
            <h2 style={aceitaTitle}>🎉 SUCESSO! 🎉</h2>

            <div style={celebracaoBox}>
              <div style={millenaVitoria}>
                <div style={millenaEmoji}>🎊</div>
                <div style={vitoriaTexto}>
                  "YESSS! EU SABIA! Você vai ver como é divertido! Vamos
                  construir nossa casa no jogo! 💕🏠"
                </div>
              </div>

              <div style={matheusAceita}>
                <div style={matheusEmoji}>😊</div>
                <div style={aceitaTexto}>
                  "Tá bom, tá bom... você ganhou! Mas se eu morrer muito, a
                  culpa é sua! 😂"
                </div>
              </div>
            </div>

            <div style={conquistaBox}>
              <div style={conquistaIcon}>🏆</div>
              <div style={conquistaTexto}>
                {conquistasDesbloqueadas[conquistasDesbloqueadas.length - 1]}
              </div>
            </div>

            <button onClick={jogarJuntos} style={jogarButton}>
              💕 Jogar Juntos!
            </button>
          </div>
        )}

        {gameState === "jogando-juntos" && (
          <div style={jogandoContainer}>
            <h2 style={jogandoTitle}>💕 Couple Goals: Gaming Together! 💕</h2>

            <div style={gameplayBox}>
              <div style={gameScreen}>
                <div style={gameElements}>
                  {gameMode === "fallout" ? (
                    <>
                      <div style={gameElement}>
                        🤖 Codsworth: "Que fofo! Vocês jogando juntos!"
                      </div>
                      <div style={gameElement}>
                        🏠 Construindo casa para dois...
                      </div>
                      <div style={gameElement}>
                        💕 Matheus: "Ok, isso é mais divertido que eu pensei!"
                      </div>
                      <div style={gameElement}>
                        😊 Millena: "EU DISSE QUE ERA BOM!"
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={gameElement}>
                        🏔️ Explorando ilhas juntos...
                      </div>
                      <div style={gameElement}>
                        🎯 Matheus: "Wow, esse jogo é legal mesmo!"
                      </div>
                      <div style={gameElement}>
                        💕 Millena: "Viu? Eu não disse à toa!"
                      </div>
                      <div style={gameElement}>
                        🏆 Missão em co-op completada!
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div style={coupleGoalsBox}>
              <div style={coupleEmoji}>👫🎮</div>
              <div style={coupleTexto}>
                "E assim, finalmente, o Matheus descobriu que jogar com a
                Millena era mais divertido do que ele imaginava! 💕"
              </div>
            </div>
          </div>
        )}

        {gameMode === "completo" && (
          <div style={completoContainer}>
            <h1 style={completoTitle}>🎮💕 Missão Cumprida! 💕🎮</h1>

            <div style={resumoContainer}>
              <h3 style={resumoTitle}>📊 Resumo da Aventura:</h3>
              <div style={estatisticas}>
                <div style={estatistica}>
                  <div style={estatLabel}>Desculpas do Matheus:</div>
                  <div style={estatValue}>∞ (Infinitas) 😂</div>
                </div>
                <div style={estatistica}>
                  <div style={estatLabel}>Persistência da Millena:</div>
                  <div style={estatValue}>Level 💯</div>
                </div>
                <div style={estatistica}>
                  <div style={estatLabel}>Diversão Final:</div>
                  <div style={estatValue}>Máxima! 🎉</div>
                </div>
              </div>
            </div>

            <div style={conquistasContainer}>
              <h4 style={conquistasTitle}>🏆 Conquistas Desbloqueadas:</h4>
              <div style={conquistasList}>
                {conquistasDesbloqueadas.map((conquista, index) => (
                  <div key={index} style={conquistaItem}>
                    {conquista}
                  </div>
                ))}
              </div>
            </div>

            <div style={mensagemFinalContainer}>
              <h4 style={mensagemFinalTitle}>💌 Mensagem do Coração:</h4>
              <div style={mensagemFinalTexto}>
                "Millena, seu jeito persistente e carinhoso sempre consegue me
                convencer! Você faz até as coisas que eu tenho 'preguiça' de
                fazer se tornarem especiais quando é com você. Te amoson! 💕🎮"
                <br />
                <br />
                <em style={assinaturaFinal}>
                  - Matheus (que finalmente vai jogar Far Cry e Fallout!) 😄
                </em>
              </div>
            </div>

            <button onClick={avancar} style={avancarButton}>
              🌟 Próxima Aventura Épica! 🌟
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
  color: "#fff",
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Orbitron", monospace',
};

const particulaStyle = {
  position: "absolute",
  fontSize: "1.2rem",
  animation: "gameParticle 4s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
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

const escolhaContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "1000px",
  width: "100%",
  border: "4px solid #ff6b81",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
  animation: "gameGlow 3s ease-in-out infinite",
};

const titleStyle = {
  fontSize: "2.5rem",
  textAlign: "center",
  marginBottom: "30px",
  background: "linear-gradient(45deg, #ff6b81, #74b9ff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 0 20px rgba(255, 107, 129, 0.8)",
};

const introducaoContainer = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "30px",
  gap: "20px",
};

const millenaGamer = {
  flex: 1,
  backgroundColor: "rgba(255, 107, 129, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #ff6b81",
};

const millenaAvatar = {
  fontSize: "3rem",
  textAlign: "center",
  marginBottom: "10px",
  animation: "millenaSuplica 2s ease-in-out infinite",
};

const millenaSpeech = {
  fontSize: "1rem",
  fontStyle: "italic",
  textAlign: "center",
  lineHeight: "1.5",
};

const matheusRelutancia = {
  flex: 1,
  backgroundColor: "rgba(116, 185, 255, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #74b9ff",
};

const matheusAvatar = {
  fontSize: "3rem",
  textAlign: "center",
  marginBottom: "10px",
  animation: "matheusNervoso 3s ease-in-out infinite",
};

const matheusSpeech = {
  fontSize: "1rem",
  fontStyle: "italic",
  textAlign: "center",
  lineHeight: "1.5",
};

const gamesContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "25px",
  marginBottom: "30px",
};

const gameCard = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "20px",
  padding: "25px",
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "3px solid transparent",
  boxShadow: "0 10px 25px rgba(218, 165, 32, 0.4)",
};

const gameIcon = {
  fontSize: "4rem",
  marginBottom: "15px",
};

const gameTitle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "15px",
  color: "#ffd700",
};

const gameDesc = {
  fontSize: "1rem",
  marginBottom: "15px",
  lineHeight: "1.5",
  fontStyle: "italic",
};

const gameStatus = {
  fontSize: "0.9rem",
  color: "#ff6b81",
  fontWeight: "bold",
};

const dicaContainer = {
  textAlign: "center",
  fontSize: "1rem",
  fontStyle: "italic",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: "15px",
  borderRadius: "15px",
  border: "2px solid #74b9ff",
};

// Continuação dos estilos...
const dialogoContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "25px",
  padding: "30px",
  maxWidth: "800px",
  width: "100%",
  border: "4px solid #ff6b81",
};

const gameHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
};

const gameHeaderTitle = {
  fontSize: "1.8rem",
  color: "#ffd700",
};

const voltarButton = {
  padding: "10px 20px",
  fontSize: "1rem",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const dialogoBox = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "15px",
  padding: "25px",
  border: "2px solid #74b9ff",
};

const dialogoContent = {
  textAlign: "center",
};

const personagemBox = {
  marginBottom: "20px",
};

const personagemEmoji = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const personagemNome = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#ffd700",
};

const falaBox = {
  marginBottom: "20px",
};

const falaTexto = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  fontStyle: "italic",
};

const proximoDialogoButton = {
  padding: "15px 30px",
  fontSize: "1.1rem",
  backgroundColor: "#ff6b81",
  color: "#fff",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const convencendoContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "25px",
  padding: "30px",
  maxWidth: "700px",
  width: "100%",
  textAlign: "center",
  border: "4px solid #ff69b4",
};

const convencendoTitle = {
  fontSize: "2rem",
  marginBottom: "25px",
  color: "#ff69b4",
};

const cenarioContainer = {
  marginBottom: "25px",
};

const millenaConvencendo = {
  backgroundColor: "rgba(255, 105, 180, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "15px",
  border: "2px solid #ff69b4",
};

const millenaEmoji = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const millenaFala = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  lineHeight: "1.5",
};

const matheusEsquivando = {
  backgroundColor: "rgba(116, 185, 255, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #74b9ff",
};

const matheusEmoji = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const matheusFala = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  lineHeight: "1.5",
};

const acaoContainer = {
  textAlign: "center",
};

const tentarButton = {
  padding: "18px 35px",
  fontSize: "1.2rem",
  backgroundColor: "#ff69b4",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 10px 25px rgba(255, 105, 180, 0.4)",
};

const tristeContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "25px",
  padding: "30px",
  maxWidth: "700px",
  width: "100%",
  textAlign: "center",
  border: "4px solid #dc3545",
};

const tristeTitle = {
  fontSize: "1.8rem",
  marginBottom: "25px",
  color: "#dc3545",
};

const desculpaBox = {
  marginBottom: "25px",
};

const matheusDesculpa = {
  backgroundColor: "rgba(220, 53, 69, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "15px",
  border: "2px solid #dc3545",
};

const desculpaTexto = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  lineHeight: "1.5",
};

const millenaTriste = {
  backgroundColor: "rgba(255, 105, 180, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #ff69b4",
};

const tristeTexto = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  lineHeight: "1.5",
};

const opcoesTristeza = {
  display: "flex",
  justify: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const persistirButton = {
  padding: "15px 30px",
  fontSize: "1.1rem",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const tentarOutroButton = {
  padding: "15px 30px",
  fontSize: "1.1rem",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const insistindoContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "25px",
  padding: "30px",
  maxWidth: "700px",
  width: "100%",
  textAlign: "center",
  border: "4px solid #28a745",
};

const insistindoTitle = {
  fontSize: "2rem",
  marginBottom: "25px",
  color: "#28a745",
};

const persistenciaBox = {
  marginBottom: "25px",
};

const millenaDeterminada = {
  backgroundColor: "rgba(40, 167, 69, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "15px",
  border: "2px solid #28a745",
};

const determinadaTexto = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  lineHeight: "1.5",
};

const matheusRendendo = {
  backgroundColor: "rgba(255, 193, 7, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #ffc107",
};

const rendendoTexto = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  lineHeight: "1.5",
};

const vitoriButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  backgroundColor: "#ffd700",
  color: "#000",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 15px 30px rgba(255, 215, 0, 0.4)",
  textTransform: "uppercase",
};

const aceitaContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "25px",
  padding: "30px",
  maxWidth: "700px",
  width: "100%",
  textAlign: "center",
  border: "4px solid #28a745",
};

const aceitaTitle = {
  fontSize: "2.2rem",
  marginBottom: "25px",
  color: "#28a745",
  animation: "coupleGoals 2s ease-in-out infinite",
};

const celebracaoBox = {
  marginBottom: "25px",
};

const millenaVitoria = {
  backgroundColor: "rgba(40, 167, 69, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "15px",
  border: "2px solid #28a745",
};

const vitoriaTexto = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  lineHeight: "1.5",
};

const matheusAceita = {
  backgroundColor: "rgba(255, 193, 7, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #ffc107",
};

const aceitaTexto = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  lineHeight: "1.5",
};

const conquistaBox = {
  backgroundColor: "rgba(255, 215, 0, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #ffd700",
  animation: "conquista 1s ease-out",
};

const conquistaIcon = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const conquistaTexto = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#ffd700",
};

const jogarButton = {
  padding: "18px 35px",
  fontSize: "1.2rem",
  background: "linear-gradient(45deg, #ff69b4, #28a745)",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 15px 30px rgba(255, 105, 180, 0.4)",
};

const jogandoContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "25px",
  padding: "30px",
  maxWidth: "800px",
  width: "100%",
  textAlign: "center",
  border: "4px solid #ffd700",
};

const jogandoTitle = {
  fontSize: "2rem",
  marginBottom: "25px",
  color: "#ffd700",
  animation: "coupleGoals 2s ease-in-out infinite",
};

const gameplayBox = {
  marginBottom: "25px",
};

const gameScreen = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "15px",
  padding: "25px",
  border: "2px solid #ffd700",
};

const gameElements = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const gameElement = {
  fontSize: "1rem",
  padding: "10px",
  backgroundColor: "rgba(255, 215, 0, 0.2)",
  borderRadius: "10px",
  border: "1px solid #ffd700",
};

const coupleGoalsBox = {
  backgroundColor: "rgba(255, 105, 180, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #ff69b4",
};

const coupleEmoji = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const coupleTexto = {
  fontSize: "1.1rem",
  fontStyle: "italic",
  lineHeight: "1.5",
};

const completoContainer = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: "25px",
  padding: "40px",
  maxWidth: "900px",
  width: "100%",
  textAlign: "center",
  border: "4px solid #ffd700",
};

const completoTitle = {
  fontSize: "2.5rem",
  marginBottom: "30px",
  color: "#ffd700",
  animation: "coupleGoals 2s ease-in-out infinite",
};

const resumoContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #74b9ff",
};

const resumoTitle = {
  color: "#74b9ff",
  marginBottom: "20px",
};

const estatisticas = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const estatistica = {
  display: "flex",
  justifyContent: "space-between",
  align: "center",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: "10px 15px",
  borderRadius: "10px",
};

const estatLabel = {
  fontSize: "1rem",
  color: "#fff",
};

const estatValue = {
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#ffd700",
};

const conquistasContainer = {
  backgroundColor: "rgba(255, 215, 0, 0.2)",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "25px",
  border: "2px solid #ffd700",
};

const conquistasTitle = {
  color: "#ffd700",
  marginBottom: "15px",
};

const conquistasList = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const conquistaItem = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: "10px",
  borderRadius: "8px",
  fontSize: "0.9rem",
  animation: "conquista 1s ease-out",
};

const mensagemFinalContainer = {
  backgroundColor: "rgba(255, 105, 180, 0.2)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #ff69b4",
};

const mensagemFinalTitle = {
  color: "#ff69b4",
  marginBottom: "15px",
};

const mensagemFinalTexto = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  fontStyle: "italic",
};

const assinaturaFinal = {
  color: "#ffd700",
  fontWeight: "bold",
};

const avancarButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  background: "linear-gradient(45deg, #ff69b4, #74b9ff, #ffd700)",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  boxShadow: "0 20px 40px rgba(255, 105, 180, 0.6)",
  textTransform: "uppercase",
  letterSpacing: "1px",
};
