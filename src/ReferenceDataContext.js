import { createContext, useState } from "react";

const ReferenceDataContextProvider = ({ children }) => {
    
    const [sbrand, setsBrand] = useState([]);         
  return (
    <ReferenceDataContext.Provider value={{ sbrand, setsBrand }}>
      {children}
    </ReferenceDataContext.Provider>
  )
};

const ReferenceDataContext = createContext({ });
export { ReferenceDataContext, ReferenceDataContextProvider };