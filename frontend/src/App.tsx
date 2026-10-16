import { useState } from 'react';
import { calculateApi } from './services/calculatorApi';
import { ApiError } from './errors/apiError';
import type { Operation, CalculateRequest } from './types/calculator';

export function App() {
  const [operation, setOperation] = useState<Operation>('add');
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const numA = parseFloat(a);
    if (isNaN(numA)) {
      setError('Operand A must be a valid number.');
      return;
    }

    let requestData: CalculateRequest;

    if (operation === 'sqrt') {
      requestData = { operation: 'sqrt', a: numA };
    } else {
      const numB = parseFloat(b);
      if (isNaN(numB)) {
        setError('Operand B must be a valid number.');
        return;
      }
      requestData = { operation, a: numA, b: numB };
    }

    setIsLoading(true);
    try {
      const res = await calculateApi(requestData);
      setResult(res);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected network error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isUnary = operation === 'sqrt';

  return (
    <main style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Full-Stack Calculator</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="operation-select" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Operation:</label>
          <select 
            id="operation-select"
            value={operation} 
            onChange={(e) => setOperation(e.target.value as Operation)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="add">Addition (+)</option>
            <option value="subtract">Subtraction (-)</option>
            <option value="multiply">Multiplication (*)</option>
            <option value="divide">Division (/)</option>
            <option value="exponent">Exponentiation (^)</option>
            <option value="percentage">Percentage (%)</option>
            <option value="sqrt">Square Root (√)</option>
          </select>
        </div>

        <div>
          <label htmlFor="operand-a" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Operand A:</label>
          <input 
            id="operand-a"
            type="number" 
            step="any"
            value={a} 
            onChange={(e) => setA(e.target.value)} 
            placeholder="Enter first number"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {!isUnary && (
          <div>
            <label htmlFor="operand-b" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Operand B:</label>
            <input 
              id="operand-b"
              type="number" 
              step="any"
              value={b} 
              onChange={(e) => setB(e.target.value)} 
              placeholder="Enter second number"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            padding: '0.75rem', 
            background: isLoading ? '#ccc' : '#007BFF', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            marginTop: '0.5rem'
          }}
        >
          {isLoading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#FFEbee', color: '#c62828', borderRadius: '4px', borderLeft: '4px solid #c62828' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result !== null && !error && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#E8F5E9', color: '#2E7D32', borderRadius: '4px', textAlign: 'center', fontSize: '1.25rem', borderLeft: '4px solid #2E7D32' }}>
          <strong>Result:</strong> {result}
        </div>
      )}
    </main>
  );
}

export default App;