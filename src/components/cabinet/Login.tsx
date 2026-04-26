import { useState } from "react";
import Icon from "@/components/ui/icon";
import { roles, Role, getRoleByLogin } from "./roles";
import AnimatedBackground from "./AnimatedBackground";
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

  const quickLogin = (r: Role) => {
    setLoginId(r.loginId);
    setPassword(r.password);
    setError("");
    setTimeout(() => onLogin(r), 100);
  };

  return (
    <div className="min-h-screen bg-build-dark font-golos flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />

      {/* Слоган компании */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center px-4">
        <div className="font-oswald text-white text-base md:text-xl font-semibold tracking-[0.25em] uppercase">
          Безопасное качество
        </div>
        <div className="text-gs-accent text-[11px] md:text-sm tracking-[0.4em] uppercase mt-1">
          доступное каждому
        </div>
      </div>



      <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center justify-items-center mt-24 lg:mt-16 mb-8 mx-auto">
        {/* Left - login form */}
        <div className="bg-build-card/90 border border-build-border rounded-3xl p-10 backdrop-blur-md shadow-2xl w-full max-w-md">
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
          <p className="text-gray-400 text-sm mb-6 text-center">Используйте свой персональный ID для входа</p>

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

        {/* Right - quick login (demo) */}
        <div>
          <div className="mb-6">
            <h2 className="font-oswald text-white text-2xl font-bold tracking-wide">Демо-доступы</h2>
            <p className="text-gray-400 text-sm mt-1.5">Кликни по роли — войдёшь автоматически</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => quickLogin(r)}
                className="bg-build-card/90 backdrop-blur border border-build-border rounded-2xl p-5 text-left hover:border-build-orange/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 group"
              >
                <div className="flex items-center gap-3 mb-3">
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
                <div className="text-gray-400 text-xs leading-snug line-clamp-2">{r.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <VersionBadge />
    </div>
  );
}