import { Router } from 'express';
import { calculatorController } from '../controllers/calculatorController.js';
import { validate } from '../middleware/validate.js';
import { calculateRequestSchema } from '../schemas/calculatorSchema.js';

const router = Router();

router.post('/calculate', validate(calculateRequestSchema), calculatorController.handleCalculate);

export default router;