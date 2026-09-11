 
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Wrench } from "lucide-react";

import CollapsibleSection from "../components/customers/CollapsibleSection";
import ServiceTable from "../components/customers/ServiceTable";
import CustomerInvoices from "../components/customers/CustomerInvoices";

import {
  CUSTOMER_API_URL,
  ADDRESS_API_URL,
  SERVICE_API_URL,
} from "../utils/api";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const customerResponse = await fetch(
          `${CUSTOMER_API_URL}/${id}`,
        );

        const customerResult = await customerResponse.json();

        if (!customerResponse.ok || !customerResult.success) {
          throw new Error(
            customerResult.message || "Failed to fetch customer",
          );
        }

        setCustomer(customerResult.data);

        const addressResponse = await fetch(
          `${ADDRESS_API_URL}/customer/${id}`,
        );

        const addressResult = await addressResponse.json();

        if (addressResult.success) {
          setAddresses(
            Array.isArray(addressResult.data)
              ? addressResult.data
              : [],
          );
        }

        const serviceResponse = await fetch(
          `${SERVICE_API_URL}/customer/${id}`,
        );

        const serviceResult = await serviceResponse.json();

        if (serviceResult.success) {
          setServices(
            Array.isArray(serviceResult.data)
              ? serviceResult.data
              : [],
          );
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
        <p className="text-gray-500 dark:text-gray-400">
          Customer not found.
        </p>

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
            onClick={() =>
              navigate(`/customers/edit/${customer.id}`)
            }
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
          <InfoItem
            label="Customer Name"
            value={customer.customer_name}
          />

          <InfoItem
            label="Company Name"
            value={customer.company_name}
          />

          <InfoItem
            label="Email"
            value={customer.email}
          />

          <InfoItem
            label="Phone"
            value={customer.phone}
          />

          <InfoItem
            label="Status"
            value={customer.status}
          />
        </div>
      </div>
 
      <CollapsibleSection title="Address">
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
                  {item.address_type || "Address"}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {item.address}
                </p>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>
 
      <CollapsibleSection title="Services">
        {services.length === 0 ? (
          <div className="py-10 text-center text-gray-500 dark:text-gray-400">
            <Wrench
              size={32}
              className="mx-auto mb-3 opacity-40"
            />

            <p className="text-sm">
              No services found
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#e6edf2] bg-white dark:border-gray-700 dark:bg-[#161b22]">
            <ServiceTable services={services} />
          </div>
        )}
      </CollapsibleSection>
 
      <CustomerInvoices customerId={id} />
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase mb-1">
        {label}
      </p>

      <p className="text-sm text-gray-700 dark:text-gray-200">
        {value || "-"}
      </p>
    </div>
  );
};

export default CustomerDetails;