"use client";
import {
  createContext,
  createElement,
  useContext,
  useState,
  ReactNode,
} from "react";

interface Todo {
  id: string;
  title: string;
}

interface TodoContextState {
  todos: Todo[];
  todo: Todo;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
  setTodo: (todo: Todo) => void;
}

const TodoContext = createContext<TodoContextState | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState<Todo>({ id: "", title: "Learn Mongo" });

  const addTodo = () => {
    if (!todo.title.trim()) return;
    const newTodo = { ...todo, id: new Date().getTime().toString() };
    setTodos([...todos, newTodo]);
    setTodo({ id: "", title: "" });
  };

  const updateTodo = () => {
    if (!todo.id) return;
    const nextTodos = todos.map((item) => (item.id === todo.id ? todo : item));
    setTodos(nextTodos);
    setTodo({ id: "", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
    if (todo.id === id) {
      setTodo({ id: "", title: "" });
    }
  };

  const value: TodoContextState = {
    todos,
    todo,
    addTodo,
    updateTodo,
    deleteTodo,
    setTodo,
  };

  return createElement(TodoContext.Provider, { value }, children);
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  return context;
};
