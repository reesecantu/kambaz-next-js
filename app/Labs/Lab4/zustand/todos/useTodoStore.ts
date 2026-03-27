import { create } from "zustand";

interface Todo {
  id: string;
  title: string;
}

interface TodoState {
  todos: Todo[];
  todo: Todo;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
  setTodo: (todo: Todo) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "", title: "Learn Mongo" },

  addTodo: () =>
    set((state) => {
      if (!state.todo.title.trim()) return state;
      return {
        todos: [
          ...state.todos,
          { ...state.todo, id: new Date().getTime().toString() },
        ],
        todo: { id: "", title: "" },
      };
    }),

  updateTodo: () =>
    set((state) => {
      if (!state.todo.id) return state;
      return {
        todos: state.todos.map((item) =>
          item.id === state.todo.id ? state.todo : item,
        ),
        todo: { id: "", title: "" },
      };
    }),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((item) => item.id !== id),
      todo: state.todo.id === id ? { id: "", title: "" } : state.todo,
    })),

  setTodo: (todo) => set({ todo }),
}));
