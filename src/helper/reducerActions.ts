import { User } from "./interface";
interface ReducerAction extends User {
  type: string;
  payload: any;
}
export const reducerActionTypes = {

  TRIGGER_SIDE_POPUP_MESSAGE: "TRIGGER_SIDE_POPUP_MESSAGE",
  CLOSE_SIDE_POPUP_MESSAGE: "CLOSE_SIDE_POPUP_MESSAGE",
};

export default (state: User, { type, payload }: ReducerAction) => {
  switch (type) {
    case reducerActionTypes.TRIGGER_SIDE_POPUP_MESSAGE:
      return {
        ...state,
        sidePopUpMessage: {
          trigger: true,
          error: payload.error,
          message: payload.message,
        },
      };
    case reducerActionTypes.CLOSE_SIDE_POPUP_MESSAGE: {
      return {
        ...state,
        sidePopUpMessage: {
          ...state.sidePopUpMessage,
          trigger: false,
        },
      };
    }

    default:
      throw new Error("unkown type action");
  }
};
