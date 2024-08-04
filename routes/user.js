const express = require("express");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const router = express.Router();
const userController = require("../controller/users.js");
router.get("/signup", (req, res) => {
  //   res.send("form");
  res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(userController.signup));

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});
// authenticate() --> Automatically authenticates the user for us
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout", userController.logout);

module.exports = router;
