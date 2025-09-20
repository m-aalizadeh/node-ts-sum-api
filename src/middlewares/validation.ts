import { Request, Response, NextFunction } from "express";
import { SumRequest } from "../types";
import { Logger } from "../utils/logger";

export const validateSumRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { numbers }: SumRequest = req.body;

    if (!numbers) {
      return res.status(400).json({
        success: false,
        error: "Numbers array is required",
      });
    }

    if (!Array.isArray(numbers)) {
      return res.status(400).json({
        success: false,
        error: "Numbers must be an array",
      });
    }

    if (numbers.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Numbers array cannot be empty",
      });
    }

    if (!numbers.every((n) => typeof n === "number" && !isNaN(n))) {
      return res.status(400).json({
        success: false,
        error: "All elements must be valid numbers",
      });
    }

    next();
  } catch (error) {
    Logger.error("Validation middleware error", error);
    next(error);
  }
};
