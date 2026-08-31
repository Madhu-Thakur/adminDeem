import { useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          items-center
          gap-2
          px-2
          py-1.5
          rounded-lg
          hover:bg-gray-100
          dark:hover:bg-gray-800
          transition
          cursor-pointer
        "
      >
        <div
          className="
            w-9
            h-9
            rounded-full
            bg-deem-blue
            text-white
            flex
            items-center
            justify-center
            font-semibold
            text-sm
          "
        >
          A
        </div>

        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Admin
          </p>
        </div>

        <ChevronDown
          size={16}
          className="text-gray-500 dark:text-gray-400"
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-full
            mt-2
            w-44
            rounded-xl
            bg-white
            dark:bg-[#161b22]
            border
            border-gray-200
            dark:border-gray-700
            shadow-lg
            py-2
            z-50
          "
        >
          <button
            type="button"
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-2.5
              text-sm
              text-gray-700
              dark:text-gray-200
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition
              cursor-pointer
            "
          >
            <User size={17} />
            Profile
          </button>

          <button
            type="button"
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-2.5
              text-sm
              text-gray-700
              dark:text-gray-200
              hover:bg-red-50
              dark:hover:bg-red-950/30
              hover:text-deem-red
              transition
              cursor-pointer
            "
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
