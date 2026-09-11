import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AnnouncementTable from "../components/announcements/AnnouncementTable";

const Announcements = () => {
  const navigate = useNavigate();

  const handleAddAnnouncement = () => {
    navigate("/announcements/add");
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Announcements
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage announcements
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddAnnouncement}
          className="
            flex
            h-11
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-deem-red
            px-5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-[#d94335]
            sm:w-auto
          "
        >
          <Plus size={18} />
          Add Announcement
        </button>
      </div>
 
      <AnnouncementTable />
    </div>
  );
};

export default Announcements;