const express = require("express");
const HomeController = require("../controllers/home_controller");

const router = express.Router();

router.get("/", HomeController.home);
router.use("/user", require("./user"));

module.exports = router;
