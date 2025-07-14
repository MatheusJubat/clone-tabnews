import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Pesca() {
  const router = useRouter();
  const [posicao, setPosicao] = useState(0);
  const [tentandoPescar, setTentandoPescar] = useState(false);
  const [pegou, setPegou] = useState(false);

  // Movimenta o "peixe/coração"
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pegou) {
        const novaPos = Math.floor(Math.random() * 90); // 0 a 90%
        setPosicao(novaPos);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [pegou]);

  const tentarPescar = () => {
    setTentandoPescar(true);
    if (posicao > 40 && posicao < 60) {
      setPegou(true);
      setTimeout(() => {
        router.push("/aventura/faseFinal");
      }, 2000);
    } else {
      setTimeout(() => {
        setTentandoPescar(false);
      }, 1000);
    }
  };

  return (
    <div
      style={{
        background: "#dff6ff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h2>🎣 Pesca do Amor</h2>
      <p>Pesque o coração dele quando ele estiver no ponto certo!</p>

      <div
        style={{
          position: "relative",
          width: "80px",
          height: "300px",
          background: "#8ed0f2",
          borderRadius: "12px",
          marginTop: "20px",
          border: "4px solid #338",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "20%",
            top: `${posicao}%`,
            transition: "top 0.3s ease",
            fontSize: "32px",
          }}
        >
          🩷
        </div>
      </div>

      {!pegou ? (
        <button
          onClick={tentarPescar}
          disabled={tentandoPescar}
          style={{
            marginTop: "30px",
            padding: "10px 20px",
            backgroundColor: "#59c3c3",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {tentandoPescar ? "..." : "Lançar a vara 🎣"}
        </button>
      ) : (
        <div style={{ marginTop: "30px", fontSize: "20px" }}>
          Você pescou um coração verdadeiro! 💘
        </div>
      )}
    </div>
  );
}
