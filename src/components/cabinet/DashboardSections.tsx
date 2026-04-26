import Icon from "@/components/ui/icon";
import { projects, tasks, teamMembers, Section } from "./constants";

interface Props {
  active: Section;
  setActive: (s: Section) => void;
}

export default function DashboardSections({ active, setActive }: Props) {
  return (
    <>
      {/* DASHBOARD */}
      {active === "dashboard" && (
        <div className="animate-fade-in space-y-6">
          {/* Hero banner */}
          <div
            className="relative rounded-2xl overflow-hidden h-40 flex items-end p-5"
            style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/files/67c7cb23-7b37-4d20-983b-d9e449d19cb2.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gs-navy/95 via-gs-navy/50 to-transparent" />
            <div className="absolute top-0 left-0 w-24 h-1 bg-gs-yellow" />
            <div className="relative z-10">
              <div className="font-inter text-white text-2xl font-extrabold tracking-tight">Добрый день!</div>
              <div className="text-white/80 text-sm mt-1">4 активных проекта · 12 задач требуют внимания</div>
            </div>
            <div className="relative z-10 ml-auto text-right">
              <div className="text-gs-yellow font-inter text-3xl font-extrabold">68%</div>
              <div className="text-white/70 text-xs">выполнение плана</div>
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
                className={`role-card rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 cursor-default shadow-md ${
                  kpi.accent ? "ring-2 ring-gs-yellow" : ""
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon name={kpi.icon} size={20} />
                </div>
                <div className="font-inter text-gs-navy text-xl font-extrabold leading-tight">
                  {kpi.value}
                </div>
                <div className="text-gs-gray text-[11px] mt-1 font-semibold">{kpi.label}</div>
                <div className="text-gs-gray/70 text-[10px] mt-0.5">{kpi.sub}</div>
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
    </>
  );
}