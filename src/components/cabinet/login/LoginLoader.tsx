import { Role } from "../roles";

interface LoginLoaderProps {
  role: Role;
}

export default function LoginLoader({ role }: LoginLoaderProps) {
  return (
    <div className="loader-stage">
      {/* Кольца + логотип в одном выровненном блоке */}
      <div className="relative w-[380px] h-[380px] flex items-center justify-center">
        <div className="loader-ring r2 absolute inset-0 m-auto" />
        <div
          className="loader-ring absolute m-auto"
          style={{ inset: 0, width: 320, height: 320, top: 30, left: 30 }}
        />
        <img
          src="https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/bucket/e86a33ff-bcc0-41ee-ad09-efce63f6f6e6.png"
          alt="ГЛОБАЛСТ"
          className="loader-logo relative z-10"
        />
      </div>
      <div className="loader-text mt-8">Загрузка кабинета</div>
      <div className="loader-role">{role.fullName}</div>
      <div className="loader-progress">
        <div className="loader-progress-bar" />
      </div>
    </div>
  );
}
