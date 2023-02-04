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
}

const Context = createContext<ContextProps>({
  state: initionsState,
});

function ContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initionsState);


}
