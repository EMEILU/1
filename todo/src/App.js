import React, { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './services/todoService';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // This will set up real-time listener
    const unsubscribe = getTodos((todos) => {
      setTodos(todos);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    await addTodo({ text: input });
    setInput('');
  };

  const handleToggle = (id, completed) => {
    updateTodo(id, { completed: !completed });
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  return (
    <div className="app">
      <h1>React Todo with Firebase Realtime DB</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed || false}
              onChange={() => handleToggle(todo.id, todo.completed)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;