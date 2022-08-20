const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          console.log("Error in finding user ---> Passport ");
          return done(err);
        }
        if (!user || user.password !== password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("Error in finding user ---> Passport ");
      return done(err);
    }
    const data = {
      id: user.id,
      _id: user._id,
      email: user.email,
      full_name: user.full_name,
    };
    return done(null, data);
  });
});

passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send({ success: false, msg: "User is Unauthorized" });
};

module.exports = passport;
