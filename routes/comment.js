const express = require("express");
const passport = require("passport");
const CommentController = require("../controllers/comment_controller");
const router = express.Router();

router.post("/create", passport.checkAuthentication, CommentController.create);
router.delete("/:id", passport.checkAuthentication, CommentController.delete);

module.exports = router;
