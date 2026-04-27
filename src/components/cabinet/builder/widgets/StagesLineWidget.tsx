import Icon from "@/components/ui/icon";
import { HOUSE_STAGES } from "../widgetTypes";

interface Props {
  title: string;
  currentStage: number;
}

export default function StagesLineWidget({ title, currentStage }: Props) {
  const total = HOUSE_STAGES.length;
  const safe = Math.max(0, Math.min(currentStage, total));
  const percent = (safe / total) * 100;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-violet-50">
            <Icon
              name="GitCommitHorizontal"
              size={14}
              flat
              className="text-violet-600"
            />
          </div>
          <div className="font-inter font-bold text-sam-text text-xs uppercase tracking-wider truncate">
            {title}
          </div>
        </div>
        <div className="text-sam-text-soft text-[11px] font-semibold">
          Этап {safe} из {total}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center min-h-0">
        {/* Линия с прогрессом */}
        <div className="relative px-3">
          <div className="h-1.5 bg-sam-pill rounded-full" />
          <div
            className="absolute top-0 left-3 h-1.5 rounded-full bg-gradient-to-r from-sam-blue to-violet-500 transition-all duration-1000"
            style={{ width: `calc(${percent}% - 24px)`, minWidth: 0 }}
          />

          {/* Точки этапов */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between"
            style={{ marginTop: -5 }}
          >
            {HOUSE_STAGES.map((name, i) => {
              const done = i < safe;
              const current = i === safe - 1;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center group relative"
                  style={{ width: `${100 / total}%` }}
                >
                  <div
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                      current
                        ? "bg-sam-blue border-sam-blue scale-125 shadow-md shadow-sam-blue/40 ring-4 ring-sam-blue/20"
                        : done
                          ? "bg-sam-blue border-sam-blue"
                          : "bg-white border-sam-border"
                    }`}
                  />
                  {/* Подпись (горизонтальная, мелкая) */}
                  <div
                    className={`mt-3 text-[9px] text-center leading-tight px-0.5 ${
                      current
                        ? "text-sam-blue font-bold"
                        : done
                          ? "text-sam-text"
                          : "text-sam-text-soft"
                    }`}
                    style={{
                      writingMode: "horizontal-tb",
                      maxWidth: 70,
                    }}
                    title={name}
                  >
                    {i + 1}. {name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
