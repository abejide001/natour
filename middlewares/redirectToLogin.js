const redirectToLogin = (req, res, next) => {
  if (!req.cookies.jwt || req.cookies.jwt === "loggedout") {
    return res.redirect("/login");
  }
  next();
};

module.exports = redirectToLogin;
