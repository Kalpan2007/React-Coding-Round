import React, { useState } from 'react';
import './Todo.css';

const Todo = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (task.trim() === '') return;
    setTodos(prev => [...prev, task]);
    setTask('');
  };

  const handleDelete = (index) => {
    setTodos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleDelete(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
