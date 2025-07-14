// pages/aventura/pesca.js
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Pesca() {
  const router = useRouter();
  const [posicao, setPosicao] = useState(50);
  const [pegou, setPegou] = useState(false);
  const alvoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (!pegou) {
        const novaPos = Math.random() * 80 + 10; // Entre 10% e 90%
        setPosicao(novaPos);
      }
    }, 700);
    return () => clearInterval(intervalo);
  }, [pegou]);

  const tentarPescar = () => {
    const alvoTop = parseFloat(alvoRef.current.style.top);
    if (alvoTop > 40 && alvoTop < 60) {
      setPegou(true);
      audioRef.current?.play();
      setTimeout(() => {
        router.push("/aventura/fase3");
      }, 2000);
    } else {
      alert("Quase! Tenta de novo 😅");
    }
  };

  return (
    <div
      style={{
        background:
          "url('https://cutewallpaper.org/21/stardew-valley-background/Download-Stardew-Valley-Wallpaper-Gallery.jpg') no-repeat center center fixed",
        backgroundSize: "cover",
        height: "100vh",
        fontFamily: "'Press Start 2P', cursive",
        textAlign: "center",
        paddingTop: "40px",
        color: "#fff",
        border: "10px solid #000",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          marginBottom: "10px",
          textShadow: "2px 2px 8px #000",
        }}
      >
        🎣 Fase 2.5: Pesca do Amor
      </h2>
      <p style={{ textShadow: "1px 1px 5px #000" }}>
        Fique atenta e clique quando o peixinho estiver no centro da barra
        encantada!
      </p>

      <div
        style={{
          position: "relative",
          width: "100px",
          height: "300px",
          backgroundColor: "#8ed0f2",
          margin: "40px auto",
          borderRadius: "10px",
          border: "4px solid #fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: 0,
            width: "100%",
            height: "30px",
            borderTop: "2px dashed #ff6b81",
            borderBottom: "2px dashed #ff6b81",
            zIndex: 1,
          }}
        ></div>

        <div
          ref={alvoRef}
          style={{
            position: "absolute",
            top: `${posicao}%`,
            left: "35%",
            fontSize: "30px",
            transition: "top 0.4s ease-in-out",
            zIndex: 2,
          }}
        >
          🐠
        </div>
      </div>

      {!pegou ? (
        <button
          onClick={tentarPescar}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#59c3c3",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          Lançar vara 🎣
        </button>
      ) : (
        <div
          style={{
            fontSize: "18px",
            marginTop: "20px",
            textShadow: "1px 1px 5px #000",
          }}
        >
          Você pescou o coração dele! 💘
        </div>
      )}

      <audio
        ref={audioRef}
        src="https://www.fesliyanstudios.com/play-mp3/387"
        preload="auto"
      />
    </div>
  );
}
