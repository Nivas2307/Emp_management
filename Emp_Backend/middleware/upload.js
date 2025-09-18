const multer = require("multer");
const path = require("path");

let storage;

// ✅ Production: Use AWS S3
if (process.env.NODE_ENV === "production") {
  const AWS = require("aws-sdk");
  const multerS3 = require("multer-s3");

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION, // e.g., "ap-south-1"
  });

  storage = multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME, // .env bucket name
    acl: "public-read",
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = uniqueSuffix + path.extname(file.originalname);
      cb(null, filename);
    },
  });
} else {
  // ✅ Development: Save files locally
  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
}

// Multer instance
const upload = multer({ storage });

module.exports = upload;
