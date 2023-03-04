import { createContext, ReactNode, useContext, useReducer } from "react";
import { State } from "./interface";
import reducer, { reducerActionTypes } from "./reducerActions";

const initionsState = {
  sidePopUpMessage: {
    trigger: false,
    error: false,
    message: "",
  },
};

interface ContextProps {
  state: State;
  dispatch: React.Dispatch<any>;
  reducerActionTypes: typeof reducerActionTypes;
  triggerSidePopUpMessage: (error: boolean, message: string) => void;
}

const Context = createContext<ContextProps>({
  state: initionsState,
  dispatch: (action: any) => {},
  reducerActionTypes: reducerActionTypes,
  triggerSidePopUpMessage: (error: boolean, message: string) => {},
});

function ContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initionsState);

  const triggerSidePopUpMessage = (error: boolean, message: string) => {
    dispatch({
      type: reducerActionTypes.TRIGGER_SIDE_POPUP_MESSAGE,
      payload: { error, message },
    });
  };

  return (
    <Context.Provider
      value={{ state, dispatch, reducerActionTypes, triggerSidePopUpMessage }}
    >
      {children}
    </Context.Provider>
  );
}

export const useAppContext = () => useContext(Context);

export default ContextProvider;
