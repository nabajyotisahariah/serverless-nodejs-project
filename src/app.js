require("dotenv").config();

const express = require("express");
const app = express();

console.log("app.js loaded...");
//const connectDB = require("./config/db");

//connectDB();

app.use(express.json());

app.use("/health", require("./routes/health.routes"));
app.use("/users", require("./routes/user.routes"));
app.use("/images", require("./routes/image.routes"));

app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

module.exports = app;