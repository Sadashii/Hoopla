import { useEffect, useState } from "react";

export const useStickyState = (defaultValue, key) => {
  const [fetched, setFetched] = useState(false);
  const [value, setValue] = useState(null);
  
  useEffect(() => {
    const stickyValue = localStorage.getItem(key);
    if (stickyValue) {
      setValue(JSON.parse(stickyValue));
    } else {
      setValue(defaultValue);
    }
    setFetched(true);
  }, []);
  
  useEffect(() => {
    if (fetched) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [fetched, key, value]);
  
  return [value, setValue, fetched];
};