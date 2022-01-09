import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "rizki",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {},
  },
});

const { actions, reducer } = userSlice;
export const { login } = actions;
export default reducer;
