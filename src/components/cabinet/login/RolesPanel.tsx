import Icon from "@/components/ui/icon";
import { roles, Role } from "../roles";

interface RolesPanelProps {
  onSelectRole: (r: Role) => void;
}

export default function RolesPanel({ onSelectRole }: RolesPanelProps) {
  return (
    <div className="w-full roles-pane">
      <div className="mb-5 border-l-4 border-gs-yellow pl-3">
        <div className="text-white text-xs uppercase tracking-[0.2em] font-bold">Выберите роль</div>
        <div className="text-gs-yellow text-[11px] mt-1">ID подставится автоматически</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => onSelectRole(r)}
            className="role-card group relative rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-md hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon name={r.icon} size={22} />
              <div className="min-w-0 flex-1">
                <div className="text-gs-navy text-sm font-bold truncate leading-tight">{r.name}</div>
                <div className="text-gs-gray text-[10px] font-mono truncate mt-0.5">{r.loginId}</div>
              </div>
            </div>
            <div className="text-gs-gray text-[11px] leading-snug line-clamp-2">{r.description}</div>
          </button>
        ))}
      </div>

      {/* Слоган под карточками ролей — в фирменных цветах */}
      <div className="mt-10 text-center relative">
        {/* Декоративная градиентная линия */}
        <div
          className="h-1 w-32 mx-auto mb-5 rounded-full"
          style={{ background: "linear-gradient(90deg, #FCDD2B 0%, #F77D00 100%)" }}
        />
        <div className="neon-slogan font-inter text-xl md:text-2xl tracking-[0.25em] uppercase leading-relaxed">
          <span className="neon-word">Качество</span>{" "}
          <span className="neon-word">доступное</span>{" "}
          <span className="neon-word">каждому</span>
        </div>
      </div>
    </div>
  );
}
