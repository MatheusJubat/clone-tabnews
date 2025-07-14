import { useRouter } from "next/router";

export default function FaseFinal() {
  const router = useRouter();

  const irParaPedido = () => {
    router.push("/pedido");
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h1>💫 Fase Final: A Revelação</h1>
      <p style={{ maxWidth: "500px", margin: "20px auto" }}>
        Você completou todos os desafios. A magia do amor brilhou em cada
        escolha, risada e clique...
      </p>
      <button
        onClick={irParaPedido}
        style={{
          marginTop: "30px",
          fontSize: "18px",
          padding: "10px 24px",
          borderRadius: "12px",
          backgroundColor: "#6a5acd",
          border: "none",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Revelar o que está por vir 💍
      </button>
    </div>
  );
}
