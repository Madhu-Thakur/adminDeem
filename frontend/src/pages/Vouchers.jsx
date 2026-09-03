import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ReceiptText,
} from "lucide-react";

import { VOUCHER_API_URL, parseJson } from "../utils/api";

const PAGE_SIZE = 8;

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatDate = (date) => {
  if (!date) return "-";

  // Use the date portion only (YYYY-MM-DD) to avoid timezone shifting
  const [year, month, day] = String(date).slice(0, 10).split("-");

  if (!year || !month || !day) return "-";

  return `${day}/${month}/${year.slice(2)}`;
};

const formatVoucherNumber = (voucherType, serialNumber) => {
  if (serialNumber === null || serialNumber === undefined) {
    return "-";
  }

  if (voucherType === "Sale") {
    return `SV-${serialNumber}`;
  }

  if (voucherType === "Purchase") {
    return `PV-${serialNumber}`;
  }

  return "-";
};

const Vouchers = () => {
  const navigate = useNavigate();

  const [vouchers, setVouchers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(VOUCHER_API_URL);
      const result = await parseJson(response);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch vouchers");
      }

      setVouchers(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("Fetch Vouchers Error:", err);
      setError(err.message || "Failed to fetch vouchers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const filteredVouchers = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return vouchers.filter((voucher) => {
      const matchesSearch =
        !searchText ||
        formatVoucherNumber(voucher.voucher_type, voucher.serial_number)
          .toLowerCase()
          .includes(searchText) ||
        voucher.transaction_number?.toLowerCase().includes(searchText) ||
        voucher.transaction_type?.toLowerCase().includes(searchText) ||
        voucher.customer_name?.toLowerCase().includes(searchText) ||
        voucher.invoice_number?.toLowerCase().includes(searchText);
      return matchesSearch;
    });
  }, [vouchers, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVouchers.length / PAGE_SIZE),
  );

  const safePage = Math.min(currentPage, totalPages);
  const from =
    filteredVouchers.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(safePage * PAGE_SIZE, filteredVouchers.length);
  const paginatedVouchers = filteredVouchers.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-3xl font-bold text-deem-blue dark:text-white">
            Vouchers
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate("/accounts/voucher/add")}
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
          Add Voucher
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-deem-red/20 bg-red-50 px-4 py-3 text-sm text-deem-red">
          {error}
        </div>
      )}

      <div className="rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search vouchers..."
              className="
                w-full
                h-11
                pl-11
                pr-4
                rounded-xl
                border
                border-gray-200
                dark:border-gray-700
                bg-white
                dark:bg-[#0b0f14]
                text-sm
                text-gray-700
                dark:text-gray-200
                placeholder-gray-400
                outline-none
                focus:border-deem-red
                focus:ring-2
                focus:ring-red-100
                dark:focus:ring-red-950/30
                transition
              "
            />
          </div>
        </div>

        {loading ? (
          <div className="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">Loading vouchers...</p>
          </div>
        ) : (
          <div className="w-full overflow-hidden">
            <table className="w-full table-fixed text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#0b0f14] text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="px-2 py-2">Voucher No.</th>
                  <th className="px-2 py-2">Trans No.</th>
                  <th className="px-2 py-2">Date</th>
                  <th className="px-2 py-2">Trans Type</th>
                  <th className="px-2 py-2">Invoice No.</th>
                  <th className="px-2 py-2">Customer</th>
                  <th className="px-2 py-2 text-right">Amount</th>
                  <th className="px-2 py-2 text-right">CGST</th>
                  <th className="px-2 py-2 text-right">SGST</th>
                  <th className="px-2 py-2 text-right">IGST</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedVouchers.length === 0 ? (
                  <tr>
                    <td colSpan={10}>
                      <div className="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
                        <ReceiptText
                          size={32}
                          className="mx-auto mb-3 opacity-40"
                        />
                        <p className="text-sm">No vouchers found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedVouchers.map((voucher) => (
                    <tr
                      key={voucher.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                    >
                      <td className="px-2 py-3 font-mono text-xs font-semibold text-deem-blue dark:text-blue-300">
                        {formatVoucherNumber(
                          voucher.voucher_type,
                          voucher.serial_number,
                        )}
                      </td>
 
                      <td className="px-2 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs">
                        {voucher.transaction_number}
                      </td>
 
                      <td className="px-2 py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(voucher.transaction_date)}
                      </td>
 
                      <td className="px-2 py-3 text-gray-500 dark:text-gray-400">
                        {voucher.transaction_type}
                      </td>
 
                      <td className="px-2 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs">
                        {voucher.invoice_id ? (
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/invoices/add?id=${voucher.invoice_id}`)
                            }
                            title="View invoice"
                            className="text-deem-blue dark:text-blue-300 hover:underline transition cursor-pointer font-mono text-xs"
                          >
                            {voucher.invoice_number}
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
 
                      <td className="px-2 py-3 font-medium text-gray-700 dark:text-gray-200">
                        {voucher.customer_name && voucher.customer_id
                          ? `${voucher.customer_name} (${voucher.customer_id})`
                          : "-"}
                      </td>
 
                      <td className="px-2 py-3 text-right text-gray-700 dark:text-gray-200">
                        {formatCurrency(voucher.amount)}
                      </td>
 
                      <td className="px-2 py-3 text-right text-gray-500 dark:text-gray-400">
                        {formatCurrency(voucher.cgst)}
                      </td>
 
                      <td className="px-2 py-3 text-right text-gray-500 dark:text-gray-400">
                        {formatCurrency(voucher.sgst)}
                      </td>
 
                      <td className="px-2 py-3 text-right text-gray-500 dark:text-gray-400">
                        {formatCurrency(voucher.igst)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-5 py-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {from} - {to} of {filteredVouchers.length} vouchers
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={safePage === 1}
              className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronLeft size={17} />
            </button>

            {filteredVouchers.length > 0 &&
              Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition cursor-pointer ${
                      safePage === page
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={safePage >= totalPages}
              className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vouchers;
