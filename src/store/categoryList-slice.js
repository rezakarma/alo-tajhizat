const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    categoryList: null
};

const categoryListSlice = createSlice({
  name: "categoryList",
  initialState: initialState,
  reducers: {
    setCategoryList: (state, action) => {
        state.categoryList = action.payload;
    },
  },
});

export const categoryListAction = categoryListSlice.actions;

export default categoryListSlice;
