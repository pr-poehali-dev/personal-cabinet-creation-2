import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { roles, Role, getRoleByLogin } from "./roles";
import VersionBadge from "./VersionBadge";

interface LoginProps {
  onLogin: (role: Role) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const particlesRef = useRef<HTMLDivElement>(null);

  // Эффект притяжения частиц к курсору
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const dusts = Array.from(container.querySelectorAll<HTMLElement>(".dust"));
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const update = () => {
      const ATTRACT_RADIUS = 220;
      const STRENGTH = 0.35;

      dusts.forEach((dust) => {
        const rect = dust.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ATTRACT_RADIUS && dist > 0) {
          const force = (1 - dist / ATTRACT_RADIUS) * STRENGTH;
          const moveX = dx * force;
          const moveY = dy * force;
          const scale = 1 + (1 - dist / ATTRACT_RADIUS) * 0.8;
          dust.style.setProperty("--cursor-x", `${moveX}px`);
          dust.style.setProperty("--cursor-y", `${moveY}px`);
          dust.style.setProperty("--cursor-scale", `${scale}`);
          dust.style.setProperty("--cursor-glow", `${(1 - dist / ATTRACT_RADIUS) * 16}px`);
        } else {
          dust.style.setProperty("--cursor-x", "0px");
          dust.style.setProperty("--cursor-y", "0px");
          dust.style.setProperty("--cursor-scale", "1");
          dust.style.setProperty("--cursor-glow", "0px");
        }
      });

      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = getRoleByLogin(loginId.trim(), password.trim());
    if (role) {
      setError("");
      onLogin(role);
    } else {
      setError("Неверный ID или пароль");
    }
  };

  const selectRole = (r: Role) => {
    setLoginId(r.loginId);
    setPassword("");
    setError("");
    // Фокус на поле пароля
    setTimeout(() => {
      const passField = document.querySelector<HTMLInputElement>('input[type="password"]');
      passField?.focus();
    }, 50);
  };

  return (
    <div
      className="min-h-screen font-inter flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top left, #3A4C67 0%, transparent 55%), radial-gradient(ellipse at bottom right, #6B7C90 0%, transparent 55%), linear-gradient(135deg, #1A2D4D 0%, #0F1E33 100%)",
      }}
    >
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

        {/* Парящие частицы — звёздная пыль (с притяжением к курсору) */}
        <div className="particles-orbit" ref={particlesRef}>
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

        /* Орбитальные круги */
        .orbit {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(147, 197, 253, 0.15);
          animation: orbitSpin 60s linear infinite;
        }
        .orbit-1 { width: 50vw; height: 50vw; max-width: 600px; max-height: 600px; }
        .orbit-2 {
          width: 65vw; height: 65vw; max-width: 750px; max-height: 750px;
          animation-duration: 90s; animation-direction: reverse;
          border-color: rgba(96, 165, 250, 0.12);
        }
        .orbit-3 {
          width: 85vw; height: 85vw; max-width: 950px; max-height: 950px;
          animation-duration: 120s;
          border-color: rgba(59, 130, 246, 0.08);
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
          --cursor-x: 0px;
          --cursor-y: 0px;
          --cursor-scale: 1;
          --cursor-glow: 0px;
          transform: translate(var(--cursor-x), var(--cursor-y)) scale(var(--cursor-scale));
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
          animation: dustTwinkle 3s ease-in-out infinite;
          will-change: transform, filter;
          filter: drop-shadow(0 0 var(--cursor-glow) #93c5fd);
        }
        @keyframes dustTwinkle {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 1; }
        }

        /* Раскидаем частицы по сцене разными размерами */
        ${Array.from({ length: 50 })
          .map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 3 + 1.5;
            const twinkleDelay = Math.random() * 3;
            const twinkleDur = 2 + Math.random() * 3;
            const hue = Math.random() > 0.5 ? "#93c5fd" : Math.random() > 0.5 ? "#60a5fa" : "#FCDD2B";
            return `
              .particles-orbit > .dust:nth-child(${i + 1}) {
                left: ${left}%;
                top: ${top}%;
                width: ${size}px;
                height: ${size}px;
                background: ${hue};
                box-shadow: 0 0 ${size * 2}px ${hue}, 0 0 ${size * 4}px ${hue}80;
                animation-delay: -${twinkleDelay}s;
                animation-duration: ${twinkleDur}s;
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

      {/* Центрированная форма входа */}
      <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center justify-items-center mx-auto">
        {/* Left - login form */}
        <div className="login-card relative bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          {/* Шапка с фирменным градиентом */}
          <div
            className="px-8 pt-8 pb-7 relative"
            style={{ background: "linear-gradient(135deg, rgba(107,124,144,0.92) 0%, rgba(26,45,77,0.95) 100%)" }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-2xl p-3 mb-4 shadow-lg">
                <img
                  src="https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/bucket/e86a33ff-bcc0-41ee-ad09-efce63f6f6e6.png"
                  alt="ГЛОБАЛСТ"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="text-center">
                <div className="font-inter text-white text-3xl font-extrabold tracking-[0.05em] leading-none">ГЛОБАЛСТ</div>
                <div className="text-gs-yellow text-[10px] tracking-[0.25em] uppercase mt-2 font-semibold">Уральская строительная компания</div>
              </div>
            </div>
          </div>

          {/* Контент формы */}
          <div className="p-8">
            <div className="border-l-4 border-gs-yellow pl-3 mb-5">
              <h1 className="font-inter text-gs-navy text-xl font-extrabold leading-tight">Вход в систему</h1>
              <p className="text-gs-gray text-xs mt-1.5">
                Выберите роль справа — ID подставится автоматически. Пароль выдаётся администратором при подписании документов.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gs-gray text-[11px] uppercase tracking-[0.15em] mb-1.5 block font-semibold">ID пользователя</label>
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gs-gray" />
                  <input
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="например, gip-001"
                    className="w-full bg-gs-light border border-gs-gray/30 rounded-lg pl-10 pr-3 py-2.5 text-gs-navy placeholder-gs-gray/60 focus:outline-none focus:border-gs-navy focus:bg-white transition-all font-mono text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-gs-gray text-[11px] uppercase tracking-[0.15em] mb-1.5 block font-semibold">Пароль</label>
                <div className="relative">
                  <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gs-gray" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••"
                    className="w-full bg-gs-light border border-gs-gray/30 rounded-lg pl-10 pr-3 py-2.5 text-gs-navy placeholder-gs-gray/60 focus:outline-none focus:border-gs-navy focus:bg-white transition-all font-mono text-sm"
                  />
                </div>
              </div>
              {error && (
                <div className="text-red-700 text-sm flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <Icon name="AlertCircle" size={14} />
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="login-btn w-full py-3 text-white font-bold rounded-lg hover:scale-[1.01] active:scale-[0.99] tracking-[0.15em]"
              >
                ВОЙТИ В КАБИНЕТ
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-gs-light text-center">
              <p className="text-gs-gray text-xs">Забыли ID или пароль? Обратитесь к администратору проекта</p>
            </div>
          </div>
        </div>

        {/* Right - quick login (роли) */}
        <div className="w-full">
          <div className="mb-5 border-l-4 border-gs-yellow pl-3">
            <div className="text-white text-xs uppercase tracking-[0.2em] font-bold">Выберите роль</div>
            <div className="text-gs-yellow text-[11px] mt-1">ID подставится автоматически</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => selectRole(r)}
                className="role-card group relative rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-md hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon name={r.icon} size={22} />
                  <div className="min-w-0 flex-1">
                    <div className="text-gs-navy text-sm font-bold truncate leading-tight">{r.name}</div>
                    <div className="text-gs-gray text-[10px] font-mono truncate mt-0.5">{r.loginId}</div>
                  </div>
                </div>
                <div className="text-gs-gray text-[11px] leading-snug line-clamp-2">{r.description}</div>
              </button>
            ))}
          </div>

          {/* Слоган под карточками ролей — в фирменных цветах */}
          <div className="mt-10 text-center relative">
            {/* Декоративная градиентная линия */}
            <div
              className="h-1 w-32 mx-auto mb-5 rounded-full"
              style={{ background: "linear-gradient(90deg, #FCDD2B 0%, #F77D00 100%)" }}
            />
            <div className="neon-slogan font-inter text-xl md:text-2xl tracking-[0.25em] uppercase leading-relaxed">
              <span className="neon-word">Качество</span>{" "}
              <span className="neon-word">доступное</span>{" "}
              <span className="neon-word">каждому</span>
            </div>
          </div>
        </div>
      </div>
      <VersionBadge />
    </div>
  );
}