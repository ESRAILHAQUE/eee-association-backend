import express from "express";
import cors from "cors";
import { env } from "./config";
import { routes } from "./routes";
import { errorHandler } from "./common/middleware";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000" || "https://seceee.netlify.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(env.API_PREFIX, routes);

app.use(errorHandler);

export { app };
export default app;
