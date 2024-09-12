import { createContext, useEffect, useState } from "react";
import "./index.css";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const theme = "theme-" + mode;
    document.body.classList.add(theme);

    return () => {
      document.body.classList.remove(theme);
    };
  }, [mode]);

  return (
    <DarkModeContext.Provider value={{ mode, setMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
