// src/contexts/HashContext.js
import { createContext, useContext, useState } from "react";

const HashContext = createContext({
  hash: '',
  setHash: (v: any) => {}
});

export const HashProvider = ({ children }) => {
  const [hash, setHash] = useState("");

  return (
    <HashContext.Provider value={{ hash, setHash }}>
      {children}
    </HashContext.Provider>
  );
};

export const useHash = () => useContext(HashContext);
