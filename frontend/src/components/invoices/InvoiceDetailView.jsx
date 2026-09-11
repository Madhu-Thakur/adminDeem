import { X, IndianRupee, FileText } from "lucide-react";

import {
  formatCurrency,
  formatDate,
} from "../../utils/invoiceUtils";

const InvoiceDetailView = ({ invoice, onClose }) => {
  if (!invoice) return null;

  const items = Array.isArray(invoice.items)
    ? invoice.items
    : [
        {
          item_name: invoice.item1Name || "-",
          hsn: invoice.item1Hsn || "",
          amount: invoice.item1Amount || 0,
        },
        ...(invoice.item2Name
          ? [
              {
                item_name: invoice.item2Name,
                hsn: invoice.item2Hsn || "",
                amount: invoice.item2Amount || 0,
              },
            ]
          : []),
      ];

  const address =
    invoice.address ||
    invoice.customerAddress ||
    {};

  const customerName =
    invoice.customerName ||
    invoice.customer_name ||
    "-";

  const invoiceNumber =
    invoice.invoiceNumber ||
    invoice.invoice_number ||
    "-";

  const invoiceDate =
    invoice.invoiceDate ||
    invoice.invoice_date;

  const paymentMode =
    invoice.paymentMode ||
    invoice.payment_mode ||
    "-";

  const paymentStatus =
    invoice.paymentStatus ||
    invoice.payment_status ||
    "Pending";

  const grandTotal = Number(
    invoice.grandTotal ??
      invoice.grand_total ??
      0,
  );

  const cgst = Number(invoice.cgst || 0);
  const sgst = Number(invoice.sgst || 0);
  const igst = Number(invoice.igst || 0);
 

  const addressLines = [
    address.address,
    address.city,
    address.state,
    address.pincode,
    address.country,
  ].filter(Boolean);

  const gstNumber =
    address.gst_number ||
    address.gstNumber ||
    "";

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    );
  };

  const Amount = ({ value, bold = false }) => (
    <span
      className={
        bold
          ? "inline-flex items-center gap-1 font-bold"
          : "inline-flex items-center gap-1"
      }
    >
      <IndianRupee
        size={bold ? 13 : 12}
        strokeWidth={2}
      />

      <span>{formatAmount(value)}</span>
    </span>
  );

  return (
    <>
 
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 12mm;
            }

            html,
            body {
              width: 100%;
              margin: 0;
              padding: 0;
              background: white !important;
            }

            body * {
              visibility: hidden;
            }

            .invoice-print-root,
            .invoice-print-root * {
              visibility: visible;
            }

            .invoice-print-root {
              position: absolute;
              inset: 0;
              width: 100%;
              min-height: 100vh;
              background: white !important;
              padding: 0 !important;
              margin: 0 !important;
            }

            .invoice-print-card {
              width: 100% !important;
              max-width: none !important;
              min-height: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              border: 0 !important;
              box-shadow: none !important;
              border-radius: 0 !important;
            }

            .invoice-screen-only {
              display: none !important;
            }

            .invoice-print-content {
              display: block !important;
              width: 100%;
            }

            .invoice-print-table {
              width: 100%;
              table-layout: fixed;
              border-collapse: collapse;
            }

            .invoice-print-table th,
            .invoice-print-table td {
              word-break: break-word;
              overflow-wrap: anywhere;
            }

            .invoice-print-table th:nth-child(1) {
              width: 55%;
            }

            .invoice-print-table th:nth-child(2) {
              width: 20%;
            }

            .invoice-print-table th:nth-child(3) {
              width: 25%;
            }

            .invoice-print-total {
              width: 100%;
              display: flex;
              justify-content: flex-end;
            }

            .invoice-print-total-inner {
              width: 48%;
              min-width: 250px;
            }

            .invoice-no-break {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .invoice-footer {
              margin-top: 35px;
            }
          }

          @media screen {
            .invoice-print-content {
              display: none;
            }
          }
        `}
      </style>
 

      <div className="invoice-screen-only fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e6edf2] bg-white shadow-xl dark:border-gray-700 dark:bg-[#161b22]">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-deem-red dark:bg-red-950/30">
                <FileText size={18} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-deem-blue dark:text-white">
                  Invoice Details
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {invoiceNumber}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={17} />
            </button>
          </div>

          <div className="max-h-[75vh] overflow-y-auto p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Customer
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {customerName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Invoice Date
                </p>

                <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                  {invoiceDate
                    ? formatDate(invoiceDate)
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  IGST
                </p>

                <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                  <Amount value={igst} />
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Grand Total
                </p>

                <p className="mt-1 text-lg font-bold text-deem-blue dark:text-white">
                  <Amount
                    value={grandTotal}
                    bold
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-100 px-6 py-4 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="h-10 cursor-pointer rounded-xl border border-gray-200 px-5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
 

      <div className="invoice-print-content invoice-print-root bg-white text-gray-900">
        <div className="invoice-print-card mx-auto max-w-200 bg-white p-8">

          <div className="invoice-no-break border-b-2 border-gray-800 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-deem-blue">
                  DEEM
                </h1>

                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-gray-500">
                  DEEM Portal
                </p>
              </div>

              <div className="text-right">
                <h2 className="text-xl font-semibold uppercase tracking-wider text-gray-800">
                  Tax Invoice
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Original for Recipient
                </p>
              </div>
            </div>
          </div>
 
          <div className="invoice-no-break mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Invoice Number
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                {invoiceNumber}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Invoice Date
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                {invoiceDate
                  ? formatDate(invoiceDate)
                  : "-"}
              </p>
            </div>
          </div>
 
          <div className="invoice-no-break mt-7 grid grid-cols-1 sm:grid-cols-2 gap-8 border-y border-gray-200 py-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Bill To
              </p>

              <p className="mt-2 text-sm font-bold text-gray-900">
                {customerName}
              </p>

              {addressLines.length > 0 ? (
                <div className="mt-1 space-y-0.5 text-xs leading-5 text-gray-600">
                  {addressLines.map(
                    (line, index) => (
                      <p key={index}>{line}</p>
                    ),
                  )}
                </div>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  -
                </p>
              )}

              {gstNumber && (
                <p className="mt-2 text-xs">
                  <span className="font-semibold">
                    GSTIN:
                  </span>{" "}
                  {gstNumber}
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Payment Details
              </p>

              <div className="mt-2 space-y-1 text-xs text-gray-700">
                <p>
                  <span className="font-semibold">
                    Mode:
                  </span>{" "}
                  {paymentMode}
                </p>

                <p>
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  {paymentStatus}
                </p>
              </div>
            </div>
          </div>
 
          <div className="invoice-no-break mt-7">
            <table className="invoice-print-table text-xs">
              <thead>
                <tr className="border-y-2 border-gray-800">
                  <th className="px-2 py-3 text-left font-bold">
                    Item Description
                  </th>

                  <th className="px-2 py-3 text-left font-bold">
                    HSN
                  </th>

                  <th className="px-2 py-3 text-right font-bold">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={
                      item.id || index
                    }
                    className="border-b border-gray-200"
                  >
                    <td className="px-2 py-4 font-medium text-gray-800">
                      {item.item_name ||
                        item.itemName ||
                        "-"}
                    </td>

                    <td className="px-2 py-4 text-gray-600">
                      {item.hsn || "-"}
                    </td>

                    <td className="px-2 py-4 text-right font-medium">
                      <Amount
                        value={
                          item.amount || 0
                        }
                      />
                    </td>
                  </tr>
                ))}

                {items.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-2 py-5 text-center text-gray-500"
                    >
                      No items
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
 
          <div className="invoice-no-break mt-6 invoice-print-total">
            <div className="invoice-print-total-inner">
 
              <div className="flex items-center justify-between border-b border-gray-100 py-2 text-xs">
                <span className="font-medium text-gray-600">
                  CGST 9%
                </span>

                <span className="font-medium text-gray-800">
                  <Amount value={cgst} />
                </span>
              </div>
 
              <div className="flex items-center justify-between border-b border-gray-100 py-2 text-xs">
                <span className="font-medium text-gray-600">
                  SGST 9%
                </span>

                <span className="font-medium text-gray-800">
                  <Amount value={sgst} />
                </span>
              </div>

              {/* IGST */}
              <div className="flex items-center justify-between border-b border-gray-200 py-2 text-xs">
                <span className="font-medium text-gray-600">
                  IGST 18%
                </span>

                <span className="font-medium text-gray-800">
                  <Amount value={igst} />
                </span>
              </div>
 
              <div className="mt-2 flex items-center justify-between border-t-2 border-gray-800 pt-4">
                <span className="text-sm font-bold text-gray-900">
                  Grand Total
                </span>

                <span className="text-base font-bold text-deem-blue">
                  <Amount
                    value={grandTotal}
                    bold
                  />
                </span>
              </div>
            </div>
          </div>
 
          {invoice.note && (
            <div className="invoice-no-break mt-8 border-t border-gray-200 pt-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Note
              </p>

              <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-gray-700">
                {invoice.note}
              </p>
            </div>
          )}
 
          <div className="invoice-footer invoice-no-break mt-14 border-t border-gray-200 pt-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] text-gray-500">
                  Thank you for your business.
                </p>

                <p className="mt-1 text-[9px] text-gray-400">
                  This is a system-generated invoice.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-8 w-40 border-b border-gray-400" />

                <p className="text-[10px] font-semibold text-gray-600">
                  Authorized Signatory
                </p>
              </div>
            </div>

            <p className="mt-8 text-center text-[9px] text-gray-400">
              Generated by DEEM Portal
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default InvoiceDetailView;