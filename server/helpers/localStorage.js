const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "..", "data", "products");
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Created upload directory:", uploadDir);
  } catch (error) {
    console.error("Error creating upload directory:", error);
  }
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 100 * 1024 * 1024 } });

// Function to handle file upload
const handleFileUpload = (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Error uploading file",
        error: err.message
      });
    }
    next();
  });
};

module.exports = { handleFileUpload }; 