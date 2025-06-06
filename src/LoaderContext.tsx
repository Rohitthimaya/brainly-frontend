import { createContext, useContext, useState } from "react";

const LoaderContext = createContext({
    isLoading: true,
    setIsLoggedIn: (v: boolean) => {},
})

export function LoaderProvider({ children }) {
  const [isLoading, setIsLoggedIn] = useState(true);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoggedIn }}>
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);