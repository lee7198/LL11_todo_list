import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import "./list.css";

function App() {
  const [todo, setTodo] = useState(undefined);
  const [viewClear, setViewClear] = useState(false);

  const saveTodo = (e) => {
    e.preventDefault();
    if (e.target.querySelector("#do").value === "") return;
    const prevTodoStore = JSON.parse(localStorage.getItem("to-do"));
    const newData = {
      createAt: new Date(),
      value: e.target.querySelector("#do").value,
      clear: false,
    };

    localStorage.setItem(
      "to-do",
      JSON.stringify(
        prevTodoStore ? [prevTodoStore, newData].flat() : [newData]
      )
    );
    e.target.querySelector("#do").value = "";
    setTodos();
  };

  //state 업데이트 함수
  const setTodos = () => {
    const todoStore = localStorage.getItem("to-do");
    todoStore && setTodo(JSON.parse(todoStore));
  };

  const onViewChange = () => {
    setViewClear((prev) => !prev);
  };

  const onClearedDelete = () => {
    const todoStore = JSON.parse(localStorage.getItem("to-do"));
    const data = todoStore.filter((item) => !item.clear);
    localStorage.setItem("to-do", JSON.stringify(data));
    setTodos();
  };

  useEffect(() => {
    setTodos();
  }, []);

  return (
    <div className="header">
      <h1>To Do List</h1>
      <div>
        <form onSubmit={saveTodo}>
          <input type="text" id="do" placeholder="Enter your List" />
          <input type="submit" value="submit" />
        </form>
      </div>
      <div className="listContainer">
        {viewClear ? (
          <>
            <div className="subTitle">완료하지 않은 항목</div>
            {todo &&
              todo.map(
                (list, index) =>
                  !list.clear && (
                    <MyList
                      prop={list}
                      index={index}
                      setTodos={setTodos}
                      key={index}
                    />
                  )
              )}
          </>
        ) : (
          <>
            <div className="toolBox">
              <div className="subTitle">완료한 항목</div>
              <div className="actionButton" onClick={onClearedDelete}>
                완료 항목 삭제
              </div>
            </div>
            {todo &&
              todo.map(
                (list, index) =>
                  list.clear && (
                    <MyList
                      prop={list}
                      index={index}
                      setTodos={setTodos}
                      key={index}
                    />
                  )
              )}
          </>
        )}
      </div>
      <div className="fab" onClick={onViewChange}>
        {!viewClear ? "미완료 목록" : "완료 목록"}
      </div>
    </div>
  );
}

export default App;

const MyList = ({ prop, index, setTodos }) => {
  const onToggleClick = (e) => {
    let TodoStore = JSON.parse(localStorage.getItem("to-do"));

    TodoStore[index].clear = !TodoStore[index].clear;
    localStorage.setItem("to-do", JSON.stringify(TodoStore));

    setTodos();
  };
  return (
    <div className="list">
      <div className="index">{index + 1}</div>
      <div className="container">
        <div className="content">{prop.value}</div>
        <div className="info">
          <div className="date">
            {dateFormat(prop.createAt, "yy년 mm월 dd일 ")}
          </div>
        </div>
      </div>
      <div className="toggle" onClick={onToggleClick}>
        {prop.clear ? (
          <div className="checked"></div>
        ) : (
          <div className="unchecked"></div>
        )}
      </div>
    </div>
  );
};
