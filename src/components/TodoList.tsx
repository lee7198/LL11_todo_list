import { TodoDataType, TodoListType } from "../typd";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ viewClear, todo, updateTodos }: TodoListType) => {
  const onClearedDelete = () => {
    const getLocalStorage: string | null = localStorage.getItem("to-do");
    const todoStore = JSON.parse(getLocalStorage!);
    const data = todoStore.filter((item: TodoDataType) => !item.clear);
    localStorage.setItem("to-do", JSON.stringify(data));
    updateTodos();
  };

  return (
    <div className="listContainer">
      {viewClear ? (
        <>
          <div className="subTitle">완료하지 않은 항목</div>
          {todo &&
            todo.map(
              (list: TodoDataType, index: string) =>
                !list.clear && (
                  <TodoItem
                    prop={list}
                    index={index}
                    updateTodos={updateTodos}
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
              (list: TodoDataType, index: string) =>
                list.clear && (
                  <TodoItem
                    prop={list}
                    index={index}
                    updateTodos={updateTodos}
                    key={index}
                  />
                )
            )}
        </>
      )}
    </div>
  );
};
