import { useEffect, useState } from "react";

const SERVICE_TYPES = [
  "Website",
  "Hosting",
  "Domain",
  "Software",
  "AMC",
  "Other",
];

const DURATIONS = [
  { label: "1 Month", months: 1 },
  { label: "2 Months", months: 2 },
  { label: "3 Months", months: 3 },
  { label: "4 Months", months: 4 },
  { label: "5 Months", months: 5 },
  { label: "6 Months", months: 6 },
  { label: "7 Months", months: 7 },
  { label: "8 Months", months: 8 },
  { label: "9 Months", months: 9 },
  { label: "10 Months", months: 10 },
  { label: "11 Months", months: 11 },
  { label: "1 Year", months: 12 },
  { label: "2 Years", months: 24 },
  { label: "3 Years", months: 36 },
  { label: "4 Years", months: 48 },
];

const calculateExpiryDate = (renewalDate, duration) => {
  if (!renewalDate || !duration) return "";

  const selected = DURATIONS.find(
    (item) => item.label === duration,
  );

  if (!selected) return "";

  const date = new Date(`${renewalDate}T00:00:00`);
  date.setMonth(date.getMonth() + selected.months);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const ServiceForm = ({
  initialData,
  customerId,
  onSave,
  onCancel,
  loading = false,
}) => {
  const [form, setForm] = useState({
    service_type:
      initialData?.service_type ||
      initialData?.serviceType ||
      "",
    domain: initialData?.domain || "",
    renewal_date:
      initialData?.renewal_date ||
      initialData?.renewalDate ||
      "",
    duration: initialData?.duration || "",
    expiry_date:
      initialData?.expiry_date ||
      initialData?.expiryDate ||
      "",
    renewal_amount:
      initialData?.renewal_amount ??
      initialData?.renewalAmount ??
      "",
    service_status:
      initialData?.service_status ||
      initialData?.serviceStatus ||
      "Active",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      service_type:
        initialData?.service_type ||
        initialData?.serviceType ||
        "",
      domain: initialData?.domain || "",
      renewal_date:
        initialData?.renewal_date ||
        initialData?.renewalDate ||
        "",
      duration: initialData?.duration || "",
      expiry_date:
        initialData?.expiry_date ||
        initialData?.expiryDate ||
        "",
      renewal_amount:
        initialData?.renewal_amount ??
        initialData?.renewalAmount ??
        "",
      service_status:
        initialData?.service_status ||
        initialData?.serviceStatus ||
        "Active",
    });
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      if (
        name === "renewal_date" ||
        name === "duration"
      ) {
        next.expiry_date = calculateExpiryDate(
          name === "renewal_date"
            ? value
            : prev.renewal_date,
          name === "duration"
            ? value
            : prev.duration,
        );
      }

      return next;
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      expiry_date:
        name === "renewal_date" ||
        name === "duration"
          ? ""
          : prev.expiry_date,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!customerId) {
      newErrors.customerId =
        "Customer must be saved first";
    }

    if (!form.service_type) {
      newErrors.service_type =
        "Service type is required";
    }

    if (!form.renewal_date) {
      newErrors.renewal_date =
        "Renewal date is required";
    }

    if (!form.duration) {
      newErrors.duration =
        "Duration is required";
    }

    if (!form.expiry_date) {
      newErrors.expiry_date =
        "Expiry date could not be calculated";
    }

    if (
      form.renewal_amount !== "" &&
      (Number.isNaN(Number(form.renewal_amount)) ||
        Number(form.renewal_amount) < 0)
    ) {
      newErrors.renewal_amount =
        "Renewal amount must be 0 or greater";
    }

    if (!form.service_status) {
      newErrors.service_status =
        "Service status is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSave({
      customer_id: Number(customerId),
      service_type: form.service_type,
      domain: form.domain.trim() || null,
      renewal_date: form.renewal_date,
      duration: form.duration,
      expiry_date: form.expiry_date,
      renewal_amount:
        form.renewal_amount === ""
          ? null
          : Number(form.renewal_amount),
      service_status: form.service_status,
    });
  };

  const inputClass = (hasError) => `
    w-full h-11 px-4 rounded-xl border
    ${
      hasError
        ? "border-deem-red focus:border-deem-red focus:ring-2 focus:ring-red-100"
        : "border-gray-200 dark:border-gray-700 focus:border-deem-red focus:ring-2 focus:ring-red-100"
    }
    bg-white dark:bg-[#0b0f14]
    text-sm text-gray-700 dark:text-gray-200
    outline-none transition
  `;

  const errorText = (name) =>
    errors[name] ? (
      <p className="mt-1 text-xs text-deem-red">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#0b0f14]"
    >
      {errors.customerId && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          {errors.customerId}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Service Type{" "}
            <span className="text-deem-red">*</span>
          </label>

          <select
            name="service_type"
            value={form.service_type}
            onChange={handleChange}
            className={inputClass(
              errors.service_type,
            )}
            disabled={loading}
          >
            <option value="">
              Select service type
            </option>

            {SERVICE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {errorText("service_type")}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Domain
          </label>

          <input
            type="text"
            name="domain"
            value={form.domain}
            onChange={handleChange}
            placeholder="example.com"
            className={inputClass()}
            disabled={loading}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Renewal Date{" "}
            <span className="text-deem-red">*</span>
          </label>

          <input
            type="date"
            name="renewal_date"
            value={form.renewal_date}
            onChange={handleChange}
            className={inputClass(
              errors.renewal_date,
            )}
            disabled={loading}
          />

          {errorText("renewal_date")}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Duration{" "}
            <span className="text-deem-red">*</span>
          </label>

          <select
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className={inputClass(errors.duration)}
            disabled={loading}
          >
            <option value="">
              Select duration
            </option>

            {DURATIONS.map((item) => (
              <option
                key={item.label}
                value={item.label}
              >
                {item.label}
              </option>
            ))}
          </select>

          {errorText("duration")}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Expiry Date{" "}
            <span className="text-deem-red">*</span>
          </label>

          <input
            type="date"
            name="expiry_date"
            value={form.expiry_date}
            readOnly
            className={`${inputClass(
              errors.expiry_date,
            )} cursor-not-allowed opacity-80`}
          />

          {errorText("expiry_date")}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Renewal Amount
          </label>

          <input
            type="number"
            name="renewal_amount"
            value={form.renewal_amount}
            onChange={handleChange}
            placeholder="Enter renewal amount"
            min="0"
            step="0.01"
            inputMode="decimal"
            className={inputClass(
              errors.renewal_amount,
            )}
            disabled={loading}
          />

          {errorText("renewal_amount")}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Service Status
          </label>

          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                service_status:
                  prev.service_status === "Active"
                    ? "Inactive"
                    : "Active",
              }))
            }
            disabled={loading}
            className="flex h-11 cursor-pointer items-center gap-3 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                form.service_status === "Active"
                  ? "bg-emerald-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                  form.service_status === "Active"
                    ? "translate-x-5"
                    : "translate-x-0.5"
                }`}
              />
            </span>

            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {form.service_status}
            </span>
          </button>

          {errorText("service_status")}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading || !customerId}
          className="h-10 rounded-xl bg-deem-red px-5 text-sm font-medium text-white transition hover:bg-[#d94335] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : initialData
              ? "Update"
              : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="h-10 rounded-xl border border-gray-200 px-5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
