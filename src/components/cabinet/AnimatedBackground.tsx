export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Базовый градиент */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top left, #1E3A8A40 0%, transparent 50%), radial-gradient(ellipse at bottom right, #3B5FBF30 0%, transparent 50%), linear-gradient(135deg, #0A1628 0%, #0B1E3F 50%, #0A1628 100%)",
        }}
      />

      {/* Перспективная сетка пола */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 perspective-grid" />

      {/* Летающие 3D кубы */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`floating-cube cube-${i + 1}`}>
            <div className="cube-face cube-front" />
            <div className="cube-face cube-back" />
            <div className="cube-face cube-right" />
            <div className="cube-face cube-left" />
            <div className="cube-face cube-top" />
            <div className="cube-face cube-bottom" />
          </div>
        ))}
      </div>

      {/* Светящиеся орбы */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-gs-blue/20 blur-3xl animate-orb-1" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gs-accent/15 blur-3xl animate-orb-2" />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-orb-3" />

      {/* Шум/зерно */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <style>{`
        .perspective-grid {
          background-image:
            linear-gradient(to right, rgba(59, 95, 191, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 95, 191, 0.15) 1px, transparent 1px);
          background-size: 60px 60px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: center bottom;
          mask-image: linear-gradient(to top, black 10%, transparent 90%);
          -webkit-mask-image: linear-gradient(to top, black 10%, transparent 90%);
          animation: gridShift 20s linear infinite;
        }
        @keyframes gridShift {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }

        .floating-cube {
          position: absolute;
          width: 60px;
          height: 60px;
          transform-style: preserve-3d;
          animation: float 20s linear infinite;
        }
        .cube-face {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 1px solid rgba(59, 95, 191, 0.4);
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.1), rgba(59, 95, 191, 0.05));
          backdrop-filter: blur(2px);
        }
        .cube-front  { transform: translateZ(30px); }
        .cube-back   { transform: rotateY(180deg) translateZ(30px); }
        .cube-right  { transform: rotateY(90deg) translateZ(30px); }
        .cube-left   { transform: rotateY(-90deg) translateZ(30px); }
        .cube-top    { transform: rotateX(90deg) translateZ(30px); background: linear-gradient(135deg, rgba(59, 95, 191, 0.25), rgba(30, 58, 138, 0.1)); }
        .cube-bottom { transform: rotateX(-90deg) translateZ(30px); }

        .cube-1  { top: 10%; left: 5%;   animation-duration: 22s; animation-delay: 0s;   transform: scale(0.8); }
        .cube-2  { top: 20%; left: 80%;  animation-duration: 28s; animation-delay: -3s;  transform: scale(1.2); }
        .cube-3  { top: 60%; left: 10%;  animation-duration: 25s; animation-delay: -6s;  transform: scale(0.6); }
        .cube-4  { top: 75%; left: 70%;  animation-duration: 30s; animation-delay: -10s; transform: scale(1.4); }
        .cube-5  { top: 40%; left: 50%;  animation-duration: 35s; animation-delay: -2s;  transform: scale(0.9); }
        .cube-6  { top: 85%; left: 30%;  animation-duration: 24s; animation-delay: -8s;  transform: scale(1.1); }
        .cube-7  { top: 5%;  left: 45%;  animation-duration: 32s; animation-delay: -5s;  transform: scale(0.7); }
        .cube-8  { top: 50%; left: 90%;  animation-duration: 27s; animation-delay: -12s; transform: scale(1.0); }

        @keyframes float {
          0%   { transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          25%  { transform: translate3d(40px, -30px, 50px) rotateX(90deg) rotateY(90deg) rotateZ(45deg); }
          50%  { transform: translate3d(-30px, -60px, 100px) rotateX(180deg) rotateY(180deg) rotateZ(90deg); }
          75%  { transform: translate3d(-50px, -20px, 50px) rotateX(270deg) rotateY(270deg) rotateZ(135deg); }
          100% { transform: translate3d(0, 0, 0) rotateX(360deg) rotateY(360deg) rotateZ(180deg); }
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
      `}</style>
    </div>
  );
}
