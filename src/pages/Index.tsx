import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section =
  | "dashboard"
  | "projects"
  | "tasks"
  | "team"
  | "finances"
  | "documents"
  | "calendar"
  | "analytics";

const navItems: { id: Section; label: string; icon: string; badge?: number }[] = [
  { id: "dashboard", label: "Главная", icon: "LayoutDashboard" },
  { id: "projects", label: "Проекты", icon: "HardHat", badge: 5 },
  { id: "tasks", label: "Задачи", icon: "ClipboardList", badge: 12 },
  { id: "team", label: "Команда", icon: "Users" },
  { id: "finances", label: "Финансы", icon: "Wallet" },
  { id: "documents", label: "Документы", icon: "FolderOpen" },
  { id: "calendar", label: "Календарь", icon: "Calendar" },
  { id: "analytics", label: "Аналитика", icon: "BarChart3" },
];

const projects = [
  { name: "ЖК «Горизонт»", status: "В работе", progress: 68, budget: "42.5 млн", deadline: "Авг 2026", color: "#FF6B00" },
  { name: "Торговый центр Север", status: "Планирование", progress: 23, budget: "128 млн", deadline: "Фев 2027", color: "#FFB800" },
  { name: "Склад логистики A", status: "Завершён", progress: 100, budget: "18.2 млн", deadline: "Апр 2026", color: "#22C55E" },
  { name: "Офис «Технопарк»", status: "Приостановлен", progress: 44, budget: "67 млн", deadline: "Янв 2027", color: "#6B7280" },
];

const tasks = [
  { title: "Согласовать смету ЖК «Горизонт»", priority: "high", assignee: "А. Петров", due: "28 апр", done: false },
  { title: "Завезти арматуру на объект №3", priority: "high", assignee: "В. Сидоров", due: "29 апр", done: false },
  { title: "Акт скрытых работ — фундамент", priority: "medium", assignee: "Д. Козлов", due: "30 апр", done: false },
  { title: "Проверить исполнительную документацию", priority: "medium", assignee: "А. Петров", due: "02 май", done: true },
  { title: "Обновить график производства работ", priority: "low", assignee: "И. Миронов", due: "05 май", done: false },
  { title: "Закупка кровельных материалов", priority: "high", assignee: "В. Сидоров", due: "27 апр", done: true },
];

const teamMembers = [
  { name: "Алексей Петров", role: "Прораб", project: "ЖК «Горизонт»", status: "На объекте", avatar: "АП" },
  { name: "Виктор Сидоров", role: "Снабженец", project: "ТЦ Север", status: "В офисе", avatar: "ВС" },
  { name: "Дмитрий Козлов", role: "Инженер ПТО", project: "Офис «Технопарк»", status: "На объекте", avatar: "ДК" },
  { name: "Игорь Миронов", role: "Мастер", project: "ЖК «Горизонт»", status: "Выходной", avatar: "ИМ" },
  { name: "Сергей Лебедев", role: "Сметчик", project: "Все объекты", status: "В офисе", avatar: "СЛ" },
];

const finances = [
  { label: "Доходы (апрель)", value: "18 400 000 ₽", change: "+12%", up: true, icon: "TrendingUp" },
  { label: "Расходы (апрель)", value: "14 200 000 ₽", change: "+5%", up: false, icon: "TrendingDown" },
  { label: "Прибыль", value: "4 200 000 ₽", change: "+31%", up: true, icon: "CircleDollarSign" },
  { label: "Дебиторка", value: "8 750 000 ₽", change: "-3%", up: false, icon: "Clock" },
];

const financeRows = [
  { desc: "Оплата от ЖК «Горизонт»", date: "24 апр", sum: "+5 000 000 ₽", type: "income" },
  { desc: "Закупка арматуры", date: "23 апр", sum: "-1 840 000 ₽", type: "expense" },
  { desc: "ЗП бригада апрель", date: "22 апр", sum: "-3 200 000 ₽", type: "expense" },
  { desc: "Аванс ТЦ Север", date: "20 апр", sum: "+12 000 000 ₽", type: "income" },
  { desc: "Аренда техники", date: "18 апр", sum: "-620 000 ₽", type: "expense" },
];

