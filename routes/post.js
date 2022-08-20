const express = require("express");
const passport = require("passport");
const PostController = require("../controllers/post_controller");
const router = express.Router();

router.post("/create", passport.checkAuthentication, PostController.create);
router.get("/getAll", passport.checkAuthentication, PostController.getAll);
router.delete("/:id", passport.checkAuthentication, PostController.delete);

module.exports = router;
