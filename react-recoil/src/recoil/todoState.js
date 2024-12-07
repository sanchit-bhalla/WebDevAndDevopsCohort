import { atom, selector } from "recoil";

const todoListState = atom({
  key: "TodoList",
  default: [],
});

const todoListFilterState = atom({
  key: "TodoListFilter",
  default: "Show All",
});

// The filteredTodoListState internally keeps track of two dependencies: todoListFilterState and todoListState so that it re-runs if either of those change.
const filteredTodoListState = selector({
  key: "FilteredTodoList",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.done);
      case "Show Uncompleted":
        return list.filter((item) => !item.done);
      default:
        return list;
    }
  },
});

const todoListStatsState = selector({
  key: "TodoListStats",
  get: ({ get }) => {
    const todoList = get(todoListState);

    const total = todoList.length;
    const completed = todoList.filter((item) => item.done).length;
    const pending = total - completed;
    const percentCompleted = total === 0 ? 0 : (completed / total) * 100;

    return {
      total,
      completed,
      pending,
      percentCompleted,
    };
  },
});

export {
  todoListState,
  todoListFilterState,
  filteredTodoListState,
  todoListStatsState,
};
