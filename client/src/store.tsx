import { createStore, Store } from "redux";
import rootReducer from "./reducers";
import { UserAction, UserState } from "./types/userTypes";

const store: Store<UserState, UserAction> = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
