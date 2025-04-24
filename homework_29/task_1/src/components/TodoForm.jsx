import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/features/todoSlice";


const TodoForm = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        className="flex-grow px-4 py-2 border border-solid  rounded focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="New task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Add
      </button>
      
    </div>
  );
};

export default TodoForm;
