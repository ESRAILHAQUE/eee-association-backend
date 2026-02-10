import express from "express";
import cors from "cors";
import { env } from "./config";
import { routes } from "./routes";
import { errorHandler } from "./common/middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(env.API_PREFIX, routes);

app.use(errorHandler);

export { app };
