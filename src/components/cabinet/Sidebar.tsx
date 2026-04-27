import { useRef, useState, useEffect } from "react";
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

const LOGO_URL =
  "https://cdn.poehali.dev/projects/13dba3bf-6323-4724-9f70-0455e15a1ea0/files/344584dc-fd85-4234-adb3-94a895405b4a.jpg";

export default function Sidebar({
  active,
  setActive,
  sidebarOpen,
  setSidebarOpen,
  role,
  onLogout,
}: SidebarProps) {
  const allowed = navItems.filter((n) => role.sections.includes(n.id));
  const navRef = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<{ y: number; visible: boolean }>({
    y: 0,
    visible: false,
  });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const navRect = navRef.current?.getBoundingClientRect();
    const btnRect = e.currentTarget.getBoundingClientRect();
    if (!navRect) return;
    setHover({
      y: btnRect.top - navRect.top,
      visible: true,
    });
  };

  const handleLeave = () => {
    setHover((h) => ({ ...h, visible: false }));
  };

  // Прячем подсветку при смене активного пункта
  useEffect(() => {
    setHover((h) => ({ ...h, visible: false }));
  }, [active]);

  return (
    <>
      <aside
        className={`fixed lg:static z-40 h-full w-64 bg-white border-r border-sam-border flex flex-col transition-transform duration-300 shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-5 py-5 shrink-0">
          <div className="flex items-center gap-2.5">
            <img
              src={LOGO_URL}
              alt="ГЛОБАЛСТ"
              className="w-11 h-11 object-contain shrink-0"
            />
            <div className="min-w-0">
              <div className="font-inter text-sam-text text-[15px] font-bold tracking-tight leading-none truncate">
                ГЛОБАЛСТ
              </div>
              <div className="text-sam-text-soft text-[10px] mt-1 leading-none">
                кварталы для жизни
              </div>
            </div>
          </div>
        </div>

        {/* Role pill */}
        <div className="px-5 pb-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-sam-pill">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: role.color }}
            />
            <span className="text-sam-text-soft text-[11px]">Роль:</span>
            <span className="text-sam-text text-[11px] font-semibold">
              {role.shortName}
            </span>
          </div>
        </div>

        {/* Nav: текст без иконок + плавный синий hover-фон, который следует за курсором */}
        <nav
          ref={navRef}
          className="flex-1 px-3 pb-3 overflow-y-auto relative"
          onMouseLeave={handleLeave}
        >
          {/* Плавающий синий hover-фон */}
          <div
            className="absolute left-3 right-3 h-10 rounded-xl bg-sam-blue-soft pointer-events-none transition-all duration-300 ease-out"
            style={{
              transform: `translateY(${hover.y}px)`,
              opacity: hover.visible ? 1 : 0,
            }}
          />
          <div className="relative space-y-0.5">
            {allowed.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onMouseEnter={handleMove}
                  onClick={() => {
                    setActive(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`relative z-10 w-full flex items-center px-4 h-10 text-[13px] rounded-xl transition-colors duration-200 ${
                    isActive
                      ? "bg-sam-blue text-white font-semibold shadow-sm shadow-sam-blue/20"
                      : "text-sam-text hover:text-sam-blue font-medium"
                  }`}
                >
                  <span className="flex-1 text-left truncate">
                    {item.label}
                  </span>
                  <span
                    className={`font-mono text-[9px] tracking-wider px-1.5 py-0.5 rounded ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-sam-pill text-sam-text-soft"
                    }`}
                    title={`Код раздела: ${item.code}`}
                  >
                    {item.code}
                  </span>
                  {item.badge && (
                    <span
                      className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                        isActive
                          ? "bg-white text-sam-blue"
                          : "bg-sam-blue text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-sam-border shrink-0">
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: role.color + "18" }}
            >
              <span
                className="text-[11px] font-bold"
                style={{ color: role.color }}
              >
                {role.shortName}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sam-text text-[13px] font-semibold truncate">
                {role.name}
              </div>
              <div className="text-sam-text-soft text-[11px] truncate font-mono">
                {role.loginId}
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-full bg-sam-bg hover:bg-sam-pill text-sam-text-soft hover:text-sam-blue text-[12px] font-semibold transition-all"
          >
            <Icon name="LogOut" size={12} flat />
            Выйти
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-sam-text/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}