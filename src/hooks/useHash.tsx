// src/contexts/HashContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface HashContextType {
  hash: string;
  setHash: (v: string) => void;
}

const HashContext = createContext<HashContextType>({
  hash: '',
  setHash: () => {}
});

export const HashProvider = ({ children }: { children: ReactNode }) => {
  const [hash, setHash] = useState('');

  return (
    <HashContext.Provider value={{ hash, setHash }}>
      {children}
    </HashContext.Provider>
  );
};

export const useHash = () => useContext(HashContext);
