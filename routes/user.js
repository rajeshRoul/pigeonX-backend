const express = require("express");
const passport = require("passport");
const UserController = require("../controllers/user_controller");
const router = express.Router();

router.get("/profile", passport.checkAuthentication, UserController.profile);

router.post("/create", UserController.create);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

module.exports = router;
