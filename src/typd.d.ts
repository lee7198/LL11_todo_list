export interface TodoListType {
  viewClear: viewClear;
  todo: TodoDataType<Object>;
  updateTodos: () => void;
}
export interface TodoItemType {
  index: string;
  prop: TodoDataType;
  updateTodos: () => void;
}

export interface TodoDataType {
  createAt: string | number;
  value: string;
  clear: boolean;
}

export interface FabType {
  viewClear: viewClear;
  onViewChange: () => void;
}

type viewClear = boolean;
