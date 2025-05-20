// import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
// import { v4 as uuidv4 } from 'uuid';
// import {
//   addTodoSuccess,
//   toggleTodoSuccess,
//   deleteTodoSuccess,
//   fetchTodosSuccess,
//   updateTodoSuccess,
//   clearCompletedTodosSuccess, 
//   addTodoRequest,
//   toggleTodoRequest,
//   deleteTodoRequest,
//   fetchTodosRequest,
//   updateTodoRequest,
//   clearCompletedTodosRequest, 
//   todoOperationFailed,
// } from './todosSlice';

// const API_URL = 'https://dummyjson.com/todos';


// function* handleAddTodo(action) {
//   try {
//     const localId = uuidv4();

//     yield call(fetch, API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         todo: action.payload,
//         completed: false,
//         userId: action.payload,
//       }),
//     });

//     yield put(addTodoSuccess({
//       id: localId,
//       todo: action.payload,
//       completed: false,
//       userId: action.payload,
//       isLocal: true, 
//     }));
//   } catch (error) {
//     yield put(todoOperationFailed(error.message));
//   }
// }

// function* handleFetchTodos() {
//   try {
//     const response = yield call(fetch, `${API_URL}?_limit=30`); 
//     const data = yield response.json();
//     yield put(fetchTodosSuccess(data.map(todo => ({ id: todo.id, text: todo.todo, completed: todo.completed, userId: todo.userId}))));
//   } catch (error) {
//     yield put(todoOperationFailed(error.message));
//   }
// }

// function* handleToggleTodo(action) {
//   const { id } = action.payload;
//   const state = yield select(); 
//   const todo = state.todos.items.find(t => t.id === id);
//   if (!todo) return;
//   yield put(toggleTodoSuccess({ id, completed: !todo.completed }));
// }

// function* handleDeleteTodo(action) {
//   try {
//     yield call(fetch, `${API_URL}/${action.payload}`, {
//       method: 'DELETE',
//     });
//     yield put(deleteTodoSuccess(action.payload));
//   } catch (error) {
//     yield put(todoOperationFailed(error.message));
//   }
// }

// function* handleUpdateTodo(action) {
//   const { id, todo } = action.payload;

//   const isLocal = typeof id === 'string' && id.length > 10; 

//   try {
//     if (isLocal) {
//       yield put(updateTodoSuccess({ id, todo }));
//     } else {
//       const response = yield call(fetch, `${API_URL}/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title: todo }),
//       });

//       if (!response.ok) throw new Error('Failed to update todo');

//       const data = yield response.json();

//       yield put(updateTodoSuccess({ id: data.id, todo: data.title }));
//     }
//   } catch (error) {
//     yield put(todoOperationFailed(error.message));
//   }
// }

// function* handleClearCompletedTodos() {
//   try {
//     const todos = yield select(state => state.todos.items);
//     const completedTodos = todos.filter(todo => todo.completed);

//     for (const todo of completedTodos) {
//       if (todo.id <= 200) { 
//         yield call(fetch, `${API_URL}/${todo.id}`, {
//           method: 'DELETE',
//         });
//       }
//       yield put(deleteTodoSuccess(todo.id)); 
//     }

//     yield put(clearCompletedTodosSuccess());
//   } catch (error) {
//     yield put(todoOperationFailed(error.message));
//   }
// }

// export function* watchTodos() {
//   yield takeLatest(addTodoRequest.type, handleAddTodo);
//   yield takeLatest(fetchTodosRequest.type, handleFetchTodos);
//   yield takeEvery(toggleTodoRequest.type, handleToggleTodo);
//   yield takeEvery(deleteTodoRequest.type, handleDeleteTodo);
//   yield takeLatest(updateTodoRequest.type, handleUpdateTodo);
//   yield takeLatest(clearCompletedTodosRequest.type, handleClearCompletedTodos); 
// }


// import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
// import { v4 as uuidv4 } from 'uuid';
// import {
//   addTodoSuccess,
//   toggleTodoSuccess,
//   deleteTodoSuccess,
//   fetchTodosSuccess,
//   updateTodoSuccess,
//   clearCompletedTodosSuccess, 
//   addTodoRequest,
//   toggleTodoRequest,
//   deleteTodoRequest,
//   fetchTodosRequest,
//   updateTodoRequest,
//   clearCompletedTodosRequest, 
//   todoOperationFailed,
// } from './todosSlice';

