import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { create, all } from 'mathjs';
const math = create(all);

const App = () => {
  const [input, setInput] = useState('0');
  const [expression, setExpression] = useState('');

  const handleClear = useCallback(() => {
    setInput('0');
    setExpression('');
  }, []);

  const handleDigit = useCallback((digit) => {
    setInput((prev) => (prev === '0' ? digit : prev + digit));
    setExpression((prev) => (prev === '0' ? digit : prev + digit));
  }, []);

  const handleEquals = useCallback(() => {
    try {
      const result = eval(expression.replace(/([+-])(?=\d)/g, '$1 '));
      setInput(result.toString());
      setExpression(result.toString());
    } catch {
      setInput('Error');
    }
  }, [expression]);
  
  
  
  const handleOperator = useCallback((newOperator) => {
    setExpression((prev) => {
      const lastChar = prev.slice(-1);
      if (
        (newOperator === '-' && (prev === '' || /[+\-*\/]$/.test(prev))) ||
        (newOperator !== '-' && /[+\-*\/]$/.test(prev))
      ) {
        return prev;
      } else {
        return prev + newOperator;
      }
    });
    setInput(newOperator);
  }, []);
  
  const handleDecimal = useCallback(() => {
    setInput((prev) => {
      if (!prev.includes('.')) {
        return prev + '.';
      } else {
        return prev;
      }
    });
    setExpression((prev) => {
      if (!prev.includes('.')) {
        return prev + '.';
      } else {
        return prev;
      }
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (key >= '0' && key <= '9') {
        handleDigit(key);
      } else if (key === '.') {
        handleDecimal();
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperator(key);
      } else if (key === 'Enter') {
        handleEquals();
      } else if (key === 'Backspace') {
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDecimal, handleOperator, handleEquals, handleClear]);

  return (
    <div className="calculator">
      <div id="display" className="display">{input}</div>
      <div className="buttons">
        <button id="clear" onClick={handleClear}>AC</button>
        <button id="divide" className="operator" onClick={() => handleOperator('/')}>/</button>
        <button id="multiply" className="operator" onClick={() => handleOperator('*')}>*</button>
        <button id="subtract" className="operator" onClick={() => handleOperator('-')}>-</button>
        <button id="add" className="operator" onClick={() => handleOperator('+')}>+</button>
        <button id="equals" onClick={handleEquals}>=</button>
        <button id="decimal" onClick={handleDecimal}>.</button>
        <button id="zero" onClick={() => handleDigit('0')}>0</button>
        <button id="one" onClick={() => handleDigit('1')}>1</button>
        <button id="two" onClick={() => handleDigit('2')}>2</button>
        <button id="three" onClick={() => handleDigit('3')}>3</button>
        <button id="four" onClick={() => handleDigit('4')}>4</button>
        <button id="five" onClick={() => handleDigit('5')}>5</button>
        <button id="six" onClick={() => handleDigit('6')}>6</button>
        <button id="seven" onClick={() => handleDigit('7')}>7</button>
        <button id="eight" onClick={() => handleDigit('8')}>8</button>
        <button id="nine" onClick={() => handleDigit('9')}>9</button>
      </div>
    </div>
  );
};

export default App;
