export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Базовый синий градиент */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top left, #1E3A8A40 0%, transparent 50%), radial-gradient(ellipse at bottom right, #3B5FBF30 0%, transparent 50%), linear-gradient(135deg, #0A1628 0%, #0B1E3F 50%, #0A1628 100%)",
        }}
      />

      {/* Перспективная техно-сетка */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 perspective-grid" />
      <div className="absolute inset-x-0 top-0 h-2/3 perspective-grid-top" />

      {/* Сканирующий световой луч */}
      <div className="scan-beam" />

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