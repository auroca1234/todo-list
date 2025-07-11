document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // Load saved todos
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(todo => addTodoToDOM(todo.text, todo.done));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== '') {
      addTodoToDOM(text);
      input.value = '';
      saveTodos();
    }
  });

  list.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
      e.target.parentElement.remove();
      saveTodos();
    } else if (e.target.classList.contains('todo-text')) {
      e.target.parentElement.classList.toggle('done');
      saveTodos();
    }
  });

  function addTodoToDOM(text, done = false) {
    const li = document.createElement('li');
    if (done) li.classList.add('done');

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'حذف';

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  }

  function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
      todos.push({
        text: li.querySelector('.todo-text').textContent,
        done: li.classList.contains('done')
      });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});
