import { useEffect, useState } from "react";

export default function Pedido() {
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  useEffect(() => {
    // Dispara confetes e revela o pedido após 2s
    const timer = setTimeout(() => {
      setMostrarMensagem(true);
      import("canvas-confetti").then((confetti) => {
        confetti.default({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
        });
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        background: "#ffeaea",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>Respira fundo... 😳</h1>
      <p style={{ fontSize: "1.2rem" }}>Tenho algo sério pra te dizer.</p>

      {mostrarMensagem && (
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "2.2rem" }}>Quer casar comigo? 💍❤️</h2>
          <img
            src="https://media.tenor.com/WV3f2e3ZUmYAAAAC/cat-cute.gif"
            alt="Gatinho fofo pedindo"
            style={{
              width: "240px",
              marginTop: "20px",
              borderRadius: "16px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          />
          <div style={{ marginTop: "30px" }}>
            <a
              href="#"
              style={{
                fontSize: "20px",
                padding: "12px 24px",
                backgroundColor: "#ff6b81",
                color: "white",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              Sim, mil vezes sim!!! 😭
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
