import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";

import { logger } from "./config/logger.js";

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  logger.info(
    { port: PORT, environment: env.NODE_ENV },
    `Giggler Savings API started on http://localhost:${PORT}`,
  );
});

// Graceful shutdown
const shutdown = (signal: string) => {
   logger.info({ signal }, "Shutting down server");

  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
