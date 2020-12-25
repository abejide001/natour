const { sendFailureResponse } = require("../utils/appResponse");

exports.dontUpdatePassword = (req, res, next) => {
  const { password, passwordConfirm } = req.body;
  if (passwordConfirm || password)
    return sendFailureResponse(
      res,
      400,
      "This route is not for password update"
    );

  next();
};
