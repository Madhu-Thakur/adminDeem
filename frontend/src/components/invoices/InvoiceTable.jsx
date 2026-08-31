import { Edit, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

import { useInvoice } from "../../context/InvoiceContext";
import {
  formatCurrency,
  formatDate,
} from "../../utils/invoiceUtils";

const API_URL = "http://localhost:5000/api/invoices";

 
const formatPdfAmount = (value) => {
  const number = Number(value || 0);

  if (!Number.isFinite(number)) {
    return "Rs. 0.00";
  }

  return `Rs. ${number.toFixed(2)}`;
};

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

  const handleDownload = async (invoice) => {
    try {
      // Fetch complete invoice details
      const response = await fetch(`${API_URL}/${invoice.id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch invoice details",
        );
      }

      const invoiceData = result.data;

      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();

      let y = 20;
 
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("DEEM", 20, y);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("INVOICE", pageWidth - 20, y, {
        align: "right",
      });

      y += 8;

      doc.setLineWidth(0.5);
      doc.line(20, y, pageWidth - 20, y);

      y += 12;
 
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Invoice Number:", 20, y);

      doc.setFont("helvetica", "normal");
      doc.text(
        invoiceData.invoice_number || "-",
        55,
        y,
      );

      doc.setFont("helvetica", "bold");
      doc.text("Invoice Date:", 120, y);

      doc.setFont("helvetica", "normal");
      doc.text(
        invoiceData.invoice_date
          ? formatDate(
              String(invoiceData.invoice_date).slice(0, 10),
            )
          : "-",
        150,
        y,
      );

      y += 10;
 
      doc.setFont("helvetica", "bold");
      doc.text("Customer", 20, y);

      y += 6;

      doc.setFont("helvetica", "normal");
      doc.text(
        invoiceData.customer_name || "-",
        20,
        y,
      );

      y += 10;
 
      doc.setFont("helvetica", "bold");
      doc.text("Billing Address", 20, y);

      y += 6;

      const address = invoiceData.address;

      if (address) {
        doc.setFont("helvetica", "normal");

        const addressLines = [
          address.address,
          address.city,
          address.state,
          address.pincode,
          address.country,
        ].filter(Boolean);

        addressLines.forEach((line) => {
          doc.text(String(line), 20, y);
          y += 5;
        });

        if (address.gst_number) {
          doc.setFont("helvetica", "bold");
          doc.text("GSTIN:", 20, y);

          doc.setFont("helvetica", "normal");
          doc.text(
            String(address.gst_number),
            38,
            y,
          );

          y += 5;
        }
      } else {
        doc.setFont("helvetica", "normal");
        doc.text("-", 20, y);
        y += 5;
      }

      y += 7;
 
      doc.setFont("helvetica", "bold");
      doc.text("Payment Mode:", 20, y);

      doc.setFont("helvetica", "normal");
      doc.text(
        invoiceData.payment_mode || "-",
        52,
        y,
      );

      doc.setFont("helvetica", "bold");
      doc.text("Payment Status:", 120, y);

      doc.setFont("helvetica", "normal");
      doc.text(
        invoiceData.payment_status || "-",
        153,
        y,
      );

      y += 12;
 
      doc.setFont("helvetica", "bold");

      doc.text("Item", 20, y);
      doc.text("HSN", 95, y);
      doc.text("Amount", pageWidth - 20, y, {
        align: "right",
      });

      y += 4;

      doc.line(20, y, pageWidth - 20, y);

      y += 8;

      doc.setFont("helvetica", "normal");

      const items = invoiceData.items || [];

      items.forEach((item) => {
        doc.text(
          String(item.item_name || "-"),
          20,
          y,
        );

        doc.text(
          String(item.hsn || "-"),
          95,
          y,
        );

        doc.text(
          formatPdfAmount(item.amount),
          pageWidth - 20,
          y,
          {
            align: "right",
          },
        );

        y += 8;
      });

      if (items.length === 0) {
        doc.text("-", 20, y);
        y += 8;
      }

      doc.line(20, y, pageWidth - 20, y);

      y += 10;

   
      const addTotalRow = (label, value) => {
        doc.setFont("helvetica", "bold");
        doc.text(label, 125, y);

        doc.setFont("helvetica", "normal");
        doc.text(
          formatPdfAmount(value),
          pageWidth - 20,
          y,
          {
            align: "right",
          },
        );

        y += 7;
      };

      addTotalRow(
        "CGST 9%:",
        invoiceData.cgst,
      );

      addTotalRow(
        "SGST 9%:",
        invoiceData.sgst,
      );

      addTotalRow(
        "IGST 18%:",
        invoiceData.igst,
      );

      y += 2;

      doc.setLineWidth(0.7);
      doc.line(120, y, pageWidth - 20, y);

      y += 9;

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");

      doc.text("Grand Total:", 120, y);

      doc.text(
        formatPdfAmount(invoiceData.grand_total),
        pageWidth - 20,
        y,
        {
          align: "right",
        },
      );

      y += 15;
 
      if (invoiceData.note) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("Note:", 20, y);

        y += 6;

        doc.setFont("helvetica", "normal");

        const noteLines = doc.splitTextToSize(
          String(invoiceData.note),
          pageWidth - 40,
        );

        doc.text(noteLines, 20, y);

        y += noteLines.length * 5;
      }
 
      const pageHeight =
        doc.internal.pageSize.getHeight();

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");

      doc.text(
        "Generated by DEEM Portal",
        pageWidth / 2,
        pageHeight - 12,
        {
          align: "center",
        },
      );
 
      const fileName = `${
        invoiceData.invoice_number || "invoice"
      }.pdf`;

      doc.save(fileName);
    } catch (error) {
      console.error(
        "Download Invoice Error:",
        error,
      );

      window.alert(
        error.message ||
          "Failed to download invoice.",
      );
    }
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