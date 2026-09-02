import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
 
const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  disabledLabel = "Disabled",
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mt-6 rounded-2xl bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={disabled}
        className="w-full flex items-center justify-between px-6 py-4 text-left transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="text-lg font-semibold text-deem-blue dark:text-white">
          {title}
        </span>

        {disabled ? (
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
            {disabledLabel}
          </span>
        ) : open ? (
          <ChevronUp size={18} />
        ) : (
          <ChevronDown size={18} />
        )}
      </button>

      {open && !disabled && (
        <div className="border-t border-gray-100 dark:border-gray-700 p-6">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;