import { describe, it, expect } from 'vitest'
import {
  calculate,
  inputDigit,
  inputDecimal,
  clear,
  performOperation,
  initialState,
} from './calculator'

describe('calculate', () => {
  it('should add two numbers', () => {
    expect(calculate(2, 3, '+')).toBe(5)
  })

  it('should subtract two numbers', () => {
    expect(calculate(5, 3, '-')).toBe(2)
  })

  it('should multiply two numbers', () => {
    expect(calculate(4, 3, '*')).toBe(12)
  })

  it('should divide two numbers', () => {
    expect(calculate(15, 3, '/')).toBe(5)
  })

  it('should throw error when dividing by zero', () => {
    expect(() => calculate(10, 0, '/')).toThrow('Division by zero')
  })

  it('should return second operand for equals operation', () => {
    expect(calculate(5, 3, '=')).toBe(3)
  })
})

describe('inputDigit', () => {
  it('should input digit when display is 0', () => {
    const result = inputDigit(initialState, '5')
    expect(result.display).toBe('5')
  })

  it('should append digit to existing display', () => {
    const state = { ...initialState, display: '12' }
    const result = inputDigit(state, '3')
    expect(result.display).toBe('123')
  })

  it('should replace display when waiting for operand', () => {
    const state = { ...initialState, display: '10', waitingForOperand: true }
    const result = inputDigit(state, '5')
    expect(result.display).toBe('5')
    expect(result.waitingForOperand).toBe(false)
  })
})

describe('inputDecimal', () => {
  it('should add decimal point to display', () => {
    const state = { ...initialState, display: '5' }
    const result = inputDecimal(state)
    expect(result.display).toBe('5.')
  })

  it('should not add decimal point if already present', () => {
    const state = { ...initialState, display: '5.2' }
    const result = inputDecimal(state)
    expect(result.display).toBe('5.2')
  })

  it('should start with 0. when waiting for operand', () => {
    const state = { ...initialState, waitingForOperand: true }
    const result = inputDecimal(state)
    expect(result.display).toBe('0.')
    expect(result.waitingForOperand).toBe(false)
  })
})

describe('clear', () => {
  it('should reset to initial state', () => {
    const result = clear()
    expect(result).toEqual(initialState)
  })
})

describe('performOperation', () => {
  it('should set operation and previous value for first operation', () => {
    const state = { ...initialState, display: '5' }
    const result = performOperation(state, '+')
    expect(result.previousValue).toBe(5)
    expect(result.operation).toBe('+')
    expect(result.waitingForOperand).toBe(true)
  })

  it('should calculate result for second operation', () => {
    const state = {
      ...initialState,
      display: '3',
      previousValue: 5,
      operation: '+' as const,
    }
    const result = performOperation(state, '=')
    expect(result.display).toBe('8')
    expect(result.previousValue).toBe(null)
    expect(result.operation).toBe(null)
  })

  it('should handle division by zero error', () => {
    const state = {
      ...initialState,
      display: '0',
      previousValue: 10,
      operation: '/' as const,
    }
    const result = performOperation(state, '=')
    expect(result.display).toBe('Error')
    expect(result.previousValue).toBe(null)
    expect(result.operation).toBe(null)
  })
})