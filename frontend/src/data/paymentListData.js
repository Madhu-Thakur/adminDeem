 

export const payments = [
  { id: 1, customerId: 2, customerName: "ABC Technologies", paymentDate: "2026-08-21", transactionType: "Payment Received", transactionNumber: "TXN20260821001", serviceType: "Website", paymentReceived: 25000, balance: 10000, status: "Paid" },
  { id: 2, customerId: 3, customerName: "XYZ Solutions", paymentDate: "2026-08-18", transactionType: "Payment Received", transactionNumber: "TXN20260818002", serviceType: "Hosting", paymentReceived: 8000, balance: 4000, status: "Partial" },
  { id: 3, customerId: 0, customerName: "Demo Enterprises", paymentDate: "2026-08-15", transactionType: "Payment Received", transactionNumber: "TXN20260815003", serviceType: "Domain", paymentReceived: 2000, balance: 0, status: "Paid" },
  { id: 4, customerId: 1, customerName: "Rahul Sharma", paymentDate: "2026-08-12", transactionType: "Payment Received", transactionNumber: "TXN20260812004", serviceType: "Website", paymentReceived: 15000, balance: 35000, status: "Pending" },
  
];

 
export const transactionTypeFilterOptions = [
  "Payment Received",
  "Refund",
  "Adjustment",
];

export const serviceTypeFilterOptions = [
  "Website",
  "Hosting",
  "Domain",
  "Software",
  "AMC",
  "Other",
];

export const statusFilterOptions = ["Paid", "Partial", "Pending"];