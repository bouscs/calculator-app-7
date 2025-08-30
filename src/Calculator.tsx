import { useReducer } from 'react';
import { 
  type CalculatorState, 
  initialState, 
  inputDigit, 
  inputDecimal, 
  clear, 
  performOperation,
  type Operation 
} from './calculator';
import './Calculator.css';

type CalculatorAction =
  | { type: 'INPUT_DIGIT'; payload: string }
  | { type: 'INPUT_DECIMAL' }
  | { type: 'CLEAR' }
  | { type: 'PERFORM_OPERATION'; payload: Operation };

function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'INPUT_DIGIT':
      return inputDigit(state, action.payload);
    case 'INPUT_DECIMAL':
      return inputDecimal(state);
    case 'CLEAR':
      return clear();
    case 'PERFORM_OPERATION':
      return performOperation(state, action.payload);
    default:
      return state;
  }
}

export default function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleDigit = (digit: string) => {
    dispatch({ type: 'INPUT_DIGIT', payload: digit });
  };

  const handleDecimal = () => {
    dispatch({ type: 'INPUT_DECIMAL' });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR' });
  };

  const handleOperation = (operation: Operation) => {
    dispatch({ type: 'PERFORM_OPERATION', payload: operation });
  };

  return (
    <div className="calculator">
      <div className="calculator-display" data-testid="calculator-display">
        {state.display}
      </div>
      <div className="calculator-buttons">
        <button className="button clear" onClick={handleClear}>
          C
        </button>
        <button className="button" onClick={() => handleOperation('/')}>
          ÷
        </button>
        <button className="button" onClick={() => handleOperation('*')}>
          ×
        </button>
        <button className="button" onClick={() => handleOperation('-')}>
          -
        </button>

        <button className="button" onClick={() => handleDigit('7')}>
          7
        </button>
        <button className="button" onClick={() => handleDigit('8')}>
          8
        </button>
        <button className="button" onClick={() => handleDigit('9')}>
          9
        </button>
        <button className="button operation" onClick={() => handleOperation('+')}>
          +
        </button>

        <button className="button" onClick={() => handleDigit('4')}>
          4
        </button>
        <button className="button" onClick={() => handleDigit('5')}>
          5
        </button>
        <button className="button" onClick={() => handleDigit('6')}>
          6
        </button>

        <button className="button" onClick={() => handleDigit('1')}>
          1
        </button>
        <button className="button" onClick={() => handleDigit('2')}>
          2
        </button>
        <button className="button" onClick={() => handleDigit('3')}>
          3
        </button>
        <button className="button equals" onClick={() => handleOperation('=')}>
          =
        </button>

        <button className="button zero" onClick={() => handleDigit('0')}>
          0
        </button>
        <button className="button" onClick={handleDecimal}>
          .
        </button>
      </div>
    </div>
  );
}