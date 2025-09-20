import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus, ApiResponse } from "../types";
import { Logger } from "../utils/logger";

export const errorHandler = (
  error: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.error("Error handler middleware", error);

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  const response: ApiResponse = {
    success: false,
    error:
      process.env.NODE_ENV === "development" ? message : "Something went wrong",
  };

  res.status(statusCode).json(response);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: ErrorWithStatus = new Error(`Not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
