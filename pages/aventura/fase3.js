// pages/aventura/fase3.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Fase3() {
  const router = useRouter();
  const [resposta, setResposta] = useState(null);

  const avancar = () => {
    router.push("/aventura/fase4");
  };

  useEffect(() => {
    const iframe = document.getElementById("casteloMusic");
    if (iframe) {
      iframe.src += "&autoplay=1";
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fffef9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "'Cinzel Decorative', cursive",
        textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
      }}
    >
      <h1 style={{ fontSize: "34px", marginBottom: "20px" }}>
        🏰 Fase 3: O Enigma do Castelo Encantado
      </h1>
      <p style={{ maxWidth: "600px" }}>
        O castelo sussurra uma pergunta antiga... Somente quem responde com o
        coração pode seguir.
      </p>

      <h2 style={{ marginTop: "30px", fontSize: "22px" }}>
        Se você encontrasse uma carta de amor escondida na biblioteca secreta,
        assinada por ele... o que você faria?
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
          <button onClick={() => setResposta("guardar")} style={btnEncantado}>
            Guardaria como um tesouro encantado ✨
          </button>
          <button onClick={() => setResposta("responder")} style={btnEncantado}>
            Escreveria uma resposta apaixonada 💌
          </button>
          <button onClick={() => setResposta("chorar")} style={btnEncantado}>
            Choraria de amor na torre mais alta 😭
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "40px" }}>
          <p style={{ fontSize: "18px" }}>
            O castelo reconhece a pureza da sua resposta...
          </p>
          <button
            onClick={avancar}
            style={{ ...btnEncantado, backgroundColor: "#a29bfe" }}
          >
            Avançar pelo portão encantado 🏰
          </button>
        </div>
      )}

      {/* Música instrumental mágica de fundo */}
      <div style={{ marginTop: "30px" }}>
        <iframe
          id="casteloMusic"
          width="0"
          height="0"
          src="https://www.youtube.com/embed/ygyZLO9qzI8?autoplay=1&loop=1&playlist=ygyZLO9qzI8"
          title="Tema Castelo Encantado"
          frameBorder="0"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
}

const btnEncantado = {
  padding: "14px 20px",
  fontSize: "16px",
  backgroundColor: "#6c5ce7",
  border: "2px solid #dfe6e9",
  borderRadius: "10px",
  cursor: "pointer",
  color: "#fff",
  transition: "0.3s",
};
