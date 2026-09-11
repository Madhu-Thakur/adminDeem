const express = require("express");

const {
  addCustomer,
  getCustomers,
  getCustomer,
  editCustomer,
  updatePayment,
  updateStatus,
  removeCustomer,
} = require("../controllers/customerControllers");

const router = express.Router();
 
router.post("/", addCustomer);
 
router.get("/", getCustomers);
 
router.get("/:id", getCustomer);

router.put("/:id/status", updateStatus);
 
router.put("/:id", editCustomer);

router.put("/:id/payment", updatePayment);

// Delete Customer
router.delete("/:id", removeCustomer);

module.exports = router;