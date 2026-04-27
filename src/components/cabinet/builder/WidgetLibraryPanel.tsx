import Icon from "@/components/ui/icon";
import { WIDGET_LIBRARY, WidgetMeta } from "./widgetTypes";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (meta: WidgetMeta) => void;
}

export default function WidgetLibraryPanel({ open, onClose, onAdd }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gs-navy text-white px-5 py-3 flex items-center justify-between border-b-2 border-gs-yellow">
          <div className="flex items-center gap-2">
            <Icon name="LayoutGrid" size={18} flat className="text-gs-yellow" />
            <div className="font-inter font-extrabold tracking-tight">
              Библиотека модулей
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            <Icon name="X" size={18} flat />
          </button>
        </div>
        <div className="overflow-y-auto p-4 grid grid-cols-2 gap-3">
          {WIDGET_LIBRARY.map((meta) => (
            <button
              key={meta.type}
              onClick={() => {
                onAdd(meta);
                onClose();
              }}
              className="text-left border border-gs-navy/15 rounded-xl p-3 hover:border-gs-yellow hover:shadow-md hover:-translate-y-0.5 transition-all bg-white"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: meta.color + "22" }}
                >
                  <Icon
                    name={meta.icon}
                    size={18}
                    flat
                    style={{ color: meta.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gs-navy text-sm">
                    {meta.name}
                  </div>
                  <div className="text-gs-gray text-[11px] mt-0.5 leading-snug">
                    {meta.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
