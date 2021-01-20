const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png"
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => { // indicates where to save files
    callback(null, "images");
  },
  filename: (req, file, callback) => { // filename : use original name + time stamp + extension (obtained with MIME_TYPES dictionary)
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  }
});

module.exports = multer({storage: storage}).single("image"); // export multer config & indicates it's a single file and img files only
