// pages/aventura/fase4.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Fase4() {
  const router = useRouter();
  const [resposta, setResposta] = useState(null);

  const avancar = () => {
    router.push("/aventura/fase5");
  };

  useEffect(() => {
    const iframe = document.getElementById("swMusic");
    if (iframe) {
      iframe.src += "&autoplay=1";
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/stardust.png), linear-gradient(to bottom, #000000, #1a1a1a)",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        ⭐ Fase 4: Escolha Jedi
      </h1>
      <p style={{ maxWidth: "600px" }}>
        Você sente uma perturbação na Força... Mas antes de prosseguir,
        responda:
      </p>

      <h2 style={{ marginTop: "30px", fontSize: "24px" }}>
        Você ainda amaria seu namorado se ele fosse um droide velho e
        enferrujado?
      </h2>

      {!resposta ? (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "500px",
          }}
        >
          <button onClick={() => setResposta("sim")} style={btnStarWars}>
            Sim! O amor não se enferruja! ⚙️
          </button>
          <button onClick={() => setResposta("talvez")} style={btnStarWars}>
            Talvez, se ele falasse igual o C-3PO 🤖
          </button>
          <button onClick={() => setResposta("nao")} style={btnStarWars}>
            Só se ele tivesse um sabre de luz 💥
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "40px" }}>
          <p style={{ fontSize: "18px" }}>
            Sabedoria Jedi detectada. Que a Força esteja com você!
          </p>
          <button
            onClick={avancar}
            style={{ ...btnStarWars, backgroundColor: "#4caf50" }}
          >
            Avançar 🚀
          </button>
        </div>
      )}

      {/* Música Tema Star Wars */}
      <div style={{ marginTop: "30px" }}>
        <iframe
          id="swMusic"
          width="0"
          height="0"
          src="https://www.youtube.com/embed/_D0ZQPqeJkk?autoplay=1&loop=1&playlist=_D0ZQPqeJkk"
          title="Star Wars Theme"
          frameBorder="0"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
}

const btnStarWars = {
  padding: "14px 20px",
  fontSize: "16px",
  backgroundColor: "#222",
  border: "2px solid #feda4a",
  borderRadius: "10px",
  cursor: "pointer",
  color: "#feda4a",
  transition: "0.3s",
};
