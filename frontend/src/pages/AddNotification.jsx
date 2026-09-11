import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import NotificationForm from "../components/notifications/NotificationForm";
import { API_BASE_URL } from "../utils/api";

const AddNotification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const notificationId = searchParams.get("id");
  const isEditMode = Boolean(notificationId);

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!notificationId) return;

    const fetchNotification = async () => {
      try {
        setFetching(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/notifications/${notificationId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notification");
        }

        const result = await response.json();

        setInitialData(result.data);
      } catch (err) {
        setError(err.message || "Failed to load notification");
      } finally {
        setFetching(false);
      }
    };

    fetchNotification();
  }, [notificationId]);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const url = isEditMode
        ? `${API_BASE_URL}/api/notifications/${notificationId}`
        : `${API_BASE_URL}/api/notifications`;

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Failed to ${isEditMode ? "update" : "create"} notification`
        );
      }

      navigate("/notifications");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/notifications");
  };

  return (
    <div className="min-h-screen bg-deem-bg px-4 py-6 dark:bg-[#0b0f14] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
   
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-deem-blue dark:text-white">
              {isEditMode ? "Edit Notification" : "Add Notification"}
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
              {isEditMode
                ? "Update notification details"
                : "Create a new notification"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-medium
              text-gray-600
              transition
              hover:border-deem-red
              hover:text-deem-red
              dark:border-white/10
              dark:bg-[#11161d]
              dark:text-white/70
              dark:hover:border-deem-red
              dark:hover:text-deem-red
              sm:w-auto
            "
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>
 
        {error && (
          <div className="mb-5 rounded-lg border border-deem-red/20 bg-deem-red/5 px-4 py-3 text-sm text-deem-red">
            {error}
          </div>
        )}

 
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#11161d] sm:p-6 lg:p-8">
          {fetching ? (
            <div className="py-10 text-center text-sm text-gray-500 dark:text-white/50">
              Loading notification...
            </div>
          ) : (
            <NotificationForm
              initialData={initialData}
              onSubmit={handleSubmit}
              loading={loading}
            />
          )}

          {!fetching && (
            <div className="mt-5 flex justify-end border-t border-gray-100 pt-5 dark:border-white/10">
              <button
                type="button"
                onClick={handleCancel}
                className="
                  rounded-lg
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-600
                  transition
                  hover:text-deem-red
                  dark:text-white/60
                  dark:hover:text-deem-red
                "
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNotification;