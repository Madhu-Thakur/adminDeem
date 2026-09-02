 
import { useEffect, useState } from "react";

import CollapsibleSection from "./CollapsibleSection";
import { INVOICE_API_URL } from "../../utils/api";
import { formatCurrency, formatDate } from "../../utils/invoiceUtils";

const CustomerInvoices = ({ customerId }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${INVOICE_API_URL}/customer/${customerId}`,
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to fetch customer invoices",
          );
        }

        setInvoices(
          Array.isArray(result.data) ? result.data : [],
        );
      } catch (error) {
        console.error("Fetch Customer Invoices Error:", error);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchInvoices();
    } else {
      setInvoices([]);
      setLoading(false);
    }
  }, [customerId]);

  const hasInvoices = invoices.length > 0;

  return (
    <CollapsibleSection
      title="Invoices"
      disabled={!loading && !hasInvoices}
      disabledLabel="No invoices"
    >
      {loading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading invoices...
        </p>
      ) : hasInvoices ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-[#0b0f14] dark:text-gray-400">
                <th className="px-5 py-3.5">
                  Invoice Number
                </th>

                <th className="px-5 py-3.5">
                  Invoice Date
                </th>

                <th className="px-5 py-3.5 text-right">
                  Amount
                </th>

                <th className="px-5 py-3.5">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="transition hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-200">
                    {invoice.invoice_number || "-"}
                  </td>

                  <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                    {formatDate(invoice.invoice_date)}
                  </td>

                  <td className="px-5 py-4 text-right font-semibold text-gray-800 dark:text-gray-100">
                    {formatCurrency(invoice.grand_total)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        invoice.payment_status === "Paid"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {invoice.payment_status || "-"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </CollapsibleSection>
  );
};

export default CustomerInvoices;