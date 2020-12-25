const multer = require("multer");

// disk storage
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/img/users")
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split("/")[1]
//         cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
//     }
// })

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

const userImageUpload = upload.single("photo");

module.exports = userImageUpload;
