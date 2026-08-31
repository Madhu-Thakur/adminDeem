export const formatCurrency = (amount) => {
  const value = Number(amount) || 0;

  return `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (date) => {
  if (!date) return "-";

  const [year, month, day] = String(date)
    .slice(0, 10)
    .split("-");

  if (!year || !month || !day) {
    return "-";
  }

  return `${day}/${month}/${year.slice(2)}`;
};

export const calculateGSTFromGrandTotal = (
  grandTotal,
  isSameState,
) => {
  const total = Number(grandTotal) || 0;

  if (total <= 0) {
    return {
      amount: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      grandTotal: 0,
    };
  }

  const amount = total / 1.18;

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (isSameState) {
    cgst = amount * 0.09;
    sgst = amount * 0.09;
  } else {
    igst = amount * 0.18;
  }

  return {
    amount: Number(amount.toFixed(2)),
    cgst: Number(cgst.toFixed(2)),
    sgst: Number(sgst.toFixed(2)),
    igst: Number(igst.toFixed(2)),
    grandTotal: Number(total.toFixed(2)),
  };
};