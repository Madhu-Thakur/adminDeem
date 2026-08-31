const SmallModuleCard = ({ module, onClick }) => {
  const Icon = module.icon;

  return (
    <div
      onClick={onClick}
      className="
        rounded-2xl
        bg-white
        dark:bg-[#161b22]
        border
        border-[#e6edf2]
        dark:border-gray-700
        cursor-pointer
        flex
        flex-col
        items-center
        justify-center
        text-center
        p-3
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-deem-red
        hover:shadow-[0_8px_20px_rgba(20,70,103,0.08)]
      "
    >
      <div
        className="
          w-12
          h-12
          rounded-xl
          bg-[#fff1ef]
          dark:bg-[#2a1b19]
          flex
          items-center
          justify-center
        "
      >
        <Icon
          size={24}
          strokeWidth={1.8}
          className="text-deem-red"
        />
      </div>

      <h3 className="mt-3 text-sm font-semibold text-deem-blue dark:text-white">
        {module.title}
      </h3>
    </div>
  );
};

export default SmallModuleCard;