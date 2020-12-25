const crypto = require("crypto");
const { jwtSign } = require("../helpers/token");

const User = require("../models/User");
const { sendFailureResponse } = require("../utils/appResponse");
const reset = async (req, res, next) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedPassword,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return sendFailureResponse(res, 400, "Token expired");
  }
  const { password, passwordConfirm } = req.body;
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  const token = jwtSign(user._id);
  req.token = token;

  next();
};

module.exports = reset;
