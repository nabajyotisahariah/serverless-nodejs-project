const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  return res.status(200).json({
    status: "UP",
    message: "Service is healthy!!!!!!!!!",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;