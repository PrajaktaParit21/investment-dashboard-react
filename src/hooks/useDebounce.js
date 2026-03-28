import { useEffect, useRef, useState } from "react";

export function useDebounce() {
  const timeoutRef = useRef(null);

  const [searchResult, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    //to run on unmount in order to clear timeout reference
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  },[]);
  function handleSearchChange(inputValue) {
    
    setSearchInput(inputValue);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSearch(inputValue);
    }, 300);
  }

  return { searchInput, searchResult, handleSearchChange };
}
