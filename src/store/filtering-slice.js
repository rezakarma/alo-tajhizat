const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  queryParams: {
  },
  readQuery: false
};

const filteringSlice = createSlice({
  name: "filtering",
  initialState: initialState,
  reducers: {
    setQueryParams: (state, action) => {
      console.log(action.payload, ' redux values entire')
      state.queryParams = action.payload;
    },
    updateQueryParams: (state, action) => {
      console.log(action.payload, ' redux values one')
      const { key, value } = action.payload;
      state.queryParams[key] = value;
    },
    setReadingQueryTrue: (state, action) => {
      state.readQuery = true
    }
  },
});

export const filteringAction = filteringSlice.actions;

export default filteringSlice;
