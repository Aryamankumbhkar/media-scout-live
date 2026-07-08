import { createSlice } from "@reduxjs/toolkit";

export const SearchSlice = createSlice({
  name: "Search",
  initialState: {
    Query: "",
    ActiveTabs: "Photos",
    Results: [],
    Loading: "false",
    Error: null,
    clearResults: [],
  },
  reducers: {
    setQuery(state, action) {
      state.Query = action.payload;
    },
    setActiveTabs(state, action) {
      state.ActiveTabs = action.payload;
    },
    setResults(state, action) {
      state.Results = action.payload;
      state.Loading = false;
    },
    setLoading(state) {
      state.Loading = true;
      state.Error = null;
    },
    setError(state, action) {
      state.Error = action.payload;
      state.Loading = false;
    },
    clearResults(state) {
      state.Results = [];
    },
  },
});

export const {
  setQuery,
  setActiveTabs,
  setResults,
  setLoading,
  setError,
  clearResults,
} = SearchSlice.actions;

export default SearchSlice.reducer;
