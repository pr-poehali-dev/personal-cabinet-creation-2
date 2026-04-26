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

      {/* Огромный лёгкий логотип в фоне */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/bucket/e86a33ff-bcc0-41ee-ad09-efce63f6f6e6.png"
          alt=""
          className="w-[60vw] max-w-[700px] h-auto opacity-[0.06] select-none"
          style={{ filter: "drop-shadow(0 0 60px rgba(96,165,250,0.4))" }}
        />
      </div>
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

        /* Синий бегущий луч на карточках ролей при hover */
        .role-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2.5px;
          background: conic-gradient(
            from var(--gs-angle, 0deg),
            transparent 0%,
            transparent 65%,
            #3b82f6 75%,
            #93c5fd 82%,
            #ffffff 88%,
            #60a5fa 94%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderRotate 2.5s linear infinite;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          filter: drop-shadow(0 0 8px #60a5fa) drop-shadow(0 0 16px #3b82f6);
        }
        .role-card:hover::before {
          opacity: 1;
        }
        .role-card:hover {
          box-shadow:
            0 0 30px rgba(59, 130, 246, 0.55),
            0 0 60px rgba(96, 165, 250, 0.35),
            0 0 90px rgba(30, 58, 138, 0.25);
        }

        /* Оранжевое свечение кнопки "Войти" */
        .login-btn {
          position: relative;
          isolation: isolate;
          background: linear-gradient(135deg, #6B7C90 0%, #1A2D4D 100%);
          transition: all 0.3s ease;
        }
        .login-btn::after {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: inherit;
          background: linear-gradient(135deg, #FCDD2B, #F77D00);
          z-index: -1;
          opacity: 0;
          filter: blur(12px);
          transition: opacity 0.4s ease;
        }
        .login-btn:hover {
          background: linear-gradient(135deg, #F77D00 0%, #FCDD2B 100%);
          color: #1A2D4D !important;
          box-shadow:
            0 0 24px rgba(247, 125, 0, 0.7),
            0 0 48px rgba(252, 221, 43, 0.5),
            0 0 80px rgba(247, 125, 0, 0.3);
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