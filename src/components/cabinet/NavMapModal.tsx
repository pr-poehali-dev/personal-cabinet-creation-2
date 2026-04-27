import { useState } from "react";
import Icon from "@/components/ui/icon";
import { navMap } from "./constants";

export default function NavMapModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-3 right-14 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-white text-sam-blue border border-sam-border hover:bg-sam-blue hover:text-white hover:border-sam-blue transition-all shadow-sm text-[12px] font-semibold"
        title="Карта навигации — коды разделов"
      >
        <Icon name="Map" size={14} flat />
        Карта
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gs-navy text-white px-6 py-4 flex items-center justify-between shrink-0 border-b-2 border-gs-yellow">
              <div className="flex items-center gap-3">
                <Icon name="Map" size={20} flat className="text-gs-yellow" />
                <div>
                  <div className="font-inter text-base font-extrabold tracking-tight">
                    Карта навигации кабинета
                  </div>
                  <div className="text-white/60 text-xs mt-0.5">
                    Используй коды чтобы быстро ставить задачи: «Поправь D2.2»
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Icon name="X" size={20} flat />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-5 space-y-3">
              {navMap.map((section) => (
                <div
                  key={section.code}
                  className="border border-gs-navy/15 rounded-xl overflow-hidden"
                >
                  <div className="bg-gs-navy/5 px-4 py-2.5 flex items-center gap-3 border-b border-gs-navy/10">
                    <button
                      onClick={() => copy(section.code)}
                      className="font-mono text-xs font-bold bg-gs-yellow text-gs-navy px-2 py-0.5 rounded hover:scale-110 transition-transform"
                      title="Скопировать код"
                    >
                      {copied === section.code ? "✓" : section.code}
                    </button>
                    <div className="font-inter text-gs-navy font-bold text-sm">
                      {section.name}
                    </div>
                  </div>
                  <div className="divide-y divide-gs-navy/10">
                    {section.blocks.map((block) => (
                      <div
                        key={block.code}
                        className="px-4 py-2 flex items-center gap-3 hover:bg-gs-yellow/10 transition-colors"
                      >
                        <button
                          onClick={() => copy(block.code)}
                          className="font-mono text-[10px] font-bold bg-gs-navy/10 text-gs-navy px-2 py-0.5 rounded hover:bg-gs-yellow hover:scale-110 transition-all min-w-[42px] text-center"
                          title="Скопировать код"
                        >
                          {copied === block.code ? "✓" : block.code}
                        </button>
                        <div className="text-gs-navy/80 text-xs flex-1">
                          {block.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-gs-navy/5 px-5 py-3 border-t border-gs-navy/10 shrink-0">
              <div className="flex items-start gap-2 text-[11px] text-gs-navy/70">
                <Icon name="Lightbulb" size={14} flat className="text-gs-yellow shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Как ставить задачи Юре:</span>{" "}
                  «Перекрась <span className="font-mono bg-gs-yellow/30 px-1 rounded">D1.2</span> в зелёный»,
                  «Добавь поиск в <span className="font-mono bg-gs-yellow/30 px-1 rounded">D6</span>»,
                  «Сделай <span className="font-mono bg-gs-yellow/30 px-1 rounded">L3</span> быстрее».
                  Кликни на код — он скопируется.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}