import React from "react";
import { getTodos } from "./useFetch";
import ModalAdd from "./ModalAdd";
import TaskList from "./TaskList";



const Main = () => {
  const [todos, setTodos] = React.useState([]);
  const [status] = React.useState(false);
  const [description, setDescription] = React.useState("");


  const addTask = async () => {
    try {
      const body = { description, status };
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      getTodos(setTodos);
    } catch (err) {
      console.error(err.message);
    }
  };

  React.useEffect(() => {
    getTodos(setTodos);
  }, []);

  return (
    <main className="main">
      <div className="main--container" key="maincont">
        <div className="main--task">
          <div className="main--add">
            <h1>Tasks</h1>
            <div
              className="material-symbols-outlined main--btn"
              onClick={() => document.getElementById("modal--add").showModal()}
              onMouseEnter={() => setDescription("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />
              </svg>
            </div>
          </div>

          {!todos.length && <div className="all-done">All Done! ... or is it?</div>}
          <TaskList
            todos={todos}
            status={"task--ongoing"}
            setTodos={setTodos}
          />
        </div>
      </div>

      <ModalAdd
        key="modaladd"
        func={addTask}
        description={description}
        setDescription={setDescription}
      />
    </main>
  );
};

export default Main;