// const API_URL = 'https://dummyjson.com/todos';


// function* handleAddTodo(action) {
//   try {
//     const localId = uuidv4();
//     const todoText = action.payload; // Отримуємо текст завдання з action.payload

//     // Запит до API
//     yield call(fetch, `${API_URL}/add`, { // dummyjson.com/todos/add для додавання
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         todo: todoText, // Надсилаємо 'todo' згідно з dummyjson.com
//         completed: false,
//         userId: 1, // Припустимо, фіксований userId або його потрібно отримати з action
//       }),
//     });

//     // Відправляємо дані до редюсера. Використовуємо 'text' для внутрішнього стану,
//     // але якщо API повертає 'todo', то використовуємо його.
//     yield put(addTodoSuccess({
//       id: localId,
//       todo: todoText, // Передаємо як 'todo' до редюсера, де його буде перетворено на 'text'
//       completed: false,
//       userId: 1, // Послідовно з API
//       isLocal: true, 
//     }));
//   } catch (error) {
//     yield put(todoOperationFailed(error.message));
//   }
// }

// function* handleFetchTodos() {
//   try {
//     const response = yield call(fetch, `${API_URL}?limit=30`); // limit=30 замість _limit=30 для dummyjson.com
//     const data = yield response.json();
//     // dummyjson.com повертає об'єкт { todos: [...] }
//     const todosData = data.todos || []; // Перевіряємо, що todosData є масивом
//     yield put(fetchTodosSuccess(todosData.map(todo => ({
//       id: todo.id,
//       todo: todo.todo, // Залишаємо 'todo' тут, він буде перетворений на 'text' в редюсері
//       completed: todo.completed,
//       userId: todo.userId
//     }))));
//   } catch (error) {
//     yield put(todoOperationFailed(error.message));
//   }
// }

// function* handleToggleTodo(action) {
//   const { id } = action.payload;
//   const state = yield select(); 
//   const todo = state.todos.items.find(t => t.id === id);
//   if (!todo) return;

//   // Оновлюємо стан на клієнті негайно, а потім робимо API запит.
//   // Цей put повинен бути перед call, щоб UI оновився швидше
//   yield put(toggleTodoSuccess({ id, completed: !todo.completed }));

//   try {
//     // API для оновлення статусу complete/uncomplete
//     yield call(fetch, `${API_URL}/${id}`, {
//       method: 'PUT', // або PATCH, залежить від API. dummyjson.com використовує PUT/PATCH
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ completed: !todo.completed }),
//     });
//     // Якщо API запит не потрібен для toggle (лише локальне оновлення), то видалити call і try/catch
//   } catch (error) {
//     // Якщо API запит не пройшов, можна відкотити зміни на клієнті або просто log error
//     yield put(todoOperationFailed(error.message));
//     // Можливо, потрібно відкотити toggleTodoSuccess, якщо API запит провалився
//     // yield put(toggleTodoSuccess({ id, completed: todo.completed }));
//   }
// }

// function* handleDeleteTodo(action) {
//   try {
//     // dummyjson.com delete returns { "id": 1, "isDeleted": true }
//     yield call(fetch, `${API_URL}/${action.payload}`, {
//       method: 'DELETE',
//     });
//     yield put(deleteTodoSuccess(action.payload));
//   } catch (error) {
//     yield put(todoOperationFailed(error.message));
//   }
// }

// function* handleUpdateTodo(action) {
//   const { id, text } = action.payload; // Компонент надсилає 'text'

//   const isLocal = typeof id === 'string' && id.length > 10; 

//   try {
//     if (isLocal) {
//       yield put(updateTodoSuccess({ id, text })); // Надсилаємо 'text'
//     } else {
//       const response = yield call(fetch, `${API_URL}/${id}`, {
//         method: 'PUT', // dummyjson.com використовує PUT/PATCH для оновлення
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ todo: text }), // Надсилаємо 'todo' до API, згідно з dummyjson.com
//       });

//       if (!response.ok) throw new Error('Failed to update todo');

//       const data = yield response.json();

//       // dummyjson.com повертає оновлений об'єкт з полем 'todo'.
//       // Ми перетворюємо його на 'text' для редюсера.
//       yield put(updateTodoSuccess({ id: data.id, text: data.todo }));
//     }
//   } catch (error) {
//     yield put(todoOperationFailed(error.message));
//   }
// }

