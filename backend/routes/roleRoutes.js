const express = require("express");

const {
  getRoles,
} = require("../controllers/roleControllers");

const router = express.Router();

router.get("/", getRoles);

module.exports = router;