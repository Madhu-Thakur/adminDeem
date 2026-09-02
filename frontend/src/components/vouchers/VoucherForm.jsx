 

import { useState } from "react";
import { Save, IndianRupee } from "lucide-react";

import {
  voucherTypes,
  transactionTypeOptions,
  saleInvoices,
  suppliers,
  purchaseOrders,
} from "../../data/voucherData";
import { validateVoucher } from "../../validation/voucherValidation";
import { formatCurrency } from "../../utils/invoiceUtils";

const VoucherForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    voucherType: initialData?.voucherType || "",
    transactionDate: initialData?.transactionDate || "",
    transactionType: initialData?.transactionType || "",
    transactionNumber: initialData?.transactionNumber || "",

    invoiceId: initialData?.invoiceId || "",
    customerId: initialData?.customerId || "",
    amount: initialData?.amount || "",
    cgst: initialData?.cgst || "",
    sgst: initialData?.sgst || "",
    igst: initialData?.igst || "",

    supplierId: initialData?.supplierId || "",
    purchaseId: initialData?.purchaseId || "",
    purchaseAmount: initialData?.purchaseAmount || "",
    purchaseCgst: initialData?.purchaseCgst || "",
    purchaseSgst: initialData?.purchaseSgst || "",
    purchaseIgst: initialData?.purchaseIgst || "",

    note: initialData?.note || "",
  });

  const [errors, setErrors] = useState({});

  const isSale = formData.voucherType === "Sale";
  const isPurchase = formData.voucherType === "Purchase";

  const selectedInvoice = saleInvoices.find(
    (invoice) => String(invoice.id) === String(formData.invoiceId)
  );

  const selectedPurchase = purchaseOrders.find(
    (order) => String(order.id) === String(formData.purchaseId)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      // Voucher Type
      if (name === "voucherType") {
        if (value === "Sale") {
          return {
            ...prev,
            voucherType: value,
            supplierId: "",
            purchaseId: "",
            purchaseAmount: "",
            purchaseCgst: "",
            purchaseSgst: "",
            purchaseIgst: "",
          };
        }

        if (value === "Purchase") {
          return {
            ...prev,
            voucherType: value,

            // Clear sale data
            invoiceId: "",
            customerId: "",
            amount: "",
            cgst: "",
            sgst: "",
            igst: "",
          };
        }
      }

      // Sale Invoice
      if (name === "invoiceId") {
        const invoice = saleInvoices.find(
          (item) => String(item.id) === String(value)
        );

        return {
          ...prev,
          invoiceId: value,
          customerId: invoice?.customerId || "",
          amount: invoice?.amount || "",
          cgst: invoice?.cgst || "",
          sgst: invoice?.sgst || "",
          igst: invoice?.igst || "",
        };
      }

      // Purchase
      if (name === "purchaseId") {
        const purchase = purchaseOrders.find(
          (item) => String(item.id) === String(value)
        );

        return {
          ...prev,
          purchaseId: value,
          supplierId: purchase?.supplier || "",
          purchaseAmount: purchase?.amount || "",
          purchaseCgst: purchase?.cgst || "",
          purchaseSgst: purchase?.sgst || "",
          purchaseIgst: purchase?.igst || "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateVoucher(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const inputClass = (hasError) => {
    const classes = [
      "w-full",
      "h-11",
      "px-4",
      "rounded-xl",
      "border",
      "bg-white",
      "dark:bg-[#0b0f14]",
      "text-sm",
      "text-gray-700",
      "dark:text-gray-200",
      "outline-none",
      "transition",
    ];

    if (hasError) {
      classes.push(
        "border-deem-red",
        "focus:border-deem-red",
        "focus:ring-2",
        "focus:ring-red-100",
        "dark:focus:ring-red-950/30"
      );
    } else {
      classes.push(
        "border-gray-200",
        "dark:border-gray-700",
        "focus:border-deem-red",
        "focus:ring-2",
        "focus:ring-red-100",
        "dark:focus:ring-red-950/30"
      );
    }

    return classes.join(" ");
  };

  const selectClass = (hasError) =>
    `${inputClass(hasError)} cursor-pointer`;

  const readOnlyClass = [
    "w-full",
    "h-11",
    "px-4",
    "rounded-xl",
    "border",
    "border-gray-200",
    "dark:border-gray-700",
    "bg-gray-50",
    "dark:bg-gray-800/50",
    "text-sm",
    "text-gray-600",
    "dark:text-gray-400",
    "outline-none",
  ].join(" ");

  const textareaClass = (hasError) => {
    const classes = [
      "w-full",
      "px-4",
      "py-3",
      "rounded-xl",
      "border",
      "bg-white",
      "dark:bg-[#0b0f14]",
      "text-sm",
      "text-gray-700",
      "dark:text-gray-200",
      "outline-none",
      "transition",
      "resize-y",
    ];

    if (hasError) {
      classes.push(
        "border-deem-red",
        "focus:border-deem-red",
        "focus:ring-2",
        "focus:ring-red-100",
        "dark:focus:ring-red-950/30"
      );
    } else {
      classes.push(
        "border-gray-200",
        "dark:border-gray-700",
        "focus:border-deem-red",
        "focus:ring-2",
        "focus:ring-red-100",
        "dark:focus:ring-red-950/30"
      );
    }

    return classes.join(" ");
  };

  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2";

  const errorClass = "mt-1 text-xs text-deem-red";

  return (
    <form onSubmit={handleSubmit} className="space-y-7">

     
      <section>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

  {/* Voucher Type */}
  <div>
    <label className={labelClass}>
      Voucher Type <span className="text-deem-red">*</span>
    </label>

    <select
      name="voucherType"
      value={formData.voucherType}
      onChange={handleChange}
      className={selectClass(errors.voucherType)}
    >
      <option value="" disabled>
        Select voucher type
      </option>

      {voucherTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>

    {errors.voucherType && (
      <p className={errorClass}>{errors.voucherType}</p>
    )}
  </div>

  {/* Sale / Invoice */}
  <div>
    <label className={labelClass}>
      Sale / Invoice
      {isSale && <span className="text-deem-red"> *</span>}
    </label>

    <select
      name="invoiceId"
      value={formData.invoiceId}
      onChange={handleChange}
      disabled={!isSale}
      className={`${selectClass(errors.invoice)} ${
        !isSale ? "cursor-not-allowed opacity-50 bg-gray-100 dark:bg-gray-800" : ""
      }`}
    >
      <option value="">
        {isSale ? "Select invoice" : "Select voucher type first"}
      </option>

      {isSale &&
        saleInvoices.map((invoice) => (
          <option key={invoice.id} value={invoice.id}>
            {invoice.label}
          </option>
        ))}
    </select>

    {errors.invoice && (
      <p className={errorClass}>{errors.invoice}</p>
    )}
  </div>

</div>
      </section>

      
      {isSale && selectedInvoice && (
        <section className="border-t border-gray-200 dark:border-gray-700 pt-6">

          <h3 className="mb-5 text-sm font-semibold text-gray-800 dark:text-gray-100">
            Sale Details
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Amount */}
            <div>
              <label className={labelClass}>
                Amount <span className="text-deem-red">*</span>
              </label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={formatCurrency(formData.amount)}
                  readOnly
                  className={`${readOnlyClass} pl-11`}
                />
              </div>
            </div>

            {/* CGST */}
            <div>
              <label className={labelClass}>CGST</label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={formatCurrency(formData.cgst)}
                  readOnly
                  className={`${readOnlyClass} pl-11`}
                />
              </div>
            </div>

            {/* SGST */}
            <div>
              <label className={labelClass}>SGST</label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={formatCurrency(formData.sgst)}
                  readOnly
                  className={`${readOnlyClass} pl-11`}
                />
              </div>
            </div>

            {/* IGST */}
            <div>
              <label className={labelClass}>IGST</label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={formatCurrency(formData.igst)}
                  readOnly
                  className={`${readOnlyClass} pl-11`}
                />
              </div>
            </div>

           
            <div>
              <label className={labelClass}>
                Transaction Date{" "}
                <span className="text-deem-red">*</span>
              </label>

              <input
                type="date"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={handleChange}
                className={inputClass(errors.transactionDate)}
              />

              {errors.transactionDate && (
                <p className={errorClass}>
                  {errors.transactionDate}
                </p>
              )}
            </div>

           
            <div>
              <label className={labelClass}>
                Transaction Type{" "}
                <span className="text-deem-red">*</span>
              </label>

              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className={selectClass(errors.transactionType)}
              >
                <option value="">
                  Select transaction type
                </option>

                {transactionTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {errors.transactionType && (
                <p className={errorClass}>
                  {errors.transactionType}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Transaction Number{" "}
                <span className="text-deem-red">*</span>
              </label>

              <input
                type="text"
                name="transactionNumber"
                value={formData.transactionNumber}
                onChange={handleChange}
                placeholder="Enter transaction number"
                className={inputClass(errors.transactionNumber)}
              />

              {errors.transactionNumber && (
                <p className={errorClass}>
                  {errors.transactionNumber}
                </p>
              )}
            </div>

             
            <div className="md:col-span-2">
              <label className={labelClass}>
                Narration / Note
              </label>

              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Enter narration"
                rows={3}
                className={textareaClass(errors.note)}
              />

              {errors.note && (
                <p className={errorClass}>{errors.note}</p>
              )}
            </div>
          </div>
        </section>
      )}
 
      {isPurchase && selectedPurchase && (
        <section className="border-t border-gray-200 dark:border-gray-700 pt-6">

          <h3 className="mb-5 text-sm font-semibold text-gray-800 dark:text-gray-100">
            Purchase Details
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Amount */}
            <div>
              <label className={labelClass}>
                Amount <span className="text-deem-red">*</span>
              </label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={formatCurrency(formData.purchaseAmount)}
                  readOnly
                  className={`${readOnlyClass} pl-11`}
                />
              </div>
            </div>

            {/* CGST */}
            <div>
              <label className={labelClass}>CGST</label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={formatCurrency(formData.purchaseCgst)}
                  readOnly
                  className={`${readOnlyClass} pl-11`}
                />
              </div>
            </div>

            {/* SGST */}
            <div>
              <label className={labelClass}>SGST</label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={formatCurrency(formData.purchaseSgst)}
                  readOnly
                  className={`${readOnlyClass} pl-11`}
                />
              </div>
            </div>

            {/* IGST */}
            <div>
              <label className={labelClass}>IGST</label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={formatCurrency(formData.purchaseIgst)}
                  readOnly
                  className={`${readOnlyClass} pl-11`}
                />
              </div>
            </div>

            {/* Transaction Date */}
            <div>
              <label className={labelClass}>
                Transaction Date{" "}
                <span className="text-deem-red">*</span>
              </label>

              <input
                type="date"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={handleChange}
                className={inputClass(errors.transactionDate)}
              />

              {errors.transactionDate && (
                <p className={errorClass}>
                  {errors.transactionDate}
                </p>
              )}
            </div>

            {/* Transaction Type */}
            <div>
              <label className={labelClass}>
                Transaction Type{" "}
                <span className="text-deem-red">*</span>
              </label>

              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className={selectClass(errors.transactionType)}
              >
                <option value="">
                  Select transaction type
                </option>

                {transactionTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {errors.transactionType && (
                <p className={errorClass}>
                  {errors.transactionType}
                </p>
              )}
            </div>

            {/* Transaction Number */}
            <div>
              <label className={labelClass}>
                Transaction Number{" "}
                <span className="text-deem-red">*</span>
              </label>

              <input
                type="text"
                name="transactionNumber"
                value={formData.transactionNumber}
                onChange={handleChange}
                placeholder="Enter transaction number"
                className={inputClass(errors.transactionNumber)}
              />

              {errors.transactionNumber && (
                <p className={errorClass}>
                  {errors.transactionNumber}
                </p>
              )}
            </div>

            {/* Narration */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Narration / Note
              </label>

              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Enter narration"
                rows={3}
                className={textareaClass(errors.note)}
              />

              {errors.note && (
                <p className={errorClass}>{errors.note}</p>
              )}
            </div>
          </div>
        </section>
      )}
 
      <div className="flex flex-wrap items-center gap-3 pt-2">

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
          Save Voucher
        </button>

        <button
          type="button"
          onClick={onCancel}
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
  );
};

export default VoucherForm;
