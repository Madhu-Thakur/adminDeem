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

  if (!data.transactionNumber?.trim() && data.transactionType !== "Cash") {
    errors.transactionNumber = "Transaction number is required";
  }

  if (data.voucherType === "Sale" && !data.invoiceId) {
    errors.invoice = "Please select an invoice";
  }

  if (data.voucherType === "Purchase") {
    const amount = data.amount;

    if (amount === "" || amount === null || amount === undefined) {
      errors.amount = "Amount is required";
    } else if (Number.isNaN(Number(amount))) {
      errors.amount = "Enter a valid amount";
    } else if (Number(amount) < 0) {
      errors.amount = "Amount cannot be negative";
    }

    ["cgst", "sgst", "igst"].forEach((key) => {
      const value = data[key];

      if (value !== "" && value !== null && value !== undefined) {
        if (Number.isNaN(Number(value))) {
          errors[key] = `${key.toUpperCase()} must be a valid number`;
        } else if (Number(value) < 0) {
          errors[key] = `${key.toUpperCase()} cannot be negative`;
        }
      }
    });
  }

  if (!data.narration?.trim()) {
    errors.narration = "Narration is required";
  }

  return errors;
};
