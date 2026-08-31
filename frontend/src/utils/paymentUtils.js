 
export const MOCK_OUTSTANDING_AMOUNT = 5000;
 
export const calculateBalance = (outstandingAmount, paymentReceived) => {
  const outstanding = Number(outstandingAmount) || 0;
  const received = Number(paymentReceived) || 0;

  return Math.max(outstanding - received, 0);
};

 
export const formatCurrency = (amount) => {
  const value = Number(amount) || 0;

  return `₹${value.toLocaleString("en-IN")}`;
};
