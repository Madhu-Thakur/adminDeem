const express = require("express");

const {
  addNotification,
  getNotifications,
  getNotification,
  editNotification,
  removeNotification,
} = require("../controllers/notificationControllers");

const router = express.Router();

 
router.post("/", addNotification);

 
router.get("/", getNotifications);

 
router.get("/:id", getNotification);
 
router.put("/:id", editNotification);

 
router.delete("/:id", removeNotification);

module.exports = router;