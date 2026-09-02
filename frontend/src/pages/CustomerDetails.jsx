import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const customerResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/customers/${id}`,
        );

        const customerResult = await customerResponse.json();

        if (!customerResponse.ok || !customerResult.success) {
          throw new Error(customerResult.message || "Failed to fetch customer");
        }

        setCustomer(customerResult.data);

        const addressResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/addresses/customer/${id}`,
        );

        const addressResult = await addressResponse.json();

        if (addressResult.success) {
          setAddresses(addressResult.data);
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
        alert("Failed to load customer details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 dark:text-gray-400">
        Loading customer details...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-6">
        <p className="text-gray-500 dark:text-gray-400">Customer not found.</p>

        <button
          type="button"
          onClick={() => navigate("/customers")}
          className="mt-4 px-5 h-10 rounded-xl bg-deem-blue text-white"
        >
          Back to Customers
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-3xl font-bold text-deem-blue dark:text-white">
            Customer Details
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Customer ID: #{customer.id}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/customers")}
            className="
              flex
              items-center
              gap-2
              px-5
              h-11
              border
              border-gray-200
              dark:border-gray-700
              rounded-xl
              text-gray-600
              dark:text-gray-300
              hover:bg-gray-50
              dark:hover:bg-gray-800
              transition
            "
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <button
            type="button"
            onClick={() => navigate(`/customers/edit/${customer.id}`)}
            className="
              flex
              items-center
              gap-2
              px-5
              h-11
              bg-deem-red
              hover:bg-[#d94335]
              text-white
              rounded-xl
              transition
            "
          >
            <Pencil size={17} />
            Edit
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-deem-blue dark:text-white mb-5">
          Customer Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InfoItem label="Customer Name" value={customer.customer_name} />

          <InfoItem label="Company Name" value={customer.company_name} />

          <InfoItem label="Email" value={customer.email} />

          <InfoItem label="Phone" value={customer.phone} />

          <InfoItem label="Status" value={customer.status} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-deem-blue dark:text-white mb-5">
          Customer Addresses
        </h2>

        {addresses.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No addresses found.
          </p>
        ) : (
          <div className="space-y-4">
            {addresses.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <p className="text-xs font-semibold uppercase text-gray-400 mb-1">
                  {item.addressType || "Address"}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {item.address}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
 
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase mb-1">
        {label}
      </p>

      <p className="text-sm text-gray-700 dark:text-gray-200">{value || "-"}</p>
    </div>
  );
};

export default CustomerDetails;
