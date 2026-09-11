const express = require("express");

const {
  addAnnouncement,
  getAnnouncements,
  getAnnouncement,
  editAnnouncement,
  removeAnnouncement,
} = require("../controllers/announcementControllers");

const router = express.Router();
 
router.post("/", addAnnouncement);
 
router.get("/", getAnnouncements);
 
router.get("/:id", getAnnouncement);
 
router.put("/:id", editAnnouncement);

 
router.delete("/:id", removeAnnouncement);

module.exports = router;