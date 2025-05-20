import { configureStore } from '@reduxjs/toolkit';
import todosReducer, {
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
} from './todosSlice';
import { expect, test, describe, beforeEach } from 'vitest';

describe('todosSlice reducers', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      items: [],
      loading: false,
      error: null,
      currentTodoIdLoading: null,
      addLoading: false,
    };
 
    store = configureStore({
      reducer: {
        todos: todosReducer,
      },
      preloadedState: {
        todos: initialState,
      },
    });
  });

  test('should return the initial state', () => {
    expect(todosReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  test('fetchTodosRequest should set loading to true and clear error', () => {
    store.dispatch(fetchTodosRequest());
    const state = store.getState().todos;
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchTodosSuccess should set loading to false and populate items with "text" field', () => {
    const fetchedItems = [
      { id: 1, todo: 'Learn Redux', completed: false, userId: 1 },
      { id: 2, todo: 'Build a Todo App', completed: true, userId: 1 },
    ];
    store.dispatch(fetchTodosSuccess(fetchedItems));
    const state = store.getState().todos;
    expect(state.loading).toBe(false);
    expect(state.items).toEqual([
      { id: 1, text: 'Learn Redux', completed: false, userId: 1 },
      { id: 2, text: 'Build a Todo App', completed: true, userId: 1 },
    ]);
  });

  test('addTodoRequest should set addLoading to true and clear error', () => {
    store.dispatch(addTodoRequest('New Task'));
    const state = store.getState().todos;
    expect(state.addLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('addTodoSuccess should add a todo with "text" field and set addLoading to false', () => {
   
    const newTodoPayload = {
      id: 'local-id-123',
      todo: 'Buy groceries', 
      completed: false,
      userId: 1,
      isLocal: true,
    };
   
    const expectedTodoInState = {
      id: 'local-id-123',
      text: 'Buy groceries', 
      completed: false,
      userId: 1,
      isLocal: true,
    };

    store.dispatch(addTodoSuccess(newTodoPayload));
    const state = store.getState().todos;
    expect(state.addLoading).toBe(false);
    expect(state.items).toEqual([expectedTodoInState]);
  });

  test('toggleTodoRequest should set currentTodoIdLoading and clear error', () => {
    const todoId = 1;
    store.dispatch(toggleTodoRequest({ id: todoId, completed: false }));
    const state = store.getState().todos;
    expect(state.currentTodoIdLoading).toBe(todoId);
    expect(state.error).toBeNull();
  });

  test('toggleTodoSuccess should toggle completed status and clear currentTodoIdLoading', () => {
    store.dispatch(fetchTodosSuccess([{ id: 1, todo: 'Task to toggle', completed: false, userId: 1 }]));
    store.dispatch(toggleTodoSuccess({ id: 1, completed: true }));
    const state = store.getState().todos;
    expect(state.currentTodoIdLoading).toBeNull();
    expect(state.items[0].completed).toBe(true);

    store.dispatch(toggleTodoSuccess({ id: 1, completed: false }));
    const updatedState = store.getState().todos;
    expect(updatedState.items[0].completed).toBe(false);
  });

  test('deleteTodoRequest should set currentTodoIdLoading and clear error', () => {
    const todoId = 1;
    store.dispatch(deleteTodoRequest(todoId));
    const state = store.getState().todos;
    expect(state.currentTodoIdLoading).toBe(todoId);
    expect(state.error).toBeNull();
  });

  test('deleteTodoSuccess should remove a todo and clear currentTodoIdLoading', () => {
    store.dispatch(fetchTodosSuccess([{ id: 1, todo: 'Task to delete', completed: false, userId: 1 }]));
    store.dispatch(deleteTodoSuccess(1));
    const state = store.getState().todos;
    expect(state.currentTodoIdLoading).toBeNull();
    expect(state.items).toEqual([]);
  });

  test('updateTodoRequest should set currentTodoIdLoading and clear error', () => {
    const todoId = 1;
    store.dispatch(updateTodoRequest({ id: todoId, text: 'Updated task' }));
    const state = store.getState().todos;
    expect(state.currentTodoIdLoading).toBe(todoId);
    expect(state.error).toBeNull();
  });

  test('updateTodoSuccess should update a todo\'s text and clear currentTodoIdLoading', () => {
    store.dispatch(fetchTodosSuccess([{ id: 1, todo: 'Old Task', completed: false, userId: 1 }]));
    store.dispatch(updateTodoSuccess({ id: 1, text: 'New Task Text' }));
    const state = store.getState().todos;
    expect(state.currentTodoIdLoading).toBeNull();
    expect(state.items[0].text).toBe('New Task Text');
  });

  test('clearCompletedTodosRequest should set loading to true and clear error', () => {
    store.dispatch(clearCompletedTodosRequest());
    const state = store.getState().todos;
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('clearCompletedTodosSuccess should remove all completed todos and set loading to false', () => {
    store.dispatch(fetchTodosSuccess([
      { id: 1, todo: 'Task 1', completed: true, userId: 1 },
      { id: 2, todo: 'Task 2', completed: false, userId: 1 },
      { id: 3, todo: 'Task 3', completed: true, userId: 1 },
    ]));
    store.dispatch(clearCompletedTodosSuccess());
    const state = store.getState().todos;
    expect(state.loading).toBe(false);
    expect(state.items).toEqual([
      { id: 2, text: 'Task 2', completed: false, userId: 1 },
    ]);
  });

  test('todoOperationFailed should set error and clear all loading states', () => {
    store.dispatch(fetchTodosRequest()); 
    store.dispatch(addTodoRequest('fail test')); 
    store.dispatch(toggleTodoRequest({ id: 1, completed: false })); 
    store.dispatch(todoOperationFailed('Something went wrong'));
    const state = store.getState().todos;
    expect(state.loading).toBe(false);
    expect(state.addLoading).toBe(false);
    expect(state.currentTodoIdLoading).toBeNull();
    expect(state.error).toBe('Something went wrong');
  });
});