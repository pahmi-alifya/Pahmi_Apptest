import { combineReducers } from "redux";
import common from "./common";
import contact from "./contact";

const rootReducers = combineReducers({
  common,
  contact,
});

// const rootReducers = (state, action) => {
//   if (action.type == authActionTypes.LOGOUT) {
//     state = undefined
//   }
//   return appReducers(state, action)
// }

export default rootReducers;
