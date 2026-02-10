import { app } from "./app";
import { env } from "./config";
import { logger } from "./common/utils/logger";
import { ensureDatabaseConnection } from "./database";

async function start(): Promise<void> {
  try {
    await ensureDatabaseConnection();
    logger.info("Database connected");
  } catch (err) {
    logger.error("Database connection failed. Server will not start.", err);
    process.exit(1);
  }

  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT} (${env.NODE_ENV})`);
    logger.info(`API: http://localhost:${env.PORT}${env.API_PREFIX}`);
  });
}

start().catch((err) => {
  logger.error("Failed to start server", err);
  process.exit(1);
});
