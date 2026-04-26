import { useState } from "react";
import { Role, getRoleByLogin } from "./roles";
import VersionBadge from "./VersionBadge";
import LoginBackground from "./login/LoginBackground";
import LoginForm from "./login/LoginForm";
import RolesPanel from "./login/RolesPanel";
import LoginLoader from "./login/LoginLoader";

interface LoginProps {
  onLogin: (role: Role) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<Role | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = getRoleByLogin(loginId.trim(), password.trim());
    if (role) {
      setError("");
      setLoading(role);
      // Запуск перехода: формы разъезжаются, логотип в центре, потом вход
      setTimeout(() => onLogin(role), 2200);
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
      className={`min-h-screen font-inter flex items-center justify-center p-4 relative overflow-hidden ${loading ? "login-loading" : ""}`}
      style={{
        background:
          "radial-gradient(ellipse at top left, #3A4C67 0%, transparent 55%), radial-gradient(ellipse at bottom right, #6B7C90 0%, transparent 55%), linear-gradient(135deg, #1A2D4D 0%, #0F1E33 100%)",
      }}
    >
      <LoginBackground />

      {/* Центрированная форма входа */}
      <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center justify-items-center mx-auto">
        <LoginForm
          loginId={loginId}
          setLoginId={setLoginId}
          password={password}
          setPassword={setPassword}
          error={error}
          onSubmit={handleSubmit}
        />
        <RolesPanel onSelectRole={selectRole} />
      </div>

      {/* Стадия загрузки кабинета */}
      {loading && <LoginLoader role={loading} />}

      <VersionBadge />
    </div>
  );
}
