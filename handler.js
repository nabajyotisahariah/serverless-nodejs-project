const serverless = require("serverless-http");
const express = require("express");
const app = express();

// Import route files
//const healthRoute = require("./src/routes/health.routes.js");

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.get("/health", (req, res, next) => {
  return res.status(200).json({
    message: "Up and running!",
  });
});

// Use external routes
//app.use("/health", healthRoute);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);

// const serverless = require("serverless-http");
// const app = require("./src/app");

// exports.handler = serverless(app);