// function* handleClearCompletedTodos() {
//   try {
//     const todos = yield select(state => state.todos.items);
//     const completedTodos = todos.filter(todo => todo.completed);

//     for (const todo of completedTodos) {
//       // Перевіряємо, чи це завдання було завантажено з dummyjson.com
//       // dummyjson.com не має обмеження на id < 200, якщо це не ваш власний id-range
//       // Якщо dummyjson.com має свої власні ID, то цей if(todo.id <= 200) може бути зайвим
//       // або потребує іншої логіки для ідентифікації "віддалених" завдань.
//       // Якщо це лише локальні завдання, то API-запит не потрібен.
//       if (!todo.isLocal) { // Припускаємо, що isLocal означає, що завдання не з dummyjson.com
//         yield call(fetch, `${API_URL}/${todo.id}`, {
//           method: 'DELETE',
//         });
//       }
//       // Видаляємо завдання з Redux стану незалежно від API-запиту
//       yield put(deleteTodoSuccess(todo.id));
//     }

//     yield put(clearCompletedTodosSuccess());
//   } catch (error) {
//     yield put(todoOperationFailed(error.message));
//   }
// }

// export function* watchTodos() {
//   yield takeLatest(addTodoRequest.type, handleAddTodo);
//   yield takeLatest(fetchTodosRequest.type, handleFetchTodos);
//   yield takeEvery(toggleTodoRequest.type, handleToggleTodo);
//   yield takeEvery(deleteTodoRequest.type, handleDeleteTodo);
//   yield takeLatest(updateTodoRequest.type, handleUpdateTodo);
//   yield takeLatest(clearCompletedTodosRequest.type, handleClearCompletedTodos);
// }

import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import {
  addTodoSuccess,
  toggleTodoSuccess,
  deleteTodoSuccess,
  fetchTodosSuccess,
  updateTodoSuccess,
  clearCompletedTodosSuccess,
  addTodoRequest,
  toggleTodoRequest,
  deleteTodoRequest,
  fetchTodosRequest,
  updateTodoRequest,
  clearCompletedTodosRequest,
  todoOperationFailed,
} from './todosSlice';

const API_URL = 'https://dummyjson.com/todos';

