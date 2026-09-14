 
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AnnouncementForm from "../components/announcements/AnnouncementForm";
import { API_BASE_URL } from "../utils/api";

const ANNOUNCEMENT_API_URL = `${API_BASE_URL}/api/announcements`;

const AddAnnouncement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const announcementId = searchParams.get("id");

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(Boolean(announcementId));
  const [error, setError] = useState("");

  const isEditMode = Boolean(announcementId);

  useEffect(() => {
    if (!announcementId) {
      return;
    }

    const fetchAnnouncement = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${ANNOUNCEMENT_API_URL}/${announcementId}`,
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch announcement",
          );
        }

        setInitialData(result.data);
      } catch (error) {
        console.error("Fetch Announcement Error:", error);
        setError("Unable to load announcement.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [announcementId]);

  const handleSubmit = async (formData) => {
    try {
      setError("");

      const url = isEditMode
        ? `${ANNOUNCEMENT_API_URL}/${announcementId}`
        : ANNOUNCEMENT_API_URL;

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Failed to ${
              isEditMode ? "update" : "create"
            } announcement`,
        );
      }

      navigate("/announcements");
    } catch (error) {
      console.error("Save Announcement Error:", error);
      setError(
        error.message || "Unable to save announcement.",
      );
    }
  };

  const handleCancel = () => {
    navigate("/announcements");
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-[#11161c]">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading announcement...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleCancel}
          title="Back to Announcements"
          className="
            flex
            h-10
            w-10
            shrink-0
            cursor-pointer
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            text-gray-500
            transition
            hover:border-deem-red
            hover:text-deem-red
            dark:border-gray-700
            dark:text-gray-400
          "
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            {isEditMode
              ? "Edit Announcement"
              : "Add Announcement"}
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {isEditMode
              ? "Update announcement details"
              : "Create a new announcement"}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-deem-red/20 bg-red-50 px-4 py-3 text-sm text-deem-red">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-[#11161c] sm:p-7">
        <AnnouncementForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AddAnnouncement;