import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={darkMode ? "Light mode" : "Dark mode"}
      className="
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
      {darkMode ? (
        <Sun size={19} />
      ) : (
        <Moon size={19} />
      )}
    </button>
  );
};

export default ThemeToggle;