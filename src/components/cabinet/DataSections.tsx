import Icon from "@/components/ui/icon";
import { finances, financeRows, documents, calendarDays, events, analyticsMetrics, projects, Section } from "./constants";

interface Props {
  active: Section;
}

export default function DataSections({ active }: Props) {
  return (
    <>
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
    </>
  );
}
