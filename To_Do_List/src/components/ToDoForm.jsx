import React, { useState } from "react";
import { useTodo } from "../contexts/index";

function ToDoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ task: todo, completed: false });
    setTodo("");
  };
  return (
    <form onSubmit={add} className="">
      <input
        className="bg-white outline-0 border-0 px-2 py-1 text-gray-800 m-5 rounded-2xl text-md"
        type="text"
        placeholder="Write here..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="m-3 bg-amber-700 text-white px-5 py-1 rounded-2xl hover:bg-amber-600 cursor-pointer active:opacity-60"
      >
        Add
      </button>
    </form>
  );
}

export default ToDoForm;
