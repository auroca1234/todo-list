document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  let editMode = false;
  let itemBeingEdited = null;

  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(todo => addTodoToDOM(todo.text, todo.done));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === '') return;

    if (editMode && itemBeingEdited) {
      const span = itemBeingEdited.querySelector('.todo-text');
      span.textContent = text;
      input.value = '';
      editMode = false;
      itemBeingEdited = null;
    } else {
      addTodoToDOM(text);
      input.value = '';
    }
    saveTodos();
  });

  list.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('delete-btn')) {
      li.remove();
      saveTodos();
    }

    if (e.target.classList.contains('edit-btn')) {
      const span = li.querySelector('.todo-text');
      input.value = span.textContent;
      input.focus();
      editMode = true;
      itemBeingEdited = li;
    }

    if (e.target.classList.contains('todo-text')) {
      li.classList.toggle('done');
      saveTodos();
    }
  });

  function addTodoToDOM(text, done = false) {
    const li = document.createElement('li');
    if (done) li.classList.add('done');

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'ویرایش';

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'حذف';

    li.appendChild(span);
    li.appendChild(editBtn);
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
