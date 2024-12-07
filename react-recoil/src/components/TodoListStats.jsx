import { useRecoilValue } from "recoil";
import { todoListStatsState } from "../recoil/todoState";

const TodoListStats = () => {
  const { total, completed, pending, percentCompleted } =
    useRecoilValue(todoListStatsState);

  const formattedPercentCopleted = Math.round(percentCompleted);

  return (
    <ul>
      <li>Total items: {total}</li>
      <li>Completed items: {completed}</li>
      <li>Pending items: {pending}</li>
      <li>Percent completed: {formattedPercentCopleted}</li>
    </ul>
  );
};

export default TodoListStats;
