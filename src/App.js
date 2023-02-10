import { useEffect, useState } from "react";
import dateFormat, { masks } from "dateformat";

function App() {
  const [todo, setTodo] = useState(undefined);

  const saveTodo = (e) => {
    e.preventDefault();
    const content = e.target.querySelector("#do").value;

    setTodo((context) => [
      ...context,
      { createAt: new Date(), value: content, clear: false },
    ]);

    localStorage.setItem("to-do", JSON.stringify(todo));
  };

  useEffect(() => {
    const todoStore = localStorage.getItem("to-do");
    if (todoStore !== null) setTodo(JSON.parse(todoStore));
  }, []);

  return (
    <>
      <h1>To Do List</h1>
      <div>
        <form onSubmit={saveTodo}>
          <input type="text" id="do" placeholder="Enter your List" />
          <input type="submit" value="submit" />
        </form>
      </div>
      {todo && todo.map((list, index) => <MyList prop={list} key={index} />)}
      {/* {todo && todo[0]} */}
    </>
  );
}

export default App;

const MyList = ({ prop }) => {
  return (
    <div>
      {dateFormat(prop.createAt, "yy년 mm월 dd일 ")}
      {prop.value}
    </div>
  );
};
