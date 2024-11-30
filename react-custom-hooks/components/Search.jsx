import { useState } from "react";
import useDebounce from "../custom-hooks/useDebounce";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedValue = useDebounce(searchTerm, 300);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleOnChange}
        value={searchTerm}
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
};

export default Search;
