// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// const todosSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     fetchTodosRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchTodosSuccess: (state, action) => {
//       state.loading = false;
//       // Припускаємо, що fetchTodosSuccess отримує масив об'єктів,
//       // де кожен об'єкт має 'id', 'todo' (текст завдання) та 'completed'
//       state.items = action.payload.map(item => ({
//         id: Number(item.id),
//         text: item.todo, // Перетворюємо 'todo' з API на 'text' для внутрішнього стану
//         completed: item.completed,
//         userId: item.userId // Зберігаємо userId, якщо він потрібен
//       }));
//     },
//     addTodoRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     addTodoSuccess: (state, action) => {
//       state.loading = false;
//       // add_todo_success action.payload повинен мати поля 'id', 'text', 'completed', 'isLocal', 'userId'
//       // Щоб бути послідовними, переконаємося, що ми додаємо 'text' замість 'todo'
//       state.items.push({
//         id: action.payload.id,
//         text: action.payload.todo || action.payload.text, // Приймаємо або 'todo', або 'text'
//         completed: action.payload.completed,
//         userId: action.payload.userId,
//         isLocal: action.payload.isLocal,
//       });
//     },
//     toggleTodoRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     toggleTodoSuccess: (state, action) => {
//       console.log('toggleTodoSuccess Reducer received:', action.payload);
//       state.loading = false;
//       const todo = state.items.find(item => item.id === action.payload.id);
//       if (todo) {
//         todo.completed = action.payload.completed;
//       }
//     },
//     deleteTodoRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     deleteTodoSuccess: (state, action) => {
//       state.loading = false;
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//     updateTodoRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     updateTodoSuccess: (state, action) => {
//       const { id, todo } = action.payload;
//       const text = state.items.find((t) => t.id === id);
//       if (text) {
//         todo.todo = text;
//       }
//     },
    
//     clearCompletedTodosRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     clearCompletedTodosSuccess: (state) => {
//       state.loading = false;
//       state.items = state.items.filter(item => !item.completed);
//     },
//     todoOperationFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   fetchTodosRequest,
//   fetchTodosSuccess,
//   addTodoRequest,
//   addTodoSuccess,
//   toggleTodoRequest,
//   toggleTodoSuccess,
//   deleteTodoRequest,
//   deleteTodoSuccess,
//   updateTodoRequest,
//   updateTodoSuccess,
//   clearCompletedTodosRequest,
//   clearCompletedTodosSuccess,
//   todoOperationFailed,
// } = todosSlice.actions;

// export default todosSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
//   loading: false,
//   error: null,
//   // Можливо, вам потрібні ці стани завантаження для кожного завдання,
//   // але вони не були присутні в редюсері в останньому запиті, тому я їх залишив як є,
//   // але зауважте, що вони не оновлюються в цьому редюсері.
//   // currentTodoIdLoading: null,
//   // addLoading: false,
// };

// const todosSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     fetchTodosRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchTodosSuccess: (state, action) => {
//       state.loading = false;
//       // dummyjson.com повертає об'єкти з полем 'todo' для тексту завдання.
//       // Ми перетворюємо його на 'text' для послідовного використання у нашому додатку.
//       state.items = action.payload.map(item => ({
//         id: Number(item.id),
//         text: item.todo, // Перетворюємо 'todo' з API на 'text' для внутрішнього стану
//         completed: item.completed,
//         userId: item.userId, // Зберігаємо userId, якщо він потрібен
//       }));
//     },
//     addTodoRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       // state.addLoading = true; // Якщо ви хочете використовувати окремий стан завантаження для додавання
//     },
//     addTodoSuccess: (state, action) => {
//         state.loading = false;
//         state.items.push({
//         id: action.payload.id,
//         text: action.payload.todo, // Це правильно, якщо Saga надсилає 'todo'
//         completed: action.payload.completed,
//         userId: action.payload.userId,
//         isLocal: action.payload.isLocal,
//       });
//     },
//     toggleTodoRequest: (state) => {
//       // При оптимістичному оновленні, ви можете перемкнути стан тут
//       // і потім обробляти помилки в Saga, якщо API-запит не пройшов.
//       state.loading = true; // Або інший індикатор завантаження для конкретного завдання
//       state.error = null;
//     },
//     toggleTodoSuccess: (state, action) => {
//       state.loading = false; // Або інший індикатор завантаження для конкретного завдання
//       const todo = state.items.find(item => item.id === action.payload.id);
//       if (todo) {
//         todo.completed = action.payload.completed;
//       }
//     },
//     deleteTodoRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     deleteTodoSuccess: (state, action) => {
//       state.loading = false;
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//     updateTodoRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     updateTodoSuccess: (state, action) => {
//       state.loading = false; // Скидаємо стан завантаження
//       // action.payload від Saga буде містити { id, text }
//       const { id, text } = action.payload;
//       const todoToUpdate = state.items.find((t) => t.id === id);
//       if (todoToUpdate) {
//         todoToUpdate.text = text; // Оновлюємо поле 'text'
//       }
//     },

