import type { CalculateRequest } from '../schemas/calculatorSchema.js';
import type { IOperations } from './interfaces/operation.interface.js';
import type { ICalculatorService } from './interfaces/calculator.interface.js';
import { CalculationError } from '../errors/calculationError.js';

import {
  Addition,
  Subtraction,
  Multiplication,
  Division,
  Exponent,
  SquareRoot,
  Percentage,
} from './arithmeticOperations.js';


export class CalculatorService implements ICalculatorService {
  private strategies: Map<string, IOperations>;

  constructor() {
    this.strategies = new Map<string, IOperations>([
      ['add', new Addition()],
      ['subtract', new Subtraction()],
      ['multiply', new Multiplication()],
      ['divide', new Division()],
      ['exponent', new Exponent()],
      ['sqrt', new SquareRoot()],
      ['percentage', new Percentage()],
    ]);
  }

  public calculate(data: CalculateRequest): number {
    const strategy = this.strategies.get(data.operation);

    if (!strategy) {
      throw new CalculationError('UNSUPPORTED_OPERATION', `Unsupported operation: ${data.operation}`);
    }

    return strategy.execute(data.a, 'b' in data ? data.b : undefined);
  }
}

export const defaultCalculatorService = new CalculatorService();