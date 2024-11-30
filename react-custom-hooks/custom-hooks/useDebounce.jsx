import { useEffect } from "react";
import { useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

// useDebounce which accepts a function and returns a function which gets called when difference between 2 keystrokes is greater than delay
// Not verified
/*
import { useState, useEffect, useCallback, useRef } from "react";

export const useDebounce = (callback, delay) => {
  const timerIdRef = useRef(null);

  const debouncedFunction = useCallback(
    (...args) => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
      timerIdRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  return debouncedFunction;
};
*/
