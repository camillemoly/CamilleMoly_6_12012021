const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

// create routes for user requests
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;