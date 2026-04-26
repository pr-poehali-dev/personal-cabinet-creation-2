import { useState } from "react";
import Icon from "@/components/ui/icon";
import { roles, Role, getRoleByLogin } from "./roles";
import AnimatedBackground from "./AnimatedBackground";

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

      {/* Заметка версии */}
      <div className="absolute bottom-4 left-4 z-10 text-[10px] font-mono text-gray-500 bg-build-card/80 backdrop-blur border border-build-border rounded-lg px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-gray-300 font-semibold">v1.8</span>
          <span className="text-gray-600">·</span>
          <span>Роль «Юридический отдел»</span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center mt-20 lg:mt-12">
        {/* Left - login form */}
        <div className="bg-build-card border border-build-border rounded-3xl p-8 backdrop-blur">
          <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-white/95 shadow-lg">
            <img
              src="https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/bucket/7719efe9-a05d-4249-9854-bebb3bda6cae.png"
              alt="ГлобалСтрой"
              className="w-16 h-16 object-contain"
            />
            <div>
              <div className="font-golos text-[#0B1E3F] text-2xl font-bold tracking-tight leading-none">ГлобалСтрой</div>
              <div className="text-[#1E3A8A] text-[11px] tracking-[0.15em] uppercase mt-2 font-semibold">Уральская строительная компания</div>
            </div>
          </div>

          <h1 className="font-oswald text-white text-3xl font-bold mb-2">Вход в систему</h1>
          <p className="text-gray-400 text-sm mb-6">Используйте свой персональный ID для входа</p>

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
          <div className="mb-5">
            <h2 className="font-oswald text-white text-xl font-bold tracking-wide">Демо-доступы</h2>
            <p className="text-gray-500 text-xs mt-1">Кликни по роли — войдёшь автоматически</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => quickLogin(r)}
                className="bg-build-card border border-build-border rounded-xl p-4 text-left hover:border-build-orange/40 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: r.color + "20" }}
                  >
                    <Icon name={r.icon} size={18} style={{ color: r.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-sm font-semibold truncate">{r.name}</div>
                    <div className="text-gray-500 text-[11px] font-mono truncate">{r.loginId}</div>
                  </div>
                </div>
                <div className="text-gray-400 text-[11px] leading-snug line-clamp-2">{r.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}