import React, { useState, useRef, useEffect } from "react";

const ToDoList = () => {
  const apiUrl = "https://playground.4geeks.com/todo/users/cesarch";

  const [tasks, setTasks] = useState([]);

  const inputRef = useRef(null);

  const onLoad = () => {
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((datos) => {
        setTasks(datos.todos);
      });
  };
  useEffect(() => {
    onLoad();
  }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const valor = inputRef.current.value.trim();

      fetch(`https://playground.4geeks.com/todo/todos/cesarch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: valor,
          is_done: false,
        }),
      })
        .then((response) => {
          if (response.ok) {
            onLoad();
            inputRef.current.value = "";
          } else {
            console.error("Error al guardar tarea");
          }
        })
        .catch((error) => console.error("Error al guardar tarea", error));
    }
  };

  const handleDelete = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTasks(tasks.filter((task) => task.id !== id));
        } else {
          console.error("Error al eliminar en API");
        }
      })
      .catch((error) => console.error("Error al eliminar", error));
  };

  return (
    <div
      className="d-flex,container justify-content-center flex-column align-items-center vh-100"
      style={{ backgroundColor: "#ffe8e3" }}
    >
      <h1
        className="d-flex justify-content-center "
        style={{ color: "white", fontWeight: "bold" }}
      >
        To Do list
      </h1>
      <div className="w-50 mx-auto">
        <input
          className="form-control w-100 ps-4"
          type="text"
          placeholder="What Needs To Be Done?"
          ref={inputRef}
          onKeyDown={handleEnter}
        />
        <ul className="list-group">
          {" "}
          {tasks.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center ps-4"
            >
              {item.label}
              <button
                className="btn btn-sm"
                onClick={() => handleDelete(item.id)}
              >
                ❌
              </button>
            </li>
          ))}
          <li
            className="list-group-item d-flex justify-content-between align-items-center text-secondary p-0 "
            style={{ fontSize: "11px" }}
          >
            {tasks.length} items left
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
