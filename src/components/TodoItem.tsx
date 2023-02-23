import { TodoItemType } from "../typd";
import dateFormat from "dateformat";

export const TodoItem = ({ prop, index, updateTodos }: TodoItemType) => {
  const onToggleClick = () => {
    const getLocalStorage: string | null = localStorage.getItem("to-do");
    let TodoStore = JSON.parse(getLocalStorage!);

    TodoStore[index].clear = !TodoStore[index].clear;
    localStorage.setItem("to-do", JSON.stringify(TodoStore));

    updateTodos();
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
