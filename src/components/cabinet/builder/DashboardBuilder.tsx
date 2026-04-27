import { useState, useEffect, useMemo } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Icon from "@/components/ui/icon";
import {
  WidgetData,
  WidgetMeta,
  DEFAULT_LAYOUT,
} from "./widgetTypes";
import WidgetRenderer from "./WidgetRenderer";
import WidgetLibraryPanel from "./WidgetLibraryPanel";
import WidgetEditDialog from "./WidgetEditDialog";

interface Props {
  roleId: string;
}

const STORAGE_KEY = (roleId: string) => `gs_dashboard_${roleId}_v1`;

export default function DashboardBuilder({ roleId }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [widgets, setWidgets] = useState<WidgetData[]>([]);
  const [libOpen, setLibOpen] = useState(false);
  const [editing, setEditing] = useState<WidgetData | null>(null);
  const [width, setWidth] = useState(1200);

  // Загрузка раскладки
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY(roleId));
      if (raw) {
        setWidgets(JSON.parse(raw));
      } else {
        setWidgets(DEFAULT_LAYOUT);
      }
    } catch {
      setWidgets(DEFAULT_LAYOUT);
    }
  }, [roleId]);

  // Автосохранение
  useEffect(() => {
    if (widgets.length === 0) return;
    localStorage.setItem(STORAGE_KEY(roleId), JSON.stringify(widgets));
  }, [widgets, roleId]);

  // Замер ширины контейнера
  useEffect(() => {
    const update = () => {
      const el = document.getElementById("builder-grid-wrap");
      if (el) setWidth(el.clientWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [editMode]);

  const onLayoutChange = (layout: { i: string; x: number; y: number; w: number; h: number }[]) => {
    setWidgets((prev) =>
      prev.map((w) => {
        const l = layout.find((it) => it.i === w.i);
        return l ? { ...w, x: l.x, y: l.y, w: l.w, h: l.h } : w;
      })
    );
  };

  const handleAdd = (meta: WidgetMeta) => {
    const id = `w${Date.now()}`;
    const maxY = widgets.reduce((m, w) => Math.max(m, w.y + w.h), 0);
    setWidgets((prev) => [
      ...prev,
      {
        i: id,
        type: meta.type,
        title: meta.defaultTitle,
        x: 0,
        y: maxY,
        w: meta.defaultW,
        h: meta.defaultH,
        config: meta.defaultConfig,
      },
    ]);
  };

  const handleSave = (w: WidgetData) => {
    setWidgets((prev) => prev.map((it) => (it.i === w.i ? w : it)));
  };

  const handleDelete = (id: string) => {
    setWidgets((prev) => prev.filter((it) => it.i !== id));
  };

  const reset = () => {
    if (confirm("Сбросить рабочий стол к стандартному виду?")) {
      setWidgets(DEFAULT_LAYOUT);
    }
  };

  const layout = useMemo(
    () =>
      widgets.map((w) => ({
        i: w.i,
        x: w.x,
        y: w.y,
        w: w.w,
        h: w.h,
        minW: 2,
        minH: 2,
      })),
    [widgets]
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-inter text-sam-text text-2xl font-bold tracking-tight">
            Мой рабочий стол
          </h2>
          <p className="text-sam-text-soft text-[13px] mt-1">
            {editMode
              ? "Режим редактирования: тащи карточки за заголовок, тяни за угол чтобы изменить размер"
              : "Нажми «Настроить», чтобы перетаскивать модули и менять их размер"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {editMode && (
            <>
              <button
                onClick={() => setLibOpen(true)}
                className="px-4 py-2 rounded-full bg-sam-blue text-white text-[13px] font-semibold flex items-center gap-1.5 hover:bg-sam-blue-dark transition-colors shadow-sm shadow-sam-blue/20"
              >
                <Icon name="Plus" size={14} flat />
                Добавить модуль
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 rounded-full bg-sam-bg text-sam-text text-[13px] font-semibold flex items-center gap-1.5 hover:bg-sam-pill transition-colors"
              >
                <Icon name="RotateCcw" size={14} flat />
                Сброс
              </button>
            </>
          )}
          <button
            onClick={() => setEditMode((v) => !v)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold flex items-center gap-1.5 transition-all ${
              editMode
                ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm shadow-emerald-500/20"
                : "bg-sam-blue-soft text-sam-blue hover:bg-sam-blue hover:text-white"
            }`}
          >
            <Icon name={editMode ? "Check" : "Settings2"} size={14} flat />
            {editMode ? "Готово" : "Настроить"}
          </button>
        </div>
      </div>

      {/* Edit-mode hint */}
      {editMode && (
        <div className="bg-sam-blue-soft border border-sam-blue/20 rounded-2xl px-4 py-3 flex items-start gap-2">
          <Icon name="Info" size={14} flat className="text-sam-blue mt-0.5 shrink-0" />
          <div className="text-sam-text text-[12px] leading-relaxed">
            Тащи модули за серый верхний край. Меняй размер за правый-нижний
            угол. Кликни на шестерёнку чтобы переименовать или изменить
            содержимое модуля.
          </div>
        </div>
      )}

      {/* Grid */}
      <div
        id="builder-grid-wrap"
        className={`relative rounded-2xl ${
          editMode ? "bg-sam-bg border-2 border-dashed border-sam-blue/30 p-2" : ""
        }`}
      >
        {widgets.length === 0 ? (
          <div className="text-center py-20 text-sam-text-soft text-sm">
            Пока пусто. Нажми «Настроить» → «Добавить модуль».
          </div>
        ) : (
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={50}
            width={width}
            isDraggable={editMode}
            isResizable={editMode}
            draggableHandle=".widget-drag-handle"
            margin={[12, 12]}
            onLayoutChange={onLayoutChange}
          >
            {widgets.map((w) => (
              <div key={w.i} className="group">
                <div className="h-full bg-white rounded-2xl shadow-sm border border-sam-border overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  {editMode && (
                    <div className="widget-drag-handle bg-sam-bg cursor-move px-2 py-1 flex items-center justify-between shrink-0 border-b border-sam-border">
                      <div className="flex items-center gap-1.5 text-sam-text-soft text-[10px] font-semibold uppercase tracking-wider">
                        <Icon name="GripVertical" size={12} flat />
                        Перетащить
                      </div>
                      <button
                        onClick={() => setEditing(w)}
                        className="text-sam-text-soft hover:text-sam-blue transition-colors"
                        title="Настроить модуль"
                      >
                        <Icon name="Settings2" size={12} flat />
                      </button>
                    </div>
                  )}
                  <div className="flex-1 p-3 overflow-hidden">
                    <WidgetRenderer widget={w} />
                  </div>
                </div>
              </div>
            ))}
          </GridLayout>
        )}
      </div>

      <WidgetLibraryPanel
        open={libOpen}
        onClose={() => setLibOpen(false)}
        onAdd={handleAdd}
      />
      <WidgetEditDialog
        widget={editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}