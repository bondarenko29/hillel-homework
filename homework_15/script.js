const formInput = document.querySelector('.form__input');
const addButton = document.querySelector('.form__btn');
const todoList = document.querySelector('.todo-list');

loadTodoItems();

function addItem() {
  const item = formInput.value.trim();
  if (item) {
    createTodoItem(item);
    formInput.value = '';
    saveTodoItems();
  } else {
    confirm('Enter an task!');
  }
}


addButton.addEventListener('click', addItem);


function createTodoItem(item, checked = false) {
  const todoItem = document.createElement('li');
  todoItem.classList.add('todo-item');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked = checked;
    
  const todoItemDescription = document.createElement('span');
  todoItemDescription.classList.add('todo-item__description');
  todoItemDescription.textContent = item;
  addButton.type = 'button';
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('form__btn');
  deleteButton.textContent = 'Видалити';

 
  todoItem.appendChild(checkBox);
  todoItem.appendChild(todoItemDescription);
  todoItem.appendChild(deleteButton);
  todoList.appendChild(todoItem);
  
  if(checked) {
    todoItemDescription.classList.add('checked');
    todoItem.classList.add('todo-item--checked');   
  } 
  checkBox.onclick = function () {
    if (checkBox.checked) {
        todoItemDescription.classList.add('checked');
        todoItem.classList.add('todo-item--checked');
    } else {
        todoItemDescription.classList.remove('checked');
        todoItem.classList.remove('todo-item--checked');
    }
    saveTodoItems(); 
  };
  deleteButton.addEventListener('click', function() {
    todoList.removeChild(todoItem);
    saveTodoItems();
  }); 
}

function saveTodoItems() {
  let items = [];
  todoList.querySelectorAll('.todo-item').forEach(function(todoitem) {
    const description = todoitem.querySelector('.todo-item__description').textContent.trim();
    const checked = todoitem.querySelector('input[type="checkbox"]').checked;
    items.push({description, checked});
  });
  localStorage.setItem('items', JSON.stringify(items));
}

function loadTodoItems() {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  items.forEach(function(item) {
    createTodoItem(item.description, item.checked);
  });
}

