// pages/aventura/fase1.js
import { useRouter } from "next/router";
import { useState } from "react";

export default function Fase1() {
  const router = useRouter();
  const [resposta, setResposta] = useState(null);

  const avancar = () => {
    router.push("/aventura/fase2");
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #3e1f47, #1c0c24)",
        color: "#fbeaff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "'Uncial Antiqua', cursive",
      }}
    >
      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>
        📜 Fase 1: O Grimório Secreto
      </h1>
      <p style={{ maxWidth: "600px" }}>
        Você foi invocada para uma missão sagrada do coração... Mas antes, o
        grimório exige uma resposta sincera:
      </p>

      <h2 style={{ marginTop: "30px", fontSize: "22px" }}>
        Você ainda amaria seu namorado se ele fosse uma... minhoca? 🪱
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
          <button onClick={() => setResposta("claro")} style={btnGrimorio}>
            Claro! Faria até um mini ninho de folhas pra ele 🌿
          </button>
          <button onClick={() => setResposta("depende")} style={btnGrimorio}>
            Depende... ele ainda rolaria iniciativa? 🎲
          </button>
          <button onClick={() => setResposta("nao")} style={btnGrimorio}>
            Só se ele fosse uma minhoca mágica 💫
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "40px" }}>
          <p style={{ fontSize: "18px" }}>
            🪄 A resposta foi gravada nas páginas do grimório.
          </p>
          <button
            onClick={avancar}
            style={{ ...btnGrimorio, backgroundColor: "#8f3e9d" }}
          >
            Prosseguir para o próximo capítulo 📖
          </button>
        </div>
      )}
    </div>
  );
}

const btnGrimorio = {
  padding: "14px 20px",
  fontSize: "16px",
  backgroundColor: "#5e2b73",
  border: "2px solid #d5aaff",
  borderRadius: "10px",
  cursor: "pointer",
  color: "#fbeaff",
  transition: "0.3s",
};
