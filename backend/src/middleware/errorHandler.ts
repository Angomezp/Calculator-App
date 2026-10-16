import type { Request, Response, NextFunction } from 'express';
import { CalculationError } from '../errors/calculationError.js';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof CalculationError) {
    return res.status(400).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: 'INVALID_INPUT',
        message: err.issues.map((e) => e.message).join('; '),
      },
    });
  }

  console.error('Unhandled Error:', err);
  return res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.',
    },
  });
}