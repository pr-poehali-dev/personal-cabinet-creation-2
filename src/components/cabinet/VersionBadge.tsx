import Icon from "@/components/ui/icon";

const CHANGELOG = [
  { v: "v3.7", note: "Брендовая тема всего кабинета: белые карточки, фикс иконок-в-иконках, центр логотипа в загрузчике" },
  { v: "v3.6", note: "Декомпозиция Login + единый брендстиль на весь кабинет, фикс иконок и сетки" },
  { v: "v3.5", note: "Подсветка орбит + анимация загрузки ЛК (формы разъезжаются, логотип в центре)" },
  { v: "v3.4", note: "Частицы притягиваются к курсору с эффектом свечения" },
  { v: "v3.3", note: "Парящие частицы вокруг логотипа + орбитальные кольца" },
  { v: "v3.2", note: "Бегущая точка-огонёк, мощный оранжевый hover, цветные 3D-иконки в карточках" },
  { v: "v3.1", note: "Усилен синий луч, оранжевая кнопка-вход, яркие цветные 3D-иконки" },
  { v: "v3.0", note: "Логотип в фоне, синий бегущий луч на рамках при hover" },
  { v: "v2.9", note: "Постер «Будущее строится сегодня» в фоне, неон рамок, ГЛОБАЛСТ" },
  { v: "v2.8", note: "Применён брендбук: цвета #1A2D4D + #FCDD2B + #F77D00, шрифт Inter" },
  { v: "v2.7", note: "Автогенерация PDF-акта выдачи доступа при нажатии «Выдать»" },
  { v: "v2.6", note: "Раздел «Доступы»: генерация паролей админом, выдача после документов" },
  { v: "v2.5", note: "Слоган под ролями + анимация пословного появления" },
  { v: "v2.4", note: "Слоган столбиком, тонкий шрифт, светящиеся рамки ролей" },
  { v: "v2.3", note: "Тёмный фон без 3D, неоновый слоган, центр формы" },
  { v: "v2.2", note: "Форма входа отцентрована" },
  { v: "v2.1", note: "Логотип в форме входа со светящейся обводкой, увеличен масштаб блоков" },
  { v: "v2.0", note: "Откат фона к синему" },
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