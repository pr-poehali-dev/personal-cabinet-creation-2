import { useState } from "react";
import Icon from "@/components/ui/icon";
import { roles, getRoleByLogin, Role } from "./roles";

interface Props {
  onLogin: (role: Role) => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
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
    setTimeout(() => onLogin(r), 150);
  };

  return (
    <div className="min-h-screen bg-build-dark font-golos flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(#FF6B00 1px, transparent 1px), linear-gradient(90deg, #FF6B00 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-build-orange/10 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-5xl grid lg:grid-cols-[1fr_380px] gap-8 z-10">
        {/* Left — quick login */}
        <div className="bg-build-card border border-build-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-build-orange flex items-center justify-center animate-pulse-orange">
              <Icon name="HardHat" size={22} className="text-white" />
            </div>
            <div>
              <div className="font-oswald text-white text-xl font-bold tracking-wide leading-none">СТРОЙКАБИНЕТ</div>
              <div className="text-gray-500 text-xs mt-1">Выберите роль для быстрого входа</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => quickLogin(r)}
                className="text-left p-4 rounded-xl bg-white/3 border border-build-border hover:border-build-orange/50 transition-all duration-300 group hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: r.color + "20" }}>
                    <Icon name={r.icon} size={18} style={{ color: r.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-semibold truncate">{r.name}</div>
                    <div className="text-gray-500 text-[11px] font-mono truncate">{r.loginId}</div>
                  </div>
                  <Icon name="ArrowUpRight" size={14} className="text-gray-600 group-hover:text-build-orange transition-colors shrink-0" />
                </div>
                <div className="text-gray-400 text-xs leading-snug line-clamp-2">{r.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — manual login */}
        <form onSubmit={submit} className="bg-build-card border border-build-border rounded-2xl p-6 self-start">
          <div className="font-oswald text-white text-lg font-semibold tracking-wide mb-1">Вход в систему</div>
          <div className="text-gray-500 text-xs mb-5">Введите ID и пароль вашего аккаунта</div>

          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">ID пользователя</label>
              <div className="relative">
                <Icon name="User" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="например, gip-001"
                  className="w-full bg-build-dark border border-build-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-build-orange/50 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-build-dark border border-build-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-build-orange/50 font-mono"
                />
              </div>
            </div>
            {error && (
              <div className="text-red-400 text-xs flex items-center gap-1.5">
                <Icon name="AlertCircle" size={12} />{error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-build-orange hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <Icon name="LogIn" size={15} />Войти
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-build-border">
            <div className="text-gray-500 text-[11px] leading-relaxed">
              Демо-доступ: пароль для каждой роли указан в карточке слева. Все роли работают по своему ID.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
