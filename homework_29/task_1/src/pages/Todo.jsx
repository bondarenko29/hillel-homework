import React from 'react';
import { useTheme } from '../context/ThemeContext'; 
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoFooter from '../components/TodoFooter';

const Todo = () => {

const { theme } = useTheme(); 

   
const bgColorClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
const textColorClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

  return (
    <div className={`p-6 max-w-xl mx-auto ${bgColorClass} ${textColorClass}`}>
      <h1 className='text-center text-2xl font-bold mb-4'>TODO</h1>
      <TodoForm />
      <h2 className="text-lg font-semibold mb-2">TODOS</h2>
      <TodoList />
      <TodoFooter />
    </div>
    
  );
};

export default Todo;