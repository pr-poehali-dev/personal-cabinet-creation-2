import { useState } from "react";
import Icon from "@/components/ui/icon";
import { roles, Role } from "./roles";

interface AccessRow {
  role: Role;
  password: string;
  status: "active" | "pending" | "blocked";
  lastIssued: string;
  issuedTo: string;
}

const initialRows: AccessRow[] = roles.map((r) => ({
  role: r,
  password: r.password,
  status: r.id === "customer" || r.id === "agency" ? "pending" : "active",
  lastIssued: r.id === "customer" ? "—" : "12.04.2026",
  issuedTo: r.id === "customer" ? "не выдан" : r.name,
}));

function generatePassword(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let pass = "";
  for (let i = 0; i < 8; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
  return pass;
}

export default function AccessManagement() {
  const [rows, setRows] = useState<AccessRow[]>(initialRows);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string>("");

  const regenerate = (id: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.role.id === id
          ? {
              ...r,
              password: generatePassword(),
              status: "pending",
              lastIssued: new Date().toLocaleDateString("ru-RU"),
              issuedTo: "новый пароль — выдать пользователю",
            }
          : r
      )
    );
    setRevealed((prev) => ({ ...prev, [id]: true }));
  };

  const issueAccess = (id: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.role.id === id
          ? { ...r, status: "active", issuedTo: r.role.name }
          : r
      )
    );
  };

  const copyPassword = (id: string, password: string) => {
    navigator.clipboard?.writeText(password);
    setCopied(id);
    setTimeout(() => setCopied(""), 1800);
  };

  const toggleReveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="bg-build-card rounded-2xl border border-build-border p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-build-orange/15 flex items-center justify-center shrink-0">
            <Icon name="KeyRound" size={24} flat className="text-build-orange" />
          </div>
          <div className="flex-1">
            <div className="font-oswald text-white text-xl font-semibold tracking-wide">Управление доступами</div>
            <div className="text-gray-400 text-sm mt-1.5 leading-relaxed">
              Здесь администратор регенерирует пароли для каждой роли. После подписания договора нажмите
              «Выдать», и пароль вместе с ID отправляется пользователю в его документах. До этого момента
              он не сможет войти в систему.
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Всего ролей", value: rows.length, icon: "Users" },
          { label: "Активных", value: rows.filter((r) => r.status === "active").length, icon: "CheckCircle" },
          { label: "Ожидают выдачи", value: rows.filter((r) => r.status === "pending").length, icon: "Clock" },
          { label: "Заблокировано", value: rows.filter((r) => r.status === "blocked").length, icon: "Lock" },
        ].map((s, i) => (
          <div key={i} className="bg-build-card rounded-xl border border-build-border p-5 hover:border-build-orange/30 transition-all">
            <Icon name={s.icon} size={20} className="text-build-orange mb-3" />
            <div className="font-oswald text-white text-2xl font-bold">{s.value}</div>
            <div className="text-gray-500 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-build-card rounded-xl border border-build-border overflow-hidden">
        <div className="px-5 py-4 border-b border-build-border flex items-center justify-between">
          <div className="font-oswald text-white font-semibold tracking-wide">Доступы пользователей</div>
          <div className="text-xs text-gray-500">Всего: {rows.length}</div>
        </div>

        <div className="divide-y divide-build-border/50">
          {rows.map((r) => {
            const isRevealed = revealed[r.role.id];
            const isCopied = copied === r.role.id;
            const statusBadge =
              r.status === "active"
                ? { label: "Активен", color: "bg-green-500/20 text-green-400 border-green-500/30" }
                : r.status === "pending"
                ? { label: "Ожидает выдачи", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" }
                : { label: "Заблокирован", color: "bg-red-500/20 text-red-400 border-red-500/30" };

            return (
              <div key={r.role.id} className="px-5 py-4 hover:bg-white/3 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Роль */}
                  <div className="flex items-center gap-3 md:w-64 shrink-0">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
                      style={{ background: r.role.color + "20", borderColor: r.role.color + "40" }}
                    >
                      <Icon name={r.role.icon} size={18} flat style={{ color: r.role.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-sm font-semibold truncate">{r.role.name}</div>
                      <div className="text-gray-500 text-[11px] font-mono truncate">{r.role.loginId}</div>
                    </div>
                  </div>

                  {/* Пароль */}
                  <div className="flex-1 flex items-center gap-2 bg-build-dark/50 border border-build-border rounded-lg px-3 py-2 min-w-0">
                    <Icon name="Lock" size={14} flat className="text-gray-500 shrink-0" />
                    <span className="font-mono text-sm text-white tracking-wider truncate">
                      {isRevealed ? r.password : "••••••••"}
                    </span>
                    <button
                      onClick={() => toggleReveal(r.role.id)}
                      className="ml-auto text-gray-500 hover:text-white transition-colors shrink-0"
                      title={isRevealed ? "Скрыть" : "Показать"}
                    >
                      <Icon name={isRevealed ? "EyeOff" : "Eye"} size={14} flat />
                    </button>
                    <button
                      onClick={() => copyPassword(r.role.id, r.password)}
                      className="text-gray-500 hover:text-build-orange transition-colors shrink-0"
                      title="Скопировать пароль"
                    >
                      <Icon name={isCopied ? "Check" : "Copy"} size={14} flat />
                    </button>
                  </div>

                  {/* Статус и дата */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                    <div className="text-gray-500 text-xs hidden lg:block">{r.lastIssued}</div>
                  </div>

                  {/* Действия */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => regenerate(r.role.id)}
                      className="px-3 py-2 rounded-lg bg-white/5 hover:bg-build-orange/20 text-gray-300 hover:text-build-orange text-xs font-medium transition-all flex items-center gap-1.5"
                      title="Сгенерировать новый пароль"
                    >
                      <Icon name="RefreshCw" size={12} flat />
                      Новый пароль
                    </button>
                    {r.status === "pending" && (
                      <button
                        onClick={() => issueAccess(r.role.id)}
                        className="px-3 py-2 rounded-lg bg-build-orange hover:bg-orange-600 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                        title="Выдать пользователю (после подписания документов)"
                      >
                        <Icon name="Send" size={12} flat />
                        Выдать
                      </button>
                    )}
                  </div>
                </div>

                {/* Подсказка кому выдан */}
                <div className="mt-2 ml-13 text-[11px] text-gray-500 flex items-center gap-1.5 pl-13">
                  <Icon name="UserCheck" size={11} flat className="text-gray-600" />
                  Выдан: <span className="text-gray-400">{r.issuedTo}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Подсказка */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex gap-3">
        <Icon name="Info" size={16} flat className="text-blue-400 shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          <span className="text-blue-300 font-semibold">Регламент выдачи:</span>{" "}
          Сгенерируйте пароль кнопкой «Новый пароль», скопируйте его, впишите в договор/акт о подключении к
          личному кабинету и подпишите с пользователем. После этого нажмите «Выдать» — статус сменится на
          «Активен», и пользователь сможет войти.
        </div>
      </div>
    </div>
  );
}
