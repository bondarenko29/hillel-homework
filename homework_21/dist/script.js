"use strict";

$(document).ready(function () {
  var formInput = $('.form__input');
  var addButton = $('.form__btn');
  var todoList = $('.todo-list');
  var myModal = new bootstrap.Modal(document.getElementById('myModal'));
  var modalContent = $('#modalContent');
  addButton.click(function () {
    var taskText = formInput.val().trim();
    if (taskText) {
      createTodoItem(taskText);
      formInput.val('');
      saveTodoItems();
    } else {
      alert('Введіть завдання!');
    }
  });
  function createTodoItem(taskText) {
    var todoItem = $("\n          <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n              <span class=\"todo-item__description\">".concat(taskText, "</span>\n              <button class=\"btn btn-danger btn-sm delete-btn\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n          </li>\n      "));
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
    var tasks = [];
    $('.todo-item__description').each(function () {
      tasks.push($(this).text());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  function loadTodoItems() {
    var savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(function (task) {
      return createTodoItem(task);
    });
  }
  loadTodoItems();
});