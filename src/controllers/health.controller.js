exports.health = (req, res) => {
  console.log("Health check endpoint hit...");
  res.json({
    status: "UP",
    timestamp: new Date()
  });
};