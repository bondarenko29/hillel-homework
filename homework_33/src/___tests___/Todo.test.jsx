import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { afterAll, beforeAll, beforeEach, expect, test, vi } from 'vitest';
import Todo from '../pages/Todo';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watchTodos } from '../store/todo/todoSaga'; 
import todosReducer from '../store/todo/todosSlice'; 


vi.mock('uuid', () => ({
  v4: vi.fn().mockReturnValue('test-local-id-4'),
}));

const API_URL = 'https://dummyjson.com/todos';


let sagaMiddleware = createSagaMiddleware();
let store; 

const initialState = {
  todos: {
    items: [],
    loading: false,
    error: null,
    currentTodoIdLoading: null,
    addLoading: false,
  },
};

beforeAll(() => {
  global.fetch = vi.fn((url, options) => {
    if (options?.method === 'POST' && url.includes(`${API_URL}/add`)) {
      const body = JSON.parse(options.body);
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          id: 201, 
          todo: body.todo, 
          completed: body.completed,
          userId: body.userId,
        }),
      });
    }

    if (options?.method === 'DELETE' && url.includes(API_URL)) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: Number(url.split('/').pop()), isDeleted: true }) });
    }
    if ((options?.method === 'PUT' || options?.method === 'PATCH') && url.includes(API_URL)) {
      const id = Number(url.split('/').pop());
      const body = JSON.parse(options.body);
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          id: id,
          todo: body.todo || 'Updated text from API', 
          completed: body.completed !== undefined ? body.completed : false, 
          userId: 1,
        }),
      });
    }
    if (url.includes(`${API_URL}?limit=30`)) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            todos: [
              {
                id: 1,
                todo: 'Sample Todo from API', 
                completed: false,
                userId: 1,
              },
            ],
          }),
      });
    }


    console.warn(`Unhandled fetch request for: ${url}`, options);
    return Promise.reject(new Error(`Unhandled fetch request for: ${url}`));
  });
});

afterAll(() => {
 
  vi.restoreAllMocks();
});

beforeEach(() => {
  
  localStorage.clear();
 
  vi.clearAllMocks();

  sagaMiddleware = createSagaMiddleware(); 
  store = configureStore({
    reducer: {
      todos: todosReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    preloadedState: initialState, 
  });
  sagaMiddleware.run(watchTodos); 
});


test('Todo рендерить заголовок, завантажує та додає завдання', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/todo']}>
        <Routes>
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const heading = screen.getByRole('heading', { name: "TODO LIST" });
  expect(heading).toBeInTheDocument();
  const sampleTodo = await screen.findByText(/Sample Todo from API/i, {}, { timeout: 3000 });
  expect(sampleTodo).toBeInTheDocument();

  const input = screen.getByLabelText(/New task.../i);
  fireEvent.change(input, { target: { value: 'Buy milk' } });

  const addButton = screen.getByRole('button', { name: /add/i });
  fireEvent.click(addButton);

  const addedTodo = await screen.findByText(/buy milk/i);
  expect(addedTodo).toBeInTheDocument();

  const listItem = addedTodo.closest('li');
  const checkbox = within(listItem).getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});



test('Перемикання завдання позначає/знімає позначку completed', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/todo']}>
        <Routes>
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const sampleTodoCheckbox = await screen.findByRole('checkbox', { name: /Sample Todo from API/i });
  expect(sampleTodoCheckbox).not.toBeChecked();

  fireEvent.click(sampleTodoCheckbox);
  await waitFor(() => {
    expect(sampleTodoCheckbox).toBeChecked();
  });

  fireEvent.click(sampleTodoCheckbox);
  await waitFor(() => {
    expect(sampleTodoCheckbox).not.toBeChecked();
  });
});

test('Редагування завдання зберігає зміни', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/todo']}>
        <Routes>
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const sampleTodoText = await screen.findByText(/Sample Todo from API/i);
  const listItem = sampleTodoText.closest('li');

  const editButton = within(listItem).getByRole('button', { name: /edit/i });
  fireEvent.click(editButton);

  const editInput = within(listItem).getByDisplayValue(/Sample Todo from API/i);
  fireEvent.change(editInput, { target: { value: 'Updated Sample Todo Text' } });
  fireEvent.keyUp(editInput, { key: 'Enter', code: 'Enter' }); 

  await waitFor(() => {
    expect(screen.getByText(/Updated Sample Todo Text/i)).toBeInTheDocument();
  });

  expect(screen.queryByText(/Sample Todo from API/i)).not.toBeInTheDocument();
});

test('Видалення завдання прибирає його зі списку', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/todo']}>
        <Routes>
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const sampleTodoText = await screen.findByText(/Sample Todo from API/i);
  const listItem = sampleTodoText.closest('li');

  const deleteButton = within(listItem).getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText(/Sample Todo from API/i)).not.toBeInTheDocument();
  });

  expect(screen.getByText(/No tasks yet 💤/i)).toBeInTheDocument();
});

test('Поле введення завдання очищається після додавання', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/todo']}>
        <Routes>
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  await screen.findByText(/Sample Todo from API/i);

  const input = screen.getByLabelText(/New task.../i);
  fireEvent.change(input, { target: { value: 'Task to clear' } });

  const addButton = screen.getByRole('button', { name: /add/i });
  fireEvent.click(addButton);

  await screen.findByText(/Task to clear/i);

  expect(input.value).toBe('');
});

test('Кнопка "Add" вимкнена, якщо поле введення порожнє', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/todo']}>
        <Routes>
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  await screen.findByText(/Sample Todo from API/i);

  const input = screen.getByLabelText(/New task.../i);
  const addButton = screen.getByRole('button', { name: /add/i });

  expect(input.value).toBe('');
  expect(addButton).toBeDisabled(); 

  fireEvent.change(input, { target: { value: 'Some text' } });
  expect(addButton).not.toBeDisabled(); 

  fireEvent.change(input, { target: { value: '' } });
  expect(addButton).toBeDisabled(); 
});



