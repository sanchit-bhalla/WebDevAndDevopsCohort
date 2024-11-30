import { useState } from "react";
import { usePrev } from "../custom-hooks/usePrev";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [glitch, setGlitch] = useState(0);
  const prevCount = usePrev(count);
  return (
    <div>
      <p>Current Count : {count}</p>
      <p>Previous Count : {prevCount}</p>

      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment
      </button>
      <button
        onClick={() => setCount((prevCount) => prevCount - 1)}
        style={{ marginLeft: 10 }}
      >
        Decrement
      </button>

      <button
        onClick={() => setGlitch((prevCount) => prevCount + 1)}
        style={{ marginLeft: 10 }}
      >
        Cause Glitch
      </button>
    </div>
  );
};

export default Counter;
