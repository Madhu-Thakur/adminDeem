import { LogOut, Settings } from "lucide-react";

const SidebarActions = ({ collapsed }) => {
  return (
    <div className="mt-6 pt-5 border-t border-white/10 space-y-1.5">
      <button
        type="button"
        title={collapsed ? "Settings" : ""}
        className={`
          group
          flex
          items-center
          w-full
          rounded-xl
          text-white/80
          hover:bg-white/10
          hover:text-white
          transition-all
          duration-200
          cursor-pointer
          ${
            collapsed
              ? "justify-center h-12"
              : "gap-3 px-3 h-12"
          }
        `}
      >
        <Settings size={21} strokeWidth={1.8} />

        {!collapsed && (
          <span className="text-sm font-medium">
            Settings
          </span>
        )}
      </button>

      <button
        type="button"
        title={collapsed ? "Logout" : ""}
        className={`
          group
          flex
          items-center
          w-full
          rounded-xl
          text-white/80
          hover:bg-red-500/20
          hover:text-red-300
          transition-all
          duration-200
          cursor-pointer
          ${
            collapsed
              ? "justify-center h-12"
              : "gap-3 px-3 h-12"
          }
        `}
      >
        <LogOut size={21} strokeWidth={1.8} />

        {!collapsed && (
          <span className="text-sm font-medium">
            Logout
          </span>
        )}
      </button>
    </div>
  );
};

export default SidebarActions;