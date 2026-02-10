import { app } from "./app";
import { env } from "./config";
import { logger } from "./common/utils/logger";

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT} (${env.NODE_ENV})`);
  logger.info(`API: http://localhost:${env.PORT}${env.API_PREFIX}`);
});

export { server };
