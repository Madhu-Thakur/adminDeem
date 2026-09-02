 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Save } from "lucide-react";
 
const MOCK_SALE_INVOICES = [
  {
    id: "INV-001",
    label: "INV-001 | ABC Company",
    amount: 10000,
    cgst: 900,
    sgst: 900,
    igst: 0,
  },
  {
    id: "INV-002",
    label: "INV-002 | XYZ Company",
    amount: 25000,
    cgst: 2250,
    sgst: 2250,
    igst: 0,
  },
  {
    id: "INV-003",
    label: "INV-003 | PQR Company",
    amount: 50000,
    cgst: 0,
    sgst: 0,
    igst: 4500,
  },
];

// Mock purchase records (demo data only)
const MOCK_PURCHASES = [
  {
    id: "PUR-001",
    label: "PUR-001 | ABC Hosting Pvt Ltd",
    amount: 15000,
    cgst: 1350,
    sgst: 1350,
    igst: 0,
  },
  {
    id: "PUR-002",
    label: "PUR-002 | XYZ Technologies",
    amount: 30000,
    cgst: 2700,
    sgst: 2700,
    igst: 0,
  },
  {
    id: "PUR-003",
    label: "PUR-003 | PQR Solutions",
    amount: 42000,
    cgst: 0,
    sgst: 0,
    igst: 3780,
  },
];
 
const MOCK_SUPPLIERS = [
  "ABC Hosting Pvt Ltd",
  "XYZ Technologies",
  "PQR Solutions",
];

const VOUCHER_TYPES = ["Sale", "Purchase"];

