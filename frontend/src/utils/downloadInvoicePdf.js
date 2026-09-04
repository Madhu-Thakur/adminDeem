import jsPDF from "jspdf";

import { INVOICE_API_URL } from "./api";
import { formatDate } from "./invoiceUtils";

const formatPdfAmount = (value) => {
  const number = Number(value || 0);

  if (!Number.isFinite(number)) {
    return "Rs. 0.00";
  }

  return `Rs. ${number.toFixed(2)}`;
};

export const downloadInvoicePdf = async (invoiceId) => {
    try {
      // Fetch complete invoice details
      const response = await fetch(
        `${INVOICE_API_URL}/${invoiceId}`
      );
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
