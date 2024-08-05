import React from "react";

const Todo = ({ item, handleDelete, handleCheck }) => {
  return (
    <div className="flex justify-center w-full my-3">
      <div className="flex justify-around p-1 items-center border rounded-lg w-1/2">
        <div className="flex gap-2">
          <input
            type="checkbox"
            onChange={() => handleCheck(item.id)}
            checked={item.isCompleted}
          />
          <p className={item.isCompleted ? "line-through" : ""}>{item.todo}</p>
        </div>
        <div className="flex gap-2 justify-evenly items-center">
          <button onClick={() => handleDelete(item.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#e8eaed"
            >
              <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
