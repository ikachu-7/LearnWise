const express = require("express");
const {
  registerControllerForAuth,
  VerifyEmailForAuth,
  LoginControllerForAuth,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerControllerForAuth);

router.put("/verify-email/:id", VerifyEmailForAuth);

router.post("/login", LoginControllerForAuth);

module.exports = router;
