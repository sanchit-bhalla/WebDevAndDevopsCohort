import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { CounterState } from "../recoil/atoms/CounterState";
import { EvenCounterState } from "../recoil/selectors/EvenCounterState";

const Count = () => {
  const count = useRecoilValue(CounterState);
  return <div>Current Count: {count}</div>;
};

const CheckEven = () => {
  const isEven = useRecoilValue(EvenCounterState);

  return <div>Count is {isEven ? "EVEN" : "ODD"}</div>;
};

const Increase = () => {
  const setCount = useSetRecoilState(CounterState);
  return <button onClick={() => setCount((c) => c + 2)}>Increase</button>;
};

const Decrease = () => {
  const setCount = useSetRecoilState(CounterState);
  return <button onClick={() => setCount((c) => c - 1)}>Decrease</button>;
};

const RecoilCounter = () => {
  return (
    <RecoilRoot>
      <Count />
      <CheckEven />
      <Increase />
      <Decrease />
    </RecoilRoot>
  );
};

export default RecoilCounter;
