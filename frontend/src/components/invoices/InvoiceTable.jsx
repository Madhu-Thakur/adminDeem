import { Edit, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { downloadInvoicePdf } from "../../utils/downloadInvoicePdf";

import { useInvoice } from "../../context/InvoiceContext";
import {
  formatCurrency,
  formatDate,
} from "../../utils/invoiceUtils";

const InvoiceTable = () => {
  const navigate = useNavigate();

  const {
    invoices,
    loading,
    error,
  } = useInvoice();

  const handleEdit = (id) => {
    navigate(`/invoices/add?id=${id}`);
  };

  const handleDownload = (invoice) => {
    downloadInvoicePdf(invoice.id);
  };
 
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-[#11161c]">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading invoices...
        </p>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="rounded-2xl border border-deem-red/20 bg-red-50 p-5 text-sm text-deem-red">
        {error}
      </div>
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-[#11161c]">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No invoices found.
        </p>
      </div>
    );
  }
 

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#11161c]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Invoice Number
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Invoice Date
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                IGST
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Grand Total
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/30"
              >
                <td className="px-5 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {invoice.customer_name || "-"}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {invoice.invoice_number || "-"}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {formatDate(
                    invoice.invoice_date
                      ? String(
                          invoice.invoice_date,
                        ).slice(0, 10)
                      : "",
                  )}
                </td>

                <td className="px-5 py-4 text-right text-sm text-gray-600 dark:text-gray-300">
                  {formatCurrency(invoice.igst)}
                </td>

                <td className="px-5 py-4 text-right text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {formatCurrency(
                    invoice.grand_total,
                  )}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(invoice.id)
                      }
                      title="Edit Invoice"
                      className="
                        flex
                        h-9
                        w-9
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-lg
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
                      <Edit size={16} />
                    </button>

                    {/* Download */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDownload(invoice)
                      }
                      title="Download Invoice"
                      className="
                        flex
                        h-9
                        w-9
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-gray-200
                        text-gray-500
                        transition
                        hover:border-deem-blue
                        hover:text-deem-blue
                        dark:border-gray-700
                        dark:text-gray-400
                      "
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;