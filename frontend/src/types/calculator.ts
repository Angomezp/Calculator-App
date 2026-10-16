export type Operation =
  | 'add'
  | 'subtract'
  | 'multiply'
  | 'divide'
  | 'exponent'
  | 'sqrt'
  | 'percentage';

export interface BinaryCalculateRequest {
  operation: Exclude<Operation, 'sqrt'>;
  a: number;
  b: number;
}

export interface UnaryCalculateRequest {
  operation: 'sqrt';
  a: number;
}

export type CalculateRequest = BinaryCalculateRequest | UnaryCalculateRequest;

export interface CalculateSuccessResponse {
  result: number;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
  };
}