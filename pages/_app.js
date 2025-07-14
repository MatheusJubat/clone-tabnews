// pages/_app.js
import { useEffect } from "react";
import "../styles/globals.css"; // Certifique-se de ter o arquivo CSS

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Remover bordas brancas ao carregar qualquer página
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }

        #__next {
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }

        /* Swiper CSS global */
        .swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .swiper-slide img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        /* Bullets personalizados do Swiper */
        .custom-bullet {
          width: 15px;
          height: 15px;
          background: rgba(255, 105, 180, 0.5);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .custom-bullet-active {
          background: #ff69b4;
          transform: scale(1.3);
        }

        /* Preloader para transições */
        .page-transition-enter {
          opacity: 0;
          transform: translateY(20px);
        }

        .page-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 300ms,
            transform 300ms;
        }

        .page-transition-exit {
          opacity: 1;
          transform: translateY(0);
        }

        .page-transition-exit-active {
          opacity: 0;
          transform: translateY(-20px);
          transition:
            opacity 300ms,
            transform 300ms;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