//     clearCompletedTodosRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     clearCompletedTodosSuccess: (state) => {
//       state.loading = false;
//       state.items = state.items.filter(item => !item.completed);
//     },
//     todoOperationFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   fetchTodosRequest,
//   fetchTodosSuccess,
//   addTodoRequest,
//   addTodoSuccess,
//   toggleTodoRequest,
//   toggleTodoSuccess,
//   deleteTodoRequest,
//   deleteTodoSuccess,
//   updateTodoRequest,
//   updateTodoSuccess,
//   clearCompletedTodosRequest,
//   clearCompletedTodosSuccess,
//   todoOperationFailed,
// } = todosSlice.actions;

// export default todosSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  // Ці стани можуть бути використані для більш детального контролю завантаження
  // наприклад, коли завантажується конкретний елемент
  currentTodoIdLoading: null,
  addLoading: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      // dummyjson.com повертає об'єкти з полем 'todo' для тексту завдання.
      // Ми перетворюємо його на 'text' для послідовного використання у нашому додатку.
      state.items = action.payload.map(item => ({
        id: Number(item.id),
        text: item.todo, // Перетворюємо 'todo' з API на 'text' для внутрішнього стану
        completed: item.completed,
        userId: item.userId, // Зберігаємо userId, якщо він потрібен
      }));
    },
    addTodoRequest: (state) => {
      state.addLoading = true; // Встановлюємо індикатор завантаження для додавання
      state.error = null;
    },
    addTodoSuccess: (state, action) => {
      state.addLoading = false; // Скидаємо індикатор завантаження
      // action.payload буде містити { id, todo, completed, userId, isLocal } з Saga.
      // Ми перетворюємо 'todo' на 'text' для збереження у стані.
      state.items.push({
        id: action.payload.id,
        text: action.payload.todo, // Використовуємо 'todo' з action.payload
        completed: action.payload.completed,
        userId: action.payload.userId,
        isLocal: action.payload.isLocal,
      });
    },
    toggleTodoRequest: (state, action) => {
      state.currentTodoIdLoading = action.payload.id; // Встановлюємо ID завдання, що завантажується
      state.error = null;
    },
    toggleTodoSuccess: (state, action) => {
      state.currentTodoIdLoading = null; // Скидаємо індикатор завантаження
      const todo = state.items.find(item => item.id === action.payload.id);
      if (todo) {
        todo.completed = action.payload.completed;
      }
    },
    deleteTodoRequest: (state, action) => {
      state.currentTodoIdLoading = action.payload; // Встановлюємо ID завдання, що видаляється
      state.error = null;
    },
    deleteTodoSuccess: (state, action) => {
      state.currentTodoIdLoading = null; // Скидаємо індикатор завантаження
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateTodoRequest: (state, action) => {
      state.currentTodoIdLoading = action.payload.id; // Встановлюємо ID завдання, що оновлюється
      state.error = null;
    },
    updateTodoSuccess: (state, action) => {
      state.currentTodoIdLoading = null; // Скидаємо індикатор завантаження
      // action.payload від Saga буде містити { id, text }
      const { id, text } = action.payload;
      const todoToUpdate = state.items.find((t) => t.id === id);
      if (todoToUpdate) {
        todoToUpdate.text = text; // Оновлюємо поле 'text'
      }
    },

    clearCompletedTodosRequest: (state) => {
      state.loading = true; // Або окремий індикатор для цієї дії
      state.error = null;
    },
    clearCompletedTodosSuccess: (state) => {
      state.loading = false; // Або окремий індикатор
      state.items = state.items.filter(item => !item.completed);
    },
    todoOperationFailed: (state, action) => {
      state.loading = false; // Скидаємо основний індикатор завантаження
      state.addLoading = false; // Скидаємо індикатор завантаження додавання
      state.currentTodoIdLoading = null; // Скидаємо індикатор завантаження конкретного завдання
      state.error = action.payload;
    },
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  addTodoRequest,
  addTodoSuccess,
  toggleTodoRequest,
  toggleTodoSuccess,
  deleteTodoRequest,
  deleteTodoSuccess,
  updateTodoRequest,
  updateTodoSuccess,
  clearCompletedTodosRequest,
  clearCompletedTodosSuccess,
  todoOperationFailed,
} = todosSlice.actions;

export default todosSlice.reducer;