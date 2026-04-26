const LOGO_URL =
  "https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/bucket/e86a33ff-bcc0-41ee-ad09-efce63f6f6e6.png";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Глубокий тёмный градиент — ночь / hi-tech */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top left, #1E3A8A30 0%, transparent 55%), radial-gradient(ellipse at bottom right, #3B5FBF20 0%, transparent 55%), linear-gradient(135deg, #02060F 0%, #050B1C 50%, #02060F 100%)",
        }}
      />

      {/* Виньетка по краям для глубины */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Перспективная техно-сетка */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 perspective-grid" />
      <div className="absolute inset-x-0 top-0 h-2/3 perspective-grid-top" />

      {/* Сканирующий световой луч */}
      <div className="scan-beam" />

      {/* Летающие логотипы ГлобалСтрой */}
      <div className="absolute inset-0">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={`floating-logo logo-${i + 1}`}>
            <div className="logo-glow" />
            <img src={LOGO_URL} alt="" className="logo-img" />
          </div>
        ))}
      </div>

      {/* Светящиеся орбы — энергоисточники */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-3xl animate-orb-1" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-3xl animate-orb-2" />
      <div className="absolute top-1/2 right-1/3 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl animate-orb-3" />

      {/* Точки-частицы (звёздное поле) */}
      <div className="particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className={`particle p-${(i % 12) + 1}`} />
        ))}
      </div>

      {/* Шум */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <style>{`
        .perspective-grid, .perspective-grid-top {
          background-image:
            linear-gradient(to right, rgba(59, 130, 246, 0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.18) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: linear-gradient(to top, black 5%, transparent 95%);
          -webkit-mask-image: linear-gradient(to top, black 5%, transparent 95%);
        }
        .perspective-grid {
          transform: perspective(600px) rotateX(60deg);
          transform-origin: center bottom;
          animation: gridShift 25s linear infinite;
        }
        .perspective-grid-top {
          transform: perspective(600px) rotateX(-60deg);
          transform-origin: center top;
          mask-image: linear-gradient(to bottom, black 5%, transparent 95%);
          -webkit-mask-image: linear-gradient(to bottom, black 5%, transparent 95%);
          animation: gridShift 30s linear infinite reverse;
          opacity: 0.6;
        }
        @keyframes gridShift {
          0%   { background-position: 0 0; }
          100% { background-position: 70px 70px; }
        }

        /* Сканирующий луч */
        .scan-beam {
          position: absolute;
          top: -20%;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(59, 130, 246, 0.08) 50%,
            transparent 100%);
          filter: blur(8px);
          animation: scanY 9s ease-in-out infinite;
        }
        @keyframes scanY {
          0%, 100% { transform: translateY(-20%); opacity: 0; }
          50%      { transform: translateY(100vh); opacity: 1; }
        }

        /* Летающие логотипы */
        .floating-logo {
          position: absolute;
          width: 70px;
          height: 70px;
          animation: floatLogo 22s ease-in-out infinite;
          will-change: transform;
        }
        .logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter:
            drop-shadow(0 0 12px rgba(59, 130, 246, 0.85))
            drop-shadow(0 0 24px rgba(96, 165, 250, 0.5))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6));
          animation: logoSpin 18s linear infinite;
        }
        .logo-glow {
          position: absolute;
          inset: -30%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 60%);
          filter: blur(12px);
          animation: glowPulse 4s ease-in-out infinite;
        }

        .logo-1  { top: 8%;   left: 6%;   animation-duration: 22s; animation-delay: 0s;   transform: scale(0.7); }
        .logo-2  { top: 18%;  left: 78%;  animation-duration: 28s; animation-delay: -3s;  transform: scale(1.1); }
        .logo-3  { top: 58%;  left: 8%;   animation-duration: 25s; animation-delay: -6s;  transform: scale(0.55); }
        .logo-4  { top: 72%;  left: 72%;  animation-duration: 30s; animation-delay: -10s; transform: scale(1.3); }
        .logo-5  { top: 38%;  left: 48%;  animation-duration: 35s; animation-delay: -2s;  transform: scale(0.85); }
        .logo-6  { top: 82%;  left: 28%;  animation-duration: 24s; animation-delay: -8s;  transform: scale(1.0); }
        .logo-7  { top: 4%;   left: 42%;  animation-duration: 32s; animation-delay: -5s;  transform: scale(0.65); }
        .logo-8  { top: 48%;  left: 88%;  animation-duration: 27s; animation-delay: -12s; transform: scale(0.95); }
        .logo-9  { top: 28%;  left: 22%;  animation-duration: 26s; animation-delay: -7s;  transform: scale(0.75); }

        @keyframes floatLogo {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          25%      { transform: translate3d(50px, -40px, 0) rotate(8deg); }
          50%      { transform: translate3d(-30px, -70px, 0) rotate(-5deg); }
          75%      { transform: translate3d(-60px, -30px, 0) rotate(4deg); }
        }
        @keyframes logoSpin {
          0%   { filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.85)) drop-shadow(0 0 24px rgba(96, 165, 250, 0.5)); }
          50%  { filter: drop-shadow(0 0 18px rgba(96, 165, 250, 1))    drop-shadow(0 0 36px rgba(59, 130, 246, 0.7)); }
          100% { filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.85)) drop-shadow(0 0 24px rgba(96, 165, 250, 0.5)); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.3); }
        }

        @keyframes orb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(80px, 60px) scale(1.2); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          50%      { transform: translate(-60px, -80px) scale(0.9); }
        }
        @keyframes orb3 {
          0%, 100% { transform: translate(0, 0) scale(0.9); }
          50%      { transform: translate(50px, -50px) scale(1.3); }
        }
        .animate-orb-1 { animation: orb1 14s ease-in-out infinite; }
        .animate-orb-2 { animation: orb2 18s ease-in-out infinite; }
        .animate-orb-3 { animation: orb3 16s ease-in-out infinite; }

        /* Частицы */
        .particles { position: absolute; inset: 0; }
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #60a5fa;
          border-radius: 50%;
          box-shadow: 0 0 6px #60a5fa, 0 0 12px rgba(96,165,250,0.6);
          animation: twinkle 4s ease-in-out infinite;
        }
        .p-1  { top: 10%; left: 15%; animation-delay: 0s; }
        .p-2  { top: 25%; left: 35%; animation-delay: -0.5s; }
        .p-3  { top: 40%; left: 65%; animation-delay: -1s; }
        .p-4  { top: 55%; left: 12%; animation-delay: -1.5s; }
        .p-5  { top: 70%; left: 88%; animation-delay: -2s; }
        .p-6  { top: 85%; left: 45%; animation-delay: -2.5s; }
        .p-7  { top: 15%; left: 75%; animation-delay: -3s; }
        .p-8  { top: 30%; left: 92%; animation-delay: -3.5s; }
        .p-9  { top: 50%; left: 25%; animation-delay: -0.8s; }
        .p-10 { top: 65%; left: 55%; animation-delay: -1.8s; }
        .p-11 { top: 80%; left: 18%; animation-delay: -2.8s; }
        .p-12 { top: 5%;  left: 55%; animation-delay: -1.2s; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.6); }
          50%      { opacity: 1;   transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}
