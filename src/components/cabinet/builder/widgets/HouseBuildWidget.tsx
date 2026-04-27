import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { HOUSE_STAGES } from "../widgetTypes";

interface Props {
  title: string;
  currentStage: number;
}

export default function HouseBuildWidget({ title, currentStage }: Props) {
  const totalStages = HOUSE_STAGES.length;
  const safeStage = Math.max(0, Math.min(currentStage, totalStages));
  const percent = Math.round((safeStage / totalStages) * 100);

  // Анимация "появления" частей дома по очереди
  const [animatedStage, setAnimatedStage] = useState(0);
  useEffect(() => {
    setAnimatedStage(0);
    const t = setTimeout(() => setAnimatedStage(safeStage), 200);
    return () => clearTimeout(t);
  }, [safeStage]);

  // Какие части дома собраны: индекс этапа -> элемент включается
  const isOn = (stageIndex: number) => animatedStage > stageIndex;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-sam-blue-soft">
            <Icon name="Home" size={14} flat className="text-sam-blue" />
          </div>
          <div className="font-inter font-bold text-sam-text text-xs uppercase tracking-wider truncate">
            {title}
          </div>
        </div>
        <div className="text-sam-blue text-xs font-bold">{percent}%</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-2 min-h-0">
        {/* SVG-дом */}
        <svg
          viewBox="0 0 300 260"
          className="w-full h-full max-h-[260px]"
          style={{ maxWidth: 320 }}
        >
          <defs>
            <linearGradient id="brick" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8F0FF" />
              <stop offset="100%" stopColor="#C8DCFF" />
            </linearGradient>
            <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1162FF" />
              <stop offset="100%" stopColor="#0A4DDB" />
            </linearGradient>
          </defs>

          {/* Земля */}
          <rect x="0" y="240" width="300" height="20" fill="#F5F6F8" />
          <line
            x1="0"
            y1="240"
            x2="300"
            y2="240"
            stroke="#E6E9EE"
            strokeWidth="1"
          />

          {/* 1. Фундамент */}
          <Stage on={isOn(0)}>
            <rect
              x="50"
              y="225"
              width="200"
              height="18"
              rx="2"
              fill="#6B7280"
            />
            <rect x="50" y="225" width="200" height="4" fill="#4B5563" />
          </Stage>

          {/* 2. Канализация — труба внизу */}
          <Stage on={isOn(1)}>
            <circle cx="80" cy="234" r="3" fill="#1F2937" />
            <circle cx="220" cy="234" r="3" fill="#1F2937" />
            <line
              x1="80"
              y1="234"
              x2="220"
              y2="234"
              stroke="#1F2937"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          </Stage>

          {/* 3. Скважина — насос/колонка справа */}
          <Stage on={isOn(2)}>
            <rect x="265" y="200" width="6" height="40" fill="#374151" />
            <circle cx="268" cy="198" r="6" fill="#1162FF" />
            <line
              x1="268"
              y1="240"
              x2="268"
              y2="258"
              stroke="#374151"
              strokeWidth="2"
            />
          </Stage>

          {/* 4. Возведение коробки — стены */}
          <Stage on={isOn(3)}>
            <rect
              x="60"
              y="120"
              width="180"
              height="105"
              fill="url(#brick)"
              stroke="#1162FF"
              strokeWidth="1.5"
            />
            {/* кирпичная фактура */}
            {Array.from({ length: 5 }).map((_, i) => (
              <line
                key={i}
                x1="60"
                y1={140 + i * 18}
                x2="240"
                y2={140 + i * 18}
                stroke="#C8DCFF"
                strokeWidth="0.6"
              />
            ))}
          </Stage>

          {/* 5. Кровля */}
          <Stage on={isOn(4)}>
            <polygon
              points="50,120 150,55 250,120"
              fill="url(#roof)"
              stroke="#0A4DDB"
              strokeWidth="1"
            />
            <polygon points="50,120 150,55 150,75 60,128" fill="#0A4DDB" opacity="0.3" />
          </Stage>

          {/* 6. Фасад — обводка и фактура наружных стен */}
          <Stage on={isOn(5)}>
            <rect
              x="60"
              y="120"
              width="180"
              height="105"
              fill="none"
              stroke="#1162FF"
              strokeWidth="3"
            />
            {/* декоративная отделка карниза */}
            <rect x="55" y="115" width="190" height="8" fill="#1162FF" opacity="0.5" />
          </Stage>

          {/* 7. Окна */}
          <Stage on={isOn(6)}>
            {/* окна 1 ряд */}
            <Window x={80} y={140} />
            <Window x={138} y={140} />
            <Window x={196} y={140} />
            {/* окна 2 ряд */}
            <Window x={80} y={185} />
            <Window x={196} y={185} />
            {/* дверь по центру */}
            <rect
              x="135"
              y="180"
              width="30"
              height="45"
              rx="2"
              fill="#0A4DDB"
            />
            <circle cx="159" cy="203" r="1.5" fill="#FCDD2B" />
          </Stage>

          {/* 8. Сантехника / отопление — труба-вытяжка из крыши */}
          <Stage on={isOn(7)}>
            <rect x="190" y="65" width="10" height="22" fill="#6B7280" />
            <ellipse cx="195" cy="64" rx="6" ry="2" fill="#9CA3AF" />
            {/* пар */}
            <circle cx="195" cy="55" r="3" fill="#E5E7EB" opacity="0.7" />
            <circle cx="200" cy="48" r="2.5" fill="#E5E7EB" opacity="0.5" />
          </Stage>

          {/* 9. Электрика — провод + лампы в окнах горят */}
          <Stage on={isOn(8)}>
            <line
              x1="0"
              y1="80"
              x2="60"
              y2="100"
              stroke="#1F2937"
              strokeWidth="1.2"
            />
            <line
              x1="240"
              y1="100"
              x2="300"
              y2="80"
              stroke="#1F2937"
              strokeWidth="1.2"
            />
            {/* "горят" окна */}
            <rect x="82" y="142" width="16" height="22" fill="#FCDD2B" opacity="0.85" />
            <rect x="140" y="142" width="16" height="22" fill="#FCDD2B" opacity="0.85" />
            <rect x="198" y="142" width="16" height="22" fill="#FCDD2B" opacity="0.85" />
          </Stage>

          {/* 10. Полусухая стяжка — пол отчётливо ровный */}
          <Stage on={isOn(9)}>
            <rect x="60" y="220" width="180" height="5" fill="#1162FF" opacity="0.6" />
          </Stage>

          {/* 11. Штукатурка — фасад чистый, появляется блик */}
          <Stage on={isOn(10)}>
            <rect
              x="60"
              y="120"
              width="180"
              height="105"
              fill="white"
              opacity="0.55"
            />
            <rect x="62" y="122" width="6" height="101" fill="white" opacity="0.7" />
          </Stage>

          {/* 12. Вывоз мусора — площадка чистая, появляется дорожка */}
          <Stage on={isOn(11)}>
            <rect x="135" y="245" width="30" height="13" fill="#9CA3AF" />
            <line
              x1="0"
              y1="252"
              x2="300"
              y2="252"
              stroke="#6B7280"
              strokeWidth="0.6"
              strokeDasharray="6 4"
            />
            {/* дерево */}
            <rect x="20" y="220" width="3" height="20" fill="#6B4226" />
            <circle cx="21.5" cy="218" r="10" fill="#22c55e" />
          </Stage>

          {/* 13. Сдача дома — флаг */}
          <Stage on={isOn(12)}>
            <line
              x1="150"
              y1="55"
              x2="150"
              y2="25"
              stroke="#374151"
              strokeWidth="1.5"
            />
            <polygon points="150,25 175,33 150,42" fill="#10b981" />
          </Stage>
        </svg>

        {/* Подпись текущего этапа */}
        <div className="text-center w-full px-2">
          <div className="text-sam-text-soft text-[10px] uppercase tracking-wider">
            Сейчас идёт
          </div>
          <div className="text-sam-text font-bold text-sm mt-0.5 truncate">
            {safeStage > 0 && safeStage <= totalStages
              ? `${safeStage}. ${HOUSE_STAGES[safeStage - 1]}`
              : safeStage === 0
                ? "Стройка ещё не начата"
                : "Дом сдан 🎉"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stage({
  on,
  children,
}: {
  on: boolean;
  children: React.ReactNode;
}) {
  return (
    <g
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(8px)",
        transformOrigin: "center bottom",
        transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(.4,0,.2,1)",
      }}
    >
      {children}
    </g>
  );
}

function Window({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="20"
        height="26"
        fill="#E8F0FF"
        stroke="#1162FF"
        strokeWidth="1.2"
      />
      <line
        x1={x + 10}
        y1={y}
        x2={x + 10}
        y2={y + 26}
        stroke="#1162FF"
        strokeWidth="0.7"
      />
      <line
        x1={x}
        y1={y + 13}
        x2={x + 20}
        y2={y + 13}
        stroke="#1162FF"
        strokeWidth="0.7"
      />
    </g>
  );
}
