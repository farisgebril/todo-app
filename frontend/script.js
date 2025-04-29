const API = 'http://localhost:3000/api/todos';

async function loadTodos() {
  const res = await fetch(API);
  const todos = await res.json();
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  todos.forEach(todo => {
    const item = document.createElement('li');
    item.textContent = todo.text;
    item.onclick = () => deleteTodo(todo.id);
    list.appendChild(item);
  });
}

async function addTodo() {
  const input = document.getElementById('newTodo');
  const text = input.value;
  if (text) {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    input.value = '';
    loadTodos();
  }
}

async function deleteTodo(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadTodos();
}

loadTodos();
