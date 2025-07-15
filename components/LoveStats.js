// components/LoveStats.js - VERSÃO CORRIGIDA COM DATA REAL
import { useState, useEffect } from "react";

export default function LoveStats({
  showDetailed = false,
  style = {},
  position = "center",
  theme = "romantic",
}) {
  const [liveStats, setLiveStats] = useState({
    diasJuntos: 0,
    horasJuntos: 0,
    minutosJuntos: 0,
    anoAtual: new Date().getFullYear(),
    mesAtual: new Date().getMonth() + 1,
    diaAtual: new Date().getDate(),
  });

  // ✅ DATA REAL DO RELACIONAMENTO: 10 de setembro de 2022
  const dataInicio = new Date("2022-09-10T00:00:00");

  useEffect(() => {
    const calculateLiveStats = () => {
      const agora = new Date();
      const diferenca = agora - dataInicio;

      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

      setLiveStats({
        diasJuntos: dias,
        horasJuntos: horas,
        minutosJuntos: minutos,
        anoAtual: agora.getFullYear(),
        mesAtual: agora.getMonth() + 1,
        diaAtual: agora.getDate(),
        totalHoras: Math.floor(diferenca / (1000 * 60 * 60)),
        totalMinutos: Math.floor(diferenca / (1000 * 60)),
        totalSegundos: Math.floor(diferenca / 1000),
        semanas: Math.floor(dias / 7),
        meses: calculateMonths(dataInicio, agora),
        anos: calculateYears(dataInicio, agora),
      });
    };

    // Calcular imediatamente
    calculateLiveStats();

    // Atualizar a cada minuto
    const interval = setInterval(calculateLiveStats, 60000);

    return () => clearInterval(interval);
  }, []);

  const calculateMonths = (start, end) => {
    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    const dayDiff = end.getDate() - start.getDate();

    let months = yearDiff * 12 + monthDiff;
    if (dayDiff < 0) months--; // Se ainda não completou o mês

    return months;
  };

  const calculateYears = (start, end) => {
    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    const dayDiff = end.getDate() - start.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return yearDiff - 1;
    }
    return yearDiff;
  };

  const formatNumber = (num) => {
    return num.toLocaleString("pt-BR");
  };

  const themes = {
    romantic: {
      background:
        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
      textColor: "#2c3e50",
      cardBg: "rgba(255, 255, 255, 0.9)",
      borderColor: "#ff69b4",
      accentColor: "#ff1493",
    },
    cosmic: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "#ffffff",
      cardBg: "rgba(255, 255, 255, 0.1)",
      borderColor: "#9370db",
      accentColor: "#ffd700",
    },
    mystical: {
      background: "linear-gradient(135deg, #2C1810 0%, #3e1f47 100%)",
      textColor: "#fbeaff",
      cardBg: "rgba(213, 170, 255, 0.1)",
      borderColor: "#D5AAFF",
      accentColor: "#8B5FBF",
    },
  };

  const currentTheme = themes[theme];

  const basicStats = [
    {
      emoji: "💕",
      label: "Dias Juntos",
      value: formatNumber(liveStats.diasJuntos),
      description: "Cada dia mais apaixonados",
    },
    {
      emoji: "♾️",
      label: "Sorrisos",
      value: "∞",
      description: "Impossível de contar",
    },
    {
      emoji: "🐱",
      label: "Gatinhos Vistos",
      value: Math.floor(liveStats.diasJuntos * 1.2) || "847",
      description: "E contando...",
    },
    {
      emoji: "💖",
      label: "Felicidade",
      value: "100%",
      description: "Level máximo atingido",
    },
  ];

  const detailedStats = [
    {
      emoji: "📅",
      label: "Total de Dias",
      value: formatNumber(liveStats.diasJuntos),
      sublabel: `${liveStats.semanas} semanas`,
    },
    {
      emoji: "⏰",
      label: "Total de Horas",
      value: formatNumber(liveStats.totalHoras || 0),
      sublabel: `${liveStats.horasJuntos}h hoje`,
    },
    {
      emoji: "⚡",
      label: "Total de Minutos",
      value: formatNumber(liveStats.totalMinutos || 0),
      sublabel: `${liveStats.minutosJuntos}min agora`,
    },
    {
      emoji: "🌍",
      label: "Meses de Amor",
      value: liveStats.meses || 0,
      sublabel: `${liveStats.anos} anos`,
    },
    {
      emoji: "💝",
      label: "Momentos Especiais",
      value: Math.floor(liveStats.diasJuntos / 7) || 0,
      sublabel: "Um por semana",
    },
    {
      emoji: "🌟",
      label: "Aventuras Vividas",
      value: Math.floor(liveStats.diasJuntos / 30) || 0,
      sublabel: "Uma por mês",
    },
    {
      emoji: "🎮",
      label: "Jogos Jogados",
      value: Math.floor(liveStats.diasJuntos * 0.8) || "157",
      sublabel: "Player 1 & Player 2",
    },
    {
      emoji: "☕",
      label: "Cafés Compartilhados",
      value: Math.floor(liveStats.diasJuntos * 1.5) || 0,
      sublabel: "Cada um mais especial",
    },
  ];

  // Marcos baseados na data real
  const milestones = [
    {
      emoji: "🎉",
      label: "Primeiro Mês",
      date: "10 de Outubro de 2022",
      achieved: liveStats.diasJuntos >= 30,
    },
    {
      emoji: "💯",
      label: "100 Dias",
      date: "19 de Dezembro de 2022",
      achieved: liveStats.diasJuntos >= 100,
    },
    {
      emoji: "💖",
      label: "Primeiro Ano",
      date: "10 de Setembro de 2023",
      achieved: liveStats.diasJuntos >= 365,
    },
    {
      emoji: "🏆",
      label: "500 Dias",
      date: "22 de Janeiro de 2024",
      achieved: liveStats.diasJuntos >= 500,
    },
    {
      emoji: "🌟",
      label: "700 Dias",
      date: "21 de Agosto de 2024",
      achieved: liveStats.diasJuntos >= 700,
    },
    {
      emoji: "💍",
      label: "Pedido de Casamento",
      date: "HOJE!",
      achieved: true,
      special: true,
    },
  ];

  const containerStyle = {
    background: currentTheme.background,
    borderRadius: "20px",
    padding: "30px",
    color: currentTheme.textColor,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    border: `3px solid ${currentTheme.borderColor}`,
    backdropFilter: "blur(10px)",
    ...style,
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "25px",
    background: `linear-gradient(45deg, ${currentTheme.accentColor}, ${currentTheme.borderColor})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: showDetailed
      ? "repeat(auto-fit, minmax(200px, 1fr))"
      : "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    marginBottom: showDetailed ? "30px" : "0",
  };

  const statCardStyle = {
    backgroundColor: currentTheme.cardBg,
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
    border: `2px solid ${currentTheme.borderColor}`,
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const statEmojiStyle = {
    fontSize: "2.5rem",
    marginBottom: "10px",
    display: "block",
  };

  const statValueStyle = {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: currentTheme.accentColor,
    marginBottom: "5px",
  };

  const statLabelStyle = {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "5px",
  };

  const statDescStyle = {
    fontSize: "0.8rem",
    opacity: 0.8,
    fontStyle: "italic",
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>📊 Estatísticas do Amor 📊</h3>

      {/* Estatísticas principais */}
      <div style={statsGridStyle}>
        {(showDetailed ? detailedStats : basicStats).map((stat, index) => (
          <div
            key={index}
            style={statCardStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = `0 10px 25px ${currentTheme.borderColor}40`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
          >
            <span style={statEmojiStyle}>{stat.emoji}</span>
            <div style={statValueStyle}>{stat.value}</div>
            <div style={statLabelStyle}>{stat.label}</div>
            <div style={statDescStyle}>{stat.description || stat.sublabel}</div>
          </div>
        ))}
      </div>

      {/* Marcos e conquistas */}
      {showDetailed && (
        <div style={{ marginTop: "30px" }}>
          <h4
            style={{
              fontSize: "1.5rem",
              color: currentTheme.accentColor,
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            🏆 Marcos da Jornada 🏆
          </h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {milestones.map((milestone, index) => (
              <div
                key={index}
                style={{
                  ...statCardStyle,
                  opacity: milestone.achieved ? 1 : 0.6,
                  backgroundColor: milestone.special
                    ? `${currentTheme.accentColor}20`
                    : currentTheme.cardBg,
                  border: milestone.special
                    ? `3px solid ${currentTheme.accentColor}`
                    : `2px solid ${currentTheme.borderColor}`,
                }}
              >
                <span style={statEmojiStyle}>{milestone.emoji}</span>
                <div
                  style={{
                    ...statLabelStyle,
                    color: milestone.achieved
                      ? currentTheme.accentColor
                      : "inherit",
                  }}
                >
                  {milestone.label}
                </div>
                <div style={statDescStyle}>{milestone.date}</div>
                {milestone.achieved && (
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "0.8rem",
                      color: "#4CAF50",
                      fontWeight: "bold",
                    }}
                  >
                    ✅ Conquistado!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contador em tempo real */}
      <div
        style={{
          marginTop: "25px",
          textAlign: "center",
          backgroundColor: currentTheme.cardBg,
          borderRadius: "15px",
          padding: "20px",
          border: `2px solid ${currentTheme.borderColor}`,
        }}
      >
        <div
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "10px",
            color: currentTheme.accentColor,
          }}
        >
          ⏰ Contador em Tempo Real ⏰
        </div>

        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {formatNumber(liveStats.diasJuntos)} dias, {liveStats.horasJuntos}h,{" "}
          {liveStats.minutosJuntos}min
        </div>

        <div style={statDescStyle}>Desde 10 de Setembro de 2022 💖</div>
      </div>

      {/* Mensagem especial */}
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontStyle: "italic",
          color: currentTheme.accentColor,
          fontSize: "1.1rem",
        }}
      >
        "Cada segundo ao seu lado é um presente" 💝
      </div>
    </div>
  );
}

// Hook para usar as estatísticas em qualquer lugar
export const useLoveStats = () => {
  const [stats, setStats] = useState({});
  // ✅ DATA REAL DO RELACIONAMENTO: 10 de setembro de 2022
  const dataInicio = new Date("2022-09-10T00:00:00");

  useEffect(() => {
    const updateStats = () => {
      const agora = new Date();
      const diferenca = agora - dataInicio;

      setStats({
        diasJuntos: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
        horasJuntos: Math.floor(diferenca / (1000 * 60 * 60)),
        minutosJuntos: Math.floor(diferenca / (1000 * 60)),
        segundosJuntos: Math.floor(diferenca / 1000),
        dataInicio: "10 de Setembro de 2022",
        tempoFormatado: formatTempo(diferenca),
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTempo = (diferenca) => {
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

    return `${dias} dias, ${horas}h, ${minutos}min`;
  };

  return stats;
};
