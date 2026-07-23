import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, toggleTodo, deleteTodo, setFilter, selectTodos, selectFilter } from '../store/slices/todoSlice'
import './Todo.css'

function Todo() {
  const [title, setTitle] = useState('')
  const todos = useSelector(selectTodos)
  const filter = useSelector(selectFilter)
  const dispatch = useDispatch()

  const handleAdd = () => {
    const trimmed = title.trim()
    if (trimmed) {
      dispatch(addTodo(trimmed))
      setTitle('')
    }
  }

  const getRemainingCount = () => {
    return todos.filter((t) => !t.completed).length
  }

  return (
    <div className="card todo-card">
      <h2 className="card-title">Todo List</h2>
      
      <div className="todo-input-group">
        <input
          type="text"
          className="input"
          placeholder="Add a new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="todo-filters">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            className={`btn btn-filter ${filter === f ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(f))}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="todo-empty">No todos to show</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <span className="todo-title">{todo.title}</span>
              </label>
              <button
                className="btn btn-icon"
                onClick={() => dispatch(deleteTodo(todo.id))}
                title="Delete"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="todo-footer">
        <span>{getRemainingCount()} item{getRemainingCount() !== 1 ? 's' : ''} left</span>
      </div>
    </div>
  )
}

export default Todo

