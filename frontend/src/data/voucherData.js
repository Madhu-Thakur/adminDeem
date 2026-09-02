export const voucherTypes = ["Sale", "Purchase"];

export const transactionTypeOptions = [
  "UPI",
  "Cash",
  "Bank Transfer",
  "Cheque",
  "Card",
  "Other",
];

export const saleInvoices = [
  {
    id: "INV-001",
    label: "INV-001 | ABC Company | ₹11,800",
    customerId: "CUST-001",
    customerName: "ABC Company",
    amount: 11800,
    cgst: 900,
    sgst: 900,
    igst: 0,
  },
  {
    id: "INV-002",
    label: "INV-002 | XYZ Company | ₹8,500",
    customerId: "CUST-002",
    customerName: "XYZ Company",
    amount: 8500,
    cgst: 648.31,
    sgst: 648.31,
    igst: 0,
  },
  {
    id: "INV-003",
    label: "INV-003 | PQR Company | ₹15,000",
    customerId: "CUST-003",
    customerName: "PQR Company",
    amount: 15000,
    cgst: 1144.07,
    sgst: 1144.07,
    igst: 0,
  },
];

export const suppliers = [
  "ABC Hosting Pvt Ltd",
  "XYZ Technologies",
  "PQR Solutions",
];

export const purchaseOrders = [
  {
    id: "PUR-001",
    label: "PUR-001 | ABC Hosting Pvt Ltd | ₹5,900",
    supplier: "ABC Hosting Pvt Ltd",
    amount: 5900,
    cgst: 450,
    sgst: 450,
    igst: 0,
  },
  {
    id: "PUR-002",
    label: "PUR-002 | XYZ Technologies | ₹8,500",
    supplier: "XYZ Technologies",
    amount: 8500,
    cgst: 648.31,
    sgst: 648.31,
    igst: 0,
  },
  {
    id: "PUR-003",
    label: "PUR-003 | PQR Solutions | ₹12,000",
    supplier: "PQR Solutions",
    amount: 12000,
    cgst: 915.25,
    sgst: 915.25,
    igst: 0,
  },
];