import { NavLink } from "react-router-dom";
import { modules } from "../../data/moduleData";

const SidebarMenu = ({ collapsed }) => {
  return (
    <nav className="mt-5 px-3">
      {!collapsed && (
        <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/50">
          Modules
        </p>
      )}

      <div className="space-y-1.5">
        {modules.map((module) => {
          const Icon = module.icon;

          return (
            <NavLink
              key={module.path}
              to={module.path}
              title={collapsed ? module.title : ""}
              className={({ isActive }) => `
                group
                flex
                items-center
                rounded-xl
                transition-all
                duration-200
                ${
                  collapsed
                    ? "justify-center w-full h-12"
                    : "gap-3 px-3 h-12"
                }
                ${
                  isActive
                    ? "bg-white text-deem-blue shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <Icon
                size={21}
                strokeWidth={1.8}
                className="shrink-0"
              />

              {!collapsed && (
                <span className="text-sm font-medium truncate">
                  {module.title}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default SidebarMenu;