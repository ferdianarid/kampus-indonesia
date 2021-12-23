import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  page?: {
    endPoint: string;
    fullEndPoint: string;
    search: string;
    category: string | number;
    curPage: number;
    lastPage: number;
    totalPage: number;
  };
}

const defaultEnpoint = "/panel/events";

const initialState: initialState = {
  page: {
    endPoint: defaultEnpoint,
    fullEndPoint: defaultEnpoint,
    search: "",
    category: "",
    curPage: 1,
    lastPage: 1,
    totalPage: 1,
  },
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    updateCatgory(state, action: PayloadAction<string>) {
      state.page.category = action.payload;
      state.page.search = ""; // reset search

      state.page.curPage = 1;
      state.page.lastPage = 1;
      state.page.totalPage = 1;

      if (action.payload === "")
        state.page.endPoint = state.page.fullEndPoint = initialState.page.endPoint;
      else
        state.page.endPoint = state.page.fullEndPoint = initialState.page.endPoint
          // `/panel/events/categories/all/${state.page.category}`;
    },
    updateSearch(state, action: PayloadAction<string>) {
      state.page.search = action.payload;
      state.page.category = ""; // reset category

      state.page.curPage = 1;
      state.page.lastPage = 1;
      state.page.totalPage = 1;

      if (action.payload === "")
        state.page.endPoint = state.page.fullEndPoint =
          initialState.page.endPoint;
      else
        state.page.endPoint = state.page.fullEndPoint = 
        // `/panel/events/search`;
        initialState.page.endPoint
    },
    changePage(state, action: PayloadAction<number>) {
      state.page.curPage = action.payload;
      const urlSearch = new URLSearchParams();
      urlSearch.append("page", state.page.curPage.toString());
      state.page.fullEndPoint =
        state.page.endPoint + "?" + urlSearch.toString();
    },
    updateDataPage(
      state,
      action: PayloadAction<{ lastPage: number; totalPage: number }>
    ) {
      const { lastPage, totalPage } = action.payload;
      state.page.lastPage = lastPage;
      state.page.totalPage = totalPage;
    },
  },
});

const { actions, reducer } = eventSlice;
export const { updateCatgory, updateSearch, updateDataPage, changePage } = actions;
export default reducer;
