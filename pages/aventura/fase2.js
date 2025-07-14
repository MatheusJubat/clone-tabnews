// pages/aventura/fase2.js
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Fase2() {
  const router = useRouter();

  const irParaPesca = () => {
    router.push("/aventura/pesca");
  };

  useEffect(() => {
    const iframe = document.getElementById("maomaoMusic");
    if (iframe) {
      iframe.src += "&autoplay=1";
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/fancy-deboss.png), linear-gradient(to bottom, #f2e3d5, #e9d5c0)",
        color: "#4b3832",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "'Spectral SC', serif",
      }}
    >
      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>
        🧪 Fase 2: Poção do Amor
      </h1>
      <p style={{ maxWidth: "600px" }}>
        Maomao preparou uma nova fórmula secreta no palácio... mas antes de
        beber, você precisa provar seu coração verdadeiro.
      </p>

      <button
        onClick={irParaPesca}
        style={{
          marginTop: "30px",
          fontSize: "18px",
          padding: "12px 24px",
          borderRadius: "12px",
          backgroundColor: "#8e6e53",
          border: "2px solid #e6c1a3",
          color: "#fffefb",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Aceitar o desafio alquímico 🧉
      </button>

      {/* Música ambiente inspirada em Diário da Apotecária */}
      <div style={{ marginTop: "30px" }}>
        <iframe
          id="maomaoMusic"
          width="0"
          height="0"
          src="https://www.youtube.com/embed/yZEMrZzr7Z8?autoplay=1&loop=1&playlist=yZEMrZzr7Z8"
          title="Tema Maomao"
          frameBorder="0"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
}
