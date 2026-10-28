import React, { useState } from 'react';
import './App.css';

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default function App() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [sum, setSum] = useState(null);
  const [prod, setProd] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    setSum(null);
    setProd(null);
    setError(null);

    try {
      const url = `${BACKEND_BASE_URL}?x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.type === 'success') {
        setSum(data.sum);
        setProd(data.prod);
      } else {
        setError(data.message);
      }
      
    } catch (err) {
      setError('Server error occurred.');
    }
  };

  return (
    <div>
      <h2>Calculate Sum and Product</h2>
      <input
        type="number"
        value={x}
        placeholder="Enter a number for X"
        onChange={e => setX(e.target.value)}
      />
          
      <br />
          
      <input
        type="number"
        value={y}
        placeholder="Enter a number for Y"
        onChange={e => setY(e.target.value)}
      />
          
      <br />
          
      <button onClick={calculate}>
        Calculate
      </button>

      <div className="calcResult">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {sum !== null && <p>X + Y = <strong>{sum}</strong></p>}
        {prod !== null && <p>X * Y = <strong>{prod}</strong></p>}
      </div>
    </div>
  );
}
