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
        background: "linear-gradient(#a0e3f0, #f0fdfd)",
        height: "100vh",
        fontFamily: "'Press Start 2P', cursive",
        textAlign: "center",
        paddingTop: "40px",
      }}
    >
      <h2>🎣 Fase 2.5: Pesca do Amor</h2>
      <p>Fique atenta e clique quando o coração estiver no centro da barra!</p>

      <div
        style={{
          position: "relative",
          width: "100px",
          height: "300px",
          backgroundColor: "#8ed0f2",
          margin: "40px auto",
          borderRadius: "10px",
          border: "4px solid #333",
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
          🐟
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
          }}
        >
          Lançar vara 🎣
        </button>
      ) : (
        <div style={{ fontSize: "18px", marginTop: "20px" }}>
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
