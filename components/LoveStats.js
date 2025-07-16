// components/LoveStats.js
import { useState, useEffect } from "react";

// Data do primeiro encontro
const PRIMEIRO_ENCONTRO = new Date("2022-09-04");
const INICIO_NAMORO = new Date("2022-09-10");

export function useLoveStats() {
  const [stats, setStats] = useState({
    diasJuntos: 0,
    diasNamorando: 0,
    horasJuntos: 0,
    beijosEstimados: 0,
    risadasCompartilhadas: 0,
    jogosJogados: 0,
    cafesCompartilhados: 0,
  });

  useEffect(() => {
    const agora = new Date();

    // Calcular dias
    const diasJuntos = Math.floor(
      (agora - PRIMEIRO_ENCONTRO) / (1000 * 60 * 60 * 24),
    );
    const diasNamorando = Math.floor(
      (agora - INICIO_NAMORO) / (1000 * 60 * 60 * 24),
    );

    // Estatísticas divertidas (estimativas baseadas nos dias)
    const horasJuntos = diasJuntos * 8; // Estimativa de 8h por dia juntos
    const beijosEstimados = diasNamorando * 15; // 15 beijinhos por dia son
    const risadasCompartilhadas = diasJuntos * 25; // 25 risadas por dia
    const jogosJogados = Math.floor(diasJuntos / 3); // 1 jogo a cada 3 dias
    const cafesCompartilhados = diasJuntos * 2; // 2 cafés por dia

    setStats({
      diasJuntos,
      diasNamorando,
      horasJuntos,
      beijosEstimados,
      risadasCompartilhadas,
      jogosJogados,
      cafesCompartilhados,
    });
  }, []);

  return stats;
}

export default function LoveStats({
  showDetailed = true,
  theme = "default",
  style = {},
}) {
  const stats = useLoveStats();

  const themes = {
    default: {
      container: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        border: "3px solid #ff69b4",
        color: "#333",
      },
      accent: "#ff69b4",
    },
    romantic: {
      container: {
        backgroundColor: "rgba(255, 182, 193, 0.9)",
        border: "3px solid #ff1493",
        color: "#8b008b",
      },
      accent: "#ff1493",
    },
    playful: {
      container: {
        backgroundColor: "rgba(255, 240, 245, 0.95)",
        border: "3px solid #ff69b4",
        color: "#d63384",
      },
      accent: "#ff69b4",
    },
  };

  const currentTheme = themes[theme] || themes.default;

  const containerStyle = {
    borderRadius: "20px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
    fontFamily: '"Comic Sans MS", cursive',
    maxWidth: "500px",
    margin: "0 auto",
    ...currentTheme.container,
    ...style,
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: currentTheme.accent,
    marginBottom: "20px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  };

  const statItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 15px",
    margin: "8px 0",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "15px",
    border: `2px solid ${currentTheme.accent}`,
    fontSize: "1rem",
    fontWeight: "bold",
  };

  const emojiStyle = {
    fontSize: "1.2rem",
    marginRight: "8px",
  };

  const numberStyle = {
    color: currentTheme.accent,
    fontSize: "1.1rem",
  };

  const basicStats = [
    {
      emoji: "💕",
      label: "Dias juntos",
      value: stats.diasJuntos,
      suffix: " dias",
    },
    {
      emoji: "💖",
      label: "Dias namorando",
      value: stats.diasNamorando,
      suffix: " dias",
    },
  ];

  const detailedStats = [
    {
      emoji: "⏰",
      label: "Horas juntos",
      value: stats.horasJuntos.toLocaleString(),
      suffix: " horas",
    },
    {
      emoji: "😘",
      label: "Beijinhos estimados",
      value: stats.beijosEstimados.toLocaleString(),
      suffix: " beijitos",
    },
    {
      emoji: "😂",
      label: "Risadas compartilhadas",
      value: stats.risadasCompartilhadas.toLocaleString(),
      suffix: " gargalhadas",
    },
    {
      emoji: "🎮",
      label: "Jogos jogados",
      value: stats.jogosJogados.toLocaleString(),
      suffix: " games",
    },
    {
      emoji: "☕",
      label: "Cafés compartilhados",
      value: stats.cafesCompartilhados.toLocaleString(),
      suffix: " cafezinhos",
    },
  ];

  const statsToShow = showDetailed
    ? [...basicStats, ...detailedStats]
    : basicStats;

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>📊 Estatísticas do Amor 📊</h3>

      {statsToShow.map((stat, index) => (
        <div key={index} style={statItemStyle}>
          <div>
            <span style={emojiStyle}>{stat.emoji}</span>
            {stat.label}:
          </div>
          <div style={numberStyle}>
            {stat.value}
            {stat.suffix}
          </div>
        </div>
      ))}

      {showDetailed && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: `rgba(255, 105, 180, 0.1)`,
            borderRadius: "15px",
            border: `2px dashed ${currentTheme.accent}`,
          }}
        >
          <div
            style={{
              fontSize: "0.9rem",
              fontStyle: "italic",
              color: currentTheme.accent,
              fontWeight: "bold",
            }}
          >
            ✨ "E o melhor ainda está por vir son!" ✨
          </div>
        </div>
      )}
    </div>
  );
}
