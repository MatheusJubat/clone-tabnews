import { useRouter } from "next/router";

export default function Fase2() {
  const router = useRouter();

  const irParaPesca = () => {
    router.push("/aventura/pesca");
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h1>🧪 Fase 2: Poção do Amor</h1>
      <p style={{ maxWidth: "500px", margin: "20px auto" }}>
        Maomao finalizou a poção do amor verdadeiro, mas antes de beber você
        precisa passar por um último teste...
      </p>
      <button
        onClick={irParaPesca}
        style={{
          marginTop: "30px",
          fontSize: "18px",
          padding: "10px 24px",
          borderRadius: "12px",
          backgroundColor: "#ff8ab0",
          border: "none",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Aceitar o desafio 🎣
      </button>
    </div>
  );
}
