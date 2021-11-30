import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";

const rootReducer = combineReducers({
  user: userReducer,
  blog: blogReducer,
});

export default rootReducer;
