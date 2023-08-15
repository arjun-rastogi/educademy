export const SET_USER = "SET_USER";

export interface UserState {
  [key: string]: any;
}

export interface SetUserAction {
  type: "SET_USER";
  payload: UserState | null;
}

export type UserAction = SetUserAction;
