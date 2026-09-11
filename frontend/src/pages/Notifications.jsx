import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import NotificationTable from "../components/notifications/NotificationTable";

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-deem-bg px-4 py-6 dark:bg-[#0b0f14] sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-deem-blue dark:text-white">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
            Manage notifications
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/notifications/add")}
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-deem-red
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-[#d94335]
            sm:w-auto
          "
        >
          <Plus size={17} />
          Add Notification
        </button>
      </div>

      <NotificationTable />
    </div>
  );
};

export default Notifications;