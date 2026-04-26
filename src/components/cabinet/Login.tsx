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
      className="min-h-screen font-golos flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 60%, #000000 100%)",
      }}
    >
      <style>{`
        .neon-slogan {
          color: #fff;
          font-weight: 300;
          text-shadow:
            0 0 2px #fff,
            0 0 6px #93c5fd,
            0 0 12px #60a5fa,
            0 0 22px #3b82f6;
        }
        .neon-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(12px);
          animation: wordFadeIn 0.9s ease-out forwards, neonFlicker 4s ease-in-out infinite 1.5s;
        }
        .neon-word:nth-child(1) { animation-delay: 0.2s, 1.5s; }
        .neon-word:nth-child(2) { animation-delay: 0.6s, 1.9s; }
        .neon-word:nth-child(3) { animation-delay: 1.0s, 2.3s; }
        @keyframes wordFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes neonFlicker {
          0%, 100% {
            text-shadow:
              0 0 2px #fff,
              0 0 6px #93c5fd,
              0 0 12px #60a5fa,
              0 0 22px #3b82f6;
          }
          50% {
            text-shadow:
              0 0 4px #fff,
              0 0 12px #93c5fd,
              0 0 22px #60a5fa,
              0 0 36px #3b82f6;
          }
        }
      `}</style>

      {/* Центрированная форма входа */}
      <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center justify-items-center mx-auto">
        {/* Left - login form */}
        <div className="bg-[#111111]/90 border border-white/10 rounded-3xl p-10 backdrop-blur-md shadow-2xl w-full max-w-md">
          {/* Большой логотип с тонкой светящейся обводкой */}
          <div className="flex flex-col items-center mb-8">
            <div className="logo-outline-glow relative w-44 h-44 rounded-3xl flex items-center justify-center mb-5">
              <img
                src="https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/bucket/e86a33ff-bcc0-41ee-ad09-efce63f6f6e6.png"
                alt="ГлобалСтрой"
                className="w-32 h-32 object-contain relative z-10"
                style={{ filter: "drop-shadow(0 0 14px rgba(96,165,250,0.55))" }}
              />
            </div>
            <div className="text-center">
              <div className="font-oswald text-white text-3xl font-bold tracking-wide leading-none">ГлобалСтрой</div>
              <div className="text-gs-accent text-[11px] tracking-[0.25em] uppercase mt-2 font-semibold">Уральская строительная компания</div>
            </div>
          </div>

          <h1 className="font-oswald text-white text-2xl font-bold mb-2 text-center">Вход в систему</h1>
          <p className="text-gray-400 text-sm mb-6 text-center">
            Выберите роль справа — ID подставится. Пароль выдаётся администратором при подписании документов.
          </p>

          <style>{`
            .logo-outline-glow::before {
              content: "";
              position: absolute;
              inset: 0;
              border-radius: 1.5rem;
              padding: 1px;
              background: conic-gradient(
                from var(--gs-angle, 0deg),
                rgba(59, 130, 246, 0.1) 0%,
                #60a5fa 25%,
                #93c5fd 50%,
                #3b82f6 75%,
                rgba(59, 130, 246, 0.1) 100%
              );
              -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
              mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              animation: borderRotate 6s linear infinite;
              pointer-events: none;
            }
            .logo-outline-glow::after {
              content: "";
              position: absolute;
              inset: -2px;
              border-radius: 1.5rem;
              box-shadow:
                0 0 22px rgba(59, 130, 246, 0.35),
                inset 0 0 30px rgba(59, 130, 246, 0.12);
              pointer-events: none;
            }
          `}</style>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">ID пользователя</label>
              <div className="relative">
                <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="например, gip-001"
                  className="w-full bg-white/5 border border-build-border rounded-lg pl-10 pr-3 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-build-orange transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-white/5 border border-build-border rounded-lg pl-10 pr-3 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-build-orange transition-colors"
                />
              </div>
            </div>
            {error && (
              <div className="text-red-400 text-sm flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <Icon name="AlertCircle" size={14} />
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-build-orange hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              <Icon name="LogIn" size={18} />
              Войти в кабинет
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-build-border text-center">
            <p className="text-gray-500 text-xs">Забыли ID? Обратитесь к администратору проекта</p>
          </div>
        </div>

        {/* Right - quick login (роли) */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => selectRole(r)}
                className="role-card relative bg-[#111111]/90 backdrop-blur rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ background: r.color + "20", borderColor: r.color + "40" }}
                  >
                    <Icon name={r.icon} size={20} style={{ color: r.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-base font-semibold truncate">{r.name}</div>
                    <div className="text-gray-500 text-xs font-mono truncate">{r.loginId}</div>
                  </div>
                </div>
                <div className="relative z-10 text-gray-400 text-xs leading-snug line-clamp-2">{r.description}</div>
              </button>
            ))}
          </div>

          <style>{`
            .role-card {
              border: 1px solid rgba(255,255,255,0.08);
            }
            .role-card::before {
              content: "";
              position: absolute;
              inset: 0;
              border-radius: 1rem;
              padding: 1.5px;
              background: conic-gradient(
                from var(--gs-angle, 0deg),
                rgba(59, 130, 246, 0.05) 0%,
                #60a5fa 25%,
                #93c5fd 50%,
                #3b82f6 75%,
                rgba(59, 130, 246, 0.05) 100%
              );
              -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
              mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              animation: borderRotate 5s linear infinite;
              opacity: 0.6;
              transition: opacity 0.3s ease;
              pointer-events: none;
            }
            .role-card:hover::before {
              opacity: 1;
            }
            .role-card:hover {
              box-shadow:
                0 0 24px rgba(59, 130, 246, 0.35),
                0 0 48px rgba(30, 58, 138, 0.25);
            }
          `}</style>

          {/* Слоган под карточками ролей */}
          <div className="mt-10 text-center">
            <div className="neon-slogan font-oswald text-2xl md:text-3xl tracking-[0.25em] uppercase leading-relaxed">
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