// pages/index.js
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [mostrarBotao, setMostrarBotao] = useState(false);

  return (
    <div className={styles.container}>
      <h1>Bom dia! ☀️</h1>
      <p>Hoje você foi desafiada a começar o dia com uma missão...</p>

      {!mostrarBotao ? (
        <button
          onClick={() => setMostrarBotao(true)}
          className={styles.botaoDesafio}
        >
          Aceitar o desafio
        </button>
      ) : (
        <a href="/joguinho" className={styles.botaoComecar}>
          Começar 👉
        </a>
      )}
    </div>
  );
}