const TRANSACTION_TYPES = [
  "UPI",
  "Bank Transfer",
  "Cash",
  "Cheque",
  "Card",
  "NEFT",
  "RTGS",
  "Other",
];

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const Voucher = () => {
  const navigate = useNavigate();

  const [voucherType, setVoucherType] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedPurchase, setSelectedPurchase] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [narration, setNarration] = useState("");

  const selectedInvoiceData = MOCK_SALE_INVOICES.find(
    (inv) => inv.id === selectedInvoice
  );
  const selectedPurchaseData = MOCK_PURCHASES.find(
    (pur) => pur.id === selectedPurchase
  );

  const inputClass = `
    w-full h-11 px-4 rounded-xl border
    border-gray-200 dark:border-gray-700
    focus:border-deem-red focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950/30
    bg-white dark:bg-[#0b0f14]
    text-sm text-gray-700 dark:text-gray-200
    outline-none transition
  `;

  const selectClass = `${inputClass} cursor-pointer`;

  const readOnlyClass = `
    w-full h-11 px-4 rounded-xl border
    border-gray-200 dark:border-gray-700
    bg-gray-50 dark:bg-gray-800/50
    text-sm text-gray-600 dark:text-gray-400
    outline-none
  `;

  const textareaClass = `
    w-full px-4 py-3 rounded-xl border
    border-gray-200 dark:border-gray-700
    focus:border-deem-red focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950/30
    bg-white dark:bg-[#0b0f14]
    text-sm text-gray-700 dark:text-gray-200
    outline-none transition resize-y
  `;

  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2";

  const requiredMark = <span className="text-deem-red">*</span>;

  const resetForm = () => {
    setVoucherType("");
    setSelectedInvoice("");
    setSelectedSupplier("");
    setSelectedPurchase("");
    setTransactionType("");
    setTransactionDate("");
    setTransactionNumber("");
    setNarration("");
  };
 
  const renderTransactionFields = () => (
    <>
      <div>
        <label className={labelClass}>Transaction Type {requiredMark}</label>
        <select
          name="transactionType"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className={selectClass}
        >
          <option value="">Select Transaction Type</option>
          {TRANSACTION_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Transaction Date {requiredMark}</label>
        <input
          type="date"
          name="transactionDate"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass}>Transaction Number {requiredMark}</label>
        <input
          type="text"
          name="transactionNumber"
          value={transactionNumber}
          onChange={(e) => setTransactionNumber(e.target.value)}
          placeholder="Enter transaction number"
          className={inputClass}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass}>Narration</label>
        <textarea
          name="narration"
          value={narration}
          onChange={(e) => setNarration(e.target.value)}
          placeholder="Enter narration / note"
          rows={4}
          className={textareaClass}
        />
      </div>
    </>
  );

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="hover:text-deem-blue dark:hover:text-white transition cursor-pointer"
        >
          Dashboard
        </button>
        <ChevronRight size={14} />
        <span>Accounts</span>
        <ChevronRight size={14} />
        <span className="text-deem-blue dark:text-white font-medium">
          Voucher
        </span>
      </div>

  
      <div className="rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-deem-blue dark:text-white mb-5">
          Voucher Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Voucher Type {requiredMark}</label>
            <select
              name="voucherType"
              value={voucherType}
              onChange={(e) => {
                setVoucherType(e.target.value);
                setSelectedInvoice("");
                setSelectedSupplier("");
                setSelectedPurchase("");
              }}
              className={selectClass}
            >
              <option value="">Select Voucher Type</option>
              {VOUCHER_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
 
          {voucherType === "Sale" && (
            <div>
              <label className={labelClass}>Sale / Invoice {requiredMark}</label>
              <select
                name="invoiceId"
                value={selectedInvoice}
                onChange={(e) => setSelectedInvoice(e.target.value)}
                className={selectClass}
              >
                <option value="">Select Invoice</option>
                {MOCK_SALE_INVOICES.map((invoice) => (
                  <option key={invoice.id} value={invoice.id}>
                    {invoice.label}
                  </option>
                ))}
              </select>
            </div>
          )}

  
          {voucherType === "Purchase" && (
            <>
              <div>
                <label className={labelClass}>
                  Supplier / Vendor {requiredMark}
                </label>
                <select
                  name="supplier"
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select Supplier / Vendor</option>
                  {MOCK_SUPPLIERS.map((supplier) => (
                    <option key={supplier} value={supplier}>
                      {supplier}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Purchase {requiredMark}</label>
                <select
                  name="purchaseId"
                  value={selectedPurchase}
                  onChange={(e) => setSelectedPurchase(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select Purchase</option>
                  {MOCK_PURCHASES.map((purchase) => (
                    <option key={purchase.id} value={purchase.id}>
                      {purchase.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>
 
      {voucherType === "Sale" && selectedInvoiceData && (
        <div className="mt-6 rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-deem-blue dark:text-white mb-5">
            Sale Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Amount {requiredMark}</label>
              <input
                type="text"
                readOnly
                value={formatCurrency(selectedInvoiceData.amount)}
                className={readOnlyClass}
              />
            </div>

            <div>
              <label className={labelClass}>CGST</label>
              <input
                type="text"
                readOnly
                value={formatCurrency(selectedInvoiceData.cgst)}
                className={readOnlyClass}
              />
            </div>

            <div>
              <label className={labelClass}>SGST</label>
              <input
                type="text"
                readOnly
                value={formatCurrency(selectedInvoiceData.sgst)}
                className={readOnlyClass}
              />
            </div>

            <div>
              <label className={labelClass}>IGST</label>
              <input
                type="text"
                readOnly
                value={formatCurrency(selectedInvoiceData.igst)}
                className={readOnlyClass}
              />
            </div>

            {renderTransactionFields()}
          </div>
        </div>
      )}

 
      {voucherType === "Purchase" && selectedPurchaseData && (
        <div className="mt-6 rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-deem-blue dark:text-white mb-5">
            Purchase Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Amount {requiredMark}</label>
              <input
                type="text"
                readOnly
                value={formatCurrency(selectedPurchaseData.amount)}
                className={readOnlyClass}
              />
            </div>

            <div>
              <label className={labelClass}>CGST</label>
              <input
                type="text"
                readOnly
                value={formatCurrency(selectedPurchaseData.cgst)}
                className={readOnlyClass}
              />
            </div>

            <div>
              <label className={labelClass}>SGST</label>
              <input
                type="text"
                readOnly
                value={formatCurrency(selectedPurchaseData.sgst)}
                className={readOnlyClass}
              />
            </div>

            <div>
              <label className={labelClass}>IGST</label>
              <input
                type="text"
                readOnly
                value={formatCurrency(selectedPurchaseData.igst)}
                className={readOnlyClass}
              />
            </div>

            {renderTransactionFields()}
          </div>
        </div>
      )}

      {/* Save / Cancel buttons - shown once details are visible */}
      {(voucherType === "Sale" && selectedInvoiceData) ||
      (voucherType === "Purchase" && selectedPurchaseData) ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // FRONTEND ONLY: backend save will be integrated later.
          }}
        >
          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              className="
                flex
                items-center
                justify-center
                gap-2
                px-6
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
              <Save size={16} />
              Save
            </button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                navigate("/dashboard");
              }}
              className="
                px-6
                h-11
                border
                border-gray-200
                dark:border-gray-700
                text-gray-600
                dark:text-gray-300
                rounded-xl
                font-medium
                text-sm
                hover:bg-gray-50
                dark:hover:bg-gray-800
                transition
                cursor-pointer
              "
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default Voucher;