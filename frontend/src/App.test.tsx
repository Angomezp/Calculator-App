import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { calculateApi } from './services/calculatorApi';
import { ApiError } from './errors/apiError';

vi.mock('./services/calculatorApi', () => ({
  calculateApi: vi.fn(),
  ApiError: class ApiError extends Error {
    public code: string;

    constructor(code: string, message: string) {
        super(message);
        this.code = code;
    }
  },
}));

describe('Calculator App UI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the initial UI correctly', () => {
    render(<App />);
    expect(screen.getByText('Full-Stack Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText(/Operand A/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Operand B/i)).toBeInTheDocument();
  });

  it('hides Operand B when square root is selected', () => {
    render(<App />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'sqrt' } });
    
    expect(screen.queryByLabelText(/Operand B/i)).not.toBeInTheDocument();
  });

  it('displays client-side validation errors for missing input', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));
    
    expect(await screen.findByText(/Operand A must be a valid number/i)).toBeInTheDocument();
  });

  it('handles successful API calculation and displays the result', async () => {
    // Force the mocked API to return 15
    vi.mocked(calculateApi).mockResolvedValue(15);

    render(<App />);
    
    fireEvent.change(screen.getByLabelText(/Operand A/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Operand B/i), { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(calculateApi).toHaveBeenCalledWith({ operation: 'add', a: 10, b: 5 });
    
    await waitFor(() => {
      // FIX: Target the parent div that contains both "Result:" and "15"
      const resultContainer = screen.getByText(/Result:/i).parentElement;
      expect(resultContainer).toHaveTextContent('Result: 15');
    });
  });

  it('handles API errors gracefully and displays them in red', async () => {
    // Force the mocked API to throw a Division By Zero error
    vi.mocked(calculateApi).mockRejectedValue(new ApiError('DIVISION_BY_ZERO', 'Cannot divide by zero.'));

    render(<App />);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'divide' } });
    fireEvent.change(screen.getByLabelText(/Operand A/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Operand B/i), { target: { value: '0' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    await waitFor(() => {
      expect(screen.getByText(/Cannot divide by zero/i)).toBeInTheDocument();
    });
  });
});