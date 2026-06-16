import { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Study');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTodo(title, priority, dueDate, category);
    setTitle('');
    setPriority('Medium');
    setDueDate('');
    setCategory('Study');
    fetchTodos();
  };

  const handleUpdate = async (todo) => {
    await updateTodo(todo.id, !todo.completed, todo.priority, todo.due_date, todo.category);
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const priorityColor = (p) => {
    if (p === 'High') return 'bg-red-100 text-red-600';
    if (p === 'Medium') return 'bg-yellow-100 text-yellow-600';
    return 'bg-green-100 text-green-600';
  };

  const categoryColor = (c) => {
    if (c === 'Study') return 'bg-blue-100 text-blue-600';
    if (c === 'Assignment') return 'bg-purple-100 text-purple-600';
    return 'bg-orange-100 text-orange-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8 mt-4">
          📚 CS Todo App
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add a new task..."
            className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:border-purple-400"
          />
          <div className="flex gap-3 mb-3 flex-wrap">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400 text-sm"
            >
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400 text-sm"
            >
              <option value="Study">📖 Study</option>
              <option value="Assignment">📝 Assignment</option>
              <option value="Project">💻 Project</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400 text-sm"
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-medium"
          >
            + Add Task
          </button>
        </div>

        <div className="space-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className={`bg-white rounded-xl shadow-sm p-4 flex items-start gap-3 ${todo.completed ? 'opacity-60' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed === 1}
                onChange={() => handleUpdate(todo)}
                className="w-4 h-4 accent-purple-600 mt-1"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${todo.completed === 1 ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {todo.title}
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor(todo.priority)}`}>
                    {todo.priority}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColor(todo.category)}`}>
                    {todo.category}
                  </span>
                  {todo.due_date && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      📅 {todo.due_date.split('T')[0]}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                🗑
              </button>
            </div>
          ))}
          {todos.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-8">No tasks yet. Add one!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;