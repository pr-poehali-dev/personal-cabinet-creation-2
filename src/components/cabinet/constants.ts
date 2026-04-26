export type Section =
  | "dashboard"
  | "projects"
  | "tasks"
  | "team"
  | "finances"
  | "documents"
  | "calendar"
  | "analytics"
  | "access";

export const navItems: { id: Section; label: string; icon: string; badge?: number }[] = [
  { id: "dashboard", label: "Главная", icon: "LayoutDashboard" },
  { id: "projects", label: "Проекты", icon: "HardHat", badge: 5 },
  { id: "tasks", label: "Задачи", icon: "ClipboardList", badge: 12 },
  { id: "team", label: "Команда", icon: "Users" },
  { id: "finances", label: "Финансы", icon: "Wallet" },
  { id: "documents", label: "Документы", icon: "FolderOpen" },
  { id: "calendar", label: "Календарь", icon: "Calendar" },
  { id: "analytics", label: "Аналитика", icon: "BarChart3" },
  { id: "access", label: "Доступы", icon: "KeyRound" },
];

export const projects = [
  { name: "ЖК «Горизонт»", status: "В работе", progress: 68, budget: "42.5 млн", deadline: "Авг 2026", color: "#FF6B00" },
  { name: "Торговый центр Север", status: "Планирование", progress: 23, budget: "128 млн", deadline: "Фев 2027", color: "#FFB800" },
  { name: "Склад логистики A", status: "Завершён", progress: 100, budget: "18.2 млн", deadline: "Апр 2026", color: "#22C55E" },
  { name: "Офис «Технопарк»", status: "Приостановлен", progress: 44, budget: "67 млн", deadline: "Янв 2027", color: "#6B7280" },
];

export const tasks = [
  { title: "Согласовать смету ЖК «Горизонт»", priority: "high", assignee: "А. Петров", due: "28 апр", done: false },
  { title: "Завезти арматуру на объект №3", priority: "high", assignee: "В. Сидоров", due: "29 апр", done: false },
  { title: "Акт скрытых работ — фундамент", priority: "medium", assignee: "Д. Козлов", due: "30 апр", done: false },
  { title: "Проверить исполнительную документацию", priority: "medium", assignee: "А. Петров", due: "02 май", done: true },
  { title: "Обновить график производства работ", priority: "low", assignee: "И. Миронов", due: "05 май", done: false },
  { title: "Закупка кровельных материалов", priority: "high", assignee: "В. Сидоров", due: "27 апр", done: true },
];

export const teamMembers = [
  { name: "Алексей Петров", role: "Прораб", project: "ЖК «Горизонт»", status: "На объекте", avatar: "АП" },
  { name: "Виктор Сидоров", role: "Снабженец", project: "ТЦ Север", status: "В офисе", avatar: "ВС" },
  { name: "Дмитрий Козлов", role: "Инженер ПТО", project: "Офис «Технопарк»", status: "На объекте", avatar: "ДК" },
  { name: "Игорь Миронов", role: "Мастер", project: "ЖК «Горизонт»", status: "Выходной", avatar: "ИМ" },
  { name: "Сергей Лебедев", role: "Сметчик", project: "Все объекты", status: "В офисе", avatar: "СЛ" },
];

export const finances = [
  { label: "Доходы (апрель)", value: "18 400 000 ₽", change: "+12%", up: true, icon: "TrendingUp" },
  { label: "Расходы (апрель)", value: "14 200 000 ₽", change: "+5%", up: false, icon: "TrendingDown" },
  { label: "Прибыль", value: "4 200 000 ₽", change: "+31%", up: true, icon: "CircleDollarSign" },
  { label: "Дебиторка", value: "8 750 000 ₽", change: "-3%", up: false, icon: "Clock" },
];

export const financeRows = [
  { desc: "Оплата от ЖК «Горизонт»", date: "24 апр", sum: "+5 000 000 ₽", type: "income" },
  { desc: "Закупка арматуры", date: "23 апр", sum: "-1 840 000 ₽", type: "expense" },
  { desc: "ЗП бригада апрель", date: "22 апр", sum: "-3 200 000 ₽", type: "expense" },
  { desc: "Аванс ТЦ Север", date: "20 апр", sum: "+12 000 000 ₽", type: "income" },
  { desc: "Аренда техники", date: "18 апр", sum: "-620 000 ₽", type: "expense" },
];

export const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
export const events: Record<number, string[]> = {
  26: ["Планёрка"],
  28: ["Смета ЖК"],
  30: ["Акт работ"],
  3: ["Совещание"],
  7: ["Выезд"],
  12: ["Отчёт"],
};

export const documents = [
  { name: "Договор ЖК «Горизонт»", type: "PDF", size: "2.4 МБ", date: "12 апр 2026", icon: "FileText" },
  { name: "Смета ТЦ Север v3", type: "XLSX", size: "1.1 МБ", date: "10 апр 2026", icon: "FileSpreadsheet" },
  { name: "Исполнительная схема А-01", type: "DWG", size: "8.7 МБ", date: "08 апр 2026", icon: "FileCode" },
  { name: "Акт скрытых работ №14", type: "PDF", size: "0.8 МБ", date: "05 апр 2026", icon: "FileCheck" },
  { name: "Журнал производства работ", type: "PDF", size: "3.2 МБ", date: "01 апр 2026", icon: "BookOpen" },
  { name: "Разрешение на строительство", type: "PDF", size: "1.5 МБ", date: "15 янв 2026", icon: "ShieldCheck" },
];

export const analyticsMetrics = [
  { label: "Объектов в работе", value: "4", sub: "из 6 активных", icon: "Building2" },
  { label: "Выполнение плана", value: "84%", sub: "+6% к прошлому мес.", icon: "Target" },
  { label: "Рентабельность", value: "22.8%", sub: "апрель 2026", icon: "Percent" },
  { label: "Сотрудников", value: "47", sub: "5 на больничном", icon: "UserCheck" },
];