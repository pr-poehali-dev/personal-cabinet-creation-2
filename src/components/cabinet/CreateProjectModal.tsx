import { useState } from "react";
import Icon from "@/components/ui/icon";
import { roles } from "./roles";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [budget, setBudget] = useState("");
  const [start, setStart] = useState("");
  const [deadline, setDeadline] = useState("");
  const [customer, setCustomer] = useState("");
  const [gip, setGip] = useState("gip-001");
  const [team, setTeam] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const toggleTeam = (id: string) => {
    setTeam((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName("");
      setAddress("");
      setBudget("");
      setStart("");
      setDeadline("");
      setCustomer("");
      setTeam([]);
      onClose();
    }, 1400);
  };

  const teamRoles = roles.filter((r) => !["customer", "agency"].includes(r.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="relative bg-build-card border border-build-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-build-card border-b border-build-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-build-orange/20 flex items-center justify-center">
              <Icon name="Plus" size={18} className="text-build-orange" />
            </div>
            <div>
              <div className="font-oswald text-white text-lg font-semibold tracking-wide">Новый проект</div>
              <div className="text-gray-500 text-xs">Заполните данные объекта и команду</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>

        {success ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-green-400" />
            </div>
            <div className="font-oswald text-white text-xl font-semibold mb-2">Проект создан!</div>
            <div className="text-gray-400 text-sm">Команда получит доступ к объекту автоматически</div>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-5">
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Название объекта *</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ЖК «Восход»"
                className="w-full bg-build-dark border border-build-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-build-orange/50"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Адрес объекта *</label>
              <div className="relative">
                <Icon name="MapPin" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="г. Москва, ул. Ленина, 42"
                  className="w-full bg-build-dark border border-build-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-build-orange/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Бюджет, ₽ *</label>
                <input
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="50 000 000"
                  className="w-full bg-build-dark border border-build-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-build-orange/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Заказчик *</label>
                <input
                  required
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="ООО «Девелопер»"
                  className="w-full bg-build-dark border border-build-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-build-orange/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Старт работ *</label>
                <input
                  required
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full bg-build-dark border border-build-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-build-orange/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Сдача *</label>
                <input
                  required
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-build-dark border border-build-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-build-orange/50"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Руководитель проекта</label>
              <select
                value={gip}
                onChange={(e) => setGip(e.target.value)}
                className="w-full bg-build-dark border border-build-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-build-orange/50"
              >
                <option value="gip-001">gip-001 — А. Петров (ГИП)</option>
                <option value="gip-002">gip-002 — Д. Козлов (ГИП)</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-xs mb-2 block">Команда проекта</label>
              <div className="grid grid-cols-2 gap-2">
                {teamRoles.map((r) => {
                  const checked = team.includes(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => toggleTeam(r.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                        checked
                          ? "border-build-orange bg-build-orange/10"
                          : "border-build-border bg-build-dark hover:border-build-orange/30"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                          checked ? "bg-build-orange border-build-orange" : "border-gray-600"
                        }`}
                      >
                        {checked && <Icon name="Check" size={12} className="text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs font-medium truncate">{r.name}</div>
                        <div className="text-gray-500 text-[10px] font-mono">{r.loginId}</div>
                      </div>
                      <Icon name={r.icon} size={14} style={{ color: r.color }} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-build-border">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg border border-build-border text-gray-300 hover:bg-white/5 text-sm font-medium transition-all"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-build-orange hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <Icon name="Plus" size={15} />Создать проект
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
