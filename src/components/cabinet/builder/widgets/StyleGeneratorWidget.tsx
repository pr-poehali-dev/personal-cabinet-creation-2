import { useState } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../../../../backend/func2url.json";

interface Props {
  title: string;
  defaultStyle?: string;
}

interface StyleOption {
  key: string;
  name: string;
  emoji: string;
  desc: string;
}

const STYLES: StyleOption[] = [
  { key: "modern", name: "Модерн", emoji: "🏢", desc: "Белая штукатурка, панорамные окна" },
  { key: "classic", name: "Классика", emoji: "🏛", desc: "Бежевый фасад, скатная кровля" },
  { key: "scandi", name: "Сканди", emoji: "🌲", desc: "Тёмное дерево + белый трим" },
  { key: "loft", name: "Лофт", emoji: "🏭", desc: "Кирпич, чёрный металл" },
  { key: "wood", name: "Дерево", emoji: "🪵", desc: "Натуральный сруб, шингл" },
  { key: "highend", name: "Премиум", emoji: "💎", desc: "Камень, бетон, стекло" },
];

interface GeneratedItem {
  url: string;
  style: string;
  prompt: string;
  ts: number;
}

export default function StyleGeneratorWidget({ title, defaultStyle }: Props) {
  const [selected, setSelected] = useState<string>(defaultStyle ?? "modern");
  const [extra, setExtra] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<GeneratedItem[]>([]);
  const [bigPreview, setBigPreview] = useState<GeneratedItem | null>(null);

  const generate = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(func2url["generate-house-style"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          style: selected,
          prompt: extra.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка генерации");
      const item: GeneratedItem = {
        url: data.url,
        style: data.style,
        prompt: data.prompt,
        ts: Date.now(),
      };
      setItems((prev) => [item, ...prev].slice(0, 6));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-violet-50">
            <Icon name="Sparkles" size={14} flat className="text-violet-600" />
          </div>
          <div className="font-inter font-bold text-sam-text text-xs uppercase tracking-wider truncate">
            {title}
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-semibold">
          AI · FLUX
        </span>
      </div>

      {/* Стили — пилюли */}
      <div className="flex flex-wrap gap-1.5 mb-2 shrink-0">
        {STYLES.map((s) => (
          <button
            key={s.key}
            onClick={() => setSelected(s.key)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 ${
              selected === s.key
                ? "bg-sam-blue text-white shadow-sm shadow-sam-blue/20"
                : "bg-sam-bg text-sam-text hover:bg-sam-pill"
            }`}
            title={s.desc}
          >
            <span>{s.emoji}</span>
            {s.name}
          </button>
        ))}
      </div>

      {/* Поле подсказки */}
      <div className="flex gap-1.5 mb-2 shrink-0">
        <input
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          placeholder="Дополнительно: цвет, материал, окружение…"
          className="flex-1 px-3 py-1.5 rounded-full border border-sam-border text-sam-text text-[12px] focus:outline-none focus:border-sam-blue placeholder:text-sam-text-soft"
        />
        <button
          onClick={generate}
          disabled={busy}
          className="px-4 py-1.5 rounded-full bg-violet-600 text-white text-[12px] font-semibold hover:bg-violet-700 disabled:opacity-60 flex items-center gap-1.5 shrink-0"
        >
          {busy ? (
            <>
              <Icon name="Loader2" size={12} flat className="animate-spin" />
              Генерация
            </>
          ) : (
            <>
              <Icon name="Sparkles" size={12} flat />
              Сгенерировать
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-2 text-red-600 text-[11px] shrink-0">{error}</div>
      )}

      {/* Превью результатов */}
      <div className="flex-1 overflow-y-auto rounded-xl bg-sam-bg p-2 min-h-0">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-sam-text-soft text-[12px] gap-2">
            <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
              <Icon name="Wand2" size={20} flat className="text-violet-600" />
            </div>
            <div className="max-w-[280px]">
              Выбери стиль и нажми «Сгенерировать» — нейросеть нарисует, как
              может выглядеть отделка дома.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {items.map((it) => (
              <button
                key={it.ts}
                onClick={() => setBigPreview(it)}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-sam-border hover:border-sam-blue transition-all"
              >
                <img
                  src={it.url}
                  alt={it.style}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-full bg-white/90 backdrop-blur text-sam-text text-[9px] font-semibold uppercase tracking-wider">
                  {STYLES.find((s) => s.key === it.style)?.name ?? it.style}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Большой просмотр */}
      {bigPreview && (
        <div
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setBigPreview(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-sam-border">
              <div className="flex items-center gap-2">
                <Icon name="Sparkles" size={16} flat className="text-violet-600" />
                <div className="text-sam-text font-bold text-sm">
                  {STYLES.find((s) => s.key === bigPreview.style)?.name ??
                    bigPreview.style}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={bigPreview.url}
                  download
                  className="px-3 py-1.5 rounded-full bg-sam-blue text-white text-xs font-semibold hover:bg-sam-blue-dark flex items-center gap-1.5"
                >
                  <Icon name="Download" size={12} flat />
                  Скачать
                </a>
                <button
                  onClick={() => setBigPreview(null)}
                  className="text-sam-text-soft hover:text-sam-text"
                >
                  <Icon name="X" size={18} flat />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-sam-bg flex items-center justify-center overflow-hidden">
              <img
                src={bigPreview.url}
                alt={bigPreview.style}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="px-4 py-3 border-t border-sam-border text-sam-text-soft text-[11px] leading-snug">
              {bigPreview.prompt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
