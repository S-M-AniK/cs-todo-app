const API_URL = 'http://localhost:8000/api/todos';

export const getTodos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addTodo = async (title) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const updateTodo = async (id, completed) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  return res.json();
};

export const deleteTodo = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};