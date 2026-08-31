import { useEffect, useState } from "react";

import { Save, IndianRupee, Calendar } from "lucide-react";

import { paymentModes } from "../../data/invoiceData";
import { validateInvoice } from "../../validation/invoiceValidation";
import {
  calculateGSTFromGrandTotal,
  formatCurrency,
} from "../../utils/invoiceUtils";

const API_CUSTOMERS = "http://localhost:5000/api/customers";
const API_ADDRESSES = "http://localhost:5000/api/addresses/customer";

const hsnOptions = [
  {
    value: "998314",
    label: "Design and Development Services [998314]",
  },
  {
    value: "998313",
    label: "Consulting and Support Services [998313]",
  },
  {
    value: "999294",
    label:
      "Other education and training services nowhere else classified",
  },
];

const paymentStatusOptions = ["Paid", "Pending", "Partial"];

const InvoiceForm = ({ onSubmit, onCancel, initialData }) => {
  const [customers, setCustomers] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    customerId: initialData?.customerId || "",
    addressId: initialData?.addressId || "",


    invoiceDate: initialData?.invoiceDate || "",

    paymentMode: initialData?.paymentMode || "",
    paymentStatus: initialData?.paymentStatus || "Pending",

    item1Name: initialData?.item1Name || "",
    item1Hsn: initialData?.item1Hsn || "",
    item1Amount: initialData?.item1Amount || "",

    item2Name: initialData?.item2Name || "",
    item2Hsn: initialData?.item2Hsn || "",
    item2Amount: initialData?.item2Amount || "",

    grandTotal: initialData?.grandTotal || "",

    note: initialData?.note || "",
  });

  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoadingCustomers(true);
        setApiError("");

        const response = await fetch(API_CUSTOMERS);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch customers",
          );
        }

        setCustomers(result.data || []);
      } catch (error) {
        console.error("Fetch Customers Error:", error);
        setApiError("Unable to load customers.");
      } finally {
        setLoadingCustomers(false);
      }
    };

    fetchCustomers();
  }, []);
 
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!formData.customerId) {
        setAddresses([]);
        return;
      }

      try {
        setLoadingAddresses(true);
        setApiError("");

        const response = await fetch(
          `${API_ADDRESSES}/${formData.customerId}`,
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch addresses",
          );
        }

        setAddresses(result.data || []);
      } catch (error) {
        console.error("Fetch Addresses Error:", error);
        setAddresses([]);
        setApiError("Unable to load customer addresses.");
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, [formData.customerId]);

  
  const handleChange = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    if (name === "customerId") {
      setFormData((prev) => ({
        ...prev,
        customerId: value,
        addressId: "",

      }));

      setAddresses([]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (name === "customerId" && errors.customer) {
      setErrors((prev) => ({
        ...prev,
        customer: "",
        customerAddress: "",
      }));
    }

    if (name === "addressId" && errors.customerAddress) {
      setErrors((prev) => ({
        ...prev,
        customerAddress: "",
      }));
    }
  };

  
  const selectedAddress = addresses.find(
    (address) =>
      Number(address.id) === Number(formData.addressId),
  );
 
  const DEEM_STATE = "Punjab";

  const country =
    selectedAddress?.country?.trim()?.toLowerCase() || "";

  const state =
    selectedAddress?.state?.trim()?.toLowerCase() || "";

  const isIndianAddress = country === "india";

  const isSameState =
    isIndianAddress &&
    state === DEEM_STATE.toLowerCase();

  const gstCalculation = calculateGSTFromGrandTotal(
    formData.grandTotal,
    isSameState,
  );
 

  const calculatedAmount = gstCalculation.amount;

  const item1Amt = calculatedAmount;

  const item2Amt = 0;

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (isIndianAddress) {
    cgst = gstCalculation.cgst;
    sgst = gstCalculation.sgst;
    igst = gstCalculation.igst;
  }

  const grandTotal = gstCalculation.grandTotal;
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const validationData = {
      ...formData,
      item1Amount: item1Amt,
      item2Amount: item2Amt,
    };

    const validationErrors =
      validateInvoice(validationData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    const items = [];

    // Item 1
    if (formData.item1Name.trim()) {
      items.push({
        item_name: formData.item1Name.trim(),
        hsn: formData.item1Hsn || null,
        amount: item1Amt,
      });
    }

    // Item 2
    if (formData.item2Name.trim()) {
      items.push({
        item_name: formData.item2Name.trim(),
        hsn: formData.item2Hsn || null,
        amount: item2Amt,
      });
    }


    const invoiceData = {
      customer_id: Number(formData.customerId),

      address_id: Number(formData.addressId),

      invoice_date: formData.invoiceDate,


      payment_mode: formData.paymentMode,

      payment_status: formData.paymentStatus,

      grand_total: Number(formData.grandTotal),

      items,


      note: formData.note,
    };

    onSubmit(invoiceData);
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
        "dark:focus:ring-red-950/30",
      );
    } else {
      classes.push(
        "border-gray-200",
        "dark:border-gray-700",
        "focus:border-deem-red",
        "focus:ring-2",
        "focus:ring-red-100",
        "dark:focus:ring-red-950/30",
      );
    }

    return classes.join(" ");
  };

  const selectClass = (hasError) => {
    return `${inputClass(hasError)} cursor-pointer`;
  };

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
        "dark:focus:ring-red-950/30",
      );
    } else {
      classes.push(
        "border-gray-200",
        "dark:border-gray-700",
        "focus:border-deem-red",
        "focus:ring-2",
        "focus:ring-red-100",
        "dark:focus:ring-red-950/30",
      );
    }

    return classes.join(" ");
  };

  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2";

  const errorClass = "mt-1 text-xs text-deem-red";
 
  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* API Error */}
      {apiError && (
        <div className="rounded-xl border border-deem-red/20 bg-red-50 px-4 py-3 text-sm text-deem-red">
          {apiError}
        </div>
      )}

      {/* Invoice Information */}
      <section>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Customer */}
          <div>
            <label className={labelClass}>
              Customer{" "}
              <span className="text-deem-red">*</span>
            </label>

            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              className={selectClass(errors.customer)}
              disabled={loadingCustomers}
            >
              <option value="">
                {loadingCustomers
                  ? "Loading Customers..."
                  : "Select Customer"}
              </option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >

                  {customer.customer_name}
                </option>
              ))}
            </select>

            {errors.customer && (
              <p className={errorClass}>
                {errors.customer}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className={labelClass}>
              Customer Address{" "}
              <span className="text-deem-red">*</span>
            </label>

            <select
              name="addressId"
              value={formData.addressId}
              onChange={handleChange}
              className={selectClass(
                errors.customerAddress,
              )}
              disabled={
                !formData.customerId ||
                loadingAddresses
              }

            >
              <option value="">
                {!formData.customerId
                  ? "Select Customer First"
                  : loadingAddresses
                    ? "Loading Addresses..."
                    : "Select Customer Address"}
              </option>

              {addresses.map((address) => (
                <option
                  key={address.id}
                  value={address.id}
                >
                  {[
                    address.address,
                    address.city,
                    address.state,
                    address.pincode,
                    address.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}

                </option>
              ))}
            </select>

            {errors.customerAddress && (
              <p className={errorClass}>
                {errors.customerAddress}
              </p>
            )}
          </div>
        </div>

        {/* Date / Payment */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Invoice Date */}

          <div>
            <label className={labelClass}>
              Invoice Date{" "}
              <span className="text-deem-red">*</span>
            </label>

            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                className={`${inputClass(
                  errors.invoiceDate,
                )} pl-11`}
              />
            </div>

            {errors.invoiceDate && (
              <p className={errorClass}>
                {errors.invoiceDate}
              </p>
            )}
          </div>

          {/* Payment Mode */}

          <div>
            <label className={labelClass}>
              Payment Mode{" "}
              <span className="text-deem-red">*</span>
            </label>

            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className={selectClass(
                errors.paymentMode,
              )}
            >
              <option value="">
                Select Payment Mode
              </option>

              {paymentModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>

            {errors.paymentMode && (
              <p className={errorClass}>
                {errors.paymentMode}
              </p>
            )}
          </div>

          {/* Payment Status */}

          <div>
            <label className={labelClass}>
              Payment Status
            </label>

            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className={selectClass(
                errors.paymentStatus,
              )}
            >
              {paymentStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Item 1 */}

      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-800 dark:text-gray-100">
          Item 1
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
          {/* Item Name */}

          <div className="md:col-span-2">
            <label className={labelClass}>
              Item Name{" "}
              <span className="text-deem-red">*</span>
            </label>

            <input
              type="text"
              name="item1Name"
              value={formData.item1Name}
              onChange={handleChange}
              placeholder="Enter item name"
              className={inputClass(
                errors.item1Name,
              )}
            />

            {errors.item1Name && (
              <p className={errorClass}>
                {errors.item1Name}
              </p>
            )}
          </div>

          {/* HSN */}

          <div>
            <label className={labelClass}>
              HSN
            </label>

            <select
              name="item1Hsn"
              value={formData.item1Hsn}
              onChange={handleChange}
              className={selectClass(
                errors.item1Hsn,
              )}
            >
              <option value="">Select HSN</option>

              {hsnOptions.map((hsn) => (
                <option
                  key={hsn.value}
                  value={hsn.value}
                >
                  {hsn.label}
                </option>
              ))}
            </select>
          </div>

          {/* Amount - AUTO */}
          <div className="md:col-span-2">
            <label className={labelClass}>
              Amount
            </label>

            <div className="relative">
              <IndianRupee
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={formatCurrency(item1Amt)}
                readOnly
                className={`${readOnlyClass} pl-11`}
              />
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Automatically calculated from Grand Total
            </p>
          </div>
        </div>
      </section>

      {/* Item 2 */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-800 dark:text-gray-100">
          Item 2
          <span className="ml-2 text-xs font-normal text-gray-400">
            (Optional)
          </span>
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
          {/* Item Name */}
          <div className="md:col-span-2">
            <label className={labelClass}>
              Item Name
            </label>

            <input
              type="text"
              name="item2Name"
              value={formData.item2Name}
              onChange={handleChange}
              placeholder="Enter item name"
              className={inputClass(
                errors.item2Name,
              )}
            />

            {errors.item2Name && (
              <p className={errorClass}>
                {errors.item2Name}
              </p>
            )}
          </div>

          {/* HSN */}
          <div>
            <label className={labelClass}>
              HSN
            </label>

            <select
              name="item2Hsn"
              value={formData.item2Hsn}
              onChange={handleChange}
              className={selectClass(
                errors.item2Hsn,
              )}
            >
              <option value="">Select HSN</option>

              {hsnOptions.map((hsn) => (
                <option
                  key={hsn.value}
                  value={hsn.value}
                >
                  {hsn.label}
                </option>
              ))}
            </select>
          </div>

          {/* Amount - AUTO */}
          <div className="md:col-span-2">
            <label className={labelClass}>
              Amount
            </label>

            <div className="relative">
              <IndianRupee
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={formatCurrency(item2Amt)}
                readOnly
                className={`${readOnlyClass} pl-11`}
              />
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Automatically calculated
            </p>
          </div>
        </div>
      </section>

      {/* GST */}
      <section>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* CGST */}
          <div>
            <label className={labelClass}>
              CGST 9%
            </label>

            <div className="relative">
              <IndianRupee
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={formatCurrency(cgst)}
                readOnly
                className={`${readOnlyClass} pl-11`}
              />
            </div>
          </div>

          {/* SGST */}
          <div>
            <label className={labelClass}>
              SGST 9%
            </label>

            <div className="relative">
              <IndianRupee
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={formatCurrency(sgst)}
                readOnly
                className={`${readOnlyClass} pl-11`}
              />
            </div>
          </div>

          {/* IGST */}
          <div>
            <label className={labelClass}>
              IGST 18%
            </label>

            <div className="relative">
              <IndianRupee
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={formatCurrency(igst)}
                readOnly
                className={`${readOnlyClass} pl-11`}
              />
            </div>
          </div>
        </div>

        {/* Grand Total */}
        <div className="mt-5 max-w-md">
          <label className={labelClass}>
            Grand Total{" "}
            <span className="text-deem-red">*</span>
          </label>

          <div className="relative">
            <IndianRupee
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="number"
              name="grandTotal"
              value={formData.grandTotal}
              onChange={handleChange}
              placeholder="Enter grand total"
              min="0"
              step="0.01"
              inputMode="decimal"
              className={`${inputClass(
                errors.grandTotal,
              )} pl-11 font-semibold`}
            />
          </div>

          <p className="mt-1 text-xs text-gray-400">
            Enter the final invoice amount including GST
          </p>

          {errors.grandTotal && (
            <p className={errorClass}>
              {errors.grandTotal}
            </p>
          )}
        </div>
      </section>

      {/* Note */}

      <section>
        <label className={labelClass}>
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
          <p className={errorClass}>
            {errors.note}
          </p>
        )}
      </section>

      {/* Buttons */}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          className="
            flex
            h-11
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-deem-red
            px-6
            text-sm
            font-medium
            text-white
            transition
            hover:bg-[#d94335]
          "
        >
          <Save size={16} />
          Save Invoice
        </button>

        <button
          type="button"
          onClick={onCancel}
          className=" h-11 cursor-pointer
            rounded-xl
            border
            border-gray-200
            px-6
            text-sm
            font-medium
            text-gray-600
            transition
            hover:bg-gray-50
            dark:border-gray-700
            dark:text-gray-300
            dark:hover:bg-gray-800
          "
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;