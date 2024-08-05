// import React, { useEffect, useState } from "react";
// import Todo from "./components/Todo";

// const App = () => {
//   const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [id, setid] = useState(1);

//   useEffect(() => {
//     let todostring = localStorage.getItem("todos");
//     if (todostring) {
//       let todos = JSON.parse(localStorage.getItem("todos"));
//       setTodos(todos);
//     }
//   }, []);

//   const handleCheck = (id) => {
//     const updatedTodos = todos.map((item) =>
//       item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
//     );
//     console.log(updatedTodos);
//     setTodos(updatedTodos);
//   };

//   const handleChange = (e) => {
//     setTodo(e.target.value);
//   };

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   const AddTodo = () => {
//     if (todo !== "") {
//       setTodos([...todos, { todo, isCompleted: false, id }]);
//       setTodo("");
//       setid(id + 1);
//     }
//   };

//   const handleDelete = (id) => {
//     setTodos(todos.filter((item) => item.id !== id));
//   };

//   return (
//     <>
//       <h1 className="text-3xl  font-medium text-center">Just do it</h1>
//       <div className="flex my-8 justify-center relative">
//         <input
//           onChange={handleChange}
//           value={todo}
//           type="text"
//           placeholder="Type here"
//           className="input input-bordered w-3/4"
//         />
//         <button onClick={AddTodo} className="absolute top-1 right-52">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="40px"
//             viewBox="0 -960 960 960"
//             width="40px"
//             fill="#e8eaed"
//           >
//             <path d="M454-298h52v-156h156v-52H506v-156h-52v156H298v52h156v156Zm26.34 182q-75.11 0-141.48-28.42-66.37-28.42-116.18-78.21-49.81-49.79-78.25-116.09Q116-405.01 116-480.39q0-75.38 28.42-141.25t78.21-115.68q49.79-49.81 116.09-78.25Q405.01-844 480.39-844q75.38 0 141.25 28.42t115.68 78.21q49.81 49.79 78.25 115.85Q844-555.45 844-480.34q0 75.11-28.42 141.48-28.42 66.37-78.21 116.18-49.79 49.81-115.85 78.25Q555.45-116 480.34-116Zm-.34-52q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
//           </svg>
//         </button>
//       </div>

//       <div className="min-h-full">
//         {todos.map((item) => (
//           <div key={item.id} className="flex justify-center w-full my-3">
//             <div className="flex justify-around p-1 items-center border rounded-lg w-1/2">
//               <div className="flex gap-2">
//                 <input
//                   type="checkbox"
//                   onChange={() => {
//                     handleCheck(item.id);
//                   }}
//                   checked={item.isCompleted}
//                 />
//                 <p className={item.isCompleted ? "line-through" : ""}>{item.todo}</p>
//               </div>
//               <div className="flex gap-2 justify-evenly items-center">
//                 <button onClick={() => handleDelete(item.id)}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     height="40px"
//                     viewBox="0 -960 960 960"
//                     width="40px"
//                     fill="#e8eaed"
//                   >
//                     <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default App;

import React, { useEffect, useState, useRef } from "react";
import Todo from "./components/Todo";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(1);
  const [checked, setChecked] = useState(false);

  // Reference to store the latest todos state for debouncing
  const todosRef = useRef(todos);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(todostring);
      setTodos(todos);
      // Set initial ID based on the max ID in the stored todos
      if (todos.length > 0) {
        setId(Math.max(...todos.map((todo) => todo.id)) + 1);
      }
    }
  }, []);

  useEffect(() => {
    todosRef.current = todos;
    const saveToLocal = () => {
      localStorage.setItem("todos", JSON.stringify(todosRef.current));
    };

    // Debounce the save operation by using a timeout
    const handle = setTimeout(saveToLocal, 500);
    return () => clearTimeout(handle);
  }, [todos]);

  //here the problem is while we are filtering the completed todos the todo array is get the filled with only task which is completed in the storage
  const handleCheckd = () => {
    console.log(checked);
    setChecked((prevChecked) => !prevChecked);
    console.log(checked);
  };

  const handleCheck = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const AddTodo = () => {
    if (todo !== "") {
      setTodos((prevTodos) => [...prevTodos, { todo, isCompleted: false, id }]);
      setTodo("");
      setId((prevId) => prevId + 1);
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <>
      <h1 className="text-3xl font-medium text-center">Just do it</h1>
      <div className="flex my-8 justify-center relative">
        <input
          onChange={handleChange}
          value={todo}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-3/4"
        />
        <button onClick={AddTodo} className="absolute top-1 right-52">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#e8eaed"
          >
            <path d="M454-298h52v-156h156v-52H506v-156h-52v156H298v52h156v156Zm26.34 182q-75.11 0-141.48-28.42-66.37-28.42-116.18-78.21-49.81-49.79-78.25-116.09Q116-405.01 116-480.39q0-75.38 28.42-141.25t78.21-115.68q49.79-49.81 116.09-78.25Q405.01-844 480.39-844q75.38 0 141.25 28.42t115.68 78.21q49.81 49.79 78.25 115.85Q844-555.45 844-480.34q0 75.11-28.42 141.48-28.42 66.37-78.21 116.18-49.79 49.81-115.85 78.25Q555.45-116 480.34-116Zm-.34-52q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
          </svg>
        </button>
      </div>
      <div className="flex ml-48 items-center gap-1 justify-start">
        <input type="checkbox" onChange={handleCheckd} checked={checked} />
        <label htmlFor="">completed</label>
      </div>
      <div className="min-h-full">
        {console.log(checked)}
        {todos
          .filter((item) => !checked || item.isCompleted)
          .map((item) => (
            <Todo
              key={item.id}
              item={item}
              handleDelete={handleDelete}
              handleCheck={handleCheck}
            />
          ))}
      </div>
    </>
  );
};

export default App;
