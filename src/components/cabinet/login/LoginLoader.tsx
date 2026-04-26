import { Role } from "../roles";

interface LoginLoaderProps {
  role: Role;
}

export default function LoginLoader({ role }: LoginLoaderProps) {
  return (
    <div className="loader-stage">
      {/* Контейнер для колец и логотипа — все элементы абсолютно центрированы */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 380, height: 380 }}
      >
        {/* Внешнее кольцо */}
        <div
          className="loader-ring r2 absolute"
          style={{ width: 380, height: 380, top: 0, left: 0 }}
        />
        {/* Внутреннее кольцо */}
        <div
          className="loader-ring absolute"
          style={{ width: 320, height: 320, top: 30, left: 30 }}
        />
        {/* Логотип — точно в центре через flex родителя */}
        <img
          src="https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/bucket/e86a33ff-bcc0-41ee-ad09-efce63f6f6e6.png"
          alt="ГЛОБАЛСТ"
          className="loader-logo relative z-10"
          style={{ margin: 0 }}
        />
      </div>
      <div className="loader-text" style={{ marginTop: 32 }}>Загрузка кабинета</div>
      <div className="loader-role">{role.fullName}</div>
      <div className="loader-progress">
        <div className="loader-progress-bar" />
      </div>
    </div>
  );
}
