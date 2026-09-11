import { useEffect, useRef, useState } from "react";
import { Bold, Italic, Underline, Save } from "lucide-react";

const NotificationForm = ({
  initialData = null,
  onSubmit,
  loading = false,
  viewMode = false,
}) => {
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    notify: "",
    role: "",
    status: 1,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        notify: initialData.notify || "",
        role: initialData.role || "",
        status: Number(initialData.status ?? 1),
      });

      if (editorRef.current) {
        editorRef.current.innerHTML = initialData.notify || "";
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value,
    }));
  };

  const handleEditorInput = () => {
    const html = editorRef.current?.innerHTML || "";

    setFormData((prev) => ({
      ...prev,
      notify: html,
    }));
  };

  const handleFormat = (command) => {
    if (viewMode) return;

    editorRef.current?.focus();
    document.execCommand(command, false, null);
    handleEditorInput();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const plainText =
      editorRef.current?.innerText?.trim() || "";

    if (!formData.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!plainText) {
      setError("Notification is required.");
      return;
    }

    if (!formData.role.trim()) {
      setError("Role is required.");
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      notify: formData.notify,
      role: formData.role.trim(),
      status: Number(formData.status),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-deem-red/20 bg-deem-red/5 px-4 py-3 text-sm text-deem-red">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/80">
          Title <span className="text-deem-red">*</span>
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength={255}
          disabled={viewMode}
          placeholder="Enter notification title"
          className="
            w-full
            rounded-lg
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            text-sm
            text-gray-800
            outline-none
            transition
            focus:border-deem-blue
            dark:border-white/10
            dark:bg-[#11161d]
            dark:text-white
            dark:placeholder:text-white/40
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        />

        {!viewMode && (
          <p className="mt-1 text-right text-xs text-gray-400 dark:text-white/40">
            {formData.title.length}/255
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/80">
          Notification <span className="text-deem-red">*</span>
        </label>

        {!viewMode && (
          <div className="flex items-center gap-1 rounded-t-lg border border-b-0 border-gray-200 bg-gray-50 px-2 py-2 dark:border-white/10 dark:bg-white/5">
            <button
              type="button"
              title="Bold"
              onClick={() => handleFormat("bold")}
              className="
                flex h-8 w-8 cursor-pointer items-center justify-center
                rounded-md text-gray-600 transition
                hover:bg-deem-blue/10 hover:text-deem-blue
                dark:text-white/70
                dark:hover:bg-white/10 dark:hover:text-white
              "
            >
              <Bold size={16} />
            </button>

            <button
              type="button"
              title="Italic"
              onClick={() => handleFormat("italic")}
              className="
                flex h-8 w-8 cursor-pointer items-center justify-center
                rounded-md text-gray-600 transition
                hover:bg-deem-blue/10 hover:text-deem-blue
                dark:text-white/70
                dark:hover:bg-white/10 dark:hover:text-white
              "
            >
              <Italic size={16} />
            </button>

            <button
              type="button"
              title="Underline"
              onClick={() => handleFormat("underline")}
              className="
                flex h-8 w-8 cursor-pointer items-center justify-center
                rounded-md text-gray-600 transition
                hover:bg-deem-blue/10 hover:text-deem-blue
                dark:text-white/70
                dark:hover:bg-white/10 dark:hover:text-white
              "
            >
              <Underline size={16} />
            </button>
          </div>
        )}

        <div
          ref={editorRef}
          contentEditable={!viewMode}
          suppressContentEditableWarning
          onInput={handleEditorInput}
          data-placeholder="Write notification..."
          className={`
            min-h-40
            w-full
            overflow-y-auto
            rounded-lg
            border
            border-gray-200
            bg-white
            px-4
            py-3
            text-sm
            leading-6
            text-gray-800
            outline-none
            transition
            focus:border-deem-blue
            dark:border-white/10
            dark:bg-[#11161d]
            dark:text-white
            [&_p]:my-1
            [&_strong]:font-bold
            [&_em]:italic
            [&_u]:underline
            ${
              !viewMode
                ? "rounded-t-none"
                : ""
            }
          `}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
       
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/80">
            Role <span className="text-deem-red">*</span>
          </label>

          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={viewMode}
            placeholder="Enter role"
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-800
              outline-none
              transition
              focus:border-deem-blue
              dark:border-white/10
              dark:bg-[#11161d]
              dark:text-white
              dark:placeholder:text-white/40
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/80">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={viewMode}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-800
              outline-none
              transition
              focus:border-deem-blue
              dark:border-white/10
              dark:bg-[#11161d]
              dark:text-white
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      {!viewMode && (
        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-deem-red
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#d94335]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Save size={17} />

            {loading ? "Saving..." : "Save Notification"}
          </button>
        </div>
      )}
    </form>
  );
};

export default NotificationForm;