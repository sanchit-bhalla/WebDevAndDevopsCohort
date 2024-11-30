import { useEffect } from "react";
import { useRef } from "react";

export const usePrev = (value) => {
  const ref = useRef();

  // Update the ref with current value
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return the previous value (current value of ref before it gets updated
  return ref.current;
};
