const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
profile : {},
changed: false,
}


const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile(state) {
        return state.profile
    },
    setProfile(state,action) {
        state.profile = action.payload;
    }
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
