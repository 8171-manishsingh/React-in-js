import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const isprime=(num)=>{
     if(num<=1)  return false
      for(let i=2;i<=Math.sqrt(num);i++){
        if(count%i==0) return false
      }
    return true
  }

  return (
    <>
    <div className="container">
      <h1>welcome to Counter 2.0</h1>
       <div>
        <button data-testid="minusonebtn" onClick={() => setCount(count - 1)}>-1</button>
        <button data-testid="plusonebtn" onClick={() => setCount(count + 1)}>+1</button>
        <div>
          <button id="reset-btn" data-testid="resetbtn" onClick={() => setCount(0)}>Reset:Count</button>
        </div>
        <div className="count">count:<span >{count}</span></div>
        <div className="info">
          <span>{count % 2 == 0 ? " This Number is:Even " : "  This Number is: odd "}</span>
          <br/>
          <span >
            {isprime(count)? " Prime Number is: true" : " Prime Number is :false "}
            </span>
        </div>
      </div>
      </div>
     
    </>
  )
}

export default App

