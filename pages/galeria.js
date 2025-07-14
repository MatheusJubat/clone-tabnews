// pages/galeria.js - Versão atualizada
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// ✅ IMPORTS ADICIONADOS:
import { MusicPlayer, musicPlayerCSS } from "../hooks/useMusic";
import {
  useEasterEggs,
  EasterEggButton,
  EasterEggMessage,
  SpecialEffects,
  EasterEggCounter,
  easterEggCSS,
} from "../hooks/useEasterEggs";
import LoveStats, { useLoveStats } from "../components/LoveStats";

export default function GaleriaMelhorada() {
  const router = useRouter();
  // ✅ HOOKS ADICIONADOS:
  const { findEasterEgg, showMessage, specialEffects, getTotalEggsFound } =
    useEasterEggs("galeria");
  const liveStats = useLoveStats();

  const [magicDust, setMagicDust] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heartRain, setHeartRain] = useState([]);
  const [galleryLoaded, setGalleryLoaded] = useState(false);

  useEffect(() => {
    // Criar poeira mágica
    const dust = [];
    for (let i = 0; i < 30; i++) {
      dust.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ["✨", "💫", "🌟", "⭐", "💎"][Math.floor(Math.random() * 5)],
        delay: Math.random() * 3,
      });
    }
    setMagicDust(dust);

    // Animação de entrada
    setTimeout(() => setGalleryLoaded(true), 500);
  }, []);

  const createHeartRain = () => {
    const hearts = [];
    for (let i = 0; i < 10; i++) {
      hearts.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        emoji: ["💖", "💕", "💓", "💗", "💘"][Math.floor(Math.random() * 5)],
      });
    }
    setHeartRain(hearts);

    setTimeout(() => {
      setHeartRain([]);
    }, 3000);
  };

  const fotos = [
    {
      src: "https://media.tenor.com/Ws6Dm1ZW_vMAAAAi/cat-love.gif",
      legenda: 'Ele comemorando por você ter clicado em "Sim" 😻',
      categoria: "Celebração",
      coracao: "💖",
    },
    {
      src: "https://media.tenor.com/KbQ5U8H8d4UAAAAC/cat-flower.gif",
      legenda: "Esse sou eu: o gato romântico com flor 🌹",
      categoria: "Romance",
      coracao: "🌹",
    },
    {
      src: "https://media.tenor.com/2roX3uxz_68AAAAC/cat-computer.gif",
      legenda: "Montando esse site todo só pra você 🖥️💘",
      categoria: "Tecnologia",
      coracao: "💻",
    },
    {
      src: "https://media.tenor.com/k-v0gTAQvCIAAAAC/cat-typing.gif",
      legenda: "Codando com amor 💻❤️",
      categoria: "Código",
      coracao: "⌨️",
    },
    {
      src: "https://placekitten.com/600/400",
      legenda: "Só um gato fofo pra te lembrar do quanto você é linda 😽",
      categoria: "Fofura",
      coracao: "😽",
    },
  ];

  const continuarAventura = () => {
    createHeartRain();
    setTimeout(() => {
      router.push("/aventura/fase1");
    }, 1000);
  };

  return (
    <div style={containerStyle}>
      {/* ✅ CSS GLOBAL */}
      <style jsx global>{`
        ${musicPlayerCSS}
        ${easterEggCSS}
        
        @keyframes dustFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) rotate(180deg) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes heartFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes titleGlow {
          0%,
          100% {
            text-shadow:
              0 0 10px #ff69b4,
              0 0 20px #ff69b4;
          }
          50% {
            text-shadow:
              0 0 20px #ff69b4,
              0 0 30px #ff69b4,
              0 0 40px #ff69b4;
          }
        }

        @keyframes catClap {
          0%,
          100% {
            transform: scale(1) rotate(-5deg);
          }
          50% {
            transform: scale(1.2) rotate(5deg);
          }
        }

        @keyframes statPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }

        .magical-swiper {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .custom-bullet {
          width: 15px;
          height: 15px;
          background: rgba(255, 105, 180, 0.5);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .custom-bullet-active {
          background: #ff69b4;
          transform: scale(1.3);
        }
      `}</style>

      {/* ✅ MÚSICA E EASTER EGGS */}
      <MusicPlayer
        phaseName="galeria"
        position="bottom-right"
        showControls={true}
      />

      <EasterEggCounter currentPhase="galeria" position="top-right" />

      {/* ✅ EASTER EGGS ESCONDIDOS */}
      <EasterEggButton
        position={{ top: "8%", left: "12%" }}
        size={42}
        onFind={findEasterEgg}
      />

      <EasterEggButton
        position={{ bottom: "18%", right: "12%" }}
        size={38}
        onFind={findEasterEgg}
      />

      <EasterEggButton
        position={{ top: "45%", left: "6%" }}
        size={48}
        onFind={findEasterEgg}
      />

      {/* Poeira mágica de fundo */}
      {magicDust.map((particle) => (
        <div
          key={particle.id}
          style={{
            ...dustParticle,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Chuva de corações */}
      {heartRain.map((heart) => (
        <div
          key={heart.id}
          style={{
            ...heartRainStyle,
            left: `${heart.x}%`,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      <div style={contentContainer}>
        <div
          style={{
            ...galleryContainer,
            opacity: galleryLoaded ? 1 : 0,
            transform: galleryLoaded
              ? "translateY(0px) scale(1)"
              : "translateY(50px) scale(0.9)",
          }}
        >
          {/* Título mágico */}
          <div style={titleContainer}>
            <h1 style={titleStyle}>💝 Galeria dos Momentos Mágicos 💝</h1>
            <div style={titleSubtext}>
              <p style={subtitleStyle}>
                {liveStats.diasJuntos || 0} dias de amor, risadas e gatinhos! 🥰
              </p>
              <div style={titleDecoration}>
                <span style={decorEmoji1}>🐾</span>
                <span style={decorEmoji2}>💕</span>
                <span style={decorEmoji3}>🐾</span>
              </div>
            </div>
          </div>

          {/* Contador de momentos */}
          <div style={momentCounter}>
            <div style={counterCard}>
              <div style={counterNumber}>{currentSlide + 1}</div>
              <div style={counterTotal}>de {fotos.length}</div>
              <div style={counterLabel}>Momentos Especiais</div>
            </div>
          </div>

          {/* Galeria com Swiper */}
          <div style={swiperContainer}>
            <Swiper
              modules={[EffectFade, Autoplay, Pagination, Navigation]}
              effect="fade"
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: "custom-bullet",
                bulletActiveClass: "custom-bullet-active",
              }}
              navigation={true}
              onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
              className="magical-swiper"
              style={swiperStyle}
            >
              {fotos.map((foto, index) => (
                <SwiperSlide key={index}>
                  <div style={slideContainer}>
                    <div style={imageContainer}>
                      <img
                        src={foto.src}
                        alt={`foto ${index + 1}`}
                        style={slideImage}
                        onClick={() => {
                          createHeartRain();
                          findEasterEgg({ x: 50, y: 50 });
                        }}
                      />
                      <div style={imageOverlay}>
                        <div style={categoryTag}>
                          {foto.coracao} {foto.categoria}
                        </div>
                      </div>
                    </div>

                    <div style={captionContainer}>
                      <p style={captionText}>{foto.legenda}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Galeria de gatinhos assistindo */}
          <div style={audienceCats}>
            <div style={audienceTitle}>🎭 Plateia VIP 🎭</div>
            <div style={catsContainer}>
              <div
                style={catAudience1}
                onClick={() => findEasterEgg({ x: 20, y: 85 })}
              >
                😸
              </div>
              <div
                style={catAudience2}
                onClick={() => findEasterEgg({ x: 35, y: 85 })}
              >
                😻
              </div>
              <div
                style={catAudience3}
                onClick={() => findEasterEgg({ x: 50, y: 85 })}
              >
                🐱
              </div>
              <div
                style={catAudience4}
                onClick={() => findEasterEgg({ x: 65, y: 85 })}
              >
                😺
              </div>
              <div
                style={catAudience5}
                onClick={() => findEasterEgg({ x: 80, y: 85 })}
              >
                🙀
              </div>
            </div>
            <p style={audienceCaption}>
              "Os gatinhos aprovam esta linda história!" 🐾
            </p>
          </div>

          {/* ✅ ESTATÍSTICAS ATUALIZADAS */}
          <LoveStats
            showDetailed={false}
            theme="romantic"
            style={{ marginBottom: "30px" }}
          />

          {/* Botão para continuar */}
          <div style={actionContainer}>
            <div style={magicPrompt}>
              <h3 style={promptTitle}>✨ Pronta para a Grande Aventura? ✨</h3>
              <p style={promptText}>
                A galeria foi apenas o começo... Mundos mágicos te esperam! 🌟
              </p>

              {/* Easter egg no prompt */}
              <div
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  fontSize: "1.5rem",
                  margin: "10px 0",
                }}
                onClick={() => findEasterEgg({ x: 50, y: 70 })}
              >
                🎮✨🎮
              </div>
            </div>

            <button
              onClick={continuarAventura}
              style={adventureButton}
              onMouseEnter={(e) => {
                e.target.style.transform =
                  "scale(1.15) rotate(2deg) translateY(-5px)";
                e.target.style.background =
                  "linear-gradient(45deg, #ff1493, #ff69b4, #ba55d3, #9370db)";
                e.target.style.boxShadow =
                  "0 20px 40px rgba(255, 20, 147, 0.7)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform =
                  "scale(1) rotate(0deg) translateY(0px)";
                e.target.style.background =
                  "linear-gradient(45deg, #28a745, #20c997, #17a2b8)";
                e.target.style.boxShadow = "0 12px 25px rgba(40, 167, 69, 0.6)";
              }}
            >
              🎮 Começar a Aventura Mágica! 🎮
            </button>
          </div>
        </div>
      </div>

      {/* ✅ COMPONENTES DE FEEDBACK */}
      <EasterEggMessage
        message={showMessage}
        onClose={() => setShowMessage(null)}
      />

      <SpecialEffects effects={specialEffects} />
    </div>
  );
}

// Todos os estilos permanecem iguais...
const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  background:
    "linear-gradient(135deg, #fff0f5 0%, #ffe4e1 25%, #ffc0cb 50%, #ffb6c1 75%, #ffa0ac 100%)",
  color: "#4a4a4a",
  position: "relative",
  overflow: "hidden",
  padding: 0,
  margin: 0,
  fontFamily: '"Poppins", sans-serif',
};

const dustParticle = {
  position: "absolute",
  fontSize: "16px",
  animation: "dustFloat 5s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
};

const heartRainStyle = {
  position: "absolute",
  top: "-50px",
  fontSize: "2rem",
  animation: "heartFall 3s linear forwards",
  pointerEvents: "none",
  zIndex: 10,
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

const galleryContainer = {
  width: "100%",
  maxWidth: "1000px",
  transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
};

const titleContainer = {
  textAlign: "center",
  marginBottom: "30px",
};

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  background: "linear-gradient(45deg, #ff69b4, #ff1493, #c71585)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "titleGlow 3s ease-in-out infinite",
  marginBottom: "15px",
};

const titleSubtext = {
  marginBottom: "15px",
};

const subtitleStyle = {
  fontSize: "1.3rem",
  color: "#666",
  marginBottom: "15px",
};

const titleDecoration = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const decorEmoji1 = {
  fontSize: "1.5rem",
  animation: "catClap 2s ease-in-out infinite",
  cursor: "pointer",
};

const decorEmoji2 = {
  fontSize: "1.8rem",
  animation: "catClap 2s ease-in-out infinite 0.5s",
  cursor: "pointer",
};

const decorEmoji3 = {
  fontSize: "1.5rem",
  animation: "catClap 2s ease-in-out infinite 1s",
  cursor: "pointer",
};

const momentCounter = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "25px",
};

const counterCard = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "20px",
  padding: "15px 25px",
  textAlign: "center",
  border: "3px solid #ff69b4",
  boxShadow: "0 10px 20px rgba(255, 105, 180, 0.3)",
};

const counterNumber = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#ff1493",
};

const counterTotal = {
  fontSize: "1rem",
  color: "#666",
};

const counterLabel = {
  fontSize: "0.9rem",
  color: "#ff69b4",
  fontWeight: "bold",
};

const swiperContainer = {
  marginBottom: "40px",
};

const swiperStyle = {
  width: "100%",
  height: "500px",
};

const slideContainer = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const imageContainer = {
  position: "relative",
  flex: 1,
  overflow: "hidden",
  borderRadius: "20px",
};

const slideImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  cursor: "pointer",
  transition: "transform 0.3s ease",
};

const imageOverlay = {
  position: "absolute",
  top: "15px",
  right: "15px",
};

const categoryTag = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#ff1493",
  padding: "8px 15px",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: "bold",
  border: "2px solid #ff69b4",
};

const captionContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  padding: "20px",
  textAlign: "center",
  borderRadius: "0 0 20px 20px",
};

const captionText = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#ff1493",
  margin: 0,
  lineHeight: "1.4",
};

const audienceCats = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "20px",
  padding: "25px",
  textAlign: "center",
  marginBottom: "30px",
  border: "3px solid #ff69b4",
  boxShadow: "0 15px 30px rgba(255, 105, 180, 0.3)",
};

const audienceTitle = {
  fontSize: "1.3rem",
  color: "#ff1493",
  fontWeight: "bold",
  marginBottom: "15px",
};

const catsContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "15px",
};

const catAudience1 = {
  fontSize: "2.5rem",
  animation: "catClap 2s ease-in-out infinite",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const catAudience2 = {
  fontSize: "2.5rem",
  animation: "catClap 2s ease-in-out infinite 0.2s",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const catAudience3 = {
  fontSize: "2.5rem",
  animation: "catClap 2s ease-in-out infinite 0.4s",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const catAudience4 = {
  fontSize: "2.5rem",
  animation: "catClap 2s ease-in-out infinite 0.6s",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const catAudience5 = {
  fontSize: "2.5rem",
  animation: "catClap 2s ease-in-out infinite 0.8s",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const audienceCaption = {
  color: "#666",
  fontStyle: "italic",
  margin: 0,
};

const actionContainer = {
  textAlign: "center",
};

const magicPrompt = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  border: "3px solid #ff69b4",
  boxShadow: "0 15px 30px rgba(255, 105, 180, 0.3)",
};

const promptTitle = {
  color: "#ff1493",
  fontSize: "1.4rem",
  marginBottom: "10px",
};

const promptText = {
  color: "#666",
  fontSize: "1.1rem",
  margin: 0,
};

const adventureButton = {
  padding: "20px 40px",
  fontSize: "1.3rem",
  background: "linear-gradient(45deg, #28a745, #20c997, #17a2b8)",
  color: "white",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 12px 25px rgba(40, 167, 69, 0.6)",
  fontFamily: "inherit",
};
