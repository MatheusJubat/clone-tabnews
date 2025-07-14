// pages/aventura/fase4.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Fase4() {
  const router = useRouter();
  const [resposta, setResposta] = useState(null);
  const [cliquesSecretos, setCliquesSecretos] = useState(0);

  const avancar = () => {
    router.push("/aventura/fase5");
  };

  useEffect(() => {
    const iframe = document.getElementById("swMusic");
    if (iframe) {
      iframe.src += "&autoplay=1";
    }
  }, []);

  useEffect(() => {
    if (cliquesSecretos === 3) {
      alert(
        "✨ Você descobriu o segredo Jedi! Que a Força esteja com você. ✨",
      );
    }
  }, [cliquesSecretos]);

  return (
    <div
      onClick={() => setCliquesSecretos((prev) => prev + 1)}
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/originals/54/40/d3/5440d38ac5ac10bb61b8d86be5c2c942.gif)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#FFE81F",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "'Star Jedi', sans-serif",
        textShadow: "0 0 5px #000",
        transition: "all 1s ease-in-out",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
        ⭐ Fase 4: Escolha Jedi
      </h1>
      <p style={{ maxWidth: "600px", fontSize: "18px" }}>
        Você sente uma perturbação na Força... Mas antes de prosseguir,
        responda:
      </p>

      <h2 style={{ marginTop: "30px", fontSize: "24px", color: "#FFF" }}>
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
          <p style={{ fontSize: "18px", color: "#FFF" }}>
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

      {/* Imagens dos personagens clássicos */}
      <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
        <img
          src="https://www.pngall.com/wp-content/uploads/2016/06/Yoda-Free-Download-PNG.png"
          alt="Yoda"
          style={{ width: "80px" }}
        />
        <img
          src="https://www.pngmart.com/files/2/R2-D2-PNG-Photos.png"
          alt="R2-D2"
          style={{ width: "80px" }}
        />
      </div>

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
  backgroundColor: "#000",
  border: "2px solid #FFE81F",
  borderRadius: "10px",
  cursor: "pointer",
  color: "#FFE81F",
  transition: "0.3s",
  fontFamily: "'Star Jedi', sans-serif",
};
