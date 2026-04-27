export type WidgetType =
  | "kpi"
  | "list"
  | "progress"
  | "note"
  | "chart"
  | "calendar-mini"
  | "shortcut"
  | "clock"
  | "weather"
  | "iframe"
  | "house-build"
  | "payment-left"
  | "deadline"
  | "stages-line";

export const HOUSE_STAGES = [
  "Фундамент",
  "Канализация",
  "Скважина",
  "Возведение коробки",
  "Устройство кровли",
  "Устройство фасада",
  "Монтаж окон",
  "Сантехника / отопление",
  "Электрика",
  "Полусухая стяжка",
  "Механизированная штукатурка",
  "Вывоз мусора",
  "Сдача дома",
];

export interface WidgetData {
  i: string;
  type: WidgetType;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  config?: Record<string, unknown>;
}

export interface WidgetMeta {
  type: WidgetType;
  name: string;
  description: string;
  icon: string;
  color: string;
  defaultW: number;
  defaultH: number;
  defaultTitle: string;
  defaultConfig?: Record<string, unknown>;
}

export const WIDGET_LIBRARY: WidgetMeta[] = [
  {
    type: "kpi",
    name: "KPI-плитка",
    description: "Большая цифра с подписью — выручка, клиенты, %",
    icon: "TrendingUp",
    color: "#fcdd2b",
    defaultW: 3,
    defaultH: 3,
    defaultTitle: "Выручка",
    defaultConfig: { value: "18.4 млн", sub: "за апрель", trend: "+12%" },
  },
  {
    type: "list",
    name: "Список",
    description: "Простой список пунктов с чекбоксами",
    icon: "ListChecks",
    color: "#3b82f6",
    defaultW: 4,
    defaultH: 5,
    defaultTitle: "Мои задачи",
    defaultConfig: {
      items: [
        { text: "Проверить смету", done: false },
        { text: "Звонок поставщику", done: true },
        { text: "Подписать договор", done: false },
      ],
    },
  },
  {
    type: "progress",
    name: "Прогресс",
    description: "Список объектов с прогресс-барами",
    icon: "BarChart2",
    color: "#22c55e",
    defaultW: 5,
    defaultH: 4,
    defaultTitle: "Прогресс по объектам",
    defaultConfig: {
      items: [
        { name: "ЖК «Горизонт»", value: 68, color: "#fcdd2b" },
        { name: "ТЦ Север", value: 23, color: "#3b82f6" },
        { name: "Офис «Технопарк»", value: 44, color: "#a855f7" },
      ],
    },
  },
  {
    type: "note",
    name: "Заметка",
    description: "Текстовая заметка / напоминание",
    icon: "StickyNote",
    color: "#f59e0b",
    defaultW: 3,
    defaultH: 3,
    defaultTitle: "Заметка",
    defaultConfig: { text: "Не забыть проверить акты к 30 апреля." },
  },
  {
    type: "chart",
    name: "Мини-график",
    description: "Bar-чарт по 6 точкам",
    icon: "LineChart",
    color: "#8b5cf6",
    defaultW: 4,
    defaultH: 4,
    defaultTitle: "Доходы по месяцам",
    defaultConfig: { values: [12, 18, 14, 22, 19, 24] },
  },
  {
    type: "calendar-mini",
    name: "Календарь",
    description: "Мини-календарь текущего месяца",
    icon: "Calendar",
    color: "#06b6d4",
    defaultW: 3,
    defaultH: 4,
    defaultTitle: "Календарь",
  },
  {
    type: "shortcut",
    name: "Быстрая кнопка",
    description: "Кнопка-ярлык на нужный раздел",
    icon: "Zap",
    color: "#ef4444",
    defaultW: 2,
    defaultH: 2,
    defaultTitle: "Создать проект",
    defaultConfig: { icon: "Plus", target: "projects" },
  },
  {
    type: "clock",
    name: "Часы",
    description: "Текущее время и дата",
    icon: "Clock",
    color: "#1a2d4d",
    defaultW: 3,
    defaultH: 2,
    defaultTitle: "Время",
  },
  {
    type: "weather",
    name: "Погода",
    description: "Погода в твоём городе",
    icon: "Cloud",
    color: "#60a5fa",
    defaultW: 3,
    defaultH: 2,
    defaultTitle: "Екатеринбург",
    defaultConfig: { temp: "+8°", desc: "Облачно" },
  },
  {
    type: "iframe",
    name: "Внешний блок",
    description: "Произвольный текст / HTML",
    icon: "Globe",
    color: "#6b7280",
    defaultW: 4,
    defaultH: 3,
    defaultTitle: "Заметки команды",
    defaultConfig: { html: "Сюда можно вставить любой текст или HTML." },
  },
  {
    type: "house-build",
    name: "Дом-конструктор",
    description: "Интерактивный дом, который собирается по этапам",
    icon: "Home",
    color: "#1162FF",
    defaultW: 6,
    defaultH: 7,
    defaultTitle: "Стройка дома",
    defaultConfig: { currentStage: 5 },
  },
  {
    type: "payment-left",
    name: "Осталось оплатить",
    description: "Сколько денег осталось внести по договору",
    icon: "Wallet",
    color: "#10b981",
    defaultW: 3,
    defaultH: 3,
    defaultTitle: "К оплате",
    defaultConfig: { total: 12500000, paid: 7800000, currency: "₽" },
  },
  {
    type: "deadline",
    name: "Срок до сдачи",
    description: "Обратный отсчёт до конца стройки",
    icon: "CalendarClock",
    color: "#f59e0b",
    defaultW: 3,
    defaultH: 3,
    defaultTitle: "До сдачи дома",
    defaultConfig: { deadline: "2026-12-15" },
  },
  {
    type: "stages-line",
    name: "Линия этапов",
    description: "Все 13 этапов стройки в виде линии",
    icon: "GitCommitHorizontal",
    color: "#8b5cf6",
    defaultW: 12,
    defaultH: 3,
    defaultTitle: "Этапы строительства",
    defaultConfig: { currentStage: 5 },
  },
];

export const getWidgetMeta = (type: WidgetType) =>
  WIDGET_LIBRARY.find((w) => w.type === type)!;

export const DEFAULT_LAYOUT: WidgetData[] = [
  {
    i: "house",
    type: "house-build",
    title: "Стройка дома",
    x: 0,
    y: 0,
    w: 6,
    h: 7,
    config: { currentStage: 5 },
  },
  {
    i: "pay",
    type: "payment-left",
    title: "Осталось оплатить",
    x: 6,
    y: 0,
    w: 3,
    h: 3,
    config: { total: 12500000, paid: 7800000, currency: "₽" },
  },
  {
    i: "dead",
    type: "deadline",
    title: "До сдачи дома",
    x: 9,
    y: 0,
    w: 3,
    h: 3,
    config: { deadline: "2026-12-15" },
  },
  {
    i: "stage-now",
    type: "kpi",
    title: "Текущий этап",
    x: 6,
    y: 3,
    w: 6,
    h: 4,
    config: {
      value: "5 из 13",
      sub: "Устройство кровли",
      trend: "На графике",
    },
  },
  {
    i: "line",
    type: "stages-line",
    title: "Этапы строительства",
    x: 0,
    y: 7,
    w: 12,
    h: 4,
    config: { currentStage: 5 },
  },
];