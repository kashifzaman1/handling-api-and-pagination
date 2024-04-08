import { useContext } from "react";
import { ReferenceDataContext, ReferenceDataContextProvider } from "./ReferenceDataContext"
import Main from "./Main"
import React from "react";

const App = () => {
  const { sbrand } = useContext(ReferenceDataContext)

    return (
        <ReferenceDataContextProvider>
          <Main />
        </ReferenceDataContextProvider>
    )
}

export default App
