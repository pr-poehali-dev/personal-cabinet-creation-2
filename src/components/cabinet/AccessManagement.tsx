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

  const generateDocument = (row: AccessRow) => {
    const today = new Date().toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const docNumber = `ГС-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const r = row.role;

    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Доступ к ЛК — ${r.name} — ${r.loginId}</title>
<style>
  @page { size: A4; margin: 20mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Helvetica', Arial, sans-serif; }
  body { color: #0B1E3F; line-height: 1.5; padding: 40px; max-width: 800px; margin: 0 auto; }
  .header { display: flex; align-items: center; gap: 20px; padding-bottom: 20px; border-bottom: 3px solid #1E3A8A; margin-bottom: 30px; }
  .logo { width: 70px; height: 70px; background: #1E3A8A; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 32px; font-weight: bold; }
  .brand-name { font-size: 28px; font-weight: bold; color: #0B1E3F; letter-spacing: -0.5px; }
  .brand-sub { font-size: 11px; color: #1E3A8A; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; font-weight: 600; }
  .doc-meta { text-align: right; font-size: 12px; color: #555; }
  .doc-meta strong { color: #0B1E3F; }
  .doc-title { font-size: 22px; font-weight: bold; text-align: center; margin: 30px 0 10px; color: #0B1E3F; text-transform: uppercase; letter-spacing: 1px; }
  .doc-subtitle { text-align: center; color: #666; font-size: 13px; margin-bottom: 30px; }
  .credentials { background: linear-gradient(135deg, #f0f4ff 0%, #e0e9ff 100%); border: 2px solid #1E3A8A; border-radius: 14px; padding: 28px; margin: 24px 0; }
  .cred-title { font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: #1E3A8A; font-weight: 700; margin-bottom: 18px; text-align: center; }
  .cred-row { display: flex; align-items: center; padding: 14px 18px; background: #fff; border-radius: 10px; margin-bottom: 10px; border-left: 4px solid #1E3A8A; }
  .cred-label { font-size: 11px; text-transform: uppercase; color: #666; letter-spacing: 1px; width: 130px; font-weight: 600; }
  .cred-value { font-family: 'Courier New', monospace; font-size: 22px; font-weight: bold; color: #0B1E3F; letter-spacing: 2px; }
  .info-block { background: #fafbff; border-left: 4px solid #1E3A8A; padding: 16px 20px; margin: 20px 0; font-size: 13px; line-height: 1.7; border-radius: 6px; }
  .info-block strong { color: #1E3A8A; }
  .role-info { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
  .role-info-item { padding: 12px 16px; background: #f5f7fb; border-radius: 8px; }
  .role-info-label { font-size: 10px; text-transform: uppercase; color: #888; letter-spacing: 1px; }
  .role-info-value { font-size: 14px; font-weight: 600; color: #0B1E3F; margin-top: 4px; }
  .features { margin: 20px 0; }
  .features-title { font-size: 14px; font-weight: bold; color: #0B1E3F; margin-bottom: 10px; }
  .features-list { padding-left: 20px; font-size: 13px; line-height: 1.8; color: #333; }
  .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 60px; }
  .sign-block { border-top: 2px solid #0B1E3F; padding-top: 8px; }
  .sign-label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
  .sign-name { font-size: 14px; font-weight: 600; color: #0B1E3F; margin-top: 6px; }
  .sign-line { font-size: 12px; color: #888; margin-top: 12px; }
  .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 11px; color: #888; }
  .slogan { font-style: italic; color: #1E3A8A; margin-top: 6px; font-weight: 600; letter-spacing: 1px; }
  .warning { background: #fff8e1; border-left: 4px solid #f59e0b; padding: 14px 18px; margin: 20px 0; font-size: 12px; color: #78350f; border-radius: 6px; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
  <div class="header">
    <div class="logo">ГС</div>
    <div style="flex: 1;">
      <div class="brand-name">ГлобалСтрой</div>
      <div class="brand-sub">Уральская строительная компания</div>
    </div>
    <div class="doc-meta">
      <div><strong>№ ${docNumber}</strong></div>
      <div>${today}</div>
    </div>
  </div>

  <div class="doc-title">Акт выдачи доступа к личному кабинету</div>
  <div class="doc-subtitle">к информационной системе управления строительными проектами</div>

  <div class="info-block">
    Настоящим актом подтверждается выдача персональных учётных данных для входа в личный кабинет
    информационной системы «ГлобалСтрой» пользователю в рамках подписанного договора о подключении.
  </div>

  <div class="role-info">
    <div class="role-info-item">
      <div class="role-info-label">Роль пользователя</div>
      <div class="role-info-value">${r.fullName}</div>
    </div>
    <div class="role-info-item">
      <div class="role-info-label">Сокращённо</div>
      <div class="role-info-value">${r.shortName}</div>
    </div>
  </div>

  <div class="credentials">
    <div class="cred-title">★ Учётные данные для входа ★</div>
    <div class="cred-row">
      <div class="cred-label">ID пользователя</div>
      <div class="cred-value">${r.loginId}</div>
    </div>
    <div class="cred-row">
      <div class="cred-label">Пароль</div>
      <div class="cred-value">${row.password}</div>
    </div>
  </div>

  <div class="warning">
    <strong>Важно:</strong> храните учётные данные в защищённом месте. Не передавайте их третьим лицам.
    При утере или компрометации пароля немедленно сообщите администратору проекта для перевыпуска доступа.
  </div>

  <div class="features">
    <div class="features-title">Доступные функции в системе:</div>
    <ul class="features-list">
      ${r.features.map((f) => `<li>${f}</li>`).join("")}
    </ul>
  </div>

  <div class="info-block">
    <strong>Адрес входа:</strong> личный кабинет «ГлобалСтрой»<br>
    <strong>Техническая поддержка:</strong> support@globalstroy.ru · +7 (XXX) XXX-XX-XX
  </div>

  <div class="signatures">
    <div class="sign-block">
      <div class="sign-label">Доступ выдал</div>
      <div class="sign-name">Администратор системы</div>
      <div class="sign-line">_______________ / подпись /</div>
    </div>
    <div class="sign-block">
      <div class="sign-label">Доступ получил</div>
      <div class="sign-name">${r.name}</div>
      <div class="sign-line">_______________ / подпись /</div>
    </div>
  </div>

  <div class="footer">
    ООО «ГлобалСтрой» · Уральская строительная компания · ${today}
    <div class="slogan">«Качество доступное каждому»</div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 400);
    };
  </script>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    // Открываем в новом окне для печати/сохранения PDF
    const printWindow = window.open(url, "_blank");
    if (!printWindow) {
      // Fallback — скачать как файл
      const a = document.createElement("a");
      a.href = url;
      a.download = `Доступ_${r.loginId}_${docNumber}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  };

  const issueAccess = (row: AccessRow) => {
    setRows((prev) =>
      prev.map((r) =>
        r.role.id === row.role.id
          ? { ...r, status: "active", issuedTo: r.role.name }
          : r
      )
    );
    // Автоматически генерируем документ
    generateDocument(row);
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
                    {r.status === "pending" ? (
                      <button
                        onClick={() => issueAccess(r)}
                        className="px-3 py-2 rounded-lg bg-build-orange hover:bg-orange-600 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                        title="Выдать и сгенерировать документ для подписания"
                      >
                        <Icon name="Send" size={12} flat />
                        Выдать + PDF
                      </button>
                    ) : (
                      <button
                        onClick={() => generateDocument(r)}
                        className="px-3 py-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-gray-300 hover:text-blue-300 text-xs font-medium transition-all flex items-center gap-1.5"
                        title="Скачать документ повторно"
                      >
                        <Icon name="FileDown" size={12} flat />
                        PDF
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
          1) Нажмите «Новый пароль» — сгенерируется случайный пароль. 2) Нажмите «Выдать + PDF» — статус
          сменится на «Активен» и автоматически откроется готовый акт выдачи доступа с ID, паролем и местами
          для подписей. 3) Распечатайте или сохраните как PDF (Ctrl+P → Сохранить в PDF), подпишите с
          пользователем и передайте ему документ.
        </div>
      </div>
    </div>
  );
}