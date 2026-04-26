import Icon from "@/components/ui/icon";
import { Role } from "./roles";
import StagesTimeline from "./StagesTimeline";

interface Props {
  role: Role;
}

const roleStats: Record<string, { label: string; value: string; sub: string; icon: string }[]> = {
  gip: [
    { label: "Команда", value: "47", sub: "на объекте", icon: "Users" },
    { label: "Этап", value: "5/11", sub: "Каркас 62%", icon: "Milestone" },
    { label: "Бюджет освоено", value: "176 млн", sub: "из 420 млн", icon: "Wallet" },
    { label: "Открытых задач", value: "12", sub: "3 просрочено", icon: "ClipboardList" },
  ],
  sales: [
    { label: "Сделок в работе", value: "23", sub: "на 184 млн", icon: "Handshake" },
    { label: "Конверсия", value: "18%", sub: "+4% к месяцу", icon: "TrendingUp" },
    { label: "Выручка апрель", value: "32 млн", sub: "план 28 млн", icon: "Wallet" },
    { label: "Лидов с агентств", value: "47", sub: "16 в работе", icon: "UserPlus" },
  ],
  supply: [
    { label: "Заявок открыто", value: "14", sub: "5 срочных", icon: "PackagePlus" },
    { label: "Поставщиков", value: "32", sub: "8 активных", icon: "Truck" },
    { label: "На складе, ₽", value: "8.4 млн", sub: "оборот месяц", icon: "Warehouse" },
    { label: "Доставки сегодня", value: "3", sub: "подтверждены", icon: "Calendar" },
  ],
  customer: [
    { label: "Этап стройки", value: "Каркас", sub: "5 из 11 · 42%", icon: "Building2" },
    { label: "Оплачено", value: "176 млн", sub: "из 420 млн", icon: "CreditCard" },
    { label: "Фото-отчётов", value: "84", sub: "новых: 6", icon: "Camera" },
    { label: "Сообщений", value: "12", sub: "от ГИП", icon: "MessageCircle" },
  ],
  agency: [
    { label: "Приведено клиентов", value: "47", sub: "12 купили", icon: "UserPlus" },
    { label: "Комиссия квартал", value: "1.8 млн", sub: "+22% к Q1", icon: "Percent" },
    { label: "Сделок в работе", value: "8", sub: "на 64 млн", icon: "Handshake" },
    { label: "К выплате", value: "420 тыс ₽", sub: "по 3 сделкам", icon: "Wallet" },
  ],
  contractor: [
    { label: "Мои задачи", value: "8", sub: "сегодня", icon: "CheckSquare" },
    { label: "Выполнено", value: "62%", sub: "Каркас этаж 4", icon: "ClipboardCheck" },
    { label: "Бригада", value: "14 чел", sub: "на смене", icon: "Users" },
    { label: "Актов КС-2", value: "3", sub: "к подписанию", icon: "FileSignature" },
  ],
  control: [
    { label: "Замечаний", value: "7", sub: "2 критических", icon: "AlertTriangle" },
    { label: "Скрытых работ", value: "14", sub: "за месяц", icon: "EyeOff" },
    { label: "Проверок", value: "4", sub: "на этой неделе", icon: "ShieldCheck" },
    { label: "Журнал записей", value: "186", sub: "с начала", icon: "BookOpen" },
  ],
  legal: [
    { label: "Договоров на проверке", value: "12", sub: "5 срочных", icon: "FileSignature" },
    { label: "Активных дел", value: "3", sub: "1 в суде", icon: "Scale" },
    { label: "Согласовано", value: "47", sub: "за месяц", icon: "FileCheck" },
    { label: "Претензий", value: "2", sub: "входящих", icon: "AlertTriangle" },
  ],
};

export default function RoleHome({ role }: Props) {
  const stats = roleStats[role.id] || [];

  return (
    <div className="animate-fade-in space-y-5 max-w-full">
      {/* Hero greeting — белая карточка по брендбуку */}
      <div
        className="relative rounded-2xl overflow-hidden p-5 bg-white/90 backdrop-blur-md border border-white/20 shadow-lg"
        style={{ borderLeft: `4px solid ${role.color}` }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="text-gs-gray text-[10px] uppercase tracking-[0.2em] font-semibold">{role.fullName}</div>
            <div className="font-inter text-gs-navy text-2xl font-extrabold tracking-tight mt-1">
              Здравствуйте, {role.name.split(" ")[0]}!
            </div>
            <div className="text-gs-gray text-sm mt-1">{role.description}</div>
          </div>
          <Icon name={role.icon} size={32} />
        </div>
      </div>

      {/* Stages timeline — common to all roles */}
      <StagesTimeline />

      {/* Role-specific KPI — единая сетка, прозрачные карточки */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div
            key={i}
            className="role-card relative rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <Icon name={s.icon} size={20} />
            </div>
            <div className="font-inter text-gs-navy text-xl font-extrabold leading-tight">{s.value}</div>
            <div className="text-gs-gray text-[11px] mt-1 font-semibold">{s.label}</div>
            <div className="text-gs-gray/70 text-[10px] mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Role features list — белая карточка */}
      <div className="role-card relative bg-white/85 rounded-xl p-5 shadow-md">
        <div className="border-l-4 border-gs-yellow pl-3 mb-4">
          <div className="font-inter text-gs-navy text-base font-extrabold uppercase tracking-wider">Доступные функции</div>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {role.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gs-light hover:bg-gs-light/70 transition-colors">
              <div className="w-5 h-5 rounded-full bg-gs-yellow flex items-center justify-center shrink-0">
                <Icon name="Check" size={11} flat className="text-gs-navy" />
              </div>
              <span className="text-gs-navy text-sm font-medium truncate">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
