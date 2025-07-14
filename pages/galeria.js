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
      src: "https://via.placeholder.com/600x400?text=Viagem+1",
      legenda: "Nossa primeira viagem 💖",
    },
    {
      src: "https://via.placeholder.com/600x400?text=Pizza+Night",
      legenda: "A pizza que queimou e a gente riu 😂",
    },
    {
      src: "https://via.placeholder.com/600x400?text=Aniversario",
      legenda: "Teu aniversário com brigadeiro torto 🎂",
    },
    {
      src: "https://via.placeholder.com/600x400?text=Nos",
      legenda: "Só nós dois sendo bobos juntos 🫶",
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
          src="https://youtu.be/lxhqCcrnTv4?si=7hbFULQ-0LdrusfS"
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
