import Icon from "@/components/ui/icon";
import { navItems, Section } from "./constants";
import { Role } from "./roles";

interface SidebarProps {
  active: Section;
  setActive: (s: Section) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  role: Role;
  onLogout: () => void;
}

export default function Sidebar({ active, setActive, sidebarOpen, setSidebarOpen, role, onLogout }: SidebarProps) {
  const allowed = navItems.filter((n) => role.sections.includes(n.id));

  return (
    <>
      <aside
        className={`fixed lg:static z-40 h-full w-64 backdrop-blur-md border-r border-build-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          background: "linear-gradient(180deg, #1A2D4D 0%, #0F1E33 100%)",
        }}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-build-border bg-white/95">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/bucket/7719efe9-a05d-4249-9854-bebb3bda6cae.png"
              alt="ГлобалСтрой"
              className="w-12 h-12 object-contain shrink-0"
            />
            <div className="min-w-0">
              <div className="font-golos text-[#0B1E3F] text-base font-bold tracking-tight leading-none truncate">ГлобалСтрой</div>
              <div className="text-[#1E3A8A] text-[9px] tracking-[0.12em] uppercase mt-1.5 leading-tight font-golos font-semibold">Безопасное качество<br/>доступное каждому</div>
            </div>
          </div>
        </div>

        {/* Role pill */}
        <div className="px-5 py-3 border-b border-build-border">
          <div className="flex items-center gap-2 text-[11px]">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: role.color }} />
            <span className="text-gray-500 uppercase tracking-wider">Роль:</span>
            <span className="text-white font-semibold">{role.shortName}</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {allowed.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-200 relative group ${
                active === item.id
                  ? "text-white bg-build-orange/10 border-r-2 border-build-orange"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} size={18} flat />
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
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0"
              style={{ background: role.color + "20", borderColor: role.color + "60" }}
            >
              <span className="text-xs font-bold" style={{ color: role.color }}>{role.shortName}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">{role.name}</div>
              <div className="text-gray-500 text-[11px] truncate font-mono">{role.loginId}</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-build-orange/20 text-gray-400 hover:text-build-orange text-xs transition-all"
          >
            <Icon name="LogOut" size={12} flat />
            Выйти
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  );
}