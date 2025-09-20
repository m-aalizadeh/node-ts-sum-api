import { Router } from "express";
import { MathController } from "../controllers/mathController";
import { validateSumRequest } from "../middlewares/validation";

const router = Router();

router.post("/sum", validateSumRequest, MathController.calculateSum);

export default router;
