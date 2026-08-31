import { createContext, useContext, useEffect, useState } from "react";

const InvoiceContext = createContext();

const API_URL = "http://localhost:5000/api/invoices";

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get all invoices
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch invoices");
      }

      setInvoices(result.data || []);
    } catch (error) {
      console.error("Fetch Invoices Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get invoice by ID
  const getInvoice = async (id) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`);
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }

        throw new Error(result.message || "Failed to fetch invoice");
      }

      return result.data;
    } catch (error) {
      console.error("Get Invoice Error:", error);
      setError(error.message);
      return null;
    }
  };

  // Create invoice
  const addInvoice = async (invoiceData) => {
    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create invoice");
      }

      await fetchInvoices();

      return result.data;
    } catch (error) {
      console.error("Create Invoice Error:", error);
      setError(error.message);
      throw error;
    }
  };

  // Update invoice
  const updateInvoice = async (id, invoiceData) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update invoice");
      }

      await fetchInvoices();

      return result.data;
    } catch (error) {
      console.error("Update Invoice Error:", error);
      setError(error.message);
      throw error;
    }
  };

  // Delete invoice
  const deleteInvoice = async (id) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete invoice");
      }

      await fetchInvoices();

      return result;
    } catch (error) {
      console.error("Delete Invoice Error:", error);
      setError(error.message);
      throw error;
    }
  };

  // Load invoices when provider starts
  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        loading,
        error,
        fetchInvoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        getInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => useContext(InvoiceContext);