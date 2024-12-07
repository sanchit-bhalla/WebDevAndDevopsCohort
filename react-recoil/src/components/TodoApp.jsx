import { RecoilRoot } from "recoil";
import TodoItemCreator from "./TodoItemCreator";
import TodoListStats from "./TodoListStats";
import TodoListFilters from "./TodoListFilters";
import TodoList from "./TodoList";

const TodoApp = () => {
  return (
    <RecoilRoot>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      <TodoList />
    </RecoilRoot>
  );
};

export default TodoApp;
