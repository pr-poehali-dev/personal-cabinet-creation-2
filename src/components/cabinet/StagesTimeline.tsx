import Icon from "@/components/ui/icon";
import { projectStages } from "./roles";

export default function StagesTimeline() {
  const total = projectStages.length;
  const doneCount = projectStages.filter((s) => s.done).length;
  const currentIndex = projectStages.findIndex((s) => s.current);
  const progressPct = ((doneCount + (currentIndex >= 0 ? 0.5 : 0)) / total) * 100;

  return (
    <div className="bg-build-card border border-build-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-1">
        <div className="font-oswald text-white text-base font-semibold tracking-wide">
          Путь к сдаче дома
        </div>
        <div className="text-build-orange font-oswald font-bold text-lg">
          {Math.round(progressPct)}%
        </div>
      </div>
      <div className="text-gray-500 text-xs mb-5">
        Этап {Math.max(currentIndex + 1, doneCount)} из {total} · ЖК «Горизонт»
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-build-orange to-build-yellow transition-all duration-1000"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Stages */}
      <div className="overflow-x-auto -mx-5 px-5 pb-2">
        <div className="flex items-start gap-2 min-w-max">
          {projectStages.map((s, i) => {
            const isLast = i === projectStages.length - 1;
            return (
              <div key={s.id} className="flex items-start">
                <div className="flex flex-col items-center w-[88px]">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      s.done
                        ? "bg-build-orange text-white"
                        : s.current
                        ? "bg-build-orange/20 border-2 border-build-orange text-build-orange animate-pulse-orange"
                        : "bg-white/5 border border-build-border text-gray-600"
                    }`}
                  >
                    {s.done ? (
                      <Icon name="Check" size={18} />
                    ) : (
                      <Icon name={s.icon} size={18} />
                    )}
                  </div>
                  <div
                    className={`mt-2 text-[11px] text-center leading-tight font-medium ${
                      s.done
                        ? "text-white"
                        : s.current
                        ? "text-build-orange"
                        : "text-gray-500"
                    }`}
                  >
                    {s.name}
                  </div>
                  {s.current && (
                    <div className="mt-1 text-[10px] text-build-orange/70 uppercase tracking-wider">
                      сейчас
                    </div>
                  )}
                </div>
                {!isLast && (
                  <div
                    className={`h-px w-6 mt-[22px] transition-colors ${
                      s.done ? "bg-build-orange" : "bg-build-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
