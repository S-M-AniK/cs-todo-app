import { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTodo(title);
    setTitle('');
    fetchTodos();
  };

  const handleUpdate = async (id, completed) => {
    await updateTodo(id, !completed);
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">CS Todo App</h1>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-400"
          />
          <button
            onClick={handleAdd}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Add
          </button>
        </div>
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
              <input
                type="checkbox"
                checked={todo.completed === 1}
                onChange={() => handleUpdate(todo.id, todo.completed)}
                className="w-4 h-4 accent-purple-600"
              />
              <span className={`flex-1 text-sm ${todo.completed === 1 ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {todo.title}
              </span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-4">No tasks yet. Add one!</p>
        )}
      </div>
    </div>
  );
}

export default App;