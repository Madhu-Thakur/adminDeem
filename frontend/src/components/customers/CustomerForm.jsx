import { useState } from "react";
import { CheckCircle2, CreditCard, Send } from "lucide-react";

const CustomerForm = ({
  formData,
  setFormData,
  onSubmit,
  loading = false,
  editMode = false,
}) => {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName?.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+\d][\d\s-]{7,14}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setSubmitted(false);

  try {
    await onSubmit();
    setSubmitted(true);

    if (!editMode) {
      setTimeout(() => setSubmitted(false), 3000);
    }
  } catch (error) {
    console.error("Error saving customer:", error);
  }
};

  const inputClass = (hasError) => `
    w-full h-11 px-4 rounded-xl border
    ${
      hasError
        ? "border-deem-red focus:border-deem-red focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950/30"
        : "border-gray-200 dark:border-gray-700 focus:border-deem-red focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950/30"
    }
    bg-white dark:bg-[#0b0f14]
    text-sm text-gray-700 dark:text-gray-200
    outline-none transition
  `;

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Customer Name <span className="text-deem-red">*</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName || ""}
            onChange={handleChange}
            placeholder="Enter customer name"
            className={inputClass(errors.customerName)}
          />
          {errors.customerName && (
            <p className="mt-1 text-xs text-deem-red">{errors.customerName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleChange}
            placeholder="Enter company name"
            className={inputClass(errors.companyName)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Phone Number <span className="text-deem-red">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="Enter phone number"
            className={inputClass(errors.phone)}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-deem-red">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Email <span className="text-deem-red">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Enter email address"
            className={inputClass(errors.email)}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-deem-red">{errors.email}</p>
          )}
        </div>
      </div>

      {submitted && (
        <div className="mt-5 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm">
          <CheckCircle2 size={18} />
          {editMode
            ? "Customer updated successfully!"
            : "Customer added successfully!"}
        </div>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 h-11 bg-deem-red hover:bg-[#d94335] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium text-sm transition cursor-pointer"
        >
          <Send size={16} />
          {loading
            ? "Saving..."
            : editMode
              ? "Update"
              : "Submit"}
        </button>

        {/* <button
          type="button"
          onClick={onShowPayment}
          className="flex items-center gap-2 px-6 h-11 bg-deem-blue hover:bg-[#0f3a55] text-white rounded-xl font-medium text-sm transition cursor-pointer"
        >
          <CreditCard size={16} />
          Payment
        </button> */}

        <div className="flex items-center gap-2 ml-2">
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                status: prev.status === "Active" ? "Inactive" : "Active",
              }))
            }
            className={`relative w-12 h-6 rounded-full transition cursor-pointer ${
              formData.status === "Active"
                ? "bg-emerald-500"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                formData.status === "Active" ? "left-7" : "left-1"
              }`}
            />
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-300">
            {formData.status === "Active" ? "Active User" : "Inactive User"}
          </span>
        </div>
      </div>
    </form>
  );
};

export default CustomerForm;
