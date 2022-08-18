const express = require("express");
const passport = require("passport");
const CommentController = require("../controllers/comment_controller");
const router = express.Router();

router.post("/create", passport.checkAuthentication, CommentController.create);

module.exports = router;
