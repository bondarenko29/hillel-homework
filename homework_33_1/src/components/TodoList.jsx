import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const todoSchema = z.object({
  task: z.string().min(5, "Task must be at least 5 characters"),
});

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedTodo, setSelectedTodo] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onSubmit = (data) => {
    setTodos([...todos, { id: Date.now(), text: data.task }]);
    reset(); 
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const openModal = (todo) => setSelectedTodo(todo);
  const closeModal = () => setSelectedTodo(null);

  return (
    <div>
       <div className="max-w-md mx-auto mt-10 p-6 bg-gray-700 rounded-2xl shadow-lg">
        <h1 className="text-center text-2xl font-bold mb-4 text-white">ToDo List</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="New task..."
            {...register("task", { required: 'This field is required'})}
            className={`flex-grow px-4 py-2 border rounded focus:outline-none ${
              errors.task ? "border-red-500" : "focus:ring focus:ring-blue-300"
            }`}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        {errors.task && (
          <p className="text-red-500 text-sm mb-4">{errors.task.message}</p>
        )}

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded"
            >
              <span className="text-gray-800 dark:text-white">{todo.text}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => openModal(todo)}
                >
                  View
                </button>
                <button
                  type="delete"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteTodo(todo.id)}
                  data-testid={`delete-todo-${todo.id}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {todos.length === 0 && (
            <p className="text-center text-gray-500">No tasks yet</p>
          )}
        </ul>

        
        {selectedTodo && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-4 py-2 border-b dark:border-gray-600">
                <h5 className="text-lg font-semibold">Task Text</h5>
                <button
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
              <div className="p-4 text-gray-700 dark:text-white">
                <p>{selectedTodo.text}</p>
              </div>
              <div className="flex justify-end px-4 py-2 border-t dark:border-gray-600">
                <button
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
   
  );
};

export default TodoList;

