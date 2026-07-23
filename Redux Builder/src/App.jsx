import React from 'react'
import Counter from './components/Counter'
import Todo from './components/Todo'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Redux Builder</h1>
      <p className="app-subtitle">
        A simple React Redux Toolkit demo with Counter & Todo
      </p>
      <div className="app-content">
        <Counter />
        <Todo />
      </div>
    </div>
  )
}

export default App

