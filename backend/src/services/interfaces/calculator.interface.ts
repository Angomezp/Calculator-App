import type { CalculateRequest } from '../../schemas/calculatorSchema.js';

export interface ICalculatorService {
  calculate(data: CalculateRequest): number;
}