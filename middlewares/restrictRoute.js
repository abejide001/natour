const { sendFailureResponse } = require("../utils/appResponse");

exports.adminRoute = (req, res, next) => {
  if (req.user.role != "admin")
    return sendFailureResponse(
      res,
      403,
      "You do not have permission to access this route"
    );
  next();
};

exports.leadGuideRoute = (req, res, next) => {
  if (req.user.role !== "lead-guide")
    return sendFailureResponse(
      res,
      403,
      "You do not have permission to access this route"
    );
  next();
};

exports.guideRoute = (req, res, next) => {
  if (req.user.role !== "guide")
    return sendFailureResponse(
      res,
      403,
      "You do not have permission to access this route"
    );
  next();
};

exports.userRoute = (req, res, next) => {
  if (req.user.role !== "user")
    return sendFailureResponse(
      res,
      403,
      "You do not have permission to access this route"
    );
  next();
};
