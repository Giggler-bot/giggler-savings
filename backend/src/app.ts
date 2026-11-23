import express from "express";
import cors from "cors";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./config/logger.js";
import { stdSerializers } from "pino";
import { env } from "./config/env.js";

const app = express();

// Security middleware
app.use(helmet());

// Cross-origin configuration
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);


// Request parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// HTTP request logging
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        const serialized = stdSerializers.req(req);

        return {
          id: req.id,
          method: serialized.method,
          url: serialized.url,
          remoteAddress: serialized.remoteAddress,
        };
      },
    },
  }),
);

// Health check
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "Giggler Savings API is running",
    timestamp: new Date().toISOString(),
  });
});

// Not found middleware — keep this last
app.use(notFound);

// Centralize error handler
app.use(errorHandler);

export default app;
