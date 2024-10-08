const express = require("express");
const HomeController = require("../controllers/home_controller");

const router = express.Router();

router.get("/", HomeController.home);
router.use("/user", require("./user"));
router.use("/post", require("./post"));
router.use("/comment", require("./comment"));

module.exports = router;
