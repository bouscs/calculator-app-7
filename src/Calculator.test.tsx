import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from './Calculator'

describe('Calculator Component', () => {
  it('should render calculator with initial display of 0', () => {
    render(<Calculator />)
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('0')
  })

  it('should display digit when clicked', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    
    await user.click(screen.getByRole('button', { name: '5' }))
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('5')
  })

  it('should perform basic addition', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('5')
  })

  it('should perform basic subtraction', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    
    await user.click(screen.getByRole('button', { name: '8' }))
    await user.click(screen.getByRole('button', { name: '-' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('5')
  })

  it('should perform basic multiplication', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    
    await user.click(screen.getByRole('button', { name: '4' }))
    await user.click(screen.getByRole('button', { name: '×' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('12')
  })

  it('should perform basic division', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    
    await user.click(screen.getByRole('button', { name: '9' }))
    await user.click(screen.getByRole('button', { name: '÷' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('3')
  })

  it('should handle decimal input', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '.' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('5.2')
  })

  it('should clear display when C is clicked', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: 'C' }))
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('0')
  })

  it('should display error for division by zero', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '÷' }))
    await user.click(screen.getByRole('button', { name: '0' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('Error')
  })
})