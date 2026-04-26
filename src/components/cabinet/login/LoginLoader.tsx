import { Role } from "../roles";

interface LoginLoaderProps {
  role: Role;
}

export default function LoginLoader({ role }: LoginLoaderProps) {
  return (
    <div className="loader-stage">
      <div className="loader-ring r2" />
      <div className="loader-ring" />
      <img
        src="https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/bucket/e86a33ff-bcc0-41ee-ad09-efce63f6f6e6.png"
        alt="ГЛОБАЛСТ"
        className="loader-logo"
      />
      <div className="loader-text">Загрузка кабинета</div>
      <div className="loader-role">{role.fullName}</div>
      <div className="loader-progress">
        <div className="loader-progress-bar" />
      </div>
    </div>
  );
}
