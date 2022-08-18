const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = (req, res) => {
  Post.findById(req.body.post, (err, post) => {
    if (err) {
      console.log("Error in finding post for Comment :: ", err);
      return;
    }
    Comment.create(
      {
        commentText: req.body.commentText,
        post: req.body.post,
        user: req.user.id,
      },
      (err, comment) => {
        if (err) {
          return res.status(400).send({ success: false, msg: err });
        }
        post.comments.push(comment);
        post.save();
        res.send({
          success: true,
          data: { commentText: comment.commentText, id: comment._id },
        });
      }
    );
  });
};
