exports.health = (req, res) => {
  console.log("Health check endpoint hit...");
  res.json({
    status: "UP on 1st May 2026",
    timestamp: new Date()
  });
};