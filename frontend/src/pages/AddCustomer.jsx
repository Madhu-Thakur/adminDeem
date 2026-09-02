import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import CustomerForm from "../components/customers/CustomerForm";
import AddressSection from "../components/customers/AddressSection";
import ServiceDetails from "../components/customers/ServiceDetails";
import { CUSTOMER_API_URL, parseJson } from "../utils/api";
import InvoiceSection from "../components/customers/InvoiceSection";

const AddCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    phone: "",
    email: "",
    status: "Active",
  });

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState("");

  const params = new URLSearchParams(location.search);
  const editId = params.get("id");
  const editMode = Boolean(editId);

  const [customerId, setCustomerId] = useState(
    editMode ? String(editId) : null,
  );

  useEffect(() => {
    if (!editId) return;

    const loadCustomer = async () => {
      try {
        setPageLoading(true);
        setError("");

        // GET http://localhost:5000/api/customers/:id
        const response = await fetch(`${CUSTOMER_API_URL}/${editId}`);
        const result = await parseJson(response);

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load customer");
        }

        const customer = result.data;

        setCustomerId(String(customer.id));

        setFormData({
          customerName: customer.customer_name || "",
          companyName: customer.company_name || "",
          phone: customer.phone || "",
          email: customer.email || "",
          status: customer.status || "Active",
        });
      } catch (err) {
        console.error("Load Customer Error:", err);
        setError(err.message || "Failed to load customer.");
      } finally {
        setPageLoading(false);
      }
    };

    loadCustomer();
  }, [editId]);

  const handleCustomerSubmit = async () => {
    setLoading(true);
    setError("");

    const payload = {
      customer_name: formData.customerName.trim(),
      company_name: formData.companyName.trim() || null,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      status: formData.status || "Active",
    };

    try {
      const url = editMode ? `${CUSTOMER_API_URL}/${editId}` : CUSTOMER_API_URL;

      const response = await fetch(url, {
        method: editMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await parseJson(response);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save customer");
      }

      if (!editMode) {
        const newCustomerId = result.data?.id;

        if (newCustomerId) {
          setCustomerId(String(newCustomerId));

          navigate(`/customers/add?id=${newCustomerId}`, {
            replace: true,
          });
        }
      } else {
        navigate("/customers");
      }
    } catch (err) {
      console.error("Save Customer Error:", err);
      setError(err.message || "Failed to save customer.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div>
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-deem-blue dark:text-white">
            Edit Customer
          </h1>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 p-8 text-center text-sm text-gray-500">
          Loading customer...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <button
            type="button"
            onClick={() => navigate("/customers")}
            className="hover:text-deem-blue dark:hover:text-white transition cursor-pointer"
          >
            Customers
          </button>

          <ChevronRight size={14} />

          <span className="text-deem-blue dark:text-white font-medium">
            {editMode ? "Edit Customer" : "Add Customer"}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-deem-blue dark:text-white">
          {editMode ? "Edit Customer" : "Add Customer"}
        </h1>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-deem-red/20 bg-red-50 px-4 py-3 text-sm text-deem-red">
          {error}
        </div>
      )}

      <div className="rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-deem-blue dark:text-white mb-5">
          Customer Information
        </h2>

        <CustomerForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleCustomerSubmit}
          loading={loading}
          editMode={editMode}
          onShowPayment={() => navigate("/payments/add")}
        />
      </div>

      <div className="mt-6 rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 p-6">
        <AddressSection
          customerId={customerId}
          addresses={addresses}
          setAddresses={setAddresses}
          defaultCountry=""
        />
      </div>

      <div className="mt-6 rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 p-6">
        <ServiceDetails customerId={customerId} />
      </div>

      {editMode && customerId && (
        <div className="mt-6 rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 p-6">
          <InvoiceSection customerId={customerId} />
        </div>
      )}
    </div>
  );
};

export default AddCustomer;
