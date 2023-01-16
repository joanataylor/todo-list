import React, { useState } from "react";
import "./lux.css";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();

    if (newTodo.length === 0) {
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false,
    };

    setTodos([...todos, todoItem]);
    setHasBeenSubmitted(true);
    // clear the value we input
    setNewTodo("");

    if (hasBeenSubmitted) {
      console.log("TODO item added.");
    } else {
      console.log("Please add an item to your TODO list. ");
    }
  };

  const handleTodoDelete = (delIdx) => {
    const filteredTodos = todos.filter((_todo, i) => {
      return i !== delIdx;
    });

    setTodos(filteredTodos);
  };

  const handleToggleComplete = (idx) => {
    const updatedTodos = todos.map((todo, i) => {
      if (idx === i) {
        todo.complete = !todo.complete;
        // avoids the mutation of the todo
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="container mt-3">
      <div className="card shadow">
        <div className="card-body">
          <div style={{ textAlign: "center" }}>
            <h3>
              {hasBeenSubmitted
                ? "Todo item was added."
                : "Please add a TODO item"}
            </h3>
            <form
              className="container mb-3"
              onSubmit={(event) => {
                handleNewTodoSubmit(event);
              }}
            >
              <input
                className="form-control"
                onChange={(event) => {
                  setNewTodo(event.target.value);
                }}
                type="text"
                value={newTodo}
              />
              <div>
                <button type="submit" className="btn btn-warning">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />

      {todos.map((todo, idx) => {
        const todoClasses = ["bold", "italic"];

        if (todo.complete) {
          todoClasses.push("line-through"); //not being applied but this would strikethrough the todo item when complete
        }

        return (
          <div className="container mt-3">
            <div className="card shadow">
              <div className="card-body">
                <div style={{ textAlign: "center" }} key={idx}>
                  <input
                    onChange={(event) => {
                      handleToggleComplete(idx);
                    }}
                    checked={todo.complete}
                    type="checkbox"
                  />
                  <span className={todoClasses.join("")}>
                    {" "}
                    {todo.text} <br></br>
                  </span>
                  <button
                    className="btn btn-danger"
                    onClick={(event) => {
                      handleTodoDelete(idx);
                    }}
                    style={{ marginleft: "10px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
