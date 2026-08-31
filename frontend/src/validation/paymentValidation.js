 
export const validatePayment = (data) => {
  const errors = {};

  if (!data.customerId) {
    errors.customer = "Customer is required";
  }

  if (!data.paymentDate) {
    errors.paymentDate = "Payment date is required";
  }

  if (!data.transactionType) {
    errors.transactionType = "Transaction type is required";
  }

  const received = data.paymentReceived;
  if (received === "" || received === null || received === undefined) {
    errors.paymentReceived = "Payment received is required";
  } else {
    const numeric = Number(received);
    if (Number.isNaN(numeric)) {
      errors.paymentReceived = "Enter a valid amount";
    } else if (numeric < 0) {
      errors.paymentReceived = "Amount cannot be negative";
    }
  }

  return errors;
};
