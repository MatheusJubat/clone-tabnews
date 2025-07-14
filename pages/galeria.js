import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import { useEffect } from "react";

export default function Galeria() {
  // Toca música ao entrar na página
  useEffect(() => {
    const iframe = document.getElementById("youtubePlayer");
    if (iframe) {
      iframe.src += "&autoplay=1";
    }
  }, []);

  const fotos = [
    {
      src: "https://media.tenor.com/Ws6Dm1ZW_vMAAAAi/cat-love.gif",
      legenda: 'Ele comemorando por você ter clicado em "Sim" 😻',
    },
    {
      src: "https://media.tenor.com/KbQ5U8H8d4UAAAAC/cat-flower.gif",
      legenda: "Esse sou eu: o gato romântico com flor 🌹",
    },
    {
      src: "https://media.tenor.com/2roX3uxz_68AAAAC/cat-computer.gif",
      legenda: "Montando esse site todo só pra você 🖥️💘",
    },
    {
      src: "https://media.tenor.com/k-v0gTAQvCIAAAAC/cat-typing.gif",
      legenda: "Codando com amor 💻❤️",
    },
    {
      src: "https://placekitten.com/600/400",
      legenda: "Só um gato fofo pra te lembrar do quanto você é linda 😽",
    },
  ];

  return (
    <div
      style={{
        background: "#fff0f5",
        minHeight: "100vh",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1>3 anos de amor em fotos 🥰</h1>

      {/* Swiper Carrossel */}
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="mySwiper"
        style={{ width: "90%", maxWidth: "600px", margin: "40px auto" }}
      >
        {fotos.map((foto, index) => (
          <SwiperSlide key={index}>
            <img
              src={foto.src}
              alt="foto"
              style={{ width: "100%", borderRadius: "20px" }}
            />
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              {foto.legenda}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Música de fundo (YouTube) */}
      <div style={{ marginTop: "30px" }}>
        <iframe
          id="youtubePlayer"
          width="0"
          height="0"
          src="https://www.youtube.com/embed/lxhqCcrnTv4?autoplay=1&loop=1&playlist=lxhqCcrnTv4"
          title="Música de fundo"
          frameBorder="0"
          allow="autoplay"
        ></iframe>
      </div>

      <a
        href="/pedido"
        style={{
          marginTop: "40px",
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#28a745",
          color: "white",
          borderRadius: "12px",
          textDecoration: "none",
          fontSize: "18px",
        }}
      >
        Continuar ❤️
      </a>
    </div>
  );
}
