import type { Request, Response, NextFunction } from 'express';
import type { z } from 'zod';

export const validate =
  (schema: z.ZodType) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };