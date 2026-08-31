import {
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ReceiptText,
} from "lucide-react";

import { formatCurrency } from "../../utils/paymentUtils";

const statusClass = (status) => {
  if (status === "Paid") {
    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
  }

  if (status === "Partial") {
    return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300";
  }

  return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
};

const formatDate = (date) => {
  if (!date) return "-";

  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year.slice(2)}`;
};

const actionButtonClass =
  "w-9 h-9 rounded-lg flex items-center justify-center transition cursor-pointer";

const PaymentTable = ({
  payments,
  currentPage,
  totalPages,
  totalCount,
  from,
  to,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}) => {
  if (payments.length === 0) {
    return (
      <div className="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
        <ReceiptText size={32} className="mx-auto mb-3 opacity-40" />
        <p className="text-sm">No payments found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full overflow-hidden">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#0b0f14] text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th className="px-2 py-2">Customer</th>
              <th className="px-2 py-2">Date</th>
              <th className="px-2 py-2">Transaction Type</th>
              <th className="px-2 py-2">Transaction Number</th>
              <th className="px-2 py-2">Service Type</th>
              <th className="px-2 py-2 text-right">Payment Received</th>
              <th className="px-2 py-2 text-right">Balance</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                <td className="px-2 py-3 font-medium text-gray-700 dark:text-gray-200">
                  {payment.customerName}
                </td>

                <td className="px-2 py-3 text-gray-500 dark:text-gray-400">
                  {formatDate(payment.paymentDate)}
                </td>

                <td className="px-2 py-3 text-gray-500 dark:text-gray-400">
                  {payment.transactionType}
                </td>

                <td className="px-2 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs">
                  {payment.transactionNumber}
                </td>

                <td className="px-2 py-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-deem-blue/10 text-deem-blue dark:bg-deem-blue/20 dark:text-blue-300">
                    {payment.serviceType}
                  </span>
                </td>

                <td className="px-2 py-3 text-right text-gray-700 dark:text-gray-200">
                  {formatCurrency(payment.paymentReceived)}
                </td>

                <td className="px-2 py-3 text-right text-gray-500 dark:text-gray-400">
                  {formatCurrency(payment.balance)}
                </td>

                <td className="px-2 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusClass(payment.status)}`}
                  >
                    {payment.status}
                  </span>
                </td>

                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      title="View"
                      onClick={() => onView(payment.id)}
                      className={`${actionButtonClass} text-deem-blue dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/30`}
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      title="Edit"
                      onClick={() => onEdit(payment.id)}
                      className={`${actionButtonClass} text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30`}
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      title="Delete"
                      onClick={() => onDelete(payment.id)}
                      className={`${actionButtonClass} text-deem-red hover:bg-red-50 dark:hover:bg-red-950/30`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {from} - {to} of {totalCount} payments
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronLeft size={17} />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition cursor-pointer ${
                  currentPage === page
                    ? "bg-deem-blue text-white"
                    : "border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
