import React from "react";
import { getTodos } from "./useFetch";

const TaskList = ({ todos, status, setTodos }) => {
  const [description, setDescription] = React.useState("");
  const [coso, setCoso] = React.useState("");

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
        method: "DELETE",
      });
      getTodos(setTodos);
    } catch (err) {
      console.error(err.message);
    }
  };

  const TaskDone = async (id) => {
    try {
      const initialStatus = todos.filter((todo) => todo.todo_id === id);

      const body = initialStatus[0].status ? false : true;
      const obj = { status: body };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
      getTodos(setTodos);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTask = async () => {
    try {
      const body = { description };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${coso}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      getTodos(setTodos);
      setCoso("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    todos
      // .filter((todo) => !todo.status)
      .map((todo) => (
        <React.Fragment key={todo.todo_id}>
          <div className="task-container">
            <div
              className="material-symbols-outlined check"
              onClick={() => TaskDone(todo.todo_id)}
            >
              {!todo.status ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-app"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-check2-all"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                  <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                </svg>
              )}
            </div>
            <div className={!todo.status ? "task--ongoing" : "task--completed"}>
              {todo.description}
            </div>
            <div
              className="material-symbols-outlined edit"
              onClick={() => {
                document.getElementById("modal--edit").showModal();
                setCoso(todo.todo_id);
              }}
              onMouseEnter={() => setDescription(todo.description)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </div>
            <div
              className="material-symbols-outlined delete"
              onClick={() => deleteTodo(todo.todo_id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </div>
          </div>
          {/* modat start */}

          <dialog
            className="modal"
            id="modal--edit"
          >
            <h2>Edit Task</h2>
            <input
              name={todo.todo_id}
              className="modal--input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div
              className="modal--save"
              onClick={() => {
                updateTask(todo.todo_id);
                document.getElementById("modal--edit").close();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-clipboard-check-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
              </svg>
            </div>
            <div
              className="modal--close"
              onClick={() => document.getElementById("modal--edit").close()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-x-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
              </svg>
            </div>
          </dialog>

          {/* modal ends */}
        </React.Fragment>
      ))
  );
};

export default TaskList;
