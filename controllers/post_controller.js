const Post = require("../models/post");

module.exports.create = (req, res) => {
  Post.create(
    {
      postText: req.body.postText,
      user: req.user.id,
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
  Post.find({ user: req.user.id })
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
