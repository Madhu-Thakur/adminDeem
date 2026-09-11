import { Save } from "lucide-react";
import { useEffect, useState } from "react";

const AnnouncementForm = ({
  onSubmit,
  onCancel,
  initialData,
  isViewMode = false,
}) => {
  const [formData, setFormData] = useState({
    type: initialData?.type || "",
    announce: initialData?.announce || "",
    role: initialData?.role || "",
    status:
      initialData?.status !== undefined
        ? String(initialData.status)
        : "1",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      type: initialData?.type || "",
      announce: initialData?.announce || "",
      role: initialData?.role || "",
      status:
        initialData?.status !== undefined
          ? String(initialData.status)
          : "1",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const validationErrors = {};

    if (!formData.type.trim()) {
      validationErrors.type = "Type is required";
    }

    if (!formData.announce.trim()) {
      validationErrors.announce = "Announcement is required";
    }

    if (!formData.role.trim()) {
      validationErrors.role = "Role is required";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isViewMode) {
      return;
    }

    if (!validate()) {
      return;
    }

    onSubmit({
      type: formData.type.trim(),
      announce: formData.announce.trim(),
      role: formData.role.trim(),
      status: Number(formData.status),
    });
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

  const textareaClass = (hasError) => {
    const classes = [
      "w-full",
      "min-h-[160px]",
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

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <fieldset disabled={isViewMode} className="contents">
        <section>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
     
            <div>
              <label className={labelClass}>
                Type <span className="text-deem-red">*</span>
              </label>

              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Enter announcement type"
                className={inputClass(errors.type)}
              />

              {errors.type && (
                <p className={errorClass}>{errors.type}</p>
              )}
            </div>
 
            <div>
              <label className={labelClass}>
                Role <span className="text-deem-red">*</span>
              </label>

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter role"
                className={inputClass(errors.role)}
              />

              {errors.role && (
                <p className={errorClass}>{errors.role}</p>
              )}
            </div>
          </div>
        </section>
 
        <section>
          <label className={labelClass}>
            Announcement <span className="text-deem-red">*</span>
          </label>

          <textarea
            name="announce"
            value={formData.announce}
            onChange={handleChange}
            placeholder="Enter announcement"
            maxLength={500}
            className={textareaClass(errors.announce)}
          />

          <div className="mt-1 flex justify-between gap-3">
            {errors.announce ? (
              <p className={errorClass}>{errors.announce}</p>
            ) : (
              <span />
            )}

            <p className="text-xs text-gray-400">
              {formData.announce.length}/500
            </p>
          </div>
        </section>
 
        <section>
          <div className="max-w-md">
            <label className={labelClass}>Status</label>

            {isViewMode ? (
              <input
                type="text"
                value={
                  Number(formData.status) === 1
                    ? "Active"
                    : "Inactive"
                }
                readOnly
                className={readOnlyClass}
              />
            ) : (
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`${inputClass(false)} cursor-pointer`}
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            )}
          </div>
        </section>
      </fieldset>
 
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {!isViewMode && (
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
            Save Announcement
          </button>
        )}

        <button
          type="button"
          onClick={onCancel}
          className="
            h-11
            cursor-pointer
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

export default AnnouncementForm;