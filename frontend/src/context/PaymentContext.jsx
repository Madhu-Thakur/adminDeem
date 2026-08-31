import { createContext, useContext, useState } from "react";

import { payments as initialPayments } from "../data/paymentListData";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState(initialPayments);

  const addPayment = (payment) => {
    const nextId =
      payments.length > 0
        ? Math.max(...payments.map((payment) => payment.id)) + 1
        : 1;

    setPayments((prev) => [{ ...payment, id: nextId }, ...prev]);
  };

  const updatePayment = (id, payment) => {
    setPayments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...payment, id } : item)),
    );
  };

  const deletePayment = (id) => {
    setPayments((prev) => prev.filter((item) => item.id !== id));
  };

  const getPayment = (id) =>
    payments.find((item) => item.id === Number(id));

  return (
    <PaymentContext.Provider
      value={{ payments, addPayment, updatePayment, deletePayment, getPayment }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);