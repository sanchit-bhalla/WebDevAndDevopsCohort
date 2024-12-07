import { useRecoilState } from "recoil";
import { todoListFilterState } from "../recoil/todoState";

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };
  return (
    <div>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Done</option>
        <option value="Show Uncompleted">Pending</option>
      </select>
    </div>
  );
};

export default TodoListFilters;
