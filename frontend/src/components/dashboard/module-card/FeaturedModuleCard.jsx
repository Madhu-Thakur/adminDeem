import { dashboardStats } from "../../../data/dashboardData";

const FeaturedModuleCard = ({ module, onClick, type }) => {
  const Icon = module.icon;
  const stats = dashboardStats[type];

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
        p-6
        flex
        flex-col
        items-center
        justify-center
        text-center
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-deem-red
        hover:shadow-[0_10px_30px_rgba(20,70,103,0.10)]
      "
    >
      <div
        className="
          w-16
          h-16
          rounded-2xl
          bg-[#fff1ef]
          dark:bg-[#2a1b19]
          flex
          items-center
          justify-center
        "
      >
        <Icon
          size={32}
          strokeWidth={1.8}
          className="text-deem-red"
        />
      </div>

      <h2 className="mt-4 text-xl font-semibold text-deem-blue dark:text-white">
        {module.title}
      </h2>

      <p className="mt-2 text-3xl font-bold text-deem-blue dark:text-white">
        {stats.value}
      </p>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {stats.label}
      </p>
    </div>
  );
};

export default FeaturedModuleCard;