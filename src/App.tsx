import { useEffect, useState } from "react";
import { Fab } from "./components/Fab";
import { TodoList } from "./components/TodoList";
import { TodoDataType } from "./typd";

export const App = () => {
  const [todo, setTodo] = useState<TodoDataType[]>();
  const [viewClear, setViewClear] = useState(true);
  const [todoContent, setTodoContent] = useState<string>("");

  const saveTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoContent === "") return;
    const getLocalStorage: string | null = localStorage.getItem("to-do");
    const prevTodoStore = JSON.parse(getLocalStorage!);
    const newData = {
      createAt: new Date(),
      value: todoContent,
      clear: false,
    };
    localStorage.setItem(
      "to-do",
      JSON.stringify(
        prevTodoStore ? [prevTodoStore, newData].flat() : [newData]
      )
    );
    setTodoContent("");
    updateTodos();
  };

  //state 업데이트 함수
  const updateTodos = () => {
    const todoStore = localStorage.getItem("to-do");
    todoStore && setTodo(JSON.parse(todoStore));
  };

  const onViewChange = () => {
    setViewClear((prev) => !prev);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setTodoContent(event.target.value);
  };

  useEffect(() => {
    updateTodos();
  }, []);

  return (
    <div className="header">
      <h1>To Do List</h1>
      <div>
        <form onSubmit={saveTodo}>
          <input
            type="text"
            value={todoContent}
            onChange={onChange}
            placeholder="Enter your List"
          />
          <button>submit</button>
        </form>
      </div>
      {todo ? (
        <TodoList viewClear={viewClear} todo={todo} updateTodos={updateTodos} />
      ) : (
        "loading..."
      )}
      <Fab viewClear={viewClear} onViewChange={onViewChange} />
    </div>
  );
};
