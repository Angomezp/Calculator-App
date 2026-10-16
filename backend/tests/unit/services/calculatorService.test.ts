import { describe, it, expect } from 'vitest';
import { CalculatorService } from '../../../src/services/calculatorService.js';
import { CalculationError } from '../../../src/errors/calculationError.js';

describe('CalculatorService', () => {
  const service = new CalculatorService();

  describe('Binary Operations', () => {
    it('should add two numbers correctly', () => {
      expect(service.calculate({ operation: 'add', a: 10, b: 5 })).toBe(15);
    });

    it('should subtract two numbers correctly', () => {
      expect(service.calculate({ operation: 'subtract', a: 10, b: 5 })).toBe(5);
    });

    it('should multiply two numbers correctly', () => {
      expect(service.calculate({ operation: 'multiply', a: 10, b: 5 })).toBe(50);
    });

    it('should divide two numbers correctly', () => {
      expect(service.calculate({ operation: 'divide', a: 10, b: 2 })).toBe(5);
    });

    it('should throw DIVISION_BY_ZERO when dividing by zero', () => {
      try {
        service.calculate({ operation: 'divide', a: 10, b: 0 });
      } catch (err) {
        expect(err).toBeInstanceOf(CalculationError);
        expect((err as CalculationError).code).toBe('DIVISION_BY_ZERO');
      }
    });

    it('should calculate exponentiation correctly', () => {
      expect(service.calculate({ operation: 'exponent', a: 2, b: 3 })).toBe(8);
    });

    it('should calculate percentage correctly', () => {
      expect(service.calculate({ operation: 'percentage', a: 10, b: 200 })).toBe(20);
    });
  });

  describe('Unary Operations', () => {
    it('should calculate square root correctly', () => {
      expect(service.calculate({ operation: 'sqrt', a: 16 })).toBe(4);
    });

    it('should throw NEGATIVE_SQUARE_ROOT for negative inputs', () => {
      try {
        service.calculate({ operation: 'sqrt', a: -9 });
      } catch (err) {
        expect(err).toBeInstanceOf(CalculationError);
        expect((err as CalculationError).code).toBe('NEGATIVE_SQUARE_ROOT');
      }
    });
  });
});