import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import InvoiceTable from "../components/invoices/InvoiceTable";
import InvoiceDetailView from "../components/invoices/InvoiceDetailView";
import { useInvoice } from "../context/InvoiceContext";

const PAGE_SIZE = 8;

const Invoices = () => {
  const navigate = useNavigate();
  const { invoices, deleteInvoice } = useInvoice();

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewing, setViewing] = useState(null);

  const resetPage = () => setCurrentPage(1);

  const summary = {
    total: invoices.length,
    paid: invoices.filter((i) => i.paymentStatus === "Paid").length,
    pending: invoices.filter((i) => i.paymentStatus === "Pending").length,
    overdue: invoices.filter((i) => i.paymentStatus === "Overdue").length,
    grandTotal: invoices.reduce(
      (sum, i) => sum + (Number(i.grandTotal) || 0),
      0,
    ),
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      invoice.customerName?.toLowerCase().includes(query) ||
      invoice.invoiceNumber?.toLowerCase().includes(query);

    const matchesStatus =
      paymentStatus === "all" ||
      invoice.paymentStatus === paymentStatus;

    const matchesMode =
      paymentMode === "all" || invoice.paymentMode === paymentMode;

    const recordDate = new Date(`${invoice.invoiceDate}T00:00:00`);
    const matchesFrom =
      !fromDate || recordDate >= new Date(`${fromDate}T00:00:00`);
    const matchesTo = !toDate || recordDate <= new Date(`${toDate}T00:00:00`);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesMode &&
      matchesFrom &&
      matchesTo
    );
  });

  const totalPages = Math.max(
    Math.ceil(filteredInvoices.length / PAGE_SIZE),
    1,
  );
  const safePage = Math.min(currentPage, totalPages);
  const from =
    filteredInvoices.length === 0
      ? 0
      : (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(safePage * PAGE_SIZE, filteredInvoices.length);
  const paginatedInvoices = filteredInvoices.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleView = (id) => {
    setViewing(
      invoices.find((invoice) => invoice.id === id) || null,
    );
  };

  const handleEdit = (id) => {
    navigate(`/invoices/add?id=${id}`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      deleteInvoice(id);
      if (viewing?.id === id) {
        setViewing(null);
      }
    }
  };

  const handleDownload = (id) => {
    const invoice = invoices.find((invoice) => invoice.id === id);
    if (!invoice) return;
    setViewing(invoice);
    setTimeout(() => window.print(), 300);
  };

  const handleSendReminder = (id) => {
    const invoice = invoices.find((invoice) => invoice.id === id);
    if (!invoice) return;
    alert(
      `Reminder sent to ${invoice.customerName} for invoice ${invoice.invoiceNumber}`,
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-7">
        <div>
          <h1 className="text-3xl font-bold text-deem-blue dark:text-white">
            Invoices
          </h1>
           
        </div>

        <button
          type="button"
          onClick={() => navigate("/invoices/add")}
          className="
            flex
            items-center
            gap-2
            px-5
            h-11
            bg-deem-red
            hover:bg-[#d94335]
            text-white
            rounded-xl
            font-medium
            text-sm
            transition
            cursor-pointer
          "
        >
          <Plus size={18} />
          Create Invoice
        </button>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 overflow-hidden">
        <InvoiceTable
          invoices={paginatedInvoices}
          currentPage={safePage}
          totalPages={totalPages}
          totalCount={filteredInvoices.length}
          from={from}
          to={to}
          onPageChange={setCurrentPage}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDownload={handleDownload}
          onSendReminder={handleSendReminder}
        />
      </div>

      {viewing && (
        <InvoiceDetailView
          invoice={viewing}
          onClose={() => setViewing(null)}
        />
      )}
    </div>
  );
};

export default Invoices;
