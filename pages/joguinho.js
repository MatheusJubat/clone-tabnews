import { useEffect, useRef, useState } from "react";

export default function Joguinho() {
  const naoBtnRef = useRef(null);
  const [aceitou, setAceitou] = useState(false);

  function moverBotao() {
    const btn = naoBtnRef.current;
    const width = window.innerWidth - 100;
    const height = window.innerHeight - 50;
    const randX = Math.random() * width;
    const randY = Math.random() * height;
    btn.style.position = "absolute";
    btn.style.left = `${randX}px`;
    btn.style.top = `${randY}px`;
  }

  useEffect(() => {
    const btn = naoBtnRef.current;
    btn.addEventListener("mouseover", moverBotao);
    return () => btn.removeEventListener("mouseover", moverBotao);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "#fff0f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {!aceitou ? (
        <>
          <h1>Você me ama mesmo? 🥹</h1>
          <p>Escolha com sabedoria:</p>
          <div style={{ marginTop: "20px" }}>
            <button
              style={{
                padding: "12px 24px",
                marginRight: "20px",
                fontSize: "18px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => setAceitou(true)}
            >
              Sim 😍
            </button>
            <button
              ref={naoBtnRef}
              style={{
                padding: "12px 24px",
                fontSize: "18px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              Não 😡
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Eu sabia!!! 🥰</h1>
          <p>Olha ele comemorando por você ter clicado em "Sim" 🐾</p>
          <img
            src="https://media.tenor.com/Ws6Dm1ZW_vMAAAAi/cat-love.gif"
            alt="Gato comemorando"
            style={{
              width: "250px",
              margin: "20px auto",
              borderRadius: "12px",
            }}
          />
          <a
            href="/galeria"
            style={{
              marginTop: "20px",
              fontSize: "18px",
              padding: "10px 20px",
              backgroundColor: "#ff6b81",
              color: "white",
              borderRadius: "12px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Ver Surpresa ❤️
          </a>
        </div>
      )}
    </div>
  );
}
