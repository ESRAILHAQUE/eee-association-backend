// Vercel uses this file as the serverless handler (default export = Express app).
// For local dev, run server.ts instead: npm run dev / npm start
import "./config";
import { app } from "./app";
export default app;
