import { Reducer } from "redux";
import { UserAction, UserState, SET_USER } from "../types/userTypes";

const userReducer: Reducer<UserState | null, UserAction> = (
  state = null,
  action
) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
