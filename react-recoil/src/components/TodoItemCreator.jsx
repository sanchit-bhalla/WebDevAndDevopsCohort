import { useSetRecoilState } from "recoil";
import { todoListState } from "../recoil/todoState";
import { memo, useState } from "react";

const TodoItemCreator = memo(() => {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: oldTodoList.length + 1,
        text: inputValue,
        done: false,
      },
    ]);

    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div style={{ margin: "20px" }}>
      <input placeholder="Add todo" value={inputValue} onChange={onChange} />
      <button onClick={addItem} disabled={inputValue.length === 0}>
        Add
      </button>
    </div>
  );
});

TodoItemCreator.displayName = "TodoItemCreator";

export default TodoItemCreator;
