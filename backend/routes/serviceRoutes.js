const express = require("express");

const {
  addService,
  getServices,
  getCustomerServices,
  getService,
  editService,
  removeService,
} = require("../controllers/serviceControllers");

const router = express.Router();
 
router.post("/", addService);
 
router.get("/", getServices);
 
router.get("/customer/:customerId", getCustomerServices);
 
router.get("/:id", getService);
 
router.put("/:id", editService);
 
router.delete("/:id", removeService);

module.exports = router;