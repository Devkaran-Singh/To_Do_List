import { useState, useEffect } from "react";
import { ToDoProvider } from "./contexts/ToDoContext";
import { ToDoForm } from "./components/index";
import { ToDoItem } from "./components/index";
import "./scrollbar.css";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? todo : t)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <ToDoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}
    >
      <div className="flex flex-col items-center h-[500px] w-[500px] shadow-2xl overflow-y-auto custom-scrollbar">
        <h1 className="text-4xl font-bold text-gray-800 m-5">To Do List</h1>
        <ToDoForm />
        {todos.map((t) => (
          <div key={t.id}>
            <ToDoItem todo={t} />
          </div>
        ))}
      </div>
    </ToDoProvider>
  );
}

export default App;
