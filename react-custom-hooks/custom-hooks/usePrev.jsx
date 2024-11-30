import { useRef } from "react";

// import { useEffect, useRef } from "react";

// PROBLEM with THIS IMPLEMENTATION
// This hook returns the previos value but update the ref to store latest value. Suppose component using this hook gets rerender due to some other state change.
// This hook also gets called but value paased in this hook remains same. But since now ref store the same value, it returns the same current value.
// To check the issue, after clicking increment or decrement buttons sometime, click on Cause Glictcg button
/*
export const usePrev = (value) => {
  const ref = useRef();

  // Update the ref with current value
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return the previous value (current value of ref before it gets updated
  return ref.current;
};
*/

// Better Way
export const usePrev = (value, initial) => {
  const ref = useRef({ target: value, previous: initial });

  if (ref.current.target !== value) {
    {
      ref.current.previous = ref.current.target;
      ref.current.target = value;
    }
  }
  return ref.current.previous;
};

// Issue with above usePrev
// Basically, as long as you’re willing to compare the old and the new value, it’s fine, but if you have a huge object to diff (meaning deep comparison), this might be a problem, and the usePrevious hook could become too heavy computationally speaking.
