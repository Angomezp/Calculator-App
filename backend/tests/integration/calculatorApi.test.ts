import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('POST /api/calculate', () => {
  it('should return correct result for valid addition', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operation: 'add', a: 10, b: 5 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 15 });
  });

  it('should return correct result for square root operation', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operation: 'sqrt', a: 16 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 4 });
  });

  it('should return structured error for division by zero', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operation: 'divide', a: 10, b: 0 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        code: 'DIVISION_BY_ZERO',
        message: 'Cannot divide by zero.',
      },
    });
  });

  it('should return validation error for invalid operand type', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operation: 'add', a: 'invalid', b: 5 });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('INVALID_INPUT');
  });

  it('should return validation error for missing required operands', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operation: 'add', a: 10 });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('INVALID_INPUT');
  });
});