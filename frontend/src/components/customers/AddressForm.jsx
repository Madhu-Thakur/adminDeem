import { useEffect, useState } from "react";

const EMPTY_FORM = {
  address_type: "",
  address: "",
  gst_number: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

const AddressForm = ({
  initialData,
  defaultCountry,
  onSave,
  onCancel,
  loading = false,
}) => {
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    country: defaultCountry || "India",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        address_type:
          initialData.address_type ||
          initialData.addressType ||
          "",
        address:
          initialData.address || "",
        gst_number:
          initialData.gst_number ||
          initialData.gstNumber ||
          "",
        city:
          initialData.city || "",
        state:
          initialData.state || "",
        pincode:
          initialData.pincode
            ? String(initialData.pincode)
            : "",
        country:
          initialData.country ||
          defaultCountry ||
          "India",
      });
    } else {
      setForm({
        ...EMPTY_FORM,
        country: defaultCountry || "India",
      });
    }

    setErrors({});
  }, [initialData, defaultCountry]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "pincode"
          ? value.replace(/\D/g, "").slice(0, 6)
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.address_type.trim()) {
      newErrors.address_type =
        "Address type is required";
    }

    if (!form.address.trim()) {
      newErrors.address =
        "Full address is required";
    }

    if (!form.city.trim()) {
      newErrors.city =
        "City is required";
    }

    if (!form.state.trim()) {
      newErrors.state =
        "State is required";
    }

    if (!form.pincode.trim()) {
      newErrors.pincode =
        "Pincode is required";
    } else if (!/^\d{6}$/.test(form.pincode.trim())) {
      newErrors.pincode =
        "Pincode must be 6 digits";
    }

    if (!form.country.trim()) {
      newErrors.country =
        "Country is required";
    }

    if (form.gst_number.trim()) {
      const gstRegex =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

      if (
        !gstRegex.test(
          form.gst_number
            .trim()
            .toUpperCase(),
        )
      ) {
        newErrors.gst_number =
          "Enter a valid GST number";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSave({
      ...form,
      address_type:
        form.address_type.trim(),
      address:
        form.address.trim(),
      gst_number:
        form.gst_number
          .trim()
          .toUpperCase(),
      city:
        form.city.trim(),
      state:
        form.state.trim(),
      pincode:
        form.pincode.trim(),
      country:
        form.country.trim(),
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

  const FieldError = ({ name }) =>
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Address Type
          </label>

          <input
            type="text"
            name="address_type"
            value={form.address_type}
            onChange={handleChange}
            placeholder="Office / Billing / Shipping"
            className={inputClass(
              errors.address_type,
            )}
            disabled={loading}
          />

          <FieldError name="address_type" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Pincode
          </label>

          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Enter 6 digit pincode"
            inputMode="numeric"
            maxLength={6}
            className={inputClass(
              errors.pincode,
            )}
            disabled={loading}
          />

          <FieldError name="pincode" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Address
          </label>

          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter full address"
            className={inputClass(
              errors.address,
            )}
            disabled={loading}
          />

          <FieldError name="address" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            City
          </label>

          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Enter city"
            className={inputClass(errors.city)}
            disabled={loading}
          />

          <FieldError name="city" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            State
          </label>

          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="Enter state"
            className={inputClass(errors.state)}
            disabled={loading}
          />

          <FieldError name="state" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Country
          </label>

          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Enter country"
            className={inputClass(
              errors.country,
            )}
            disabled={loading}
          />

          <FieldError name="country" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            GST Number
            <span className="ml-1 font-normal text-gray-400">
              (Optional)
            </span>
          </label>

          <input
            type="text"
            name="gst_number"
            value={form.gst_number}
            onChange={handleChange}
            placeholder="Enter 15 digit GSTIN"
            maxLength={15}
            className={inputClass(
              errors.gst_number,
            )}
            disabled={loading}
          />

          <FieldError name="gst_number" />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="h-10 rounded-xl bg-deem-blue px-5 text-sm font-medium text-white transition hover:bg-[#0f3a55] disabled:cursor-not-allowed disabled:opacity-60"
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

export default AddressForm;
