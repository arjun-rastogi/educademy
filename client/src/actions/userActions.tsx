import { UserState } from "../types/userTypes";

// actions/userActions.tsx
export const setUser = (user: UserState | null) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};
