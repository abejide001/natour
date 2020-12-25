exports.sendSuccessResponse = (res, code, data) => {
  return res.status(code).json({
    status: "success",
    data,
  });
};

exports.sendFailureResponse = (res, code, data) => {
  return res.status(code).json({
    status: "fail",
    message: data,
  });
};
