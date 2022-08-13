const express = require("express");
const UserController = require("../controllers/user_controller");
const router = express.Router();

router.get("/profile", UserController.profile);

router.post("/create", UserController.create);

router.post("/login", UserController.login);

module.exports = router;
