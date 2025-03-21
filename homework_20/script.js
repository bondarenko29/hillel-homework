document.addEventListener("DOMContentLoaded", function () {
  const formInput = document.querySelector('.form__input');
  const addButton = document.querySelector('.form__btn');
  const todoList = document.querySelector('.todo-list');
  const modal = new bootstrap.Modal(document.getElementById('myModal'));
  const modalContent = document.getElementById('modalContent');

  addButton.addEventListener('click', function () {
      const taskText = formInput.value.trim();
      if (taskText) {
          createTodoItem(taskText);
          formInput.value = '';
          saveTodoItems();
      } else {
          alert('Введіть завдання!');
      }
  });

  function createTodoItem(taskText) {
      const todoItem = document.createElement('li');
      todoItem.className = 'list-group-item d-flex justify-content-between align-items-center';

      const taskSpan = document.createElement('span');
      taskSpan.className = 'todo-item__description';
      taskSpan.textContent = taskText;

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger btn-sm delete-btn';
      deleteButton.textContent = 'Видалити';

      
      taskSpan.addEventListener('click', function () {
          modalContent.textContent = taskText;
          modal.show();
      });

      deleteButton.addEventListener('click', function () {
          todoList.removeChild(todoItem);
          saveTodoItems();
      });

      todoItem.appendChild(taskSpan);
      todoItem.appendChild(deleteButton);
      todoList.appendChild(todoItem);
    }
    function saveTodoItems() {
      let items = [];
      todoList.querySelectorAll('.todo-item').forEach(function(todoitem) {
        const description = todoitem.querySelector('.todo-item__description').textContent.trim();
        items.push({description});
      });
      localStorage.setItem('items', JSON.stringify(items));
    }

  function loadTodoItems() {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.forEach(createTodoItem);
  }

  loadTodoItems();
});