import React from 'react';
import { useSelector } from 'react-redux';

const TodoList = () => {
  const todos = useSelector((state) => state.todos.items);

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="bg-gray-100 dark:bg-gray-700 p-2 rounded border border-solid "
        >
          <span className="text-gray-800 dark:text-white">{todo.text}</span>
        </li>
      ))}
      {todos.length === 0 && (
        <p className="text-center text-gray-500">No tasks yet 💤</p>
      )}
    </ul>
  );
};

export default TodoList;