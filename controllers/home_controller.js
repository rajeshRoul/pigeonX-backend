module.exports.home = (req, res) => {
  console.log(req.cookies);
  res.cookie("rajesh", 14);
  res.end("<h1>Home Page</h1>");
};
