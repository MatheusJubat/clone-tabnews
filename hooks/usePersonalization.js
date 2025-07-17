// hooks/usePersonalization.js - VERSÃO CORRIGIDA
import { useState, useEffect, createContext, useContext } from "react";

// Hook para gerenciar picos
export const usePicos = () => {
  const [picoCount, setPicoCount] = useState(0);
  const [matheusReacao, setMatheusReacao] = useState("");

  const darPico = () => {
    setPicoCount((prev) => prev + 1);

    const reacoes = [
      "Ai, Millena! 😫",
      "Para com isso! 😂",
      "Você de novo com os picos! 🙄",
      "Não gosto disso! (mentira) 😏",
      "Minha barriga vai ficar machucada! 😰",
      "Por que você faz isso comigo? 😭",
      "Já basta de picos! 😤",
    ];

    const reacao = reacoes[Math.floor(Math.random() * reacoes.length)];
    setMatheusReacao(reacao);

    setTimeout(() => setMatheusReacao(""), 3000);

    return picoCount + 1;
  };

  return { picoCount, darPico, matheusReacao };
};

// Hook para gerenciar o "son"
export const useSonificador = () => {
  const [sonCount, setSonCount] = useState(0);

  const adicionarSon = (frase) => {
    setSonCount((prev) => prev + 1);

    if (frase.includes("son")) return frase;

    const patterns = [
      (str) => str.replace(/!$/, "son!"),
      (str) => str.replace(/\.$/, "son."),
      (str) => str.replace(/\?$/, "son?"),
      (str) => str + "son",
    ];

    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    return pattern(frase);
  };

  const frasesComSon = [
    "Eu te amoson demais!",
    "Você é lindason!",
    "Quero jogar com vocêson!",
    "Não gostoson desses picos!",
    "Está prontoson?",
    "Vamos lá son!",
    "Que fofsson!",
    "Adoroson você!",
    "Perfetoson!",
    "Incríveson!",
  ];

  const getFraseAleatoria = () => {
    return frasesComSon[Math.floor(Math.random() * frasesComSon.length)];
  };

  return { sonCount, adicionarSon, getFraseAleatoria };
};

// Context para usar em qualquer componente
export const PersonalizationContext = createContext();

export const PersonalizationProvider = ({ children }) => {
  const picos = usePicos();
  const sonificador = useSonificador();

  const contextValue = {
    picos,
    sonificador,
  };

  return (
    <PersonalizationContext.Provider value={contextValue}>
      {children}
    </PersonalizationContext.Provider>
  );
};

export const usePersonalization = () => useContext(PersonalizationContext);
