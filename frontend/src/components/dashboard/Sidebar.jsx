import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SidebarMenu from "./SidebarMenu";
import SidebarActions from "./SidebarActions";

import logoFull from "../../assets/images/logo-1.png";
import logoIcon from "../../assets/images/logo-2.png";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        relative
        min-h-screen
        bg-deem-blue
        text-white
        transition-all
        duration-300
        ease-in-out
        ${collapsed ? "w-19.5" : "w-67.5"}
      `}
    >
  
      <div className="h-24 flex items-center justify-center">
        <div
          className={`
            bg-white
            rounded-xl
            flex
            items-center
            justify-center
            transition-all
            duration-300
            ${collapsed ? "w-12.5 h-12.5" : "w-47.5 h-15.5"}
          `}
        >
          <img
            src={collapsed ? logoIcon : logoFull}
            alt="DEEM"
            className={
              collapsed
                ? "w-9.5 h-9.5object-contain"
                : "w-38.75 h-auto object-contain"
            }
          />
        </div>
      </div>


      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        className="
          absolute
          -right-3
          top-7
          w-7
          h-7
          rounded-full
          bg-deem-blue
          border
          border-white/20
          flex
          items-center
          justify-center
          text-white
          hover:bg-[#1b5579]
          transition
          z-20
          cursor-pointer
        "
      >
        {collapsed ? (
          <ChevronRight size={16} />
        ) : (
          <ChevronLeft size={16} />
        )}
      </button>

      
      <SidebarMenu collapsed={collapsed} />

    
      <SidebarActions collapsed={collapsed} />
    </aside>
  );
};

export default Sidebar;