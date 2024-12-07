import { useContext } from "react";
import CounterContextProvider, {
  CounterContext,
} from "../context/CounterContext";

const Counter = () => {
  return (
    <CounterContextProvider>
      <Count />
      <IncreaseCount />
      <DecreaseCount />
    </CounterContextProvider>
  );
};

function Count() {
  const { count } = useContext(CounterContext);
  return <div>Current Count: {count}</div>;
}

function IncreaseCount() {
  const { setCount } = useContext(CounterContext);
  return <button onClick={() => setCount((c) => c + 1)}>Increase</button>;
}

function DecreaseCount() {
  const { setCount } = useContext(CounterContext);
  return <button onClick={() => setCount((c) => c - 1)}>Decrease</button>;
}

export default Counter;
