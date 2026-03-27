"use client";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodos } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos, todo, setTodo, addTodo, updateTodo, deleteTodo } = useTodos()!;

  return (
    <div id="wd-react-context-todo-list">
      <h2>Todo List (React Context)</h2>
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
              id="wd-context-add-todo-click"
              onClick={addTodo}
            >
              Add
            </Button>
            <Button
              variant="warning"
              className="mx-2"
              id="wd-context-update-todo-click"
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
              id="wd-context-delete-todo-click"
              onClick={() => deleteTodo(item.id)}
            >
              Delete
            </Button>
            <Button
              className="mx-2"
              id="wd-context-edit-todo-click"
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
