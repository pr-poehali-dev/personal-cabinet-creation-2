import Icon from "@/components/ui/icon";
import { navItems, Section } from "./constants";

interface SidebarProps {
  active: Section;
  setActive: (s: Section) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

export default function Sidebar({ active, setActive, sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed lg:static z-40 h-full w-64 bg-[#111111] border-r border-build-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-build-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-build-orange flex items-center justify-center animate-pulse-orange">
              <Icon name="HardHat" size={18} className="text-white" />
            </div>
            <div>
              <div className="font-oswald text-white text-lg font-semibold tracking-wide leading-none">СТРОЙ</div>
              <div className="font-oswald text-build-orange text-xs tracking-[0.2em] uppercase">Кабинет</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-200 relative group ${
                active === item.id
                  ? "text-white bg-build-orange/10 border-r-2 border-build-orange"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="bg-build-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-5 py-4 border-t border-build-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-build-orange/20 border border-build-orange/40 flex items-center justify-center">
              <span className="text-build-orange text-xs font-bold">ГД</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">Генеральный директор</div>
              <div className="text-gray-500 text-[11px] truncate">Полный доступ</div>
            </div>
            <Icon name="Settings" size={14} className="text-gray-500 hover:text-white cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  );
}
