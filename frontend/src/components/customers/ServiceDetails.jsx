import { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";

import ServiceForm from "./ServiceForm";
import ServiceTable from "./ServiceTable";
import { SERVICE_API_URL } from "../../utils/api";

const ServiceDetails = ({
  customerId,
  services: externalServices,
  setServices,
}) => {
  const [services, setLocalServices] =
    useState(externalServices || []);

  const [showForm, setShowForm] =
    useState(false);

  const [editingService, setEditingService] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    if (Array.isArray(externalServices)) {
      setLocalServices(externalServices);
    }
  }, [externalServices]);

  const updateServices = (next) => {
    setLocalServices(next);

    if (setServices) {
      setServices(next);
    }
  };

  const fetchServices = useCallback(
    async () => {
      if (!customerId) {
        updateServices([]);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${SERVICE_API_URL}/customer/${customerId}`,
        );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch services",
          );
        }

        updateServices(
          Array.isArray(result.data)
            ? result.data
            : [],
        );
      } catch (err) {
        console.error(
          "Fetch Services Error:",
          err,
        );

        setError(
          err.message ||
            "Failed to fetch services.",
        );
      } finally {
        setLoading(false);
      }
    },
    [customerId],
  );

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleSave = async (serviceData) => {
    if (!customerId) {
      setError(
        "Please save the customer first before adding a service.",
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = {
        customer_id: Number(customerId),
        service_type:
          serviceData.service_type,
        domain:
          serviceData.domain || null,
        renewal_date:
          serviceData.renewal_date || null,
        duration:
          serviceData.duration || null,
        expiry_date:
          serviceData.expiry_date || null,
        renewal_amount:
          serviceData.renewal_amount ===
          ""
            ? null
            : serviceData.renewal_amount,
        service_status:
          serviceData.service_status ||
          "Active",
      };

      const isEditing =
        Boolean(editingService?.id);

      const url = isEditing
        ? `${SERVICE_API_URL}/${editingService.id}`
        : SERVICE_API_URL;

      const response = await fetch(url, {
        method: isEditing
          ? "PUT"
          : "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to save service",
        );
      }

      setSuccess(
        isEditing
          ? "Service updated successfully."
          : "Service added successfully.",
      );

      setShowForm(false);
      setEditingService(null);

      await fetchServices();
    } catch (err) {
      console.error(
        "Save Service Error:",
        err,
      );

      setError(
        err.message ||
          "Failed to save service.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setError("");
    setSuccess("");
    setEditingService(service);
    setShowForm(true);
  };

  const handleDelete = async (service) => {
    if (!service?.id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(service.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${SERVICE_API_URL}/${service.id}`,
        {
          method: "DELETE",
        },
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete service",
        );
      }

      setSuccess(
        "Service deleted successfully.",
      );

      await fetchServices();
    } catch (err) {
      console.error(
        "Delete Service Error:",
        err,
      );

      setError(
        err.message ||
          "Failed to delete service.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleAdd = () => {
    setError("");
    setSuccess("");
    setEditingService(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingService(null);
    setError("");
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-deem-blue dark:text-white">
          Service Details
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchServices}
            disabled={
              loading || !customerId
            }
            title="Refresh services"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <RefreshCw
              size={16}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />
          </button>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!customerId}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-deem-blue px-4 text-sm font-medium text-white transition hover:bg-[#0f3a55] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
            Add Service
          </button>
        </div>
      </div>

      {!customerId && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Save the customer first to add and
          manage services.
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-deem-red">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {showForm ? (
        <ServiceForm
          initialData={editingService}
          customerId={customerId}
          onSave={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      ) : loading &&
        services.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Loading services...
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#e6edf2] bg-white dark:border-gray-700 dark:bg-[#161b22]">
          <ServiceTable
            services={services}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
