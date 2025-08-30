export type Operation = '+' | '-' | '*' | '/' | '=';

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation | null;
  waitingForOperand: boolean;
}

export const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
};

export function calculate(firstOperand: number, secondOperand: number, operation: Operation): number {
  switch (operation) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      if (secondOperand === 0) {
        throw new Error('Division by zero');
      }
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

export function inputDigit(state: CalculatorState, digit: string): CalculatorState {
  if (state.waitingForOperand) {
    return {
      ...state,
      display: digit,
      waitingForOperand: false,
    };
  }

  if (state.display === '0') {
    return {
      ...state,
      display: digit,
    };
  }

  return {
    ...state,
    display: state.display + digit,
  };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.waitingForOperand) {
    return {
      ...state,
      display: '0.',
      waitingForOperand: false,
    };
  }

  if (state.display.indexOf('.') === -1) {
    return {
      ...state,
      display: state.display + '.',
    };
  }

  return state;
}

export function clear(): CalculatorState {
  return initialState;
}

export function performOperation(state: CalculatorState, nextOperation: Operation): CalculatorState {
  const inputValue = parseFloat(state.display);

  if (state.previousValue === null) {
    return {
      ...state,
      previousValue: inputValue,
      operation: nextOperation,
      waitingForOperand: true,
    };
  }

  if (state.operation) {
    const currentValue = state.previousValue || 0;
    
    try {
      const result = calculate(currentValue, inputValue, state.operation);
      
      return {
        ...state,
        display: String(result),
        previousValue: nextOperation === '=' ? null : result,
        operation: nextOperation === '=' ? null : nextOperation,
        waitingForOperand: true,
      };
    } catch {
      return {
        ...state,
        display: 'Error',
        previousValue: null,
        operation: null,
        waitingForOperand: true,
      };
    }
  }

  return {
    ...state,
    previousValue: inputValue,
    operation: nextOperation,
    waitingForOperand: true,
  };
}