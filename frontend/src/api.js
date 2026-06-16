const API_URL = 'http://localhost:8000/api/todos';

export const getTodos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addTodo = async (title, priority, due_date, category) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, priority, due_date, category }),
  });
  return res.json();
};

export const updateTodo = async (id, completed, priority, due_date, category) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed, priority, due_date, category }),
  });
  return res.json();
};

export const deleteTodo = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};