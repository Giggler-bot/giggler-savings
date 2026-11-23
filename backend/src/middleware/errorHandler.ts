import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { AppError } from "../common/errors/AppError.js";
import { logger } from "../config/logger.js";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Delegate if the response has already started.
  if (res.headersSent) {
    return next(error);
  }

  // Zod validation error
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  //Malformed JSON

  if (
    error instanceof SyntaxError &&
    "status" in error &&
    error.status === 400 &&
    "type" in error &&
    error.type === "entity.parse.failed"
  ) {
    res.status(400).json({
      success: false,
      message: "Invalid JSON request body",
    });

    return;
  }

  //   Request body too large

  if (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    error.type === "entity.too.large"
  ) {
    res.status(413).json({
      success: false,
      message: "Request body is too large",
    });

    return;
  }

  //   Custom application errors
  if (error instanceof AppError) {
    if (error.statusCode >= 500) {
      req.log.error({ err: error }, "Application error");
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  //   Unexpected errors
  // Unexpected errors
  if (req.log) {
    req.log.error({ err: error }, "Unhandled application error");
  } else {
    logger.error({ err: error }, "Unhandled application error");
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
