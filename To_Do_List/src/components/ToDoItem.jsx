import React from "react";
import { useState } from "react";
import { useTodo } from "../contexts/index";

function ToDoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.task);
  const { updateTodo, deleteTodo, toggleTodo } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, task: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleComplete = () => {
    toggleTodo(todo.id);
  };

  return (
    <div
      className={`border-0 outline-0 mt-5 mb-3 rounded-2xl ${
        todo.completed ? "bg-gray-400" : "bg-blue-400"
      }`}
    >
      <input
        className="m-3"
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
      />
      <input
        className={`text-xl text-gray-800 border-0 outline-0 ${
          todo.completed ? "line-through" : "no-underline"
        }`}
        type="text"
        value={todoMsg}
        readOnly={!isTodoEditable}
        onChange={(e) => setTodoMsg(e.target.value)}
      />
      <button
        className={`m-2 ${
          todo.completed ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable((prev) => !prev);
          }
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "✅" : "✏️"}
      </button>
      <button
        className="m-2 hover: cursor-pointer"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default ToDoItem;
