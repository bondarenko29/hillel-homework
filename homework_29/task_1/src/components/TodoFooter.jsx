import React from 'react';
import { useSelector } from 'react-redux';

const TodoFooter = () => {
  const todoCount = useSelector((state) => state.todos.items.length);

  return (
    <div className="mt-4 text-gray-600 dark:text-gray-400">
      Total: {todoCount}
    </div>
  );
};

export default TodoFooter;