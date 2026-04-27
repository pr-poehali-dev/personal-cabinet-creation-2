import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  title: string;
  deadline: string;
}

interface Diff {
  days: number;
  hours: number;
  minutes: number;
  past: boolean;
}

function calc(deadline: string): Diff {
  const target = new Date(deadline + "T00:00:00").getTime();
  const now = Date.now();
  const diff = target - now;
  const past = diff <= 0;
  const abs = Math.abs(diff);
  const days = Math.floor(abs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((abs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((abs / (1000 * 60)) % 60);
  return { days, hours, minutes, past };
}

export default function DeadlineWidget({ title, deadline }: Props) {
  const [diff, setDiff] = useState<Diff>(() => calc(deadline));

  useEffect(() => {
    setDiff(calc(deadline));
    const t = setInterval(() => setDiff(calc(deadline)), 30 * 1000);
    return () => clearInterval(t);
  }, [deadline]);

  const dateLabel = new Date(deadline + "T00:00:00").toLocaleDateString(
    "ru-RU",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2 shrink-0">
        <div className="w-6 h-6 rounded flex items-center justify-center bg-amber-50">
          <Icon name="CalendarClock" size={14} flat className="text-amber-600" />
        </div>
        <div className="font-inter font-bold text-sam-text text-xs uppercase tracking-wider truncate">
          {title}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="text-sam-text-soft text-[11px]">
          {diff.past ? "С момента сдачи прошло" : "Осталось"}
        </div>

        <div className="flex items-end gap-2 mt-1">
          <div>
            <div className="font-mono text-sam-text text-3xl font-extrabold leading-none">
              {diff.days}
            </div>
            <div className="text-sam-text-soft text-[10px] mt-1">дней</div>
          </div>
          <div className="text-sam-text-soft pb-2">·</div>
          <div>
            <div className="font-mono text-sam-text text-lg font-bold leading-none">
              {diff.hours}
            </div>
            <div className="text-sam-text-soft text-[10px] mt-0.5">ч</div>
          </div>
          <div className="text-sam-text-soft pb-2">·</div>
          <div>
            <div className="font-mono text-sam-text text-lg font-bold leading-none">
              {diff.minutes}
            </div>
            <div className="text-sam-text-soft text-[10px] mt-0.5">мин</div>
          </div>
        </div>

        <div className="mt-3 px-2 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold inline-block w-fit">
          Дата сдачи: {dateLabel}
        </div>
      </div>
    </div>
  );
}
