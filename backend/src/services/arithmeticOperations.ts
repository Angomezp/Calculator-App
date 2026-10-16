import type { IOperations } from './interfaces/operation.interface.js';
import { CalculationError } from '../errors/calculationError.js';

export class Addition implements IOperations {
  execute(a: number, b?: number): number {
    return a + (b ?? 0);
  }
}

export class Subtraction implements IOperations {
  execute(a: number, b?: number): number {
    return a - (b ?? 0);
  }
}

export class Multiplication implements IOperations {
  execute(a: number, b?: number): number {
    return a * (b ?? 1);
  }
}

export class Division implements IOperations {
  execute(a: number, b?: number): number {
    if (b === 0) {
      throw new CalculationError('DIVISION_BY_ZERO', 'Cannot divide by zero.');
    }
    return a / (b ?? 1);
  }
}

export class Exponent implements IOperations {
  execute(a: number, b?: number): number {
    return Math.pow(a, b ?? 1);
  }
}

export class SquareRoot implements IOperations {
  execute(a: number): number {
    if (a < 0) {
      throw new CalculationError(
        'NEGATIVE_SQUARE_ROOT',
        'Cannot calculate square root of a negative number.'
      );
    }
    return Math.sqrt(a);
  }
}

export class Percentage implements IOperations {
  execute(a: number, b?: number): number {
    return (a / 100) * (b ?? 0);
  }
}
