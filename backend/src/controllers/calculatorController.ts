import type { Request, Response, NextFunction } from 'express';
import type { ICalculatorService } from '../services/interfaces/calculator.interface.js';
import { defaultCalculatorService } from '../services/calculatorService.js';
import type { CalculateRequest } from '../schemas/calculatorSchema.js';

export class CalculatorController {
  constructor(
    private calculatorService: ICalculatorService = defaultCalculatorService
  ) {}

  public handleCalculate = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body as CalculateRequest;
      const result = this.calculatorService.calculate(body);
      return res.status(200).json({ result });
    } catch (error) {
      return next(error);
    }
  };
}

export const calculatorController = new CalculatorController();
