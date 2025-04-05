import '../styles/main.scss';
const todoForm = document.querySelector('.form');
const todoInput = document.querySelector('.form__input');
const todoList = document.querySelector('.todo-list');
const API_URL = 'http://localhost:3001/api/todos';
const STORAGE_KEY = 'todo-app-data'; 

async function getTodos() {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    renderTodos(todos);
    saveToLocalStorage(todos); 
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    
    loadFromLocalStorage();
  }
}

async function createTodo(text) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const newTodo = await response.json();
    addTodoToUI(newTodo);
    loadTodosAndUpdateLocalStorage(); 
    todoInput.value = '';
  } catch (error) {
    console.error('Failed to create todo:', error);
    
  }
}

async function updateTodo(id, completed, text) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed, text }),
    });
    const updatedTodo = await response.json();
    loadTodosAndUpdateLocalStorage(); 
    return updatedTodo;
  } catch (error) {
    console.error('Failed to update todo:', error);
    return null;
  }
}

async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    removeTodoFromUI(id);
    loadTodosAndUpdateLocalStorage();
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
}

function renderTodos(todos) {
  todoList.innerHTML = '';
  todos.forEach(todo => addTodoToUI(todo));
}

function addTodoToUI(todo) {
  const listItem = document.createElement('li');
  listItem.classList.add('todo-item');
  if (todo.completed) {
    listItem.classList.add('todo-item--completed');
  }
  listItem.dataset.id = todo._id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => {
    updateTodo(todo._id, checkbox.checked);
    listItem.classList.toggle('todo-item--completed');
  });

  const textSpan = document.createElement('span');
  textSpan.classList.add('todo-item__description');
  textSpan.textContent = todo.text;

  const editButton = document.createElement('button');
  editButton.textContent = 'Редагувати';
  editButton.classList.add('todo-item__button', 'edit');
  editButton.addEventListener('click', () => enableEditMode(listItem, todo));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Видалити';
  deleteButton.classList.add('todo-item__button', 'delete');
  deleteButton.addEventListener('click', () => deleteTodo(todo._id));

  listItem.appendChild(checkbox);
  listItem.appendChild(textSpan);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);
}

function removeTodoFromUI(id) {
  const todoItem = todoList.querySelector(`[data-id="${id}"]`);
  if (todoItem) {
    todoList.removeChild(todoItem);
  }
}

function enableEditMode(listItem, todo) {
  const textSpan = listItem.querySelector('.todo-item__description');
  const editButton = listItem.querySelector('.edit');
  const deleteButton = listItem.querySelector('.delete');

  if (!textSpan || !editButton || !deleteButton) {
    return;
  }

  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo.text;

  listItem.insertBefore(input, textSpan);
  listItem.removeChild(textSpan);

  const newEditButton = document.createElement('button');
  newEditButton.textContent = 'Зберегти';
  newEditButton.classList.add('todo-item__button', 'edit');
  newEditButton.addEventListener('click', () => saveEditedTodo(listItem, todo._id, input.value));

  editButton.parentNode.replaceChild(newEditButton, editButton);

  const newDeleteButton = document.createElement('button');
  newDeleteButton.textContent = 'Скасувати';
  newDeleteButton.classList.add('todo-item__button', 'delete');
  newDeleteButton.addEventListener('click', () => disableEditMode(listItem, todo));

  deleteButton.parentNode.replaceChild(newDeleteButton, deleteButton);

  input.focus();
}

async function saveEditedTodo(listItem, id, newText) {
  const input = listItem.querySelector('input[type="text"]');
  const editButton = listItem.querySelector('.edit');
  const deleteButton = listItem.querySelector('.delete');
  const editButtonParent = editButton?.parentNode;
  const deleteButtonParent = deleteButton?.parentNode;

  if (input && editButtonParent && deleteButtonParent) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText }),
      });
      const updatedTodo = await response.json();
      if (updatedTodo) {
        const textSpan = document.createElement('span');
        textSpan.classList.add('todo-item__description');
        textSpan.textContent = updatedTodo.text;

        listItem.insertBefore(textSpan, input);
        listItem.removeChild(input);

        const newEditButton = document.createElement('button');
        newEditButton.textContent = 'Редагувати';
        newEditButton.classList.add('todo-item__button', 'edit');
        newEditButton.addEventListener('click', () => enableEditMode(listItem, updatedTodo));
        editButtonParent.replaceChild(newEditButton, editButton);

        const newDeleteButton = document.createElement('button');
        newDeleteButton.textContent = 'Видалити';
        newDeleteButton.classList.add('todo-item__button', 'delete');
        newDeleteButton.addEventListener('click', () => deleteTodo(id));
        deleteButtonParent.replaceChild(newDeleteButton, deleteButton);

        loadTodosAndUpdateLocalStorage();
      }
    } catch (error) {
      console.error('Помилка при оновленні TODO:', error);
    }
  } else {
    console.error('Не вдалося знайти необхідні DOM елементи для збереження.');
  }
}

function disableEditMode(listItem, todo) {
  const input = listItem.querySelector('input[type="text"]');
  const editButton = listItem.querySelector('.edit');
  const deleteButton = listItem.querySelector('.delete');
  const editButtonParent = editButton?.parentNode;
  const deleteButtonParent = deleteButton?.parentNode;

  if (input && editButtonParent && deleteButtonParent) {
    const textSpan = document.createElement('span');
    textSpan.classList.add('todo-item__description');
    textSpan.textContent = todo.text;

    listItem.insertBefore(textSpan, input);
    listItem.removeChild(input);

    const newEditButton = document.createElement('button');
    newEditButton.textContent = 'Редагувати';
    newEditButton.classList.add('todo-item__button', 'edit');
    newEditButton.addEventListener('click', () => enableEditMode(listItem, todo));
    editButtonParent.replaceChild(newEditButton, editButton);

    const newDeleteButton = document.createElement('button');
    newDeleteButton.textContent = 'Видалити';
    newDeleteButton.classList.add('todo-item__button', 'delete');
    newDeleteButton.addEventListener('click', () => deleteTodo(todo._id));
    deleteButtonParent.replaceChild(newDeleteButton, deleteButton);
  }
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Форма відправлена');
  console.log('Значення інпуту:', todoInput.value);
  const text = todoInput.value.trim();
  if (text) {
    createTodo(text);
  }
});

function saveToLocalStorage(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const storedTodos = localStorage.getItem(STORAGE_KEY);
  if (storedTodos) {
    renderTodos(JSON.parse(storedTodos));
  }
}

async function loadTodosAndUpdateLocalStorage() {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    renderTodos(todos);
    saveToLocalStorage(todos);
  } catch (error) {
    console.error('Failed to fetch todos for update:', error);
    loadFromLocalStorage();
  }
}

getTodos();
