import { useRecoilState } from "recoil";
import { todoListState } from "../recoil/todoState";
import PropTypes from "prop-types";

function replaceItemAtIndex(arr, idx, item) {
  return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
}

function removeItemAtIndex(arr, idx) {
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

const TodoItem = ({ item }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((todo) => todo === item);

  const editText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemStatus = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      done: !item.done,
    });
    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };
  return (
    <div>
      <input type="text" value={item.text} onChange={editText} />

      <input type="checkbox" checked={item.done} onChange={toggleItemStatus} />

      <button onClick={deleteItem}>X</button>
    </div>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }),
};
export default TodoItem;
