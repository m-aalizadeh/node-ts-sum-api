import { Request, Response, NextFunction } from "express";
import { SumRequest, ApiResponse } from "../types";
import { Logger } from "../utils/logger";

export class MathController {
  static async calculateSum(req: Request, res: Response, next: NextFunction) {
    try {
      const { numbers }: SumRequest = req.body;

      Logger.info("Calculating sum for numbers", numbers);

      const sum = numbers.reduce((acc, num) => {
        const factor = Math.pow(10, 12);
        return acc + Math.round(num * factor) / factor;
      }, 0);

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
