import type { RequestHandler } from "express";
import { AppError } from "../common/errors/AppError.js";

export const notFound: RequestHandler = (req, _res, next) => {
  next(
    new AppError(`Route ${req.method} ${req.originalUrl} was not found`, 404),
  );
};
