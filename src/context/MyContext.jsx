import { createContext, useState } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [myState, setMyState] = useState("Initial Value");

  const updateState = (newValue) => {
    setMyState(newValue);
  };

  return (
    <MyContext.Provider value={{ myState, updateState }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
