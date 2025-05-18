const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "../client/src/assets/uploaded");
    cb(null, path.join(__dirname, "../uploaded"));

  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|webp/;

  const mimetype = fileTypes.test(file.mimetype); 
  if (mimetype) {
    return cb(null, true);
  } else {
    cb("Error: upload images only");
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, // 10MB
  },
  fileFilter: fileFilter,

});

module.exports = upload;
