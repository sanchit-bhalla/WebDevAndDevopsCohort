import { useRecoilValue } from "recoil";
import { filteredTodoListState } from "../recoil/todoState";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
};

export default TodoList;
