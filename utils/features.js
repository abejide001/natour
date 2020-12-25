const Tour = require("../models/Tour");

exports.features = async (req) => {
  const queryObj = { ...req.query };

  // exclude fields
  const excludedFields = ["page", "sort", "limit", "fields"];

  // delete excluded fields
  excludedFields.forEach((el) => delete queryObj[el]);

  // stringify onject so we can use the string method
  let queryStr = JSON.stringify(queryObj);

  // append $ to gte, gt, lte, and lt so we can query
  let query = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
  // find with the query
  query = Tour.find(JSON.parse(queryStr));
  if (req.query.sort) {
    // sort with multiple params
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    // sort by time
    query = query.sort("-createdAt");
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numberOfTours = await Tour.countDocuments();
    if (skip >= numberOfTours) throw new Error("The page does not exist");
  }
  query = await Tour.find({
    archive: {
      $ne: true,
    },
  });
  return query;
};
