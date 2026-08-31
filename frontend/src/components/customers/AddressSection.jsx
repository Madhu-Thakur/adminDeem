import { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";

import AddressForm from "./AddressForm";
import AddressList from "./AddressList";
import { ADDRESS_API_URL } from "../../utils/api";

const AddressSection = ({
  customerId,
  addresses: externalAddresses,
  setAddresses,
  defaultCountry = "India",
}) => {
  const [addresses, setLocalAddresses] =
    useState(externalAddresses || []);

  const [showForm, setShowForm] =
    useState(false);

  const [editingAddress, setEditingAddress] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    if (Array.isArray(externalAddresses)) {
      setLocalAddresses(externalAddresses);
    }
  }, [externalAddresses]);

  const updateAddresses = (next) => {
    setLocalAddresses(next);

    if (setAddresses) {
      setAddresses(next);
    }
  };
 
  const fetchAddresses = useCallback(
    async () => {
      if (!customerId) {
        updateAddresses([]);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${ADDRESS_API_URL}/customer/${customerId}`,
        );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch addresses",
          );
        }

        const fetchedAddresses =
          Array.isArray(result.data)
            ? result.data
            : [];

        updateAddresses(
          fetchedAddresses,
        );
      } catch (err) {
        console.error(
          "Fetch Addresses Error:",
          err,
        );

        setError(
          err.message ||
            "Failed to fetch addresses.",
        );
      } finally {
        setLoading(false);
      }
    },
    [customerId],
  );

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleSave = async (
    addressData,
  ) => {
    if (!customerId) {
      setError(
        "Please save the customer first before adding an address.",
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = {
        customer_id: Number(customerId),
        address_type:
          addressData.address_type,
        address:
          addressData.address,
        gst_number:
          addressData.gst_number || null,
        city:
          addressData.city,
        state:
          addressData.state,
        pincode:
          addressData.pincode,
        country:
          addressData.country || "India",
      };

      const isEditing =
        Boolean(editingAddress?.id);

      const url = isEditing
        ? `${ADDRESS_API_URL}/${editingAddress.id}`
        : ADDRESS_API_URL;

      const method = isEditing
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to save address",
        );
      }

      setSuccess(
        isEditing
          ? "Address updated successfully."
          : "Address added successfully.",
      );

      setShowForm(false);
      setEditingAddress(null);
 
      await fetchAddresses();
    } catch (err) {
      console.error(
        "Save Address Error:",
        err,
      );

      setError(
        err.message ||
          "Failed to save address.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setError("");
    setSuccess("");
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = async (
    address,
  ) => {
    if (!address?.id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(address.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${ADDRESS_API_URL}/${address.id}`,
        {
          method: "DELETE",
        },
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete address",
        );
      }

      setSuccess(
        "Address deleted successfully.",
      );

      await fetchAddresses();
    } catch (err) {
      console.error(
        "Delete Address Error:",
        err,
      );

      setError(
        err.message ||
          "Failed to delete address.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleAdd = () => {
    setError("");
    setSuccess("");
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
    setError("");
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-deem-blue dark:text-white">
          Addresses
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!customerId}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-deem-blue px-4 text-sm font-medium text-white transition hover:bg-[#0f3a55] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
            Add Address
          </button>
        </div>
      </div>

      {!customerId && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Save the customer first to add and
          manage addresses.
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-deem-red">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {showForm ? (
        <AddressForm
          initialData={editingAddress}
          defaultCountry={
            defaultCountry
          }
          onSave={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      ) : loading &&
        addresses.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Loading addresses...
        </div>
      ) : (
        <AddressList
          addresses={addresses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}
    </div>
  );
};

export default AddressSection;
