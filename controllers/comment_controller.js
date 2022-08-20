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
        user: req.user._id,
      },
      (err, comment) => {
        if (err) {
          return res.status(400).send({ success: false, msg: err });
        }
        post.comments.push(comment);
        post.save();
        res.send({
          success: true,
          data: {
            _id: comment.id,
            post: comment.post,
            commentText: comment.commentText,
          },
        });
      }
    );
  });
};

module.exports.delete = (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      return res
        .status(400)
        .send({ success: false, msg: "Invalid Comment ID" });
    }
    if (comment.user == req.user.id) {
      const postId = comment.post;
      comment.remove();
      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        (err) => {
          if (err) {
            return res
              .status(500)
              .send({ success: false, msg: "Unexpected error occurred" });
          }
          return res.send({
            success: true,
            msg: "Comment Removed",
          });
        }
      );
    } else {
      return res
        .status(403)
        .send({ success: false, msg: "Unauthorized to Delete Comment" });
    }
  });
};
