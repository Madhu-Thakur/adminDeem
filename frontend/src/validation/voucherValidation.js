export const validateVoucher = (data) => {
  const errors = {};

  if (!data.voucherType) {
    errors.voucherType = "Voucher type is required";
  }

  if (!data.transactionDate) {
    errors.transactionDate = "Transaction date is required";
  }

  if (!data.transactionType) {
    errors.transactionType = "Transaction type is required";
  }

  if (!data.transactionNumber) {
    errors.transactionNumber = "Transaction number is required";
  }

  if (data.voucherType === "Sale" && !data.invoiceId) {
    errors.invoice = "Please select an invoice";
  }

  if (data.voucherType === "Purchase" && !data.supplierId) {
    errors.supplier = "Please select a supplier / vendor";
  }

  if (data.voucherType === "Purchase" && !data.purchaseId) {
    errors.purchase = "Please select a purchase";
  }

  return errors;
};
