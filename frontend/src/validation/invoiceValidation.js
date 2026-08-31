export const validateInvoice = (data) => {
  const errors = {};

  // Customer
  if (!data.customerId) {
    errors.customer = "Please select a customer.";
  }

  // Address
  if (!data.addressId) {
    errors.customerAddress =
      "Please select a customer address.";
  }

  // Invoice Date
  if (!data.invoiceDate) {
    errors.invoiceDate =
      "Please select an invoice date.";
  }

  // Payment Mode
  if (!data.paymentMode) {
    errors.paymentMode =
      "Please select a payment mode.";
  }

  // Item 1
  if (!data.item1Name?.trim()) {
    errors.item1Name =
      "Please enter item name.";
  }

  // Grand Total
  if (
    data.grandTotal === "" ||
    data.grandTotal === null ||
    data.grandTotal === undefined
  ) {
    errors.grandTotal =
      "Please enter grand total.";
  } else if (Number(data.grandTotal) <= 0) {
    errors.grandTotal =
      "Grand total must be greater than 0.";
  }
 
  return errors;
};