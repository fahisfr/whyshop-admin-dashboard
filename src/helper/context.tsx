import { createContext, ReactNode, useContext, useReducer } from "react";
import { User } from "./interface";
import reducer, { reducerActionTypes } from "./reducerActions";
const initionsState = {
  sidePopUpMessage: {
    trigger: false,
    error: false,
    message: "",
  },
};

interface ContextProps {
  state: User;
  dispatch: React.Dispatch<any>;
  reducerActionTypes: typeof reducerActionTypes;
}

const Context = createContext<ContextProps>({
  state: initionsState,
  dispatch: (action: any) => {},
  reducerActionTypes: reducerActionTypes,
});

function ContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initionsState);

  return (
    <Context.Provider value={{ state, dispatch, reducerActionTypes }}>
      {children}
    </Context.Provider>
  );
}

export const getContext = () => useContext(Context);

export default ContextProvider;
