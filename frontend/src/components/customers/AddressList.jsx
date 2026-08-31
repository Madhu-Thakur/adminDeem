import { Pencil, Trash2, MapPin } from "lucide-react";

const AddressList = ({
  addresses = [],
  onEdit,
  onDelete,
  deletingId = null,
}) => {
  if (addresses.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 dark:text-gray-400">
        <MapPin
          size={32}
          className="mx-auto mb-3 opacity-40"
        />
        <p className="text-sm">
          No addresses added yet
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-[#0b0f14] dark:text-gray-400">
            <th className="px-5 py-3.5">
              Address Type
            </th>
            <th className="px-5 py-3.5">
              Address
            </th>
            <th className="px-5 py-3.5">
              City
            </th>
            <th className="px-5 py-3.5">
              State
            </th>
            <th className="px-5 py-3.5">
              Pincode
            </th>
            <th className="px-5 py-3.5">
              GST Number
            </th>
            <th className="px-5 py-3.5">
              Country
            </th>
            <th className="px-5 py-3.5 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {addresses.map((item) => {
            const id = item.id;

            return (
              <tr
                key={id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="px-5 py-4">
                  <span className="inline-flex items-center rounded-full bg-deem-blue/10 px-2.5 py-1 text-xs font-medium text-deem-blue dark:bg-deem-blue/20 dark:text-blue-300">
                    {item.address_type || "-"}
                  </span>
                </td>

                <td className="max-w-60 truncate px-5 py-4 text-gray-700 dark:text-gray-200">
                  {item.address || "-"}
                </td>

                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {item.city || "-"}
                </td>

                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {item.state || "-"}
                </td>

                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {item.pincode || "-"}
                </td>

                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {item.gst_number || "-"}
                </td>

                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {item.country || "-"}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      title="Edit"
                      onClick={() =>
                        onEdit(item)
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
                        onDelete(item)
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

export default AddressList;
