import { useEffect, useState } from "react";
import { ANNOUNCEMENT_API_URL } from "../../utils/api";

const DashboardAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(
        ANNOUNCEMENT_API_URL
      );

      const result = await response.json();

      if (result.success) {
        const activeAnnouncements = (result.data || []).filter(
          (announcement) => {
            if (Number(announcement.status) !== 1) {
              return false;
            }
            if (
              !announcement.expiry_date ||
              !announcement.expiry_time
            ) {
              return true;
            }

            const expiryDate = new Date(announcement.expiry_date);

            const year = expiryDate.getFullYear();
            const month = String(expiryDate.getMonth() + 1).padStart(
              2,
              "0"
            );
            const day = String(expiryDate.getDate()).padStart(2, "0");

            const expiryDateTime = new Date(
              `${year}-${month}-${day}T${announcement.expiry_time}`
            );

            return expiryDateTime > new Date();
          }
        );

        setAnnouncements(activeAnnouncements);
      }
    } catch (error) {
      console.error("Fetch Announcements Error:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  if (announcements.length === 0) {
    return null;
  }

  return (
    <section className="mb-6 max-w-4xl mx-auto space-y-3">
      {announcements.map((announcement) => {
        const isAlert =
          String(announcement.type).toLowerCase() === "alert";

        return (
          <div
            key={announcement.id}
            className={`
              rounded-xl
              border
              px-5
              py-3
              transition-colors
              duration-300
              ${
                isAlert
                  ? `
                    border-deem-red/30
                    bg-deem-red/5
                    dark:bg-deem-red/10
                    text-deem-red
                  `
                  : `
                    border-green-300
                    bg-green-50
                    dark:border-green-700
                    dark:bg-green-900/10
                    text-green-700
                    dark:text-green-400
                  `
              }
            `}
          >
            <p className="text-sm sm:text-base font-medium leading-6">
              {announcement.announce}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default DashboardAnnouncements;