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
        backgroundColor: "#fdf1f8",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <img
        src="https://i.pinimg.com/originals/1a/b1/c0/1ab1c0c957e03d8bb89aa2fc13fc2264.png"
        alt="Mascote RPG"
        style={{ width: "200px", marginBottom: "20px" }}
      />
      <h2>⚔️ Missão do Coração: Fase 1</h2>
      <p style={{ maxWidth: "500px", marginTop: "20px" }}>
        Você foi invocada para uma missão importante! Mas antes, uma pergunta de
        extrema relevância mágica:
      </p>

      <h3 style={{ marginTop: "30px" }}>
        Você ainda amaria seu namorado se ele fosse uma minhoca?
      </h3>

      {!resposta ? (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <button onClick={() => setResposta("claro")} style={btnEstilo}>
            Claro! Até faria uma toquinha pra ele na terra 🌱
          </button>
          <button onClick={() => setResposta("depende")} style={btnEstilo}>
            Depende... ele ainda falaria comigo? 🤔
          </button>
          <button onClick={() => setResposta("nao")} style={btnEstilo}>
            Só se ele rolasse 20 no carisma 🎲
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "40px" }}>
          <p style={{ fontSize: "18px" }}>
            Resposta registrada com sucesso no grimório 🧙‍♀️
          </p>
          <button onClick={avancar} style={{ ...btnEstilo, marginTop: "20px" }}>
            Avançar para a próxima fase 🚪
          </button>
        </div>
      )}
    </div>
  );
}

const btnEstilo = {
  padding: "12px 20px",
  fontSize: "16px",
  backgroundColor: "#ff8ab0",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  color: "white",
  width: "100%",
  maxWidth: "400px",
};
