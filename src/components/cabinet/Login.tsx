import { useState } from "react";
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

      {/* Фоновый постер «Будущее строится сегодня» с лёгким неоном (как в брендбуке) */}
      <div className="poster-bg pointer-events-none">
        <div className="poster-line poster-line-1">БУДУЩЕЕ</div>
        <div className="poster-line poster-line-2">СТРОИТСЯ</div>
        <div className="poster-line poster-line-3">СЕГОДНЯ</div>
        <div className="poster-tag">ключевое сообщение бренда</div>
      </div>

      {/* Декоративная диагональная сетка как в брендбуке */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #FCDD2B 0px, #FCDD2B 1px, transparent 1px, transparent 14px)",
        }}
      />
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

        /* Фоновый постер «Будущее строится сегодня» */
        .poster-bg {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 0;
          opacity: 0.07;
        }
        .poster-line {
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          font-size: clamp(60px, 14vw, 200px);
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: #FCDD2B;
          text-shadow:
            0 0 20px rgba(252, 221, 43, 0.6),
            0 0 40px rgba(247, 125, 0, 0.4);
          animation: posterPulse 6s ease-in-out infinite;
        }
        .poster-line-2 { color: #fff; animation-delay: 2s; }
        .poster-line-3 { color: #F77D00; animation-delay: 4s; }
        .poster-tag {
          margin-top: 1rem;
          font-size: 14px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #FCDD2B;
          opacity: 0.6;
        }
        @keyframes posterPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* Неоновая бегущая обводка карточек ролей */
        .role-card {
          isolation: isolate;
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(8px);
        }
        .role-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 1.5px;
          background: conic-gradient(
            from var(--gs-angle, 0deg),
            transparent 0%,
            #FCDD2B 20%,
            #F77D00 35%,
            #fff 50%,
            #FCDD2B 65%,
            transparent 80%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderRotate 4s linear infinite;
          opacity: 0.7;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .role-card:hover::before {
          opacity: 1;
        }
        .role-card:hover {
          box-shadow:
            0 0 24px rgba(252, 221, 43, 0.45),
            0 0 48px rgba(247, 125, 0, 0.3);
        }

        /* Неоновая обводка карточки формы входа */
        .login-card {
          isolation: isolate;
        }
        .login-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          padding: 2px;
          background: conic-gradient(
            from var(--gs-angle, 0deg),
            transparent 0%,
            #FCDD2B 25%,
            #F77D00 50%,
            #FCDD2B 75%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderRotate 6s linear infinite;
          pointer-events: none;
        }
        .login-card::after {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: 1.5rem;
          box-shadow: 0 0 30px rgba(252, 221, 43, 0.25);
          pointer-events: none;
          z-index: -1;
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
            {/* Жёлтый акцент */}
            <div className="absolute top-0 right-0 w-24 h-1.5 bg-gs-yellow" />

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
                className="w-full py-3 text-white font-bold rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-lg tracking-[0.15em]"
                style={{ background: "linear-gradient(135deg, #6B7C90 0%, #1A2D4D 100%)" }}
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
                {/* Жёлтая полоска сверху-слева — фирменный акцент */}
                <div className="absolute top-0 left-0 w-12 h-1 bg-gs-yellow group-hover:w-full transition-all duration-500" />

                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #6B7C90 0%, #1A2D4D 100%)" }}
                  >
                    <Icon name={r.icon} size={20} flat className="text-white" />
                  </div>
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