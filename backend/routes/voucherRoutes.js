const express = require("express");

const {
  addVoucher,
  getVouchers,
  getAvailableSaleInvoicesList,
} = require("../controllers/voucherControllers");

const router = express.Router();

router.post("/", addVoucher);

router.get("/", getVouchers);

router.get("/available-invoices", getAvailableSaleInvoicesList);

module.exports = router;
