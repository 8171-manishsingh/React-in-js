import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, reset, selectCount } from '../store/slices/counterSlice'
import './Counter.css'

function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const [amount, setAmount] = useState('')

  const handleIncrementByAmount = () => {
    const value = parseInt(amount)
    if (!isNaN(value) && value > 0) {
      dispatch(incrementByAmount(value))
      setAmount('')
    }
  }

  return (
    <div className="card counter-card">
      <h2 className="card-title">Counter</h2>
      <div className="counter-value">{count}</div>
      <div className="counter-actions">
        <button className="btn btn-primary" onClick={() => dispatch(increment())}>
          + Increment
        </button>
        <button className="btn btn-secondary" onClick={() => dispatch(decrement())}>
          - Decrement
        </button>
      </div>
      <div className="counter-custom">
        <input
          type="number"
          className="input"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleIncrementByAmount()}
        />
        <button className="btn btn-accent" onClick={handleIncrementByAmount}>
          Add Amount
        </button>
      </div>
      <button className="btn btn-danger" onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  )
}

export default Counter

