import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { WidgetData, getWidgetMeta } from "./widgetTypes";
import HouseBuildWidget from "./widgets/HouseBuildWidget";
import PaymentLeftWidget from "./widgets/PaymentLeftWidget";
import DeadlineWidget from "./widgets/DeadlineWidget";
import StagesLineWidget from "./widgets/StagesLineWidget";

interface Props {
  widget: WidgetData;
}

export default function WidgetRenderer({ widget }: Props) {
  const meta = getWidgetMeta(widget.type);
  const cfg = (widget.config ?? {}) as Record<string, unknown>;

  const Header = () => (
    <div className="flex items-center gap-2 mb-2 shrink-0">
      <div
        className="w-6 h-6 rounded flex items-center justify-center shrink-0"
        style={{ background: meta.color + "22" }}
      >
        <Icon name={meta.icon} size={14} flat style={{ color: meta.color }} />
      </div>
      <div className="font-inter font-bold text-gs-navy text-xs uppercase tracking-wider truncate">
        {widget.title}
      </div>
    </div>
  );

  switch (widget.type) {
    case "kpi":
      return (
        <div className="h-full flex flex-col">
          <Header />
          <div className="flex-1 flex flex-col justify-center">
            <div className="font-inter text-gs-navy text-3xl font-extrabold leading-none">
              {String(cfg.value ?? "—")}
            </div>
            <div className="text-gs-gray text-xs mt-2">{String(cfg.sub ?? "")}</div>
            {cfg.trend ? (
              <div className="text-green-600 text-[11px] font-bold mt-1">
                {String(cfg.trend)}
              </div>
            ) : null}
          </div>
        </div>
      );

    case "list": {
      const items = (cfg.items as { text: string; done: boolean }[]) ?? [];
      return (
        <div className="h-full flex flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto space-y-1.5">
            {items.map((it, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div
                  className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                    it.done
                      ? "bg-gs-yellow border-gs-yellow"
                      : "border-gs-navy/30"
                  }`}
                >
                  {it.done && <Icon name="Check" size={10} flat className="text-gs-navy" />}
                </div>
                <div
                  className={`flex-1 ${
                    it.done ? "line-through text-gs-gray" : "text-gs-navy"
                  }`}
                >
                  {it.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "progress": {
      const items =
        (cfg.items as { name: string; value: number; color: string }[]) ?? [];
      return (
        <div className="h-full flex flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto space-y-2.5">
            {items.map((it, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gs-navy font-medium truncate">{it.name}</span>
                  <span className="text-gs-gray font-mono">{it.value}%</span>
                </div>
                <div className="h-2 bg-gs-navy/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${it.value}%`, background: it.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "note":
      return (
        <div className="h-full flex flex-col">
          <Header />
          <div className="flex-1 text-gs-navy text-sm whitespace-pre-wrap leading-relaxed overflow-y-auto">
            {String(cfg.text ?? "")}
          </div>
        </div>
      );

    case "chart": {
      const values = (cfg.values as number[]) ?? [];
      const max = Math.max(...values, 1);
      return (
        <div className="h-full flex flex-col">
          <Header />
          <div className="flex-1 flex items-end gap-1.5 pb-1">
            {values.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-gs-yellow"
                  style={{ height: `${(v / max) * 100}%`, minHeight: 2 }}
                />
                <div className="text-[9px] text-gs-gray font-mono">{v}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "calendar-mini": {
      const today = new Date();
      const day = today.getDate();
      const days = Array.from({ length: 30 }, (_, i) => i + 1);
      return (
        <div className="h-full flex flex-col">
          <Header />
          <div className="flex-1 grid grid-cols-7 gap-1 overflow-y-auto">
            {days.map((d) => (
              <div
                key={d}
                className={`aspect-square flex items-center justify-center text-[10px] rounded ${
                  d === day
                    ? "bg-gs-yellow text-gs-navy font-bold"
                    : "text-gs-navy/70 hover:bg-gs-navy/5"
                }`}
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "shortcut":
      return (
        <button className="h-full w-full flex flex-col items-center justify-center gap-2 hover:bg-gs-yellow/10 transition-colors rounded-lg">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: meta.color + "22" }}
          >
            <Icon
              name={String(cfg.icon ?? "Zap")}
              size={20}
              flat
              style={{ color: meta.color }}
            />
          </div>
          <div className="text-gs-navy text-xs font-bold text-center px-2">
            {widget.title}
          </div>
        </button>
      );

    case "clock": {
      return <ClockWidget title={widget.title} />;
    }

    case "weather":
      return (
        <div className="h-full flex flex-col">
          <Header />
          <div className="flex-1 flex items-center justify-between">
            <div>
              <div className="font-inter text-gs-navy text-3xl font-extrabold">
                {String(cfg.temp ?? "—")}
              </div>
              <div className="text-gs-gray text-xs mt-1">
                {String(cfg.desc ?? "")}
              </div>
            </div>
            <Icon name="Cloud" size={36} flat className="text-blue-400" />
          </div>
        </div>
      );

    case "iframe":
      return (
        <div className="h-full flex flex-col">
          <Header />
          <div
            className="flex-1 text-gs-navy text-xs overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: String(cfg.html ?? "") }}
          />
        </div>
      );

    case "house-build":
      return (
        <HouseBuildWidget
          title={widget.title}
          currentStage={Number(cfg.currentStage ?? 0)}
        />
      );

    case "payment-left":
      return (
        <PaymentLeftWidget
          title={widget.title}
          total={Number(cfg.total ?? 0)}
          paid={Number(cfg.paid ?? 0)}
          currency={String(cfg.currency ?? "₽")}
        />
      );

    case "deadline":
      return (
        <DeadlineWidget
          title={widget.title}
          deadline={String(cfg.deadline ?? new Date().toISOString().slice(0, 10))}
        />
      );

    case "stages-line":
      return (
        <StagesLineWidget
          title={widget.title}
          currentStage={Number(cfg.currentStage ?? 0)}
        />
      );

    default:
      return <div className="text-gs-gray text-xs">Неизвестный виджет</div>;
  }
}

function ClockWidget({ title }: { title: string }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    weekday: "short",
  });
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2 shrink-0">
        <div className="w-6 h-6 rounded flex items-center justify-center bg-gs-navy/10">
          <Icon name="Clock" size={14} flat className="text-gs-navy" />
        </div>
        <div className="font-inter font-bold text-gs-navy text-xs uppercase tracking-wider truncate">
          {title}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="font-mono text-gs-navy text-3xl font-extrabold leading-none">
          {time}
        </div>
        <div className="text-gs-gray text-xs mt-2 capitalize">{date}</div>
      </div>
    </div>
  );
}