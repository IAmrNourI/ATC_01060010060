const fs = require("fs");
const path = require("path");

const deleteImage = (filename) => {
  if (!filename) return;

  const filePath = path.join(__dirname, "../uploaded", filename);

  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      return true;
    } catch (err) {
        return (err);
    }
  } else {
    return ("Image not found");
  }
};

module.exports = deleteImage;
