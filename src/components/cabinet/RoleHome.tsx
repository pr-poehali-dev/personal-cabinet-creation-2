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
    <div className="animate-fade-in space-y-6">
      {/* Hero greeting */}
      <div
        className="relative rounded-2xl overflow-hidden p-6"
        style={{
          background: `linear-gradient(135deg, ${role.color}25 0%, transparent 60%), #161616`,
          borderLeft: `3px solid ${role.color}`,
        }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-gray-500 text-xs uppercase tracking-widest">{role.fullName}</div>
            <div className="font-oswald text-white text-2xl font-bold tracking-wide mt-1">
              Здравствуйте, {role.name.split(" ")[0]}!
            </div>
            <div className="text-gray-400 text-sm mt-1">{role.description}</div>
          </div>
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: role.color + "20" }}
          >
            <Icon name={role.icon} size={28} style={{ color: role.color }} />
          </div>
        </div>
      </div>

      {/* Stages timeline — common to all roles */}
      <StagesTimeline />

      {/* Role-specific KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-build-card border border-build-border rounded-xl p-5 hover:border-build-orange/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <Icon name={s.icon} size={20} className="text-build-orange mb-3" />
            <div className="font-oswald text-white text-2xl font-bold">{s.value}</div>
            <div className="text-gray-400 text-xs mt-1">{s.label}</div>
            <div className="text-gray-600 text-[11px] mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Role features list */}
      <div className="bg-build-card rounded-xl border border-build-border p-5">
        <div className="font-oswald text-white font-semibold tracking-wide mb-4">Доступные функции</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {role.features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/3 hover:bg-white/5 transition-colors">
              <div className="w-6 h-6 rounded-full bg-build-orange/15 flex items-center justify-center shrink-0">
                <Icon name="Check" size={12} className="text-build-orange" />
              </div>
              <span className="text-gray-300 text-sm">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}