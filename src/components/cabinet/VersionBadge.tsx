import Icon from "@/components/ui/icon";

const CHANGELOG = [
  { v: "v2.0", note: "Откат фона к синему, летающий логотип сохранён" },
  { v: "v1.9", note: "Тёмный hi-tech фон, летающий логотип, скрытая версия" },
  { v: "v1.8", note: "Роль «Юридический отдел»" },
  { v: "v1.7", note: "Логотип ГлобалСтрой + цвета 3D-иконок" },
  { v: "v1.6", note: "3D-иконки с подсветкой контуров" },
  { v: "v1.5", note: "3D-фон входа, слоган компании" },
  { v: "v1.4", note: "Брендбук цветов, фирменная палитра" },
  { v: "v1.3", note: "Роли пользователей и форма проекта" },
  { v: "v1.2", note: "Декомпозиция компонентов" },
  { v: "v1.1", note: "Финансы и аналитика" },
  { v: "v1.0", note: "Первая версия кабинета" },
];

export default function VersionBadge() {
  return (
    <div className="fixed bottom-3 right-3 z-50 group">
      {/* Раскрывающийся changelog */}
      <div
        className="absolute bottom-full right-0 mb-2 w-64 bg-build-card/95 backdrop-blur-md border border-build-border rounded-xl p-3 shadow-2xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
      >
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-build-border/60">
          <Icon name="History" size={12} flat className="text-blue-400" />
          <div className="font-oswald text-white text-xs font-semibold tracking-wider uppercase">История версий</div>
        </div>
        <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
          {CHANGELOG.map((item, i) => (
            <div
              key={item.v}
              className={`flex items-start gap-2 text-[11px] leading-tight py-1 px-1.5 rounded ${
                i === 0 ? "bg-blue-500/10" : ""
              }`}
            >
              <span
                className={`font-mono font-semibold shrink-0 ${
                  i === 0 ? "text-blue-300" : "text-gray-500"
                }`}
              >
                {item.v}
              </span>
              <span className={i === 0 ? "text-gray-200" : "text-gray-400"}>{item.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Маленький значок */}
      <button
        className="w-7 h-7 rounded-full bg-build-card/80 backdrop-blur border border-build-border hover:border-blue-500/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 cursor-help"
        title="История версий"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      </button>
    </div>
  );
}