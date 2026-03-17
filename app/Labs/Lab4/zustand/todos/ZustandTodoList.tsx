"use client";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos, todo, addTodo, updateTodo, deleteTodo, setTodo } =
    useTodoStore((state) => state);

  return (
    <div id="wd-zustand-todo-list" className="m-2">
      <h2>Zustand Todo List</h2>
      <ListGroup>
        <ListGroupItem>
          <div className="d-flex align-items-center">
            <FormControl
              className="mx-2"
              style={{ maxWidth: 280 }}
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <Button
              variant="success"
              className="mx-2"
              id="wd-zustand-add-todo-click"
              onClick={addTodo}
            >
              Add
            </Button>
            <Button
              variant="warning"
              className="mx-2"
              id="wd-zustand-update-todo-click"
              onClick={updateTodo}
            >
              Update
            </Button>
          </div>
        </ListGroupItem>

        {todos.map((item) => (
          <ListGroupItem key={item.id}>
            {item.title}
            <Button
              variant="danger"
              className="mx-2"
              id="wd-zustand-delete-todo-click"
              onClick={() => deleteTodo(item.id)}
            >
              Delete
            </Button>
            <Button
              className="mx-2"
              id="wd-zustand-edit-todo-click"
              onClick={() => setTodo(item)}
            >
              Edit
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
