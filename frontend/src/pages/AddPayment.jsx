import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronRight, CheckCircle2 } from "lucide-react";

import PaymentForm from "../components/payments/PaymentForm";
import { customers } from "../data/paymentData";
import {
  calculateBalance,
  formatCurrency,
  MOCK_OUTSTANDING_AMOUNT,
} from "../utils/paymentUtils";
import { usePayment } from "../context/PaymentContext";

const AddPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [savedPayment, setSavedPayment] = useState(null);
  const { addPayment, updatePayment, getPayment } = usePayment();

  const editId = Number(searchParams.get("id"));
  const paymentToEdit = editId ? getPayment(editId) : null;

  const buildPayment = (data) => {
    const selectedCustomer = customers.find(
      (customer) => customer.id === Number(data.customerId)
    );
    const received = Number(data.paymentReceived) || 0;
    const remaining = calculateBalance(MOCK_OUTSTANDING_AMOUNT, received);
    const status =
      remaining === 0 ? "Paid" : received > 0 ? "Partial" : "Pending";

    return {
      customerId: Number(data.customerId),
      customerName: selectedCustomer?.name ?? "",
      paymentDate: data.paymentDate,
      transactionType: data.transactionType,
      transactionNumber: data.transactionNumber,
      serviceType: data.serviceType,
      paymentReceived: received,
      balance: remaining,
      status,
      note: data.note,
    };
  };

  const handleSubmit = (data) => {
    const payment = buildPayment(data);

    if (paymentToEdit) {
      updatePayment(editId, payment);
    } else {
      addPayment(payment);
    }

    setSavedPayment(payment);

    setTimeout(() => {
      navigate("/payments");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/payments");
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
        <button
          type="button"
          onClick={() => navigate("/customers")}
          className="hover:text-deem-blue dark:hover:text-white transition cursor-pointer"
        >
          Customers
        </button>
        <ChevronRight size={14} />
        <span>Payments</span>
        <ChevronRight size={14} />
        <span className="text-deem-blue dark:text-white font-medium">
          Add Payment
        </span>
      </div>
 
      <div className="rounded-2xl bg-white dark:bg-[#161b22] border border-[#e6edf2] dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-deem-blue dark:text-white mb-5">
          Payment Information
        </h2>

        {savedPayment ? (
          <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm">
            <CheckCircle2 size={20} />
            <span>
              Payment of{" "}
              <strong className="font-medium">
                {formatCurrency(savedPayment.paymentReceived)}
              </strong>{" "}
              from{" "}
              <strong className="font-medium">{savedPayment.customerName}</strong>{" "}
              on{" "}
              <strong className="font-medium">{savedPayment.paymentDate}</strong>{" "}
              has been saved.
            </span>
          </div>
        ) : (
          <PaymentForm
            key={searchParams.get("id") || "new"}
            initialData={paymentToEdit}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default AddPayment;
