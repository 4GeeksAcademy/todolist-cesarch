import React, { useState, useRef } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const valor = inputRef.current.value;
      let list = setTasks([...tasks, valor]);
      inputRef.current.value = "";
      console.log(valor);
    }
  };
  const handleDelete = (indexDelete) => {
    setTasks(tasks.filter((item, index) => index !== indexDelete));
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
              {item}
              <button
                className="btn btn-sm"
                onClick={() => handleDelete(index)}
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
