import { useState } from "react";
import Icon from "@/components/ui/icon";
import Sidebar from "@/components/cabinet/Sidebar";
import DashboardSections from "@/components/cabinet/DashboardSections";
import DataSections from "@/components/cabinet/DataSections";
import Login from "@/components/cabinet/Login";
import RoleHome from "@/components/cabinet/RoleHome";
import CreateProjectModal from "@/components/cabinet/CreateProjectModal";
import VersionBadge from "@/components/cabinet/VersionBadge";
import NavMapModal from "@/components/cabinet/NavMapModal";
import AccessManagement from "@/components/cabinet/AccessManagement";
import DashboardBuilder from "@/components/cabinet/builder/DashboardBuilder";
import { navItems, Section } from "@/components/cabinet/constants";
import { Role } from "@/components/cabinet/roles";

export default function Index() {
  const [role, setRole] = useState<Role | null>(null);
  const [active, setActive] = useState<Section>("workspace");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  if (!role) {
    return <Login onLogin={(r) => { setRole(r); setActive("workspace"); }} />;
  }

  // Фильтруем активный раздел: если у роли нет доступа — переключаем на workspace
  const allowed = role.sections.includes(active) ? active : (role.sections[0] ?? "dashboard");
  const currentNav = navItems.find((n) => n.id === allowed);
  const currentLabel = currentNav?.label ?? "Главная";
  const currentCode = currentNav?.code ?? "D1";
  const canCreateProject = role.id === "gip";

  return (
    <div
      className="flex h-screen font-inter overflow-hidden relative"
      style={{
        background:
          "radial-gradient(ellipse at top left, #3A4C67 0%, transparent 55%), radial-gradient(ellipse at bottom right, #6B7C90 0%, transparent 55%), linear-gradient(135deg, #1A2D4D 0%, #0F1E33 100%)",
      }}
    >
      <Sidebar
        active={allowed}
        setActive={setActive}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        role={role}
        onLogout={() => { setRole(null); setActive("workspace"); }}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header
          className="backdrop-blur-md border-b border-white/10 px-6 py-3 flex items-center gap-4 shrink-0 relative"
          style={{ background: "linear-gradient(135deg, rgba(26,45,77,0.95) 0%, rgba(58,76,103,0.85) 100%)" }}
        >
          {/* Жёлтая декоративная полоса снизу */}
          <div className="absolute bottom-0 left-0 w-24 h-0.5 bg-gs-yellow" />

          <button
            className="lg:hidden text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="Menu" size={20} flat />
          </button>

          <div className="flex-1 min-w-0 border-l-4 border-gs-yellow pl-3">
            <div className="flex items-center gap-2">
              <h1 className="font-inter text-white text-lg font-extrabold tracking-tight leading-none truncate">{currentLabel}</h1>
              <span
                className="font-mono text-[10px] font-bold bg-gs-yellow/20 text-gs-yellow px-1.5 py-0.5 rounded shrink-0"
                title="Код раздела для постановки задач"
              >
                {currentCode}
              </span>
            </div>
            <p className="text-white/60 text-[11px] mt-1 truncate">
              {role.fullName} · ID: <span className="font-mono text-gs-yellow">{role.loginId}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Icon name="Bell" size={18} flat className="text-white/80" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gs-yellow rounded-full" />
            </button>
            {canCreateProject && (
              <button
                onClick={() => setCreateOpen(true)}
                className="px-4 py-2 bg-gs-yellow hover:bg-gs-orange text-gs-navy hover:text-white text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 shadow-md uppercase tracking-wider"
              >
                <Icon name="Plus" size={14} flat />
                <span className="hidden sm:inline">Новый проект</span>
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 max-w-full">
          <div className="max-w-[1600px] mx-auto w-full">
            {allowed === "workspace" ? (
              <DashboardBuilder roleId={role.id} />
            ) : allowed === "dashboard" ? (
              <RoleHome role={role} />
            ) : allowed === "access" ? (
              <AccessManagement />
            ) : (
              <>
                <DashboardSections active={allowed} setActive={setActive} />
                <DataSections active={allowed} />
              </>
            )}
          </div>
        </main>
      </div>

      <CreateProjectModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <NavMapModal />
      <VersionBadge />
    </div>
  );
}