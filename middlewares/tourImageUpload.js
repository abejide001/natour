const multer = require("multer");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("not an image, please upload only image", false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// upolad multiple images
const tourImageUpload = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

module.exports = tourImageUpload;
