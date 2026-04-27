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
        className={`fixed lg:static z-40 h-full w-60 backdrop-blur-md border-r border-white/10 flex flex-col transition-transform duration-300 shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          background: "linear-gradient(180deg, #1A2D4D 0%, #0F1E33 100%)",
        }}
      >
        {/* Logo — белый блок с лого */}
        <div className="px-4 py-4 bg-white/95 shrink-0">
          <div className="flex items-center gap-2.5">
            <img
              src="https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/bucket/e86a33ff-bcc0-41ee-ad09-efce63f6f6e6.png"
              alt="ГЛОБАЛСТ"
              className="w-10 h-10 object-contain shrink-0"
            />
            <div className="min-w-0">
              <div className="font-inter text-[#0B1E3F] text-base font-extrabold tracking-tight leading-none truncate">ГЛОБАЛСТ</div>
              <div className="text-[#1E3A8A] text-[8px] tracking-[0.18em] uppercase mt-1 font-semibold">Уральская СК</div>
            </div>
          </div>
        </div>

        {/* Жёлтая разделительная полоса */}
        <div className="h-0.5 bg-gs-yellow shrink-0" />

        {/* Role pill */}
        <div className="px-4 py-2.5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 text-[10px]">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: role.color }} />
            <span className="text-white/50 uppercase tracking-wider">Роль:</span>
            <span className="text-white font-bold tracking-wide">{role.shortName}</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {allowed.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium transition-all duration-200 relative ${
                active === item.id
                  ? "text-gs-yellow bg-white/8 border-r-2 border-gs-yellow"
                  : "text-white/65 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} size={16} flat className="shrink-0" />
              <span className="flex-1 text-left truncate">{item.label}</span>
              <span
                className={`font-mono text-[9px] tracking-wider px-1.5 py-0.5 rounded ${
                  active === item.id
                    ? "bg-gs-yellow/20 text-gs-yellow"
                    : "bg-white/5 text-white/40"
                }`}
                title={`Код раздела для задач: ${item.code}`}
              >
                {item.code}
              </span>
              {item.badge && (
                <span className="bg-gs-yellow text-gs-navy text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-3 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div
              className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0"
              style={{ background: role.color + "20", borderColor: role.color + "60" }}
            >
              <span className="text-[10px] font-bold" style={{ color: role.color }}>{role.shortName}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">{role.name}</div>
              <div className="text-white/40 text-[10px] truncate font-mono">{role.loginId}</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-1.5 rounded-md bg-white/5 hover:bg-gs-orange/20 text-white/60 hover:text-gs-yellow text-[11px] font-semibold transition-all"
          >
            <Icon name="LogOut" size={11} flat />
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