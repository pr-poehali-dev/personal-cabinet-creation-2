import Icon from "@/components/ui/icon";

interface LoginFormProps {
  loginId: string;
  setLoginId: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({
  loginId,
  setLoginId,
  password,
  setPassword,
  error,
  onSubmit,
}: LoginFormProps) {
  return (
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

        <form onSubmit={onSubmit} className="space-y-4">
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
  );
}
