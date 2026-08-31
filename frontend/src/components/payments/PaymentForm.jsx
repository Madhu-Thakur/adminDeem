import { useState } from "react";
import { Save, IndianRupee } from "lucide-react";

import { customers, transactionTypes, serviceTypes } from "../../data/paymentData";
import { validatePayment } from "../../validation/paymentValidation";
import {
  calculateBalance,
  formatCurrency,
  MOCK_OUTSTANDING_AMOUNT,
} from "../../utils/paymentUtils";

const PaymentForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    customerId: initialData?.customerId || "",
    paymentDate: initialData?.paymentDate || "",
    transactionType: initialData?.transactionType || "",
    transactionNumber: initialData?.transactionNumber || "",
    serviceType: initialData?.serviceType || "",
    paymentReceived: initialData?.paymentReceived || "",
    note: initialData?.note || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validatePayment(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const selectedCustomer = customers.find(
        (c) => c.id === Number(formData.customerId)
      );

      onSubmit({
        ...formData,
        customerName: selectedCustomer?.name ?? "",
      });
    }
  };

  const balance = formatCurrency(
    calculateBalance(MOCK_OUTSTANDING_AMOUNT, formData.paymentReceived)
  );

  const inputClass = (hasError) => `
    w-full
    h-11
    px-4
    rounded-xl
    border
    ${
      hasError
        ? "border-deem-red focus:border-deem-red focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950/30"
        : "border-gray-200 dark:border-gray-700 focus:border-deem-red focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950/30"
    }
    bg-white
    dark:bg-[#0b0f14]
    text-sm
    text-gray-700
    dark:text-gray-200
    outline-none
    transition
  `;

  const selectClass = (hasError) => `${inputClass(hasError)} cursor-pointer`;

  const textareaClass = (hasError) => `w-full px-4 py-3 rounded-xl border
    ${
      hasError
        ? "border-deem-red focus:border-deem-red focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950/30"
        : "border-gray-200 dark:border-gray-700 focus:border-deem-red focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950/30"
    }
    bg-white dark:bg-[#0b0f14] text-sm text-gray-700 dark:text-gray-200 outline-none transition resize-y`;

  const readOnlyClass = `
    w-full
    h-11
    px-4
    rounded-xl
    border
    border-gray-200
    dark:border-gray-700
    bg-gray-50
    dark:bg-gray-800/50
    text-sm
    text-gray-600
    dark:text-gray-400
    outline-none
  `;

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Customer <span className="text-deem-red">*</span>
        </label>
        <select
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          className={selectClass(errors.customer)}
        >
          <option value="" disabled>Select customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        {errors.customer && (
          <p className="mt-1 text-xs text-deem-red">{errors.customer}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Payment Date <span className="text-deem-red">*</span>
        </label>
        <input
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
          className={inputClass(errors.paymentDate)}
        />
        {errors.paymentDate && (
          <p className="mt-1 text-xs text-deem-red">{errors.paymentDate}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Transaction Type <span className="text-deem-red">*</span>
        </label>
        <select
          name="transactionType"
          value={formData.transactionType}
          onChange={handleChange}
          className={selectClass(errors.transactionType)}
        >
          <option value="" disabled>Select transaction type</option>
          {transactionTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.transactionType && (
          <p className="mt-1 text-xs text-deem-red">{errors.transactionType}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Transaction Number
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
          <p className="mt-1 text-xs text-deem-red">{errors.transactionNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Service Type
        </label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className={selectClass(errors.serviceType)}
        >
          <option value="" disabled>Select service type</option>
          {serviceTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.serviceType && (
          <p className="mt-1 text-xs text-deem-red">{errors.serviceType}</p>
        )}
      </div>
 
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Payment Received <span className="text-deem-red">*</span>
        </label>
        <div className="relative">
          <IndianRupee
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="number"
            name="paymentReceived"
            value={formData.paymentReceived}
            onChange={handleChange}
            placeholder="Enter received payment"
            min="0"
            step="0.01"
            inputMode="decimal"
            className={`${inputClass(errors.paymentReceived)} pl-11`}
          />
        </div>
        {errors.paymentReceived && (
          <p className="mt-1 text-xs text-deem-red">{errors.paymentReceived}</p>
        )}
      </div>
 
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Balance
        </label>
        <div className="relative">
          <IndianRupee
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            name="balance"
            value={balance}
            readOnly
            className={`${readOnlyClass} pl-11`}
          />
        </div>
      </div>
 
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Note
        </label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Enter note"
          rows={4}
          className={textareaClass(errors.note)}
        />
        {errors.note && (
          <p className="mt-1 text-xs text-deem-red">{errors.note}</p>
        )}
      </div>
 
      <div className="sm:col-span-2 flex items-center gap-3 pt-2">
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
          Save Payment
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

export default PaymentForm;
