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
    return (
      <Login
        onLogin={(r) => {
          setRole(r);
          setActive("workspace");
        }}
      />
    );
  }

  const allowed = role.sections.includes(active)
    ? active
    : role.sections[0] ?? "dashboard";
  const currentNav = navItems.find((n) => n.id === allowed);
  const currentLabel = currentNav?.label ?? "Главная";
  const currentCode = currentNav?.code ?? "D1";
  const canCreateProject = role.id === "gip";

  return (
    <div className="flex h-screen font-inter overflow-hidden relative bg-sam-bg">
      <Sidebar
        active={allowed}
        setActive={setActive}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        role={role}
        onLogout={() => {
          setRole(null);
          setActive("workspace");
        }}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Верхняя мини-полоса со служебными ссылками — как у Самолёта */}
        <div className="hidden md:flex items-center gap-5 px-7 pt-3 pb-2 text-[12px] text-sam-text-soft shrink-0">
          <a href="#" className="hover:text-sam-text transition-colors">
            О компании
          </a>
          <a href="#" className="hover:text-sam-text transition-colors">
            Выдача ключей
          </a>
          <a href="#" className="hover:text-sam-text transition-colors">
            Инвесторам
          </a>
          <a href="#" className="hover:text-sam-text transition-colors">
            Для жителей
          </a>
          <a href="#" className="hover:text-sam-text transition-colors">
            Сообщить о коррупции
          </a>
          <div className="ml-auto flex items-center gap-4">
            <a
              href="#"
              className="text-sam-blue hover:text-sam-blue-dark transition-colors font-semibold"
            >
              Напишите нам
            </a>
            <button className="flex items-center gap-1.5 text-sam-text hover:text-sam-blue transition-colors">
              <Icon name="Navigation" size={13} flat />
              Екатеринбург
            </button>
          </div>
        </div>

        {/* Главный topbar */}
        <header className="bg-white rounded-t-2xl mx-3 md:mx-5 mt-1 px-4 md:px-6 py-3 flex items-center gap-4 shrink-0 shadow-sm border border-sam-border border-b-0">
          <button
            className="lg:hidden text-sam-text-soft hover:text-sam-blue p-2 rounded-full hover:bg-sam-bg transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="Menu" size={20} flat />
          </button>

          {/* Активный pill — название текущего раздела */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-sam-blue-soft text-sam-blue text-[13px] font-semibold shrink-0 hover:bg-sam-blue/10 transition-colors">
            <Icon name={currentNav?.icon ?? "LayoutGrid"} size={14} flat />
            <span className="hidden sm:inline">{currentLabel}</span>
            <span
              className="font-mono text-[10px] bg-white/70 text-sam-blue px-1.5 py-0.5 rounded ml-1"
              title="Код раздела для задач"
            >
              {currentCode}
            </span>
          </button>

          {/* Быстрые ссылки-pill (как у «Самолёта») */}
          <nav className="hidden xl:flex items-center gap-1 ml-2">
            <a
              href="#"
              className="px-3 py-2 text-[13px] text-sam-text hover:text-sam-blue rounded-full hover:bg-sam-bg transition-colors"
            >
              Поиск проекта
            </a>
            <a
              href="#"
              className="px-3 py-2 text-[13px] text-sam-text hover:text-sam-blue rounded-full hover:bg-sam-bg transition-colors"
            >
              Объекты
            </a>
            <a
              href="#"
              className="px-3 py-2 text-[13px] text-sam-text hover:text-sam-blue rounded-full hover:bg-sam-bg transition-colors"
            >
              Команда
            </a>
            <a
              href="#"
              className="px-3 py-2 text-[13px] text-sam-text hover:text-sam-blue rounded-full hover:bg-sam-bg transition-colors"
            >
              Сервисы
            </a>
          </nav>

          <div className="flex-1" />

          {/* Контакты + действия */}
          <div className="hidden lg:flex items-center text-sam-text font-semibold text-[14px] mr-1">
            +7 343 200-00-00
          </div>

          <button className="relative w-10 h-10 rounded-full bg-sam-bg hover:bg-sam-blue-soft text-sam-text hover:text-sam-blue transition-colors flex items-center justify-center shrink-0">
            <Icon name="Heart" size={16} flat />
          </button>
          <button className="relative w-10 h-10 rounded-full bg-sam-bg hover:bg-sam-blue-soft text-sam-text hover:text-sam-blue transition-colors flex items-center justify-center shrink-0">
            <Icon name="Bell" size={16} flat />
            <span className="absolute top-2 right-2 w-2 h-2 bg-sam-blue rounded-full ring-2 ring-white" />
          </button>

          {canCreateProject && (
            <button
              onClick={() => setCreateOpen(true)}
              className="px-5 py-2.5 bg-sam-blue hover:bg-sam-blue-dark text-white text-[13px] font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 active:scale-95 shadow-sm shadow-sam-blue/20 shrink-0"
            >
              <Icon name="Plus" size={14} flat />
              <span className="hidden sm:inline">Новый проект</span>
            </button>
          )}
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden px-3 md:px-5 pb-5 max-w-full">
          <div className="max-w-[1600px] mx-auto w-full bg-white rounded-b-2xl border border-sam-border border-t-0 shadow-sm p-4 md:p-6 min-h-[calc(100%-4px)]">
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
