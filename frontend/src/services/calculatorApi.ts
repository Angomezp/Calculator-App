import type {
  CalculateRequest,
  CalculateSuccessResponse,
  ApiErrorResponse,
} from '../types/calculator.js';

import { ApiError } from '../errors/apiError.js';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function calculateApi(requestData: CalculateRequest): Promise<number> {
  const response = await fetch(`${API_BASE_URL}/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  const data = (await response.json()) as CalculateSuccessResponse | ApiErrorResponse;

  if (!response.ok || 'error' in data) {
    const errorData = data as ApiErrorResponse;
    throw new ApiError(
      errorData.error?.code || 'UNKNOWN_ERROR',
      errorData.error?.message || 'An unexpected error occurred.'
    );
  }

  return data.result;
}