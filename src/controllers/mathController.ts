import { Request, Response, NextFunction } from "express";
import { SumRequest, ApiResponse } from "../types";
import { Logger } from "../utils/logger";

export class MathController {
  /**
   * Calculate the sum of numbers in the request body
   */
  static async calculateSum(req: Request, res: Response, next: NextFunction) {
    try {
      const { numbers }: SumRequest = req.body;

      Logger.info("Calculating sum for numbers", numbers);

      // Calculate sum with precision handling
      const sum = numbers.reduce((acc, num) => {
        // Handle floating point precision
        const factor = Math.pow(10, 12); // Handle up to 12 decimal places
        return acc + Math.round(num * factor) / factor;
      }, 0);

      // Round to avoid floating point precision issues in response
      const roundedSum = Math.round(sum * 1000000000000) / 1000000000000;

      const response: ApiResponse<{ sum: number }> = {
        success: true,
        data: { sum: roundedSum },
      };

      Logger.info(`Sum calculated: ${roundedSum}`);

      res.status(200).json(response);
    } catch (error) {
      Logger.error("Error in calculateSum controller", error);
      next(error);
    }
  }
}
