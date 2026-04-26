import { Section } from "./constants";

export type RoleId =
  | "gip"
  | "sales"
  | "supply"
  | "customer"
  | "agency"
  | "contractor"
  | "control";

export interface Role {
  id: RoleId;
  loginId: string;
  password: string;
  name: string;
  fullName: string;
  shortName: string;
  icon: string;
  color: string;
  description: string;
  sections: Section[];
  features: string[];
}

export const roles: Role[] = [
  {
    id: "gip",
    loginId: "gip-001",
    password: "1111",
    name: "Руководитель проекта",
    fullName: "Главный инженер проекта",
    shortName: "ГИП",
    icon: "HardHat",
    color: "#FF6B00",
    description: "Полный доступ ко всем разделам, управление командой и бюджетом",
    sections: ["dashboard", "projects", "tasks", "team", "finances", "documents", "calendar", "analytics"],
    features: [
      "Создание и редактирование проектов",
      "Назначение задач команде",
      "Утверждение смет и актов",
      "Контроль сроков и бюджета",
      "Подписание исполнительной документации",
    ],
  },
  {
    id: "sales",
    loginId: "sales-001",
    password: "2222",
    name: "Руководитель продаж",
    fullName: "Руководитель отдела продаж",
    shortName: "РОП",
    icon: "TrendingUp",
    color: "#FFB800",
    description: "Воронка клиентов, договоры и выручка по объектам",
    sections: ["dashboard", "projects", "finances", "documents", "calendar", "analytics"],
    features: [
      "Воронка продаж и сделки",
      "Договоры и КП",
      "Учёт выручки и оплат",
      "Конверсия по агентствам",
    ],
  },
  {
    id: "supply",
    loginId: "supply-001",
    password: "3333",
    name: "Снабжение",
    fullName: "Руководитель снабжения",
    shortName: "СНАБ",
    icon: "Package",
    color: "#22C55E",
    description: "Заявки на материалы, поставщики, склад и логистика",
    sections: ["dashboard", "projects", "tasks", "documents", "calendar"],
    features: [
      "Заявки на материалы",
      "База поставщиков",
      "Складской учёт",
      "Логистика и доставки",
    ],
  },
  {
    id: "customer",
    loginId: "customer-042",
    password: "4444",
    name: "Заказчик",
    fullName: "Заказчик объекта",
    shortName: "ЗАК",
    icon: "User",
    color: "#3B82F6",
    description: "Свой объект: прогресс, фотоотчёты, документы и оплаты",
    sections: ["dashboard", "projects", "documents", "calendar"],
    features: [
      "Прогресс стройки в реальном времени",
      "Фото- и видеоотчёты",
      "Графики платежей",
      "Чат с руководителем проекта",
    ],
  },
  {
    id: "agency",
    loginId: "agency-007",
    password: "5555",
    name: "Агентство",
    fullName: "Партнёрское агентство",
    shortName: "АГ",
    icon: "Handshake",
    color: "#8B5CF6",
    description: "Приведённые клиенты, статус сделок и комиссии",
    sections: ["dashboard", "projects", "finances", "analytics"],
    features: [
      "Список приведённых клиентов",
      "Статус сделок",
      "Расчёт и выплата комиссий",
      "Маркетинговые материалы",
    ],
  },
  {
    id: "contractor",
    loginId: "contractor-014",
    password: "6666",
    name: "Подрядчик",
    fullName: "Подрядная организация",
    shortName: "ПОДР",
    icon: "Wrench",
    color: "#EF4444",
    description: "Задачи на участке, фотоотчёты и акты КС-2/КС-3",
    sections: ["dashboard", "tasks", "documents", "calendar"],
    features: [
      "Задачи и чек-листы работ",
      "Загрузка фотоотчётов",
      "Акты КС-2 и КС-3",
      "Журнал работ бригады",
    ],
  },
  {
    id: "control",
    loginId: "control-003",
    password: "7777",
    name: "Стройконтроль",
    fullName: "Технический надзор",
    shortName: "СК",
    icon: "ShieldCheck",
    color: "#06B6D4",
    description: "Журнал работ, акты скрытых работ и замечания по качеству",
    sections: ["dashboard", "projects", "tasks", "documents", "calendar"],
    features: [
      "Журнал производства работ",
      "Акты скрытых работ",
      "Реестр замечаний",
      "Проверки качества и фотофиксация",
    ],
  },
];

export const projectStages = [
  { id: 1, name: "Договор", icon: "FileSignature", done: true, current: false },
  { id: 2, name: "Проектирование", icon: "PenTool", done: true, current: false },
  { id: 3, name: "Котлован", icon: "Shovel", done: true, current: false },
  { id: 4, name: "Фундамент", icon: "Layers", done: true, current: false },
  { id: 5, name: "Каркас", icon: "Building", done: false, current: true },
  { id: 6, name: "Кровля", icon: "Home", done: false, current: false },
  { id: 7, name: "Фасад", icon: "Grid3x3", done: false, current: false },
  { id: 8, name: "Инженерия", icon: "Zap", done: false, current: false },
  { id: 9, name: "Отделка", icon: "Paintbrush", done: false, current: false },
  { id: 10, name: "Благоустройство", icon: "Trees", done: false, current: false },
  { id: 11, name: "Сдача дома", icon: "Key", done: false, current: false },
];

export function getRoleByLogin(loginId: string, password: string): Role | null {
  return roles.find((r) => r.loginId.toLowerCase() === loginId.toLowerCase() && r.password === password) || null;
}
