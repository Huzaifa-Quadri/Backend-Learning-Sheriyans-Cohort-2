// Multer is an Express middleware used to handle multipart/form-data
// which is required when users upload files (images, audio, videos etc.)
const multer = require("multer");

// Instead of saving uploaded files on the server disk,
// we store them in RAM as a Buffer.
// This is faster because our goal is to immediately send the file
// to cloud storage (ImageKit) rather than keeping it on the server.
const storage = multer.memoryStorage();

// Configure multer instance
const upload = multer({
  storage: storage,

  // Limit the uploaded file size to prevent very large uploads
  // and protect server memory usage.
  // Here the limit is 15MB.
  limits: {
    fileSize: 1024 * 1024 * 15, //15 MB
  },

  // Filter to allow only specific file types
  fileFilter: (req, file, cb) => {
    // Check if the file type is allowed
    if (
      file.mimetype === "audio/mpeg" ||
      file.mimetype === "audio/mp3" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      // Accept the file
      cb(null, true);
    } else {
      // Reject the file with an error message
      cb(
        new Error("Invalid file type. Only MP3 and images are allowed."),
        false,
      );
    }
  },
});

module.exports = upload;
