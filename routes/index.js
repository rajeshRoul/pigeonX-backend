const express = require("express");
const HomeController = require("../controllers/home_controller");

const router = express.Router();

router.get("/", HomeController.home);

module.exports = router;
