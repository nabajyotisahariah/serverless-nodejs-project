const router = require("express").Router();
const multer = require("multer");
const controller = require("../controllers/image.controller");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  dest: "uploads/", // Temporary directory for multer to store files
});

//router.post("/upload", upload.single("image"), controller.uploadImage);
router.post("/upload", (req, res, next) => {
  console.log("Image upload route hit");
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, controller.uploadImage);

module.exports = router;
