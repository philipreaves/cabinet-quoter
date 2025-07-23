// src/context/QuoteContext.jsx
import { createContext, useState } from "react";

export const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [config, setConfig] = useState({});
  const [cabinetEntries, setCabinetEntries] = useState([]);

  return (
    <QuoteContext.Provider value={{ config, setConfig, cabinetEntries, setCabinetEntries }}>
      {children}
    </QuoteContext.Provider>
  );
};
