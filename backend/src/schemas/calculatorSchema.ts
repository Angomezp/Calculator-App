import { z } from 'zod';

export const operationEnum = z.enum([
  'add',
  'subtract',
  'multiply',
  'divide',
  'exponent',
  'sqrt',
  'percentage',
]);

const binarySchema = z.object({
  operation: z.enum([
    'add',
    'subtract',
    'multiply',
    'divide',
    'exponent',
    'percentage',
  ]),
  a: z.number({ message: 'Operand a must be a valid number' }),
  b: z.number({ message: 'Operand b must be a valid number' }),
});

const unarySchema = z.object({
  operation: z.literal('sqrt'),
  a: z.number({ message: 'Operand a must be a valid number' }),
  b: z.undefined().optional(),
});

export const calculateRequestSchema = z.discriminatedUnion('operation', [
  binarySchema,
  unarySchema,
]);

export type CalculateRequest = z.infer<typeof calculateRequestSchema>;
