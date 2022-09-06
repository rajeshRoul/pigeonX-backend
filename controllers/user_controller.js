const User = require("../models/user");
const passport = require("passport");

module.exports.profile = (req, res) => {
  User.findById(req.params.id, { password: 0 }, (err, user) => {
    if (err) {
      console.log("Failed to find user : ", err);
      return res
        .status(400)
        .send({ success: false, msg: "Failed to get User" });
    }
    return res.send({ success: true, data: user });
  });
};

module.exports.create = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Error in Finding User ::: ", err);
      return;
    }
    if (user) {
      res.send({ msg: "User Found" });
    } else {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("Error in creating user ::: ", err);
          return;
        }
        res.status(201).send({
          success: true,
          data: {
            full_name: user.full_name,
            email: user.email,
          },
        });
      });
    }
  });
};

module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      console.log("Error in Authenticating :: ", err);
      return;
    }
    if (!user) {
      res.send({ msg: "Email/Password is Incorrect" });
    } else {
      req.logIn(user, (err) => {
        if (err) {
          console.log("Error in Log in User : ", err);
          return;
        }
        res.send({
          success: true,
          data: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
          },
        });
      });
    }
  })(req, res, next);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("Error in logout :: ", err);
      return;
    }
    res.send({
      success: true,
      data: {
        msg: "User Logged Out",
      },
    });
  });
};

module.exports.getAllUsers = (req, res) => {
  User.find(
    { _id: { $nin: [req.user._id] } },
    {
      password: 0,
    },
    (err, users) => {
      if (err) {
        console.log("Failed to get Users :", err);

        return res
          .status(500)
          .send({ success: false, msg: "Failed to get Users" });
      }
      return res.send({ success: true, data: users });
    }
  );
};

module.exports.updateProfile = (req, res) => {
  if (`${req.user._id}` === req.params.id) {
    User.findOneAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, user) => {
        if (err) {
          return res
            .status(500)
            .send({ success: false, msg: "Failed to update User" });
        }
        return res.send({ success: true, data: user });
      }
    );
  } else {
    return res.status(401).send({
      success: false,
      msg: "Unauthorized to perform this action",
    });
  }
};
