import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";

import PaymentFilters from "../components/payments/PaymentFilters";
import PaymentTable from "../components/payments/PaymentTable";
import { usePayment } from "../context/PaymentContext";
import { formatCurrency } from "../utils/paymentUtils";

const PAGE_SIZE = 8;

const Payments = () => {
  const navigate = useNavigate();

  const { payments, deletePayment } = usePayment();
  const [search, setSearch] = useState("");
  const [customer, setCustomer] = useState("all");
  const [transactionType, setTransactionType] = useState("all");
  const [serviceType, setServiceType] = useState("all");
  const [status, setStatus] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewing, setViewing] = useState(null);

  const resetPage = () => setCurrentPage(1);

  const filteredPayments = payments.filter((payment) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      payment.customerName.toLowerCase().includes(query) ||
      payment.transactionNumber.toLowerCase().includes(query) ||
      payment.serviceType.toLowerCase().includes(query);

    const matchesCustomer =
      customer === "all" || payment.customerName === customer;
    const matchesType =
      transactionType === "all" || payment.transactionType === transactionType;
    const matchesService =
      serviceType === "all" || payment.serviceType === serviceType;
    const matchesStatus =
      status === "all" || payment.status === status;

    const recordDate = new Date(`${payment.paymentDate}T00:00:00`);
    const matchesFrom =
      !fromDate || recordDate >= new Date(`${fromDate}T00:00:00`);
    const matchesTo =
      !toDate || recordDate <= new Date(`${toDate}T00:00:00`);

    return (
      matchesSearch &&
      matchesCustomer &&
      matchesType &&
      matchesService &&
      matchesStatus &&
      matchesFrom &&
      matchesTo
    );
  });

  const totalPages = Math.max(
    Math.ceil(filteredPayments.length / PAGE_SIZE),
    1,
  );
  const safePage = Math.min(currentPage, totalPages);
  const from = (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(safePage * PAGE_SIZE, filteredPayments.length);
  const paginatedPayments = filteredPayments.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleView = (id) => {
    setViewing(payments.find((payment) => payment.id === id) || null);
  };

  const handleEdit = (id) => {
    navigate(`/payments/add?id=${id}`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this payment?")) {
      deletePayment(id);
      if (viewing?.id === id) {
        setViewing(null);
      }
    }
  };

  const pageLabel =
    "block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400";

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-3xl font-bold text-deem-blue dark:text-white">
            Payments
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage customer payments and transactions
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/payments/add")}
          className="flex items-center gap-2 px-5 h-11 bg-deem-red hover:bg-[#d94335] text-white rounded-xl font-medium text-sm transition cursor-pointer"
        >
          <Plus size={18} />
          Add Payment
        </button>
      </div>

      {viewing && (
        <div className="mb-6 rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-deem-blue dark:text-white">
              Payment Details
            </h2>

            <button
              type="button"
              onClick={() => setViewing(null)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className={pageLabel}>Customer</p>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {viewing.customerName}
              </p>
            </div>
            <div>
              <p className={pageLabel}>Date</p>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {viewing.paymentDate}
              </p>
            </div>
            <div>
              <p className={pageLabel}>Transaction Type</p>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {viewing.transactionType}
              </p>
            </div>
            <div>
              <p className={pageLabel}>Transaction Number</p>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {viewing.transactionNumber}
              </p>
            </div>
            <div>
              <p className={pageLabel}>Service Type</p>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {viewing.serviceType}
              </p>
            </div>
            <div>
              <p className={pageLabel}>Payment Received</p>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {formatCurrency(viewing.paymentReceived)}
              </p>
            </div>
            <div>
              <p className={pageLabel}>Balance</p>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {formatCurrency(viewing.balance)}
              </p>
            </div>
            <div>
              <p className={pageLabel}>Status</p>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {viewing.status}
              </p>
            </div>
            {viewing.note && (
              <div className="sm:col-span-2">
                <p className={pageLabel}>Note</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {viewing.note}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 overflow-hidden">
        <PaymentFilters
          search={search}
          onSearch={(value) => {
            setSearch(value);
            resetPage();
          }}
          customer={customer}
          onCustomer={(value) => {
            setCustomer(value);
            resetPage();
          }}
          transactionType={transactionType}
          onTransactionType={(value) => {
            setTransactionType(value);
            resetPage();
          }}
          serviceType={serviceType}
          onServiceType={(value) => {
            setServiceType(value);
            resetPage();
          }}
          status={status}
          onStatus={(value) => {
            setStatus(value);
            resetPage();
          }}
          fromDate={fromDate}
          onFromDate={(value) => {
            setFromDate(value);
            resetPage();
          }}
          toDate={toDate}
          onToDate={(value) => {
            setToDate(value);
            resetPage();
          }}
        />

        <PaymentTable
          payments={paginatedPayments}
          currentPage={safePage}
          totalPages={totalPages}
          totalCount={filteredPayments.length}
          from={filteredPayments.length === 0 ? 0 : from}
          to={to}
          onPageChange={setCurrentPage}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Payments;
