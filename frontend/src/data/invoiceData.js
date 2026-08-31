export const customers = [
  {
    id: 1,
    name: "Rahul Sharma",
    addresses: [
      "42, Sector 15, Vadodara - 390015, Gujarat",
      "12, Alkapuri, Vadodara - 390007, Gujarat",
    ],
  },
];

export const paymentModes = [
  "Bank Transfer",
  "UPI"
   
];

export const paymentStatuses = ["Paid", "Pending", "Partial"];

export const invoices = [
  {
    id: 3,
    invoiceNumber: "INV-2026-0003",

    customerId: 1,
    customerName: "Rahul Sharma",
    
    customerAddress:
      "42, Sector 15, Vadodara - 390015, Gujarat",

    invoiceDate: "2026-08-19",

    paymentMode: "Cash",
    paymentStatus: "Paid",

    item1Name: "Custom Software Development",
    item1Hsn: "998314",
    item1Amount: 60000,

    item2Name: "",
    item2Hsn: "",
    item2Amount: 0,

    cgst: 5400,
    sgst: 5400,
    igst: 0,

    grandTotal: 70800,
  },
];

export const paymentModeFilterOptions = [
  "Bank Transfer",
  "UPI"
 
];

export const paymentStatusFilterOptions = [
  "Paid",
  "Pending"
];