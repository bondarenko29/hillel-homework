$(document).ready(function () {
  const formInput = $('.form__input');
  const addButton = $('.form__btn');
  const todoList = $('.todo-list');
  const myModal = new bootstrap.Modal(document.getElementById('myModal'));
  const modalContent = $('#modalContent');

  
  addButton.click(function () {
      const taskText = formInput.val().trim();
      if (taskText) {
          createTodoItem(taskText);
          formInput.val('');
          saveTodoItems();
      } else {
          alert('Введіть завдання!');
      }
  });

  function createTodoItem(taskText) {
      const todoItem = $(`
          <li class="list-group-item d-flex justify-content-between align-items-center">
              <span class="todo-item__description">${taskText}</span>
              <button class="btn btn-danger btn-sm delete-btn">Видалити</button>
          </li>
      `);

      todoList.append(todoItem);
  }

  $(document).on('click', '.todo-item__description', function () {
      modalContent.text($(this).text());
      myModal.show();
  });

  $(document).on('click', '.delete-btn', function () {
      $(this).parent().remove();
  });

  function saveTodoItems() {
      let tasks = [];
      $('.todo-item__description').each(function () {
          tasks.push($(this).text());
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTodoItems() {
      let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.forEach(task => createTodoItem(task));
  }

  loadTodoItems();
});