function* handleAddTodo(action) {
  try {
    const localId = uuidv4();
    const todoText = action.payload; // Текст завдання з action.payload

    // Надсилаємо запит до API для додавання нового завдання
    // dummyjson.com/todos/add
    const response = yield call(fetch, `${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: todoText, // Надсилаємо 'todo' згідно з dummyjson.com
        completed: false,
        userId: 1, // Припустимо фіксований userId або його потрібно отримати з іншого місця
      }),
    });

    if (!response.ok) {
      const errorData = yield response.json();
      throw new Error(errorData.message || 'Failed to add todo');
    }

    // Припустимо, що API повертає доданий елемент, навіть якщо ми використовуємо localId
    // Для dummyjson, реальний ID буде віддалено, а наш localId буде тимчасовим
    // Щоб зберегти послідовність, ми використовуємо localId для негайного оновлення
    // а реальний ID може бути оновлений при наступному fetch або через інший механізм.
    // Для простоти, в цьому прикладі ми використовуємо localId.
    // Якщо dummyjson повертає реальний ID, використовуйте його замість localId
    const data = yield response.json();

    yield put(addTodoSuccess({
      id: data.id || localId, // Використовуємо ID, повернений API, або localId
      todo: data.todo || todoText, // Використовуємо текст, повернений API, або оригінальний
      completed: data.completed || false,
      userId: data.userId || 1,
      isLocal: !data.id, // Позначка, якщо це завдання ще не має реального ID з API
    }));
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

function* handleFetchTodos() {
  try {
    // dummyjson.com повертає об'єкт { todos: [...] }
    const response = yield call(fetch, `${API_URL}?limit=30`); // limit=30 для dummyjson.com
    if (!response.ok) {
      const errorData = yield response.json();
      throw new Error(errorData.message || 'Failed to fetch todos');
    }
    const data = yield response.json();
    const todosData = data.todos || []; // Перевіряємо, що todosData є масивом

    yield put(fetchTodosSuccess(todosData.map(todo => ({
      id: todo.id,
      todo: todo.todo, // 'todo' з API
      completed: todo.completed,
      userId: todo.userId
    }))));
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

function* handleToggleTodo(action) {
  const { id } = action.payload;
  const state = yield select();
  const todo = state.todos.items.find(t => t.id === id);
  if (!todo) {
    yield put(todoOperationFailed(`Todo with id ${id} not found.`));
    return;
  }

  // Оптимістичне оновлення UI:
  yield put(toggleTodoSuccess({ id, completed: !todo.completed }));

  try {
    // Відправляємо запит до API для оновлення статусу
    // dummyjson.com використовує PUT/PATCH для оновлення
    const response = yield call(fetch, `${API_URL}/${id}`, {
      method: 'PUT', // або PATCH, якщо API підтримує часткове оновлення
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    if (!response.ok) {
      const errorData = yield response.json();
      throw new Error(errorData.message || 'Failed to toggle todo status');
    }
    // Якщо API повертає оновлені дані, можна було б використати їх для підтвердження
    // const data = yield response.json();
    // yield put(toggleTodoSuccess({ id: data.id, completed: data.completed }));
  } catch (error) {
    // Якщо API запит не пройшов, відкочуємо зміни на клієнті та логуємо помилку
    yield put(toggleTodoSuccess({ id, completed: todo.completed })); // Відкат
    yield put(todoOperationFailed(error.message));
  }
}

function* handleDeleteTodo(action) {
  try {
    const idToDelete = action.payload;

    // dummyjson.com delete повертає { "id": 1, "isDeleted": true }
    const response = yield call(fetch, `${API_URL}/${idToDelete}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = yield response.json();
      throw new Error(errorData.message || 'Failed to delete todo');
    }

    yield put(deleteTodoSuccess(idToDelete));
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

function* handleUpdateTodo(action) {
  const { id, text } = action.payload; // Компонент надсилає 'text'

  const isLocal = typeof id === 'string' && id.length > 10; // Припустимо, що локальні ID - це UUIDs

  try {
    if (isLocal) {
      // Якщо це локальне завдання, оновлюємо тільки в Redux стані
      yield put(updateTodoSuccess({ id, text }));
    } else {
      // Якщо це віддалене завдання, відправляємо PATCH/PUT запит
      const response = yield call(fetch, `${API_URL}/${id}`, {
        method: 'PUT', // dummyjson.com використовує PUT/PATCH для оновлення
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: text }), // Надсилаємо 'todo' до API, згідно з dummyjson.com
      });

      if (!response.ok) {
        const errorData = yield response.json();
        throw new Error(errorData.message || 'Failed to update todo');
      }

      const data = yield response.json();

      // dummyjson.com повертає оновлений об'єкт з полем 'todo'.
      // Ми перетворюємо його на 'text' для редюсера.
      yield put(updateTodoSuccess({ id: data.id, text: data.todo }));
    }
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

function* handleClearCompletedTodos() {
  try {
    const todos = yield select(state => state.todos.items);
    const completedTodos = todos.filter(todo => todo.completed);

    for (const todo of completedTodos) {
      // Видаляємо лише ті, що були завантажені з API (тобто, не 'isLocal')
      // і мають ID менше 200 (якщо dummyjson.com видає реальні ID)
      // Або просто !todo.isLocal, якщо ви не використовуєте ID <= 200 як маркер
      if (todo.id <= 200 && !todo.isLocal) { // Додано !todo.isLocal для безпеки
        const response = yield call(fetch, `${API_URL}/${todo.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = yield response.json();
          throw new Error(errorData.message || `Failed to delete completed todo with id: ${todo.id}`);
        }
      }
      // Видаляємо завдання з Redux стану незалежно від API-запиту
      // (це може бути оптимістичне видалення)
      yield put(deleteTodoSuccess(todo.id));
    }

    yield put(clearCompletedTodosSuccess());
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

export function* watchTodos() {
  yield takeLatest(addTodoRequest.type, handleAddTodo);
  yield takeLatest(fetchTodosRequest.type, handleFetchTodos);
  yield takeEvery(toggleTodoRequest.type, handleToggleTodo); // takeEvery для одночасних toggle
  yield takeEvery(deleteTodoRequest.type, handleDeleteTodo); // takeEvery для одночасних delete
  yield takeLatest(updateTodoRequest.type, handleUpdateTodo);
  yield takeLatest(clearCompletedTodosRequest.type, handleClearCompletedTodos);
}