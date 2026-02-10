// Vercel serverless entry: load config + Express app, export as handler.
// See https://vercel.com/kb/guide/using-express-with-vercel
const path = require("path");

let app;

try {
  const dist = path.join(__dirname, "..", "dist");
  require(path.join(dist, "config"));
  const appModule = require(path.join(dist, "app"));
  app = appModule.app;
} catch (err) {
  console.error("API init error:", err);
  app = (_req, res) => {
    res.status(500).json({
      success: false,
      message: "Server failed to start",
      error: err.message,
      hint: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
  };
}

module.exports = app;
