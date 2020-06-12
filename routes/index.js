const express = require("express"),
  passport = require("passport");
router = express.Router();
router.get("/", function (req, res) {
  res.render("index");
});
router.get("/contactus", function (req, res) {
  res.render("contactus");
});
router.get("/logout", function (req, res) {
  req.logout();

  req.flash("success", "You log out successfully");
  res.redirect("/");
});
module.exports = router;
