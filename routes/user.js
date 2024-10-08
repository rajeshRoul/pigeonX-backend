const express = require("express");
const passport = require("passport");
const UserController = require("../controllers/user_controller");
const router = express.Router();

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  UserController.profile
);

router.post("/create", UserController.create);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

router.get("/getAll", passport.checkAuthentication, UserController.getAllUsers);

router.patch(
  "/profile/:id",
  passport.checkAuthentication,
  UserController.updateProfile
);

module.exports = router;
