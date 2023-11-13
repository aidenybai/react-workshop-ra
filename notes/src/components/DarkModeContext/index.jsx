import { createContext, useEffect, useState } from "react";
import "./index.css";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const themeClass = `theme-${mode}`;
    document.body.classList.add(themeClass);

    return () => {
      document.body.classList.remove(themeClass);
    };
  }, [mode]);

  return (
    <DarkModeContext.Provider value={{ mode, setMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