const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
const events: Record<number, string[]> = {
  26: ["Планёрка"],
  28: ["Смета ЖК"],
  30: ["Акт работ"],
  3: ["Совещание"],
  7: ["Выезд"],
  12: ["Отчёт"],
};

const documents = [
  { name: "Договор ЖК «Горизонт»", type: "PDF", size: "2.4 МБ", date: "12 апр 2026", icon: "FileText" },
  { name: "Смета ТЦ Север v3", type: "XLSX", size: "1.1 МБ", date: "10 апр 2026", icon: "FileSpreadsheet" },
  { name: "Исполнительная схема А-01", type: "DWG", size: "8.7 МБ", date: "08 апр 2026", icon: "FileCode" },
  { name: "Акт скрытых работ №14", type: "PDF", size: "0.8 МБ", date: "05 апр 2026", icon: "FileCheck" },
  { name: "Журнал производства работ", type: "PDF", size: "3.2 МБ", date: "01 апр 2026", icon: "BookOpen" },
  { name: "Разрешение на строительство", type: "PDF", size: "1.5 МБ", date: "15 янв 2026", icon: "ShieldCheck" },
];

const analyticsMetrics = [
  { label: "Объектов в работе", value: "4", sub: "из 6 активных", icon: "Building2" },
  { label: "Выполнение плана", value: "84%", sub: "+6% к прошлому мес.", icon: "Target" },
  { label: "Рентабельность", value: "22.8%", sub: "апрель 2026", icon: "Percent" },
  { label: "Сотрудников", value: "47", sub: "5 на больничном", icon: "UserCheck" },
];

