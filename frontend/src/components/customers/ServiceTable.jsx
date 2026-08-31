import { Pencil, Trash2, Wrench } from "lucide-react";

const ServiceTable = ({
  services = [],
  onEdit,
  onDelete,
  deletingId = null,
}) => {
  if (services.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 dark:text-gray-400">
        <Wrench
          size={32}
          className="mx-auto mb-3 opacity-40"
        />
        <p className="text-sm">
          No services added yet
        </p>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "-";

    const value = String(date).slice(0, 10);
    const parts = value.split("-");

    if (parts.length !== 3) return value;

    const [year, month, day] = parts;
    return `${day}/${month}/${year.slice(2)}`;
  };

  const formatAmount = (amount) => {
    if (
      amount === "" ||
      amount === null ||
      amount === undefined
    ) {
      return "-";
    }

    const value = Number(amount);

    if (Number.isNaN(value)) return "-";

    return `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const statusClass = (status) =>
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-[#0b0f14] dark:text-gray-400">
            <th className="px-5 py-3.5">
              Service
            </th>
            <th className="px-5 py-3.5">
              Domain
            </th>
            <th className="px-5 py-3.5">
              Renewal Date
            </th>
            <th className="px-5 py-3.5">
              Duration
            </th>
            <th className="px-5 py-3.5">
              Expiry
            </th>
            <th className="px-5 py-3.5">
              Renewal Amount
            </th>
            <th className="px-5 py-3.5">
              Status
            </th>
            <th className="px-5 py-3.5 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {services.map((service) => {
            const id = service.id;

            return (
              <tr
                key={id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="px-5 py-4">
                  <span className="inline-flex items-center rounded-full bg-deem-blue/10 px-2.5 py-1 text-xs font-medium text-deem-blue dark:bg-deem-blue/20 dark:text-blue-300">
                    {service.service_type ||
                      service.serviceType ||
                      "-"}
                  </span>
                </td>

                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {service.domain || "-"}
                </td>

                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {formatDate(
                    service.renewal_date ||
                      service.renewalDate,
                  )}
                </td>

                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {service.duration || "-"}
                </td>

                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {formatDate(
                    service.expiry_date ||
                      service.expiryDate,
                  )}
                </td>

                <td className="px-5 py-4 text-gray-700 dark:text-gray-200">
                  {formatAmount(
                    service.renewal_amount ??
                      service.renewalAmount,
                  )}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(
                      service.service_status ||
                        service.serviceStatus,
                    )}`}
                  >
                    {service.service_status ||
                      service.serviceStatus ||
                      "-"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      title="Edit"
                      onClick={() =>
                        onEdit(service)
                      }
                      disabled={
                        deletingId === id
                      }
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-amber-600 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      title="Delete"
                      onClick={() =>
                        onDelete(service)
                      }
                      disabled={
                        deletingId === id
                      }
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-deem-red transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-950/30"
                    >
                      {deletingId === id ? (
                        <span className="text-xs">
                          ...
                        </span>
                      ) : (
                        <Trash2 size={17} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
