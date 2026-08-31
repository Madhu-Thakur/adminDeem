import { Bell, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "../common/ThemeToggle";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header
      className="
        h-16
        px-5
        bg-white
        dark:bg-[#111827]
        border-b
        border-gray-200
        dark:border-gray-700
        flex
        items-center
        justify-between
        transition-colors
        duration-300
      "
    >
      
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        title="Dashboard"
        className="
          w-10
          h-10
          rounded-lg
          flex
          items-center
          justify-center
          text-deem-blue
          dark:text-gray-200
          hover:bg-gray-100
          dark:hover:bg-gray-800
          transition
          cursor-pointer
        "
      >
        <LayoutDashboard size={21} />
      </button>

    
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <button
          type="button"
          title="Notifications"
          className="
            relative
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
            text-gray-600
            dark:text-gray-300
            hover:bg-gray-100
            dark:hover:bg-gray-800
            transition
            cursor-pointer
          "
        >
          <Bell size={19} />

          <span
            className="
              absolute
              top-2
              right-2
              w-2
              h-2
              rounded-full
              bg-deem-red
            "
          />
        </button>

        <ProfileMenu />
      </div>
    </header>
  );
};

export default Navbar;