export default function Index() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-build-dark font-golos overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 h-full w-64 bg-[#111111] border-r border-build-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-build-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-build-orange flex items-center justify-center animate-pulse-orange">
              <Icon name="HardHat" size={18} className="text-white" />
            </div>
            <div>
              <div className="font-oswald text-white text-lg font-semibold tracking-wide leading-none">СТРОЙ</div>
              <div className="font-oswald text-build-orange text-xs tracking-[0.2em] uppercase">Кабинет</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-200 relative group ${
                active === item.id
                  ? "text-white bg-build-orange/10 border-r-2 border-build-orange"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="bg-build-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-5 py-4 border-t border-build-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-build-orange/20 border border-build-orange/40 flex items-center justify-center">
              <span className="text-build-orange text-xs font-bold">ГД</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">Генеральный директор</div>
              <div className="text-gray-500 text-[11px] truncate">Полный доступ</div>
            </div>
            <Icon name="Settings" size={14} className="text-gray-500 hover:text-white cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-[#111111] border-b border-build-border px-6 py-4 flex items-center gap-4 shrink-0">
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Icon name="Menu" size={22} />
          </button>
          <div className="flex-1">
            <h1 className="font-oswald text-white text-xl font-semibold tracking-wide">
              {navItems.find((n) => n.id === active)?.label}
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">26 апреля 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Icon name="Bell" size={18} className="text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-build-orange rounded-full" />
            </button>
            <button className="px-4 py-2 bg-build-orange hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95">
              <Icon name="Plus" size={16} />
              Добавить
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">

          {/* DASHBOARD */}
          {active === "dashboard" && (
            <div className="animate-fade-in space-y-6">
              {/* Hero banner */}
              <div
                className="relative rounded-2xl overflow-hidden h-44 flex items-end p-6"
                style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/files/67c7cb23-7b37-4d20-983b-d9e449d19cb2.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10">
                  <div className="font-oswald text-white text-2xl font-bold tracking-wide">Добрый день!</div>
                  <div className="text-gray-300 text-sm mt-1">4 активных проекта · 12 задач требуют внимания</div>
                </div>
                <div className="relative z-10 ml-auto text-right">
                  <div className="text-build-orange font-oswald text-3xl font-bold">68%</div>
                  <div className="text-gray-400 text-xs">выполнение плана</div>
                </div>
              </div>

              {/* KPI */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Проектов", value: "4", sub: "активных", icon: "Building2", accent: true },
                  { label: "Задач сегодня", value: "12", sub: "3 просрочено", icon: "ClipboardList", accent: false },
                  { label: "Сотрудников", value: "47", sub: "на объектах", icon: "Users", accent: false },
                  { label: "Выручка / мес", value: "18.4 млн", sub: "апрель 2026", icon: "TrendingUp", accent: false },
                ].map((kpi, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-5 border transition-all duration-300 hover:scale-[1.02] cursor-default ${
                      kpi.accent
                        ? "bg-build-orange border-build-orange/50"
                        : "bg-build-card border-build-border hover:border-build-orange/30"
                    }`}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon name={kpi.icon} size={20} className={kpi.accent ? "text-white" : "text-build-orange"} />
                    </div>
                    <div className={`font-oswald text-2xl font-bold ${kpi.accent ? "text-white" : "text-white"}`}>
                      {kpi.value}
                    </div>
                    <div className={`text-xs mt-1 ${kpi.accent ? "text-orange-100" : "text-gray-500"}`}>{kpi.label}</div>
                    <div className={`text-[11px] mt-0.5 ${kpi.accent ? "text-orange-200" : "text-gray-600"}`}>{kpi.sub}</div>
                  </div>
                ))}
              </div>

              {/* Projects + Tasks preview */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-build-card rounded-xl border border-build-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-oswald text-white font-semibold text-base tracking-wide">Проекты</div>
                    <button onClick={() => setActive("projects")} className="text-build-orange text-xs hover:underline">Все →</button>
                  </div>
                  <div className="space-y-3">
                    {projects.slice(0, 3).map((p, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium truncate">{p.name}</div>
                          <div className="mt-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.progress}%`, background: p.color }} />
                          </div>
                        </div>
                        <div className="text-gray-400 text-xs shrink-0">{p.progress}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-build-card rounded-xl border border-build-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-oswald text-white font-semibold text-base tracking-wide">Задачи</div>
                    <button onClick={() => setActive("tasks")} className="text-build-orange text-xs hover:underline">Все →</button>
                  </div>
                  <div className="space-y-2">
                    {tasks.filter(t => !t.done).slice(0, 4).map((t, i) => (
                      <div key={i} className="flex items-start gap-3 py-1.5">
                        <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                          t.priority === "high" ? "bg-red-500" : t.priority === "medium" ? "bg-build-yellow" : "bg-green-500"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm leading-tight truncate">{t.title}</div>
                          <div className="text-gray-500 text-xs mt-0.5">{t.assignee} · {t.due}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {active === "projects" && (
            <div className="animate-fade-in space-y-5">
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {projects.map((p, i) => (
                  <div key={i} className="bg-build-card rounded-xl border border-build-border p-5 hover:border-build-orange/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: p.color + "20" }}>
                        <Icon name="Building2" size={20} style={{ color: p.color }} />
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: p.color + "20", color: p.color }}>
                        {p.status}
                      </span>
                    </div>
                    <div className="font-oswald text-white font-semibold text-base leading-snug mb-3">{p.name}</div>
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Прогресс</span>
                        <span className="text-white font-medium">{p.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${p.progress}%`, background: p.color }} />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <div>
                        <div className="text-gray-500">Бюджет</div>
                        <div className="text-white font-medium">{p.budget}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-500">Срок</div>
                        <div className="text-white font-medium">{p.deadline}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-build-card rounded-xl border border-build-border overflow-hidden">
                <div className="px-5 py-4 border-b border-build-border">
                  <div className="font-oswald text-white font-semibold tracking-wide">Сводка по объектам</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-build-border">
                        {["Объект", "Статус", "Прогресс", "Бюджет", "Срок", ""].map((h, i) => (
                          <th key={i} className="text-left text-gray-500 text-xs px-5 py-3 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((p, i) => (
                        <tr key={i} className="border-b border-build-border/50 hover:bg-white/3 transition-colors">
                          <td className="px-5 py-3.5 text-white text-sm font-medium">{p.name}</td>
                          <td className="px-5 py-3.5">
                            <span className="text-xs px-2 py-1 rounded-md font-medium" style={{ background: p.color + "20", color: p.color }}>{p.status}</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: p.color }} />
                              </div>
                              <span className="text-gray-400 text-xs">{p.progress}%</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-gray-300 text-sm">{p.budget}</td>
                          <td className="px-5 py-3.5 text-gray-300 text-sm">{p.deadline}</td>
                          <td className="px-5 py-3.5">
                            <button className="text-gray-500 hover:text-build-orange transition-colors">
                              <Icon name="ChevronRight" size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TASKS */}
          {active === "tasks" && (
            <div className="animate-fade-in space-y-5">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Всего задач", value: tasks.length, icon: "ClipboardList" },
                  { label: "Выполнено", value: tasks.filter(t => t.done).length, icon: "CheckCircle" },
                  { label: "В работе", value: tasks.filter(t => !t.done).length, icon: "Timer" },
                ].map((s, i) => (
                  <div key={i} className="bg-build-card rounded-xl border border-build-border p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-build-orange/10 flex items-center justify-center">
                      <Icon name={s.icon} size={20} className="text-build-orange" />
                    </div>
                    <div>
                      <div className="font-oswald text-white text-2xl font-bold">{s.value}</div>
                      <div className="text-gray-500 text-xs">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-build-card rounded-xl border border-build-border overflow-hidden">
                <div className="px-5 py-4 border-b border-build-border flex items-center justify-between">
                  <div className="font-oswald text-white font-semibold tracking-wide">Список задач</div>
                  <div className="flex gap-2">
                    {["Все", "Высокий", "Средний", "Низкий"].map(f => (
                      <button key={f} className="text-xs px-3 py-1.5 rounded-lg border border-build-border text-gray-400 hover:border-build-orange/40 hover:text-white transition-all">
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="divide-y divide-build-border/50">
                  {tasks.map((t, i) => (
                    <div key={i} className={`px-5 py-4 flex items-center gap-4 hover:bg-white/3 transition-colors ${t.done ? "opacity-50" : ""}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        t.done ? "bg-green-500 border-green-500" : "border-gray-600"
                      }`}>
                        {t.done && <Icon name="Check" size={12} className="text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium ${t.done ? "line-through text-gray-500" : "text-white"}`}>{t.title}</div>
                        <div className="text-gray-500 text-xs mt-0.5 flex items-center gap-2">
                          <Icon name="User" size={10} />
                          {t.assignee} · до {t.due}
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        t.priority === "high" ? "bg-red-500/20 text-red-400" :
                        t.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-green-500/20 text-green-400"
                      }`}>
                        {t.priority === "high" ? "Высокий" : t.priority === "medium" ? "Средний" : "Низкий"}
                      </span>
                      <button className="text-gray-600 hover:text-build-orange transition-colors">
                        <Icon name="MoreVertical" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TEAM */}
          {active === "team" && (
            <div className="animate-fade-in space-y-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((m, i) => (
                  <div key={i} className="bg-build-card rounded-xl border border-build-border p-5 hover:border-build-orange/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-build-orange to-build-yellow flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {m.avatar}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{m.name}</div>
                        <div className="text-gray-500 text-xs">{m.role}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Icon name="Building2" size={12} className="text-gray-600" />
                        {m.project}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Icon name="MapPin" size={12} className="text-gray-600" />
                          {m.status}
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          m.status === "На объекте" ? "bg-green-500" :
                          m.status === "В офисе" ? "bg-build-orange" : "bg-gray-600"
                        }`} />
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-build-orange/20 text-gray-300 hover:text-build-orange text-xs transition-all flex items-center justify-center gap-1.5">
                        <Icon name="Phone" size={12} />
                        Звонок
                      </button>
                      <button className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-build-orange/20 text-gray-300 hover:text-build-orange text-xs transition-all flex items-center justify-center gap-1.5">
                        <Icon name="MessageSquare" size={12} />
                        Сообщение
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FINANCES */}
          {active === "finances" && (
            <div className="animate-fade-in space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {finances.map((f, i) => (
                  <div key={i} className="bg-build-card rounded-xl border border-build-border p-5 hover:border-build-orange/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <Icon name={f.icon} size={20} className="text-build-orange" />
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        f.up ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}>{f.change}</span>
                    </div>
                    <div className="font-oswald text-white text-xl font-bold">{f.value}</div>
                    <div className="text-gray-500 text-xs mt-1">{f.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-build-card rounded-xl border border-build-border overflow-hidden">
                <div className="px-5 py-4 border-b border-build-border flex items-center justify-between">
                  <div className="font-oswald text-white font-semibold tracking-wide">Последние операции</div>
                  <button className="text-xs text-build-orange hover:underline">Все операции →</button>
                </div>
                <div className="divide-y divide-build-border/50">
                  {financeRows.map((r, i) => (
                    <div key={i} className="px-5 py-4 flex items-center justify-between hover:bg-white/3 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          r.type === "income" ? "bg-green-500/15" : "bg-red-500/15"
                        }`}>
                          <Icon name={r.type === "income" ? "ArrowDownLeft" : "ArrowUpRight"} size={16} className={r.type === "income" ? "text-green-400" : "text-red-400"} />
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{r.desc}</div>
                          <div className="text-gray-500 text-xs">{r.date}</div>
                        </div>
                      </div>
                      <div className={`font-oswald font-semibold text-base ${r.type === "income" ? "text-green-400" : "text-red-400"}`}>
                        {r.sum}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar chart visual */}
              <div className="bg-build-card rounded-xl border border-build-border p-5">
                <div className="font-oswald text-white font-semibold tracking-wide mb-5">Доходы / расходы по месяцам</div>
                <div className="flex items-end gap-3 h-32">
                  {[
                    { m: "Янв", inc: 60, exp: 50 },
                    { m: "Фев", inc: 45, exp: 40 },
                    { m: "Мар", inc: 75, exp: 55 },
                    { m: "Апр", inc: 90, exp: 68 },
                  ].map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-1 items-end" style={{ height: "100px" }}>
                        <div className="flex-1 rounded-t-md bg-build-orange/80 transition-all duration-700" style={{ height: `${d.inc}%` }} />
                        <div className="flex-1 rounded-t-md bg-white/20 transition-all duration-700" style={{ height: `${d.exp}%` }} />
                      </div>
                      <div className="text-gray-500 text-xs">{d.m}</div>
                    </div>
                  ))}
                  <div className="flex flex-col gap-2 ml-2 justify-end pb-5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <div className="w-3 h-3 rounded-sm bg-build-orange/80" />Доходы
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <div className="w-3 h-3 rounded-sm bg-white/20" />Расходы
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENTS */}
          {active === "documents" && (
            <div className="animate-fade-in space-y-5">
              <div className="bg-build-card rounded-xl border border-build-border overflow-hidden">
                <div className="px-5 py-4 border-b border-build-border flex items-center justify-between">
                  <div className="font-oswald text-white font-semibold tracking-wide">Документы</div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input className="bg-white/5 border border-build-border rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-build-orange/50 w-48" placeholder="Поиск..." />
                    </div>
                    <button className="px-3 py-1.5 bg-build-orange hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5">
                      <Icon name="Upload" size={13} />
                      Загрузить
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-build-border/50">
                  {documents.map((d, i) => (
                    <div key={i} className="px-5 py-4 flex items-center gap-4 hover:bg-white/3 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-build-orange/10 flex items-center justify-center shrink-0">
                        <Icon name={d.icon} size={20} className="text-build-orange" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">{d.name}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{d.size} · {d.date}</div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400 font-mono">{d.type}</span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg hover:bg-build-orange/20 text-gray-500 hover:text-build-orange transition-all">
                          <Icon name="Download" size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-all">
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CALENDAR */}
          {active === "calendar" && (
            <div className="animate-fade-in space-y-5">
              <div className="bg-build-card rounded-xl border border-build-border p-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="font-oswald text-white text-xl font-semibold tracking-wide">Апрель — Май 2026</div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
                      <Icon name="ChevronLeft" size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map(d => (
                    <div key={d} className="text-center text-xs text-gray-500 font-medium py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {calendarDays.map((day) => {
                    const hasEvent = events[day];
                    const isToday = day === 26;
                    return (
                      <div key={day} className={`relative rounded-lg p-1.5 min-h-[52px] cursor-pointer transition-all group ${
                        isToday ? "bg-build-orange border border-build-orange" :
                        hasEvent ? "bg-build-orange/10 border border-build-orange/20 hover:border-build-orange/40" :
                        "hover:bg-white/5 border border-transparent"
                      }`}>
                        <div className={`text-xs font-medium ${isToday ? "text-white" : "text-gray-300"}`}>{day}</div>
                        {hasEvent && hasEvent.map((e, ei) => (
                          <div key={ei} className={`text-[10px] leading-tight mt-0.5 truncate ${isToday ? "text-orange-100" : "text-build-orange"}`}>{e}</div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-build-card rounded-xl border border-build-border p-5">
                <div className="font-oswald text-white font-semibold tracking-wide mb-4">Ближайшие события</div>
                <div className="space-y-3">
                  {[
                    { date: "26 апр", title: "Еженедельная планёрка", time: "10:00", type: "meeting" },
                    { date: "28 апр", title: "Согласование сметы ЖК «Горизонт»", time: "14:00", type: "finance" },
                    { date: "30 апр", title: "Подписание акта скрытых работ", time: "11:00", type: "doc" },
                    { date: "3 май", title: "Совещание с заказчиком ТЦ Север", time: "15:30", type: "meeting" },
                  ].map((ev, i) => (
                    <div key={i} className="flex items-center gap-4 py-2">
                      <div className="w-12 h-12 rounded-xl bg-build-orange/10 border border-build-orange/20 flex flex-col items-center justify-center shrink-0">
                        <div className="text-build-orange font-oswald font-bold text-sm leading-none">{ev.date.split(" ")[0]}</div>
                        <div className="text-gray-500 text-[10px]">{ev.date.split(" ")[1]}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{ev.title}</div>
                        <div className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                          <Icon name="Clock" size={10} />{ev.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {active === "analytics" && (
            <div className="animate-fade-in space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {analyticsMetrics.map((m, i) => (
                  <div key={i} className="bg-build-card rounded-xl border border-build-border p-5 hover:border-build-orange/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-build-orange/10 flex items-center justify-center mb-3">
                      <Icon name={m.icon} size={20} className="text-build-orange" />
                    </div>
                    <div className="font-oswald text-white text-2xl font-bold">{m.value}</div>
                    <div className="text-white text-sm font-medium mt-1">{m.label}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{m.sub}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-5">
                <div className="bg-build-card rounded-xl border border-build-border p-5">
                  <div className="font-oswald text-white font-semibold tracking-wide mb-5">Прогресс по объектам</div>
                  <div className="space-y-4">
                    {projects.map((p, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-gray-300">{p.name}</span>
                          <span className="font-medium" style={{ color: p.color }}>{p.progress}%</span>
                        </div>
                        <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${p.progress}%`, background: `linear-gradient(90deg, ${p.color}80, ${p.color})` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-build-card rounded-xl border border-build-border p-5">
                  <div className="font-oswald text-white font-semibold tracking-wide mb-5">Финансовая аналитика</div>
                  <div className="space-y-3">
                    {[
                      { label: "Выручка квартал", value: "48.2 млн ₽", pct: 82 },
                      { label: "Расходы квартал", value: "37.4 млн ₽", pct: 64 },
                      { label: "Прибыль квартал", value: "10.8 млн ₽", pct: 45 },
                    ].map((f, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-gray-300">{f.label}</span>
                          <span className="text-white font-medium">{f.value}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-build-orange to-build-yellow transition-all duration-1000" style={{ width: `${f.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-build-border grid grid-cols-3 gap-3">
                    {[
                      { label: "ROI", value: "28.9%" },
                      { label: "Маржа", value: "22.4%" },
                      { label: "Оборот", value: "×2.1" },
                    ].map((kpi, i) => (
                      <div key={i} className="text-center">
                        <div className="font-oswald text-build-orange text-xl font-bold">{kpi.value}</div>
                        <div className="text-gray-500 text-xs">{kpi.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
