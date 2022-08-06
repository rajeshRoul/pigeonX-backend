const express = require("express");

const app = express();
const port = 8000;

// Use Express Router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    return console.log("Error in running Server", port);
  }
  console.log("Server is Running on port : ", port);
});
