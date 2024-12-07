import PropTypes from "prop-types";
import { useState } from "react";
import { createContext } from "react";

export const CounterContext = createContext();

const CounterContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};

CounterContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CounterContextProvider;
