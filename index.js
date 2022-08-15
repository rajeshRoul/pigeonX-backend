const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/mongoose");
const app = express();
const port = 8000;

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport/passport-local-strategy");
const MongoStore = require("connect-mongo");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    name: "pigeonX",
    secret: "pigeonX",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        clientPromise: Promise.resolve(db.getClient()),
        // collectionName: 'sessions'
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err || "Connect Mongo DB is Running");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Use Express Router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    return console.log("Error in running Server", port);
  }
  console.log("Server is Running on port : ", port);
});
