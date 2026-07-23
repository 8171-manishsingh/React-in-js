import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  filter: 'all', // 'all', 'active', 'completed'
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload)
      },
      prepare: (title) => ({
        payload: {
          id: nanoid(),
          title,
          completed: false,
        },
      }),
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
})

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions
export const selectTodos = (state) => {
  const { items, filter } = state.todos
  switch (filter) {
    case 'active':
      return items.filter((todo) => !todo.completed)
    case 'completed':
      return items.filter((todo) => todo.completed)
    default:
      return items
  }
}
export const selectFilter = (state) => state.todos.filter
export default todoSlice.reducer

