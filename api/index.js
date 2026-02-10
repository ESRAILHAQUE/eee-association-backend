// Vercel serverless entry: load env + Express app and export as handler.
// All routes are handled by this single function (see vercel.json rewrites).
require("../dist/config");
const { app } = require("../dist/app");
module.exports = app;
