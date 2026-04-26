import { useState } from "react";
import Icon from "@/components/ui/icon";
import Sidebar from "@/components/cabinet/Sidebar";
import DashboardSections from "@/components/cabinet/DashboardSections";
import DataSections from "@/components/cabinet/DataSections";
import { navItems, Section } from "@/components/cabinet/constants";

export default function Index() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-build-dark font-golos overflow-hidden">
      <Sidebar
        active={active}
        setActive={setActive}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-[#111111] border-b border-build-border px-6 py-4 flex items-center gap-4 shrink-0">
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Icon name="Menu" size={22} />
          </button>
          <div className="flex-1">
            <h1 className="font-oswald text-white text-xl font-semibold tracking-wide">
              {navItems.find((n) => n.id === active)?.label}
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">26 апреля 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Icon name="Bell" size={18} className="text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-build-orange rounded-full" />
            </button>
            <button className="px-4 py-2 bg-build-orange hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95">
              <Icon name="Plus" size={16} />
              Добавить
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <DashboardSections active={active} setActive={setActive} />
          <DataSections active={active} />
        </main>
      </div>
    </div>
  );
}
