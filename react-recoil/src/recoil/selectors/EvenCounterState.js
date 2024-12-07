import { selector } from "recoil";
import { CounterState } from "../atoms/CounterState";

export const EvenCounterState = selector({
  key: "EvenCounter",
  get: ({ get }) => {
    const count = get(CounterState);
    return count % 2 === 0;
  },
});
