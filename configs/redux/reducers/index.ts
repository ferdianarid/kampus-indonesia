import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";
import eventReducer from "./eventSlice";

const rootReducer = combineReducers({
  user: userReducer,
  blog: blogReducer,
  event: eventReducer
});

export default rootReducer;
