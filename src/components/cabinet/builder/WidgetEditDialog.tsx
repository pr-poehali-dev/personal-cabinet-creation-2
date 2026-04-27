import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { WidgetData } from "./widgetTypes";

interface Props {
  widget: WidgetData | null;
  onClose: () => void;
  onSave: (w: WidgetData) => void;
  onDelete: (id: string) => void;
}

export default function WidgetEditDialog({
  widget,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [title, setTitle] = useState("");
  const [configText, setConfigText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (widget) {
      setTitle(widget.title);
      setConfigText(JSON.stringify(widget.config ?? {}, null, 2));
      setError(null);
    }
  }, [widget]);

  if (!widget) return null;

  const handleSave = () => {
    try {
      const parsed = configText.trim() ? JSON.parse(configText) : {};
      onSave({ ...widget, title: title.trim() || "Без названия", config: parsed });
      onClose();
    } catch {
      setError("Неверный формат настроек (нужен JSON)");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gs-navy text-white px-5 py-3 flex items-center justify-between border-b-2 border-gs-yellow">
          <div className="flex items-center gap-2">
            <Icon name="Settings2" size={18} flat className="text-gs-yellow" />
            <div className="font-inter font-extrabold tracking-tight">
              Настройка модуля
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <Icon name="X" size={18} flat />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-gs-navy text-xs font-bold uppercase tracking-wider mb-1.5">
              Название
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gs-navy/20 text-gs-navy text-sm focus:outline-none focus:border-gs-yellow"
              placeholder="Название модуля"
            />
          </div>

          <div>
            <label className="block text-gs-navy text-xs font-bold uppercase tracking-wider mb-1.5">
              Данные модуля (JSON)
            </label>
            <textarea
              value={configText}
              onChange={(e) => setConfigText(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 rounded-lg border border-gs-navy/20 text-gs-navy text-xs font-mono focus:outline-none focus:border-gs-yellow"
              spellCheck={false}
            />
            {error && (
              <div className="text-red-500 text-xs mt-1">{error}</div>
            )}
            <div className="text-gs-gray text-[10px] mt-1">
              Можно отредактировать значения вручную. Если не уверен — оставь как
              есть.
            </div>
          </div>
        </div>

        <div className="bg-gs-navy/5 px-5 py-3 flex items-center justify-between border-t border-gs-navy/10">
          <button
            onClick={() => {
              onDelete(widget.i);
              onClose();
            }}
            className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1"
          >
            <Icon name="Trash2" size={14} flat />
            Удалить
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-gs-navy/20 text-gs-navy text-xs font-bold hover:bg-gs-navy/5"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-gs-yellow text-gs-navy text-xs font-bold hover:bg-gs-orange hover:text-white transition-colors"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
