import { useState } from "react";
import Icon from "@/components/ui/icon";
import Sidebar from "@/components/cabinet/Sidebar";
import DashboardSections from "@/components/cabinet/DashboardSections";
import DataSections from "@/components/cabinet/DataSections";
import Login from "@/components/cabinet/Login";
import RoleHome from "@/components/cabinet/RoleHome";
import CreateProjectModal from "@/components/cabinet/CreateProjectModal";
import AnimatedBackground from "@/components/cabinet/AnimatedBackground";
import VersionBadge from "@/components/cabinet/VersionBadge";
import AccessManagement from "@/components/cabinet/AccessManagement";
import { navItems, Section } from "@/components/cabinet/constants";
import { Role } from "@/components/cabinet/roles";

export default function Index() {
  const [role, setRole] = useState<Role | null>(null);
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  if (!role) {
    return <Login onLogin={(r) => { setRole(r); setActive("dashboard"); }} />;
  }

  // Фильтруем активный раздел: если у роли нет доступа — переключаем на dashboard
  const allowed = role.sections.includes(active) ? active : "dashboard";
  const currentLabel = navItems.find((n) => n.id === allowed)?.label ?? "Главная";
  const canCreateProject = role.id === "gip";

  return (
    <div className="flex h-screen bg-build-dark font-golos overflow-hidden relative">
      <AnimatedBackground />
      <Sidebar
        active={allowed}
        setActive={setActive}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        role={role}
        onLogout={() => { setRole(null); setActive("dashboard"); }}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header
          className="backdrop-blur-md border-b border-build-border px-6 py-4 flex items-center gap-4 shrink-0 relative"
          style={{ background: "linear-gradient(135deg, rgba(26,45,77,0.95) 0%, rgba(58,76,103,0.85) 100%)" }}
        >
          {/* Жёлтая декоративная полоса снизу */}
          <div className="absolute bottom-0 left-0 w-24 h-0.5 bg-gs-yellow" />
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Icon name="Menu" size={22} />
          </button>
          <div className="flex-1">
            <h1 className="font-oswald text-white text-xl font-semibold tracking-wide">{currentLabel}</h1>
            <p className="text-gray-500 text-xs mt-0.5">
              {role.fullName} · ID: <span className="font-mono">{role.loginId}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Icon name="Bell" size={18} className="text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-build-orange rounded-full" />
            </button>
            {canCreateProject && (
              <button
                onClick={() => setCreateOpen(true)}
                className="px-4 py-2 bg-gs-yellow hover:bg-gs-orange text-gs-navy hover:text-white text-sm font-bold rounded-lg transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-md"
              >
                <Icon name="Plus" size={16} />
                Новый проект
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {allowed === "dashboard" ? (
            <RoleHome role={role} />
          ) : allowed === "access" ? (
            <AccessManagement />
          ) : (
            <>
              <DashboardSections active={allowed} setActive={setActive} />
              <DataSections active={allowed} />
            </>
          )}
        </main>
      </div>

      <CreateProjectModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <VersionBadge />
    </div>
  );
}