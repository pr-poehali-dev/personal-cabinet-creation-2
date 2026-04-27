export default function LoginBackground() {
  return (
    <>
      {/* Жёлтая декоративная полоса слева — брендовый акцент */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gs-yellow z-20" />

      {/* Усиленный фоновый логотип + парящие частицы */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        {/* Светящееся пятно за логотипом */}
        <div
          className="absolute w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(96,165,250,0.18) 0%, rgba(59,130,246,0.08) 30%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Парящие частицы — звёздная пыль (свободный полёт) */}
        <div className="particles-orbit">
          {Array.from({ length: 50 }).map((_, i) => (
            <span key={i} className={`dust dust-${(i % 10) + 1}`} />
          ))}
        </div>

        {/* Орбитальные круги вокруг логотипа */}
        <div className="orbit orbit-1" />
        <div className="orbit orbit-2" />
        <div className="orbit orbit-3" />

        <img
          src="https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/bucket/e86a33ff-bcc0-41ee-ad09-efce63f6f6e6.png"
          alt=""
          className="relative w-[75vw] max-w-[850px] h-auto select-none"
          style={{
            opacity: 0.18,
            filter:
              "drop-shadow(0 0 30px rgba(147,197,253,0.7)) drop-shadow(0 0 80px rgba(59,130,246,0.5)) drop-shadow(0 0 140px rgba(30,58,138,0.4))",
            animation: "logoBgPulse 8s ease-in-out infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes logoBgPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.22; transform: scale(1.03); }
        }

        /* Орбитальные круги — с подсветкой */
        .orbit {
          position: absolute;
          border-radius: 50%;
          animation: orbitSpin 60s linear infinite, orbitGlow 4s ease-in-out infinite;
          will-change: transform, box-shadow;
        }
        .orbit-1 {
          width: 50vw; height: 50vw; max-width: 600px; max-height: 600px;
          border: 1.5px solid rgba(147, 197, 253, 0.45);
          box-shadow:
            0 0 30px rgba(96, 165, 250, 0.45),
            inset 0 0 40px rgba(96, 165, 250, 0.25);
        }
        .orbit-2 {
          width: 65vw; height: 65vw; max-width: 750px; max-height: 750px;
          animation-duration: 90s, 5s; animation-direction: reverse, normal;
          border: 1.5px solid rgba(96, 165, 250, 0.35);
          box-shadow:
            0 0 24px rgba(59, 130, 246, 0.4),
            inset 0 0 32px rgba(59, 130, 246, 0.18);
        }
        .orbit-3 {
          width: 85vw; height: 85vw; max-width: 950px; max-height: 950px;
          animation-duration: 120s, 6s;
          border: 1.5px dashed rgba(252, 221, 43, 0.25);
          box-shadow:
            0 0 20px rgba(252, 221, 43, 0.25),
            inset 0 0 24px rgba(252, 221, 43, 0.12);
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.5) saturate(1.3); }
        }

        /* === АНИМАЦИЯ ВХОДА В ЛК === */
        /* Форма уезжает влево, роли уезжают вправо */
        .login-loading .login-card {
          animation: slideOutLeft 0.7s cubic-bezier(0.6, 0, 0.4, 1) forwards;
        }
        .login-loading .roles-pane {
          animation: slideOutRight 0.7s cubic-bezier(0.6, 0, 0.4, 1) forwards;
        }
        @keyframes slideOutLeft {
          to { transform: translateX(-180%) scale(0.7); opacity: 0; }
        }
        @keyframes slideOutRight {
          to { transform: translateX(180%) scale(0.7); opacity: 0; }
        }

        /* Финальный логотип-загрузчик */
        .loader-stage {
          position: fixed;
          inset: 0;
          z-index: 30;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          animation: stageFadeIn 0.5s ease-out 0.5s forwards;
          pointer-events: none;
        }
        @keyframes stageFadeIn {
          to { opacity: 1; }
        }
        .loader-logo {
          width: 220px;
          height: 220px;
          object-fit: contain;
          filter:
            drop-shadow(0 0 30px rgba(147,197,253,0.9))
            drop-shadow(0 0 60px rgba(59,130,246,0.7))
            drop-shadow(0 0 100px rgba(252,221,43,0.4));
          animation: loaderPulse 1.6s ease-in-out infinite;
        }
        @keyframes loaderPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .loader-ring {
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #FCDD2B;
          border-right-color: #F77D00;
          animation: loaderSpin 1.2s linear infinite;
          box-shadow: 0 0 30px rgba(252,221,43,0.5);
        }
        .loader-ring.r2 {
          border-top-color: #60a5fa;
          border-left-color: #93c5fd;
          animation-duration: 2s;
          animation-direction: reverse;
          box-shadow: 0 0 24px rgba(96,165,250,0.5);
        }
        @keyframes loaderSpin {
          to { transform: rotate(360deg); }
        }
        .loader-text {
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          letter-spacing: 0.3em;
          font-size: 14px;
          text-transform: uppercase;
          animation: loaderTextBlink 1.4s ease-in-out infinite;
        }
        .loader-role {
          margin-top: 8px;
          color: #FCDD2B;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: 0.2em;
          font-size: 12px;
          text-transform: uppercase;
        }
        @keyframes loaderTextBlink {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .loader-progress {
          margin-top: 24px;
          width: 240px;
          height: 2px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        .loader-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #FCDD2B, #F77D00);
          width: 0;
          animation: loaderProgress 1.7s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
          box-shadow: 0 0 12px #F77D00;
        }
        @keyframes loaderProgress {
          to { width: 100%; }
        }

        /* Звёздная пыль вокруг логотипа */
        .particles-orbit {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dust {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #93c5fd;
          opacity: 0;
          will-change: transform, opacity;
        }
        @keyframes dustFloat {
          0%   { transform: translate(0, 0)        scale(0.8); opacity: 0.25; }
          25%  { transform: translate(20px, -30px) scale(1.1); opacity: 0.9; }
          50%  { transform: translate(-15px, -55px) scale(0.95); opacity: 0.55; }
          75%  { transform: translate(-30px, 20px) scale(1.2); opacity: 1; }
          100% { transform: translate(0, 0)        scale(0.8); opacity: 0.25; }
        }

        /* Раскидаем частицы по сцене разными размерами и траекториями */
        ${Array.from({ length: 50 })
          .map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 3 + 1.5;
            const delay = Math.random() * 6;
            const duration = 8 + Math.random() * 10;
            const hue = Math.random() > 0.5 ? "#93c5fd" : Math.random() > 0.5 ? "#60a5fa" : "#FCDD2B";
            return `
              .particles-orbit > .dust:nth-child(${i + 1}) {
                left: ${left}%;
                top: ${top}%;
                width: ${size}px;
                height: ${size}px;
                background: ${hue};
                box-shadow: 0 0 ${size * 2}px ${hue}, 0 0 ${size * 4}px ${hue}80;
                animation: dustFloat ${duration}s ease-in-out -${delay}s infinite;
              }
            `;
          })
          .join("")}
      `}</style>
      <style>{`
        .neon-slogan {
          color: #FCDD2B;
          font-weight: 300;
          letter-spacing: 0.25em;
        }
        .neon-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(12px);
          animation: wordFadeIn 0.9s ease-out forwards;
        }
        .neon-word:nth-child(1) { animation-delay: 0.2s; }
        .neon-word:nth-child(2) { animation-delay: 0.6s; color: #fff; }
        .neon-word:nth-child(3) { animation-delay: 1.0s; color: #F77D00; }
        @keyframes wordFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Прозрачные карточки + белый фон с blur */
        .role-card,
        .login-card {
          isolation: isolate;
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(8px);
        }

        /* Тонкая статичная синяя обводка для всех карточек */
        .role-card,
        .login-card {
          border: 1px solid rgba(96, 165, 250, 0.25);
        }

        /* Бегущая ТОЧКА-ЛУЧ по периметру (вместо длинного луча) — точка-огонёк */
        .role-card::before,
        .login-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2.5px;
          background: conic-gradient(
            from var(--gs-angle, 0deg),
            transparent 0%,
            transparent 92%,
            #93c5fd 96%,
            #ffffff 98%,
            #93c5fd 100%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderRotate 4s linear infinite;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          filter:
            drop-shadow(0 0 6px #60a5fa)
            drop-shadow(0 0 14px #3b82f6)
            drop-shadow(0 0 22px #1e3a8a);
        }
        .role-card:hover::before,
        .login-card:hover::before {
          opacity: 1;
        }
        .role-card:hover,
        .login-card:hover {
          box-shadow:
            0 0 24px rgba(96, 165, 250, 0.45),
            0 0 50px rgba(59, 130, 246, 0.3);
        }

        /* Кнопка "Войти" — мощное оранжевое свечение при hover */
        .login-btn {
          position: relative;
          isolation: isolate;
          background: linear-gradient(135deg, #6B7C90 0%, #1A2D4D 100%);
          transition: all 0.4s ease;
        }
        .login-btn::after {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: inherit;
          background: radial-gradient(circle, #F77D00 0%, #FCDD2B 40%, transparent 70%);
          z-index: -1;
          opacity: 0;
          filter: blur(20px);
          transition: opacity 0.5s ease;
        }
        .login-btn:hover {
          background: linear-gradient(135deg, #FCDD2B 0%, #F77D00 50%, #F77D00 100%) !important;
          color: #1A2D4D !important;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
          box-shadow:
            0 0 0 2px #FCDD2B,
            0 0 32px rgba(247, 125, 0, 1),
            0 0 64px rgba(252, 221, 43, 0.85),
            0 0 100px rgba(247, 125, 0, 0.6),
            0 0 140px rgba(252, 221, 43, 0.4);
          transform: scale(1.02);
        }
        .login-btn:hover::after {
          opacity: 1;
        }
      `}</style>
    </>
  );
}