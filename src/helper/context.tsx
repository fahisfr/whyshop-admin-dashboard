"use client";
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
  showErrorMessage: (messsage: string) => void;
  showSuccessMessage: (messsage: string) => void;
}

const Context = createContext<ContextProps>({
  state: initionsState,
  dispatch: (action: any) => {},
  reducerActionTypes: reducerActionTypes,
  showErrorMessage: (messsage: string) => {},
  showSuccessMessage: (messsage: string) => {},
});

function ContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initionsState);

  const showErrorMessage = (message: string) => {

    dispatch({
      type: reducerActionTypes.TRIGGER_SIDE_POPUP_MESSAGE,
      payload: {
        error: true,
        message: message,
      },
    });
  };

  const showSuccessMessage = (message: string) => {

    dispatch({
      type: reducerActionTypes.TRIGGER_SIDE_POPUP_MESSAGE,
      payload: {
        error: false,
        message: message,
      },
    });
  };

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        reducerActionTypes,
        showErrorMessage,
        showSuccessMessage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useAppContext = (): ContextProps => useContext(Context);


export default ContextProvider;
