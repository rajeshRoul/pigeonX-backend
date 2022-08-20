const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = (req, res) => {
  Post.create(
    {
      postText: req.body.postText,
      user: req.user._id,
    },
    (err, post) => {
      if (err) {
        console.log("Failed to create post : ", err);
        return;
      }
      res.send({
        success: true,
        msg: "Post created successfully",
      });
    }
  );
};

module.exports.getAll = (req, res) => {
  Post.find({ user: req.user._id })
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec((err, posts) => {
      if (err) {
        return res.send({
          success: false,
          msg: "Failed to Get Posts",
        });
      }
      return res.send({
        success: true,
        data: posts,
      });
    });
};

module.exports.delete = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return res.status(400).send({ success: false, msg: "Invalid Post ID" });
    }
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, (err) => {
        if (err) {
          return res
            .status(500)
            .send({ success: false, msg: "Unexpected error occurred" });
        }
        return res.send({ success: true, msg: "Post Removed" });
      });
    } else {
      return res
        .status(403)
        .send({ success: false, msg: "Unauthorized to Delete Post" });
    }
  });
